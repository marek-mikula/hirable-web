<template>
  <div class="shrink-0 md:w-[350px] flex flex-col border border-gray-200 rounded-md overflow-hidden shadow-xs">

    <!-- kanban column header -->
    <div class="flex items-center p-2 bg-gray-50 border-b border-gray-200 space-x-2">

      <!-- checkbox to select all candidates -->
      <FormCheckbox
          v-if="kanbanStep.positionCandidates.length > 0"
          :name="`select-all-${kanbanStep.step.id}`"
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
      <CommonButton
          class="shrink-0"
          variant="secondary"
          :size="2"
          symmetrical
          v-tooltip="{ content: $t('modal.position.kanban.columnSettings.title') }"
      >
        <EllipsisVerticalIcon class="size-4"/>
      </CommonButton>

    </div>

    <!-- kanban column body -->
    <div class="p-2 relative flex flex-col flex-1 min-h-0 space-y-2">

      <Draggable
          class="flex-1 min-h-0 flex-col space-y-2"
          group="positionCandidates"
          :list="kanbanStep.positionCandidates"
          :empty-insert-hreshold="50"
          :sort="false"
          :move="checkMove"
          item-key="id"
      >
        <template #header v-if="kanbanStep.positionCandidates.length === 0">
          <p class="border border-dashed border-gray-200 p-2 text-sm rounded-md text-gray-500">
            {{ $t('page.positions.detail.candidates.kanban.empty') }}
          </p>
        </template>
        <template #item="{ element: positionCandidate }">
          <PositionCandidateKanbanCard
              :position-candidate="positionCandidate"
              :selected="selected"
              @select="onSelect"
          />
        </template>
      </Draggable>

    </div>

  </div>
</template>

<script lang="ts" setup>
import Draggable from "vuedraggable";
import {EllipsisVerticalIcon} from "@heroicons/vue/24/outline";
import type {KanbanStep} from "~/repositories/resources";
import {getProcessStepLabel} from "../../../../functions/processStep";

const props = defineProps<{
  kanbanStep: KanbanStep
  selected: number[]
}>()

const emit = defineEmits<{
  (e: 'select', id: number): void,
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

function checkMove(): boolean {
  // todo logic if any

  return true
}
</script>
