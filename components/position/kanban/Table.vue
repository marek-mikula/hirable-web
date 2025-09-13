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
            v-tooltip="$t('common.action.refresh')"
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

      <div class="flex items-center space-x-2">
        <QuestionMarkCircleIcon class="size-5" v-tooltip="$t('tooltip.position.kanban.order')"/>
        <LazyPositionKanbanSettingsDropdown
            v-if="showSettingsDropdown"
            :disabled="loading || dataLoading"
            @create-process-step="onCreatePositionProcessStep"
            @set-process-step-order="onPositionProcessStepSetOrder"
        />
      </div>
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
              @add="onAdd"
              @create-action="onCreateAction"
              @event="onEvent"
          />
        </div>
      </template>

    </CommonAsyncData>

    <LazyPositionProcessStepSetOrderModal
      v-if="policy.position.setProcessStepOrder(position)"
      ref="positionProcessStepSetOrderModal"
      :position="position"
      @update="onPositionProcessStepOrderSet"
    />

    <LazyPositionProcessStepStoreModal
        v-if="policy.positionProcessStep.store(position)"
        ref="positionProcessStepStoreModal"
        :position="position"
        @create="onPositionProcessStepCreated"
    />

    <PositionCandidateActionStoreModal
        :position="position"
        ref="actionStoreModal"
        @create="refresh"
    />

  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import {ArrowPathIcon, MagnifyingGlassIcon, QuestionMarkCircleIcon} from "@heroicons/vue/24/outline";
import type {PositionCandidate, PositionProcessStep, PositionShow} from "~/repositories/resources";
import type {AddEvent, KanbanEvent, KanbanStep} from "~/types/components/position/kanban/table.types";
import type {ActionStoreModalExpose} from "~/types/components/position/candidate/action/storeModal.types";
import type {PositionProcessStepStoreModalExpose} from "~/types/components/position/processStep/storeModal.types";
import type {PositionProcessStepSetOrderModalExpose} from "~/types/components/position/processStep/setOrderModal.types";
import {getProcessStepLabel} from "~/functions/processStep";
import {ACTION_STATE, ACTION_TYPE} from "~/types/enums";

const props = defineProps<{
  position: PositionShow
}>()

const api = useApi()
const toaster = useToaster()
const policy = usePolicy()

const asyncData = useAsyncData<KanbanStep[]>(
    () => `position-kanban-${props.position.id}`,
    () => handleThrow(() => fetchKanbanSteps()),
)

const {
  data: kanbanSteps,
  pending: dataLoading,
  refresh,
} = asyncData

const positionProcessStepStoreModal = ref<PositionProcessStepStoreModalExpose>()
const positionProcessStepSetOrderModal = ref<PositionProcessStepSetOrderModalExpose>()
const actionStoreModal = ref<ActionStoreModalExpose>()

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

const showSettingsDropdown = computed<boolean>(() => {
  return policy.position.setProcessStepOrder(props.position) ||
      policy.positionProcessStep.store(props.position)
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
    const stepPositionCandidates = sortPositionCandidates(positionCandidates.filter(item => item.step.id === positionProcessStep.id))
    kanbanSteps.push({
      step: positionProcessStep,
      count: stepPositionCandidates.length,
      positionCandidates: stepPositionCandidates,
    })
  }

  return kanbanSteps
}

