<template>
  <div class="shrink-0 md:w-[320px] flex flex-col border border-gray-200 rounded-md overflow-hidden">

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
          {{ kanbanStep.step.isCustom ? kanbanStep.step.step : $t(`model.processStep.steps.${kanbanStep.step.step}`) }}
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
    <div class="flex-col space-y-2 p-2">

      <p v-if="kanbanStep.positionCandidates.length === 0" class="border border-dashed border-gray-200 p-2 text-sm rounded-md text-gray-500">
        {{ $t('page.positions.detail.candidates.kanban.empty') }}
      </p>

      <template v-else>
        <PositionCandidateKanbanCard
            v-for="positionCandidate in kanbanStep.positionCandidates"
            :key="positionCandidate.id"
            :position-candidate="positionCandidate"
            :selected="selected"
            @select="onSelect"
        />
      </template>

    </div>

  </div>
</template>

<script lang="ts" setup>
import {EllipsisVerticalIcon} from "@heroicons/vue/24/outline";
import type {KanbanStep} from "~/repositories/resources";

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
</script>
