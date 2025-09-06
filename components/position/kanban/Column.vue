<template>
  <div class="shrink-0 w-[350px] flex flex-col border border-gray-200 rounded-md overflow-hidden shadow-xs">

    <!-- kanban column header -->
    <div class="flex items-center py-2 px-2.5 bg-gray-100 border-b border-gray-200 space-x-2">

      <!-- checkbox to select all candidates -->
      <FormCheckbox
          v-if="kanbanStep.positionCandidates.length > 0"
          :name="`select-all-${kanbanStep.step.id}`"
          :disabled="disabled"
          class="shrink-0"
          v-tooltip="{ content: $t('common.action.selectAll') }"
          @change="onSelectAll"
      />

      <!-- kanban column title -->
      <h2 class="flex-1 min-w-0 text-base font-medium flex items-center space-x-1">
        <span class="truncate">
          {{ getProcessStepLabel(kanbanStep.step) }}
        </span>
        <span v-if="kanbanStep.count > 0 && kanbanStep.positionCandidates.length < kanbanStep.count" class="shrink-0">
          ({{ kanbanStep.positionCandidates.length }}/{{ kanbanStep.count }})
        </span>
        <span v-else-if="kanbanStep.positionCandidates.length > 0" class="shrink-0">
          ({{ kanbanStep.positionCandidates.length }})
        </span>
      </h2>

      <!-- kanban column settings button -->
      <LazyPositionKanbanColumnSettingsDropdown
          v-if="showSettingsDropdown"
          :kanban-step="kanbanStep"
          :disabled="disabled"
          @delete-process-step="onDeletePositionProcessStep"
          @update-process-step="onUpdatePositionProcessStep"
      />

    </div>

    <!-- kanban column body -->
    <div class="p-2.5 relative flex flex-col flex-1 min-h-0">

      <Draggable
          class="flex-1 min-h-0 flex-col space-y-2.5"
          group="positionCandidates"
          handle=".candidate-drag-handle"
          item-key="id"
          :data-id="kanbanStep.step.id"
          :list="kanbanStep.positionCandidates"
          :empty-insert-hreshold="50"
          :sort="false"
          :disabled="disabled"
          :scroll="true"
          :scroll-sensitivity="80"
          :scroll-speed="20"
          :force-auto-scroll-fallback="true"
          @add="onAdd"
      >
        <template #item="{ element: positionCandidate }">
          <PositionKanbanCard
              :position="position"
              :position-candidate="positionCandidate"
              :selected="selected"
              :disabled="disabled"
              @create-action="onCreateAction"
              @event="event => emit('event', event)"
          />
        </template>
      </Draggable>

    </div>

    <Teleport to="#teleports">
      <LazyPositionProcessStepUpdateModal
          v-if="policy.positionProcessStep.update(kanbanStep.step, position)"
          ref="positionProcessStepUpdateModal"
          :position="position"
          @update="onPositionProcessStepUpdated"
      />
    </Teleport>

  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import Draggable from "vuedraggable";
import type {
  PositionCandidate,
  PositionShow,
  PositionProcessStep
} from "~/repositories/resources";
import {getProcessStepLabel} from "~/functions/processStep";
import type {AddEvent, KanbanEvent, KanbanStep} from "~/types/components/position/kanban/table.types";
import type {ACTION_TYPE} from "~/types/enums";
import {TrashIcon} from "@heroicons/vue/24/outline";
import type {PositionProcessStepUpdateModalExpose} from "~/types/components/position/processStep/updateModal.types";

const props = defineProps<{
  position: PositionShow
  kanbanStep: KanbanStep
  selected: number[]
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'add', event: AddEvent): void,
  (e: 'createAction', action: ACTION_TYPE, positionCandidate: PositionCandidate): void,
  (e: 'event', event: KanbanEvent): void,
}>()

const policy = usePolicy()
const modalConfirm = useModalConfirm()
const toaster = useToaster()
const api = useApi()
const {t} = useI18n()

const positionProcessStepUpdateModal = ref<PositionProcessStepUpdateModalExpose>()

const showSettingsDropdown = computed<boolean>(() => {
  return policy.positionProcessStep.update(props.kanbanStep.step, props.position)
})

function onAdd(event: AddEvent): void {
  emit('add', event)
}

function onCreateAction(action: ACTION_TYPE, positionCandidate: PositionCandidate): void {
  emit('createAction', action, positionCandidate)
}

function onSelectAll(value: boolean): void {
  emit('event', {
    event: 'select',
    value,
    positionCandidateId: _.map(props.kanbanStep.positionCandidates, 'id')
  })
}

async function onDeletePositionProcessStep(): Promise<void> {
  const hasCandidates = props.kanbanStep.positionCandidates.length > 0

  const confirmed = await modalConfirm.showConfirmModalPromise({
    title: t('modal.position.processStep.delete.title'),
    text: hasCandidates
        ? t('modal.position.processStep.delete.removeCandidates')
        : t('modal.position.processStep.delete.text'),
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

  const result = await handle(async () => api.positionProcessStep.deletePositionProcessStep(props.position.id, props.kanbanStep.step.id))

  modalConfirm.setLoading(false)
  modalConfirm.hideConfirmModal()

  if (!result.success) {
    return
  }

  await toaster.success({
    title: 'toast.position.processStep.delete'
  })

  emit('event', {
    event: 'positionProcessStepDeleted',
    positionProcessStepId: props.kanbanStep.step.id
  })
}

function onUpdatePositionProcessStep(): void {
  positionProcessStepUpdateModal.value!.open(props.kanbanStep.step)
}

function onPositionProcessStepUpdated(positionProcessStep: PositionProcessStep): void {
  emit('event', {
    event: 'positionProcessStepUpdated',
    positionProcessStep,
  })
}
</script>