function sortPositionCandidates(positionCandidates: PositionCandidate[]): PositionCandidate[] {
  return positionCandidates.sort((a: PositionCandidate, b: PositionCandidate): number => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority
    }

    const dateA = new Date(a.updatedAt).getTime()
    const dateB = new Date(b.updatedAt).getTime()

    return dateA === dateB ? 0 : (dateA - dateB)
  })
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

  const fromStep = kanbanSteps.value!.find(item => item.step.id === fromStepId)!
  const toStep = kanbanSteps.value!.find(item => item.step.id === toStepId)!

  const oldIndex = event.oldIndex
  const newIndex = toStep.positionCandidates.length > 1 ? event.newIndex : event.newIndex - 1 // probably a bug

  // if request fails, revert back the action
  if (!result.success) {
    // first push the object into the old array
    fromStep.positionCandidates.splice(oldIndex, 0, toStep.positionCandidates[newIndex])

    // now remove the object from the new array
    toStep.positionCandidates.splice(newIndex, 1)

    // lower the number of total candidates
    toStep.count -= 1

    return
  }

  // if requests passes, refresh the data in the grid
  // and check action modal

  await toaster.success({
    title: {
      key: 'toast.position.kanban.setStep',
      values: {
        step: getProcessStepLabel(toStep.step)
      }
    }
  })

  const {positionCandidate} = result.result

  // replace existing positionCandidate model
  // with updated one
  toStep.positionCandidates.splice(newIndex, 1, positionCandidate)

  // refresh counts of kanban steps
  refreshCounts()

  // refresh order
  refreshOrder()

  const movedForward = fromStep.step.order < toStep.step.order

  // candidate was either moved back in the pipeline or
  // the step does not trigger any action
  if (!movedForward || !toStep.step.triggersAction) {
    return
  }

  const hasAction = positionCandidate.actions.some(item => {
    return item.positionProcessStepId === toStep.step.id &&
        item.type === toStep.step.triggersAction &&
        item.state !== ACTION_STATE.CANCELED
  })

  // do not show store action modal if candidate already
  // has that specific action, which is not canceled
  if (hasAction) {
    return
  }

  actionStoreModal.value!.open(toStep.step.triggersAction, [positionCandidate])
}

function onCreateAction(action: ACTION_TYPE, positionCandidate: PositionCandidate): void {
  actionStoreModal.value!.open(action, [positionCandidate])
}

function onPositionProcessStepSetOrder(): void {
  positionProcessStepSetOrderModal.value!.open(_.map(kanbanSteps.value!, 'step'))
}

function onPositionProcessStepOrderSet(newOrder: Record<number, number>): void {
  const compareFn = (a: KanbanStep, b: KanbanStep): number => {
    const orderA = newOrder[a.step.id]!
    const orderB = newOrder[b.step.id]!
    return orderA - orderB
  }
  kanbanSteps.value!.sort(compareFn)
}

function onCreatePositionProcessStep(): void {
  positionProcessStepStoreModal.value!.open()
}

function onPositionProcessStepCreated(positionProcessStep: PositionProcessStep): void {
  kanbanSteps.value!.push({
    step: positionProcessStep,
    count: 0,
    positionCandidates: []
  })
}

function onEvent(event: KanbanEvent): void {
  if (event.event === 'positionCandidateUpdated') {
    refreshPositionCandidate(event.id)
  } else if (event.event === 'select') {
    select(event.value, _.isArray(event.positionCandidateId) ? event.positionCandidateId : [event.positionCandidateId])
  }
}

function select(value: boolean, positionCandidateIds: number[]): void {
  if (value) {
    selected.value = [...selected.value.filter(item => !positionCandidateIds.includes(item)), ...positionCandidateIds]
  } else {
    selected.value = selected.value.filter(item => !positionCandidateIds.includes(item))
  }
}

async function refreshPositionCandidate(id: number): Promise<void> {
  // find kanban step containing the position candidate model
  const kanbanStep = kanbanSteps.value!.find(item => item.positionCandidates.some(i => i.id === id))

  if (!kanbanStep) {
    return
  }

  // find position candidate model directly in the kanban step
  const model = kanbanStep.positionCandidates.find(item => item.id === id)!

  loading.value = true

  const result = await handle<PositionCandidate>(
      () => api.positionCandidate.show(model.positionId, model.id).then(res => res._data!.data.positionCandidate)
  )

  if (!result.success) {
    loading.value = false
    return
  }

  const index = kanbanStep.positionCandidates.findIndex(item => item.id === model.id)

  // set new model to the kanban step
  kanbanStep.positionCandidates.splice(index, 1, result.result)

  // refresh order
  refreshOrder()

  loading.value = false
}

function refreshCounts(): void {
  for (const kanbanStep of kanbanSteps.value!) {
    kanbanStep.count = kanbanStep.positionCandidates.length
  }
}

function refreshOrder(): void {
  for (const kanbanStep of kanbanSteps.value!) {
    kanbanStep.positionCandidates = sortPositionCandidates(kanbanStep.positionCandidates)
  }
}
</script>
