<template>
  <div class="space-y-3 lg:space-y-4">

    <!-- filter, search and settings bar -->
    <div class="flex items-center justify-between space-x-2">
      <div class="flex-1 min-w-0 flex items-center space-x-2">
        <CommonButton
            variant="secondary"
            :icon="ArrowPathIcon"
            :loading="loading || dataLoading"
            @click="refresh"
            v-tooltip="{ content: $t('common.action.refresh') }"
        />
        <FormInput
            v-model="search"
            type="search"
            name="name"
            class="w-42"
            :icon="MagnifyingGlassIcon"
            :placeholder="$t('common.table.search')"
            :disabled="loading || dataLoading"
        />
        <FormCheckbox
            v-model="hideEmpty"
            name="hideEmpty"
            :label="$t('page.position.detail.candidates.kanban.hideEmpty')"
            :disabled="loading || dataLoading"
        />
      </div>

      <PositionKanbanSettingsDropdown
          :disabled="loading || dataLoading"
          @add-process-step="addProcessStepModalOpened = true"
          @set-process-step-order="setProcessStepOrderModalOpened = true"
      />
    </div>

    <!-- columns -->
    <CommonAsyncData :async-data="asyncData">

      <template #initial>
        <div class="overflow-x-auto flex flex-nowrap gap-2 scrollbar-hidden">
          <div v-for="n in 5" :key="n" class="shrink-0 md:w-[350px] flex flex-col border border-gray-200 rounded-md overflow-hidden shadow-xs">
            <div class="flex items-center p-2 bg-gray-50 border-b border-gray-200 space-x-2">
              <div class="h-[16px] animate-pulse bg-gray-100 rounded-md w-full"></div>
            </div>
            <div class="p-2 relative flex flex-col flex-1 min-h-0 space-y-2">
              <div v-for="n in 7" :key="n" class="border border-gray-200 bg-white rounded-md flex flex-col p-2 space-y-2">
                <div class="flex items-center space-x-2">
                  <div class="h-[16px] animate-pulse bg-gray-100 rounded-md w-full"></div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="h-[16px] animate-pulse bg-gray-100 rounded-md w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #data="{ data }">
        <div class="overflow-x-auto flex flex-nowrap gap-2 scrollbar-hidden">
          <PositionKanbanColumn
              v-for="kanbanStep in visibleSteps"
              :key="kanbanStep.step.id"
              :position="position"
              :kanban-step="kanbanStep"
              :selected="selected"
              :disabled="loading || dataLoading"
              @select="onSelect"
              @remove-process-step="onRemoveProcessStep"
              @update-process-step="onUpdateProcessStep"
              @add="onAdd"
              @create-action="onCreateAction"
              @show-action="onShowAction"
              @detail="onDetail"
          />
        </div>
      </template>

    </CommonAsyncData>

    <LazyPositionKanbanSetProcessStepOrderModal
      v-if="kanbanSteps"
      :position="position"
      :kanban-steps="kanbanSteps"
      :open="setProcessStepOrderModalOpened"
      @close="setProcessStepOrderModalOpened = false"
      @update="onProcessStepOrderUpdated"
    />

    <PositionKanbanAddProcessStepModal
        :position="position"
        :open="addProcessStepModalOpened"
        @close="addProcessStepModalOpened = false"
        @add="onProcessStepAdded"
    />

    <PositionKanbanUpdateProcessStepModal
        :position="position"
        :kanban-step="updateProcessStepModalKanbanStep"
        @close="updateProcessStepModalKanbanStep = null"
        @update="onProcessStepUpdated"
    />

    <PositionCandidateActionStoreModal :position="position" ref="actionStoreModal" @create="refresh"/>

    <PositionCandidateActionShowModal :position="position" ref="actionShowModal" @update="onActionUpdated"/>

    <PositionCandidateDetailModal :position="position" ref="detailModal" @update="onPositionCandidateUpdated"/>

  </div>
</template>

<script lang="ts" setup>
import {MagnifyingGlassIcon, TrashIcon, ArrowPathIcon} from "@heroicons/vue/24/outline";
import type {
  PositionShow,
  PositionProcessStep,
  PositionCandidate,
  PositionCandidateAction
} from "~/repositories/resources";
import type {AddEvent, KanbanStep} from "~/types/components/position/kanban/table.types";
import type {ActionStoreModalExpose} from "~/types/components/position/candidate/action/storeModal.types";
import type {ActionShowModalExpose} from "~/types/components/position/candidate/action/showModal.types";
import type {DetailModalExpose} from "~/types/components/position/candidate/detailModal.types";
import {getProcessStepLabel} from "~/functions/processStep";
import {ACTION_TYPE} from "~/types/enums";

