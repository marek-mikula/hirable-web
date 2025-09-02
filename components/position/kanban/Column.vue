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
        <span v-if="kanbanStep.positionCandidates.length > 0" class="shrink-0">
          ({{ kanbanStep.positionCandidates.length }})
        </span>
      </h2>

      <!-- kanban column settings button -->
      <PositionKanbanColumnSettingsDropdown
          :kanban-step="kanbanStep"
          :disabled="disabled"
          @remove-process-step="emit('removeProcessStep', kanbanStep)"
          @update-process-step="emit('updateProcessStep', kanbanStep)"
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
              :position-candidate="positionCandidate"
              :selected="selected"
              :disabled="disabled"
              @select="onSelect"
              @create-action="onCreateAction"
              @show-action="onShowAction"
              @detail="onDetail"
          />
        </template>
      </Draggable>

    </div>

  </div>
</template>

<script lang="ts" setup>
import Draggable from "vuedraggable";
import type {PositionCandidate, KanbanStep, PositionShow, PositionCandidateAction} from "~/repositories/resources";
import {getProcessStepLabel} from "~/functions/processStep";
import type {AddEvent} from "~/types/components/position/kanban/table.types";
import type {ACTION_TYPE} from "~/types/enums";

const props = defineProps<{
  position: PositionShow
  kanbanStep: KanbanStep
  selected: number[]
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'select', id: number): void,
  (e: 'removeProcessStep' | 'updateProcessStep', kanbanStep: KanbanStep): void,
  (e: 'add', event: AddEvent): void,
  (e: 'createAction', action: ACTION_TYPE, positionCandidate: PositionCandidate): void,
  (e: 'showAction', positionCandidateAction: PositionCandidateAction): void,
  (e: 'detail', positionCandidate: PositionCandidate): void,
}>()

function onSelect(id: number): void {
  emit('select', id)
}

function onSelectAll(value: boolean): void {
  if (value) {
    for (const positionCandidate of props.kanbanStep.positionCandidates) {
      if (!props.selected.includes(positionCandidate.id)) {
        emit('select', positionCandidate.id)
      }
    }
  } else {
    for (const positionCandidate of props.kanbanStep.positionCandidates) {
      if (props.selected.includes(positionCandidate.id)) {
        emit('select', positionCandidate.id)
      }
    }
  }
}

function onAdd(event: AddEvent): void {
  emit('add', event)
}

function onCreateAction(action: ACTION_TYPE, positionCandidate: PositionCandidate): void {
  emit('createAction', action, positionCandidate)
}

function onShowAction(positionCandidateAction: PositionCandidateAction): void {
  emit('showAction', positionCandidateAction)
}

function onDetail(positionCandidate: PositionCandidate): void {
  emit('detail', positionCandidate)
}
</script>
