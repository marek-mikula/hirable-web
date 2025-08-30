<template>
  <div :class="['border border-gray-200 bg-white rounded-md flex flex-col p-2 space-y-2', disabled ? '' : 'cursor-move hover:shadow transition']" :data-id="positionCandidate.id">

    <div class="flex items-center space-x-2">

      <!-- checkbox for selection -->
      <FormCheckbox
          :name="`select-candidate-${positionCandidate.id}`"
          :model-value="isSelected"
          :disabled="disabled"
          class="shrink-0"
          v-tooltip="{ content: $t('common.action.select') }"
          @change="emit('select', positionCandidate.id)"
      />

      <!-- candidate name -->
      <span class="truncate text-sm font-medium flex-1 min-w-0">
        {{ positionCandidate.candidate.fullName }}
      </span>

      <!-- position candidate score -->
      <CandidateScore v-if="positionCandidate.isScoreCalculated" class="shrink-0" :position-candidate="positionCandidate"/>

      <!-- action dropdown -->
      <PositionKanbanActionDropdown :disabled="disabled" @action="onAction"/>

    </div>

    <div class="flex items-center justify-between">
      <span class="text-sm text-gray-400" v-tooltip="{ content: $t('model.common.updatedAt') + ': ' + $formatter.datetime(positionCandidate.updatedAt) }">
        {{ $moment(positionCandidate.updatedAt).fromNow() }}
      </span>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type {Candidate, PositionCandidate} from "~/repositories/resources";
import {ACTION_TYPE} from "~/types/enums";

const props = defineProps<{
  positionCandidate: PositionCandidate
  selected: number[]
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'select', id: number): void,
  (e: 'action', action: ACTION_TYPE, candidate: Candidate): void,
}>()

const isSelected = computed<boolean>(() => props.selected.includes(props.positionCandidate.id))

function onAction(action: ACTION_TYPE): void {
  emit('action', action, props.positionCandidate.candidate)
}
</script>