const props = defineProps<{
  position: PositionShow
}>()

const {t} = useI18n()
const api = useApi()
const toaster = useToaster()
const modalConfirm = useModalConfirm()

const asyncData = useAsyncData<KanbanStep[]>(
    () => `position-kanban-${props.position.id}`,
    () => handleThrow(() => fetchKanbanSteps()),
)

const {
  data: kanbanSteps,
  pending: dataLoading,
  refresh,
} = asyncData

const addProcessStepModalOpened = ref<boolean>(false)
const setProcessStepOrderModalOpened = ref<boolean>(false)
const updateProcessStepModalKanbanStep = ref<KanbanStep|null>(null)
const actionStoreModal = ref<ActionStoreModalExpose>()
const actionShowModal = ref<ActionShowModalExpose>()
const detailModal = ref<DetailModalExpose>()

const search = ref<string|null>(null)
const hideEmpty = ref<boolean>(false)

const loading = ref<boolean>(false)
const selected = ref<number[]>([])

const visibleSteps = computed<KanbanStep[]>(() => {
  let steps = kanbanSteps.value ?? []

  if (search.value) {
    steps = steps.map(step => {
      const filteredCandidates = step.positionCandidates.filter(positionCandidate => {
        return searchInString(positionCandidate.candidate.fullName, search.value!)
      })

      return {...step, positionCandidates: filteredCandidates}
    })
  }

  if (hideEmpty.value) {
    steps = steps.filter(step => step.positionCandidates.length > 0)
  }

  return steps
})

async function fetchKanbanSteps(): Promise<KanbanStep[]> {
  // must be done like this, otherwise Nuxt
  // throws an error :(
  // @see https://github.com/nuxt/nuxt/issues/25099
  const nuxtApp = useNuxtApp()
  const positionProcessSteps = await nuxtApp.runWithContext(() => api.positionProcessStep.index(props.position.id).then(res => res._data!.data.positionProcessSteps))
  const positionCandidates = await nuxtApp.runWithContext(() => api.positionCandidate.index(props.position.id).then(res => res._data!.data.positionCandidates))

  let kanbanSteps: KanbanStep[] = []

  for (const positionProcessStep of positionProcessSteps) {
    const stepPositionCandidates = positionCandidates.filter(item => item.step.id === positionProcessStep.id)
    kanbanSteps.push({
      step: positionProcessStep,
      count: stepPositionCandidates.length,
      positionCandidates: stepPositionCandidates,
    })
  }

  return kanbanSteps
}

function onSelect(id: number): void {
  const index = selected.value.findIndex(item => item === id)

  if (index === -1) {
    selected.value.push(id)

    return
  }

  selected.value.splice(index, 1)
}

async function onRemoveProcessStep(kanbanStep: KanbanStep): Promise<void> {
  const hasCandidates = kanbanStep.positionCandidates.length > 0

  const confirmed = await modalConfirm.showConfirmModalPromise({
    title: t('modal.position.kanban.removeProcessStep.title'),
    text: hasCandidates
        ? t('modal.position.kanban.removeProcessStep.removeCandidates')
        : t('modal.position.kanban.removeProcessStep.text'),
    confirmButtonText: hasCandidates
        ? t('common.action.understand')
        : undefined,
    titleIcon: TrashIcon,
    manual: true
  })

  if (!confirmed) {
    return
  }

  if (hasCandidates) {
    modalConfirm.hideConfirmModal()

    return
  }

  modalConfirm.setLoading(true)

  const result = await handle(async () => api.positionProcessStep.deletePositionProcessStep(props.position.id, kanbanStep.step.id))

  modalConfirm.setLoading(false)
  modalConfirm.hideConfirmModal()

  if (!result.success) {
    return
  }

  await toaster.success({
    title: 'toast.position.kanban.removeProcessStep'
  })

  const index = kanbanSteps.value!.findIndex(item => item.step.id === kanbanStep.step.id)

  if (index === -1) {
    return
  }

  kanbanSteps.value!.splice(index, 1)
}

