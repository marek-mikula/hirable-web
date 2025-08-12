<template>
  <div class="space-y-3 lg:space-y-4">

    <!-- filter, search and settings bar -->
    <div class="flex items-center justify-between space-x-2">
      <div class="flex-1 min-w-0 flex items-center space-x-2">
        <CommonSpinner v-if="loading || dataLoading"/>
        <CommonButton
            variant="secondary"
            symmetrical
            :disabled="loading || dataLoading"
            @click="refresh"
            v-tooltip="{ content: $t('common.action.refresh') }"
        >
          <ArrowPathIcon class="size-5"/>
        </CommonButton>
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
    <CommonAsyncData :async-data="asyncData" @data="onNewData">

      <template #initial>
        <div class="md:overflow-x-auto flex flex-col md:flex-row flex-nowrap gap-2 scrollbar-hidden relative">
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
        <div class="md:overflow-x-auto flex flex-col md:flex-row flex-nowrap gap-2 scrollbar-hidden relative">
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
          />
        </div>
      </template>

    </CommonAsyncData>

    <PositionKanbanSetProcessStepOrderModal
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

  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import {MagnifyingGlassIcon, TrashIcon, ArrowPathIcon} from "@heroicons/vue/24/outline";
import type {KanbanStep, Position, PositionProcessStep} from "~/repositories/resources";
import type {AddEvent} from "~/types/components/position/kanban/table.types";

const props = defineProps<{
  position: Position
}>()

const {t} = useI18n()
const api = useApi()
const toaster = useToaster()
const modalConfirm = useModalConfirm()

const asyncData = useAsyncData<KanbanStep[]>(
    () => `position-kanban-${props.position.id}`,
    () => handleThrow(() => api.position.kanban(props.position.id).then(response => response._data!.data.kanbanSteps)),
)

const {
  data: kanbanSteps,
  pending: dataLoading,
  refresh,
} = asyncData

const addProcessStepModalOpened = ref<boolean>(false)
const setProcessStepOrderModalOpened = ref<boolean>(false)
const updateProcessStepModalKanbanStep = ref<KanbanStep|null>(null)

const visibleSteps = ref<KanbanStep[]>([])
const search = ref<string|null>(null)
const hideEmpty = ref<boolean>(false)

const loading = ref<boolean>(false)
const selected = ref<number[]>([])

function filterKanbanSteps(kanbanSteps: KanbanStep[]): void {
  if (search.value) {
    kanbanSteps = kanbanSteps.map(step => {
      const filteredCandidates = step.positionCandidates.filter(positionCandidate => {
        return searchInString(positionCandidate.candidate.fullName, search.value!)
      })

      return {...step, positionCandidates: filteredCandidates}
    })
  }

  if (hideEmpty.value) {
    kanbanSteps = kanbanSteps.filter(step => step.positionCandidates.length > 0)
  }

  visibleSteps.value = kanbanSteps
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

  filterKanbanSteps(kanbanSteps.value!)
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

  filterKanbanSteps(kanbanSteps.value!)
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
  ))

  loading.value = false

  // if request fails, revert back
  // the drag&drop action
  if (!result.success) {
    const fromStep = visibleSteps.value.find(item => item.step.id === fromStepId)
    const toStep = visibleSteps.value.find(item => item.step.id === toStepId)

    // first push the object into the old array
    fromStep!.positionCandidates.splice(event.oldIndex, 0, toStep!.positionCandidates[event.newIndex - 1])

    // now remove the object from the new array
    toStep!.positionCandidates.splice(event.newIndex - 1, 1)

    return
  }

  // if requests passes, sync the main
  // data array with the change

  const fromStep = kanbanSteps.value!.find(item => item.step.id === fromStepId)
  const toStep = kanbanSteps.value!.find(item => item.step.id === toStepId)

  // first push the object into the new array
  toStep!.positionCandidates.splice(event.newIndex - 1, 0, fromStep!.positionCandidates[event.oldIndex])

  // now remove the object from the old array
  fromStep!.positionCandidates.splice(event.oldIndex, 1)

}

function onNewData(data: KanbanStep[]): void {
  filterKanbanSteps(data)
}

function onSearch(): void {
  filterKanbanSteps(kanbanSteps.value ?? [])
}

function onHideEmpty(): void {
  filterKanbanSteps(kanbanSteps.value ?? [])
}

watch(search, _.debounce(onSearch, 500))
watch(hideEmpty, onHideEmpty)
</script>
