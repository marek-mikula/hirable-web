<template>
  <div class="space-y-3 lg:space-y-4">

    <div class="flex items-center justify-between space-x-2">
      <div class="flex-1 min-w-0 flex items-center space-x-2">
        <CommonSpinner
          v-if="loading"
        />
        <CommonButton
            variant="secondary"
            symmetrical
            :disabled="loading"
            @click="emit('refresh')"
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
            :disabled="loading"
        />
        <FormCheckbox
            v-model="hideEmpty"
            name="hideEmpty"
            :label="$t('page.position.detail.candidates.kanban.hideEmpty')"
            :disabled="loading"
        />
      </div>

      <PositionKanbanSettingsDropdown
          :disabled="loading"
          @add-process-step="addProcessStepModalOpened = true"
          @set-process-step-order="setProcessStepOrderModalOpened = true"
      />
    </div>

    <div class="md:overflow-x-auto flex flex-col md:flex-row flex-nowrap gap-2 scrollbar-hidden relative">
      <PositionKanbanColumn
          v-for="kanbanStep in visibleSteps"
          :key="kanbanStep.step.id"
          :position="position"
          :kanban-step="kanbanStep"
          :selected="selected"
          :disabled="loading"
          @select="onSelect"
          @remove-process-step="onRemoveProcessStep"
          @update-process-step="onUpdateProcessStep"
          @add="onAdd"
      />
    </div>

    <PositionKanbanSetProcessStepOrderModal
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
import {searchInString} from "~/utils/helpers";
import type {KanbanStep, Position, PositionProcessStep} from "~/repositories/resources";
import type {AddEvent} from "~/types/components/position/kanban/table.types";

const props = defineProps<{
  position: Position
  kanbanSteps: KanbanStep[]
}>()

const emit = defineEmits<{
  (e: 'refresh'): void,
  (e: 'remove', kanbanStep: KanbanStep): void,
  (e: 'update', positionProcessStep: PositionProcessStep): void,
}>()

const {t} = useI18n()
const api = useApi()
const toaster = useToaster()
const modalConfirm = useModalConfirm()

const addProcessStepModalOpened = ref<boolean>(false)
const setProcessStepOrderModalOpened = ref<boolean>(false)
const updateProcessStepModalKanbanStep = ref<KanbanStep|null>(null)

// filter refs
const visibleSteps = ref<KanbanStep[]>(props.kanbanSteps)
const search = ref<string|null>(null)
const hideEmpty = ref<boolean>(false)

const loading = ref<boolean>(false)
const selected = ref<number[]>([])

function filterSteps(): void {
  let steps = deepCopy<KanbanStep[]>(props.kanbanSteps)

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

  visibleSteps.value = steps
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

  emit('remove', kanbanStep)
}

function onUpdateProcessStep(kanbanStep: KanbanStep): void {
  updateProcessStepModalKanbanStep.value = kanbanStep
}

function onProcessStepUpdated(positionProcessStep: PositionProcessStep): void {
  updateProcessStepModalKanbanStep.value = null
  emit('update', positionProcessStep)
}

function onProcessStepOrderUpdated(): void {
  setProcessStepOrderModalOpened.value = false
  emit('refresh')
}

function onProcessStepAdded(): void {
  addProcessStepModalOpened.value = false
  emit('refresh')
}

function onAdd(event: AddEvent): void {
  const fromStepId = parseInt(event.from.getAttribute('data-id') as string)
  const toStepId = parseInt(event.to.getAttribute('data-id') as string)
  const fromStep = props.kanbanSteps.find(item => item.step.id === fromStepId)
  const toStep = props.kanbanSteps.find(item => item.step.id === toStepId)

  if (!fromStep || !toStep) {
    return
  }

  const hasMovedForward = fromStep < toStep

  loading.value = true

  console.log(hasMovedForward, fromStep.step, toStep.step)
}

watch(search, _.debounce(filterSteps, 500))
watch(hideEmpty, filterSteps)
watch(() => props.kanbanSteps, filterSteps, { deep: true })
</script>