function onUpdateProcessStep(kanbanStep: KanbanStep): void {
  updateProcessStepModalKanbanStep.value = kanbanStep
}

function onProcessStepUpdated(positionProcessStep: PositionProcessStep): void {
  updateProcessStepModalKanbanStep.value = null

  const index = kanbanSteps.value!.findIndex(item => item.step.id === positionProcessStep.id)

  if (index === -1) {
    return
  }

  kanbanSteps.value!.splice(index, 1, {...kanbanSteps.value![index], step: positionProcessStep})
}

function onProcessStepOrderUpdated(): void {
  setProcessStepOrderModalOpened.value = false
  refresh()
}

function onProcessStepAdded(): void {
  addProcessStepModalOpened.value = false
  refresh()
}

async function onAdd(event: AddEvent): Promise<void> {
  const positionCandidateId = parseInt(event.item.getAttribute('data-id') as string)
  const fromStepId = parseInt(event.from.getAttribute('data-id') as string)
  const toStepId = parseInt(event.to.getAttribute('data-id') as string)

  loading.value = true

  const result = await handle(() => api.positionCandidate.setStep(
      props.position.id,
      positionCandidateId,
      toStepId
  ).then(res => res._data!.data))

  loading.value = false

  const fromStep = kanbanSteps.value!.find(item => item.step.id === fromStepId)
  const toStep = kanbanSteps.value!.find(item => item.step.id === toStepId)

  const oldIndex = event.oldIndex
  const newIndex = toStep!.positionCandidates.length > 1 ? event.newIndex : event.newIndex - 1 // probably a bug

  // if request fails, revert back the action
  if (!result.success) {
    // first push the object into the old array
    fromStep!.positionCandidates.splice(oldIndex, 0, toStep!.positionCandidates[newIndex])

    // now remove the object from the new array
    toStep!.positionCandidates.splice(newIndex, 1)

    // lower the number of total candidates
    toStep!.count -= 1

    return
  }

  // if requests passes, refresh the data in the grid
  // and check action modal

  await toaster.success({
    title: {
      key: 'toast.position.kanban.setStep',
      values: {
        step: getProcessStepLabel(toStep!.step)
      }
    }
  })

  await refresh()
  //
  // const movedForward = fromStep!.step.order < toStep!.step.order
  //
  // if (movedForward) {
  //   const {positionProcessStep, positionCandidate} = result.result
  //
  //   // if action should be triggered, trigger it
  //   if (positionProcessStep.triggersAction) {
  //     actionStoreModal.value!.open(positionProcessStep.triggersAction, [positionCandidate])
  //   }
  // } else {
  //   // todo check if any action cannot be canceled
  // }
}

function onCreateAction(action: ACTION_TYPE, positionCandidate: PositionCandidate): void {
  actionStoreModal.value!.open(action, [positionCandidate])
}

function onShowAction(positionCandidateAction: PositionCandidateAction): void {
  actionShowModal.value!.open(positionCandidateAction)
}

function onDetail(positionCandidate: PositionCandidate): void {
  detailModal.value!.open(positionCandidate)
}

function onActionUpdated(positionCandidateAction: PositionCandidateAction): void {
  const kanbanStep = kanbanSteps.value!.find(item => item.positionCandidates.some(i => i.id === positionCandidateAction.positionCandidateId))

  if (!kanbanStep) {
    return
  }

  const positionCandidate = kanbanStep.positionCandidates.find(item => item.id === positionCandidateAction.positionCandidateId)!
  const actionIndex = positionCandidate.actions.findIndex(item => item.id === positionCandidateAction.id)

  if (actionIndex === -1) {
    return
  }

  positionCandidate.actions.splice(actionIndex, 1, positionCandidateAction)
}

function onPositionCandidateUpdated(positionCandidate: PositionCandidate): void {
  const kanbanStep = kanbanSteps.value!.find(item => item.positionCandidates.some(i => i.id === positionCandidate.id))

  if (!kanbanStep) {
    return
  }

  const positionCandidateIndex = kanbanStep.positionCandidates.findIndex(item => item.id === positionCandidate.id)

  if (positionCandidateIndex === -1) {
    return
  }

  kanbanStep.positionCandidates.splice(positionCandidateIndex, 1, positionCandidate)
}
</script>
