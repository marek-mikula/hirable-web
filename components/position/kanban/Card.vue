<template>
  <div class="border border-gray-300 bg-gray-50 rounded-md flex flex-col divide-y divide-gray-300 shadow-xs" :data-id="positionCandidate.id">

    <!-- card header -->
    <div class="flex items-center py-2 px-2.5 space-x-2">

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
      <button type="button" class="hover:underline text-left truncate text-sm font-medium flex-1 min-w-0">
        {{ positionCandidate.candidate.fullName }}
      </button>

      <!-- drag handle button -->
      <CommonButton
        :icon="ArrowsPointingOutIcon"
        :size="1"
        :disabled="disabled"
        variant="secondary"
        class="cursor-move candidate-drag-handle"
        v-tooltip="{ content: $t('common.action.move') }"
      />

    </div>

    <!-- list of active actions -->
    <div v-if="positionCandidate.actions.length > 0" class="py-2 px-2.5 space-y-2">
      <CommonWrapperButton
          v-for="action in (showAllActions ? positionCandidate.actions : positionCandidate.actions.slice(undefined,maxActions))"
          :key="action.id"
          class="text-left w-full py-2 px-2.5 bg-white rounded-md border border-gray-300 space-y-2 hover:border-gray-400"
      >
        <div class="flex items-center space-x-2">
        <span class="truncate text-sm font-medium flex-1 min-w-0">
          {{ getActionName(action) }}
        </span>
          <PositionCandidateActionState :state="action.state"/>
        </div>
        <p v-if="getActionDetails(action)" class="text-sm text-gray-400" v-text="getActionDetails(action)"/>
      </CommonWrapperButton>
      <CommonWrapperButton v-if="positionCandidate.actions.length > maxActions" class="w-full text-xs text-gray-400 hover:underline" @click="showAllActions = !showAllActions">
        {{ showAllActions ? $t('common.action.hide') : $t('common.action.showAll') + ` (+${positionCandidate.actions.length - maxActions})` }}
      </CommonWrapperButton>
    </div>

    <!-- last update timestamp, score, actions button -->
    <div class="flex items-center justify-between py-2 px-2.5 space-x-2">
      <div class="flex-1 min-w-0 flex items-center space-x-2">
        <span v-if="positionCandidate.idleDays >= 2" class="inline-block bg-red-500 size-2 rounded-full shrink-0 animate-ping"/>
        <span class="truncate text-sm text-gray-400" v-tooltip="{ content: $t('model.common.updatedAt') + ': ' + $formatter.datetime(positionCandidate.updatedAt) }">
          {{ $moment(positionCandidate.updatedAt).fromNow() }}
        </span>
      </div>

      <div class="flex items-center space-x-2 shrink-0">
        <CandidateScore v-if="positionCandidate.isScoreCalculated" :position-candidate="positionCandidate"/>
        <PositionKanbanActionDropdown :disabled="disabled" @action="onAction"/>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ArrowsPointingOutIcon } from "@heroicons/vue/24/outline";
import type {PositionCandidate, PositionCandidateAction} from "~/repositories/resources";
import {ACTION_TYPE} from "~/types/enums";
import {getActionName} from "~/functions/action";
import Button from "~/components/common/Button.vue";

const props = defineProps<{
  positionCandidate: PositionCandidate
  selected: number[]
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'select', id: number): void,
  (e: 'action', action: ACTION_TYPE, positionCandidate: PositionCandidate): void,
}>()

const formatter = useFormatter()

const isSelected = computed<boolean>(() => props.selected.includes(props.positionCandidate.id))

const maxActions = 2
const showAllActions = ref<boolean>(false)

function onAction(action: ACTION_TYPE): void {
  emit('action', action, props.positionCandidate)
}

function getActionDetails(action: PositionCandidateAction): string {
  return [
      action.date ? formatter.date(action.date) : null,
      action.timeStart && action.timeEnd ? formatter.time(action.timeStart) + ' - ' + formatter.time(action.timeEnd) : null,
      action.interviewForm?.label ?? null,
      action.interviewType?.label ?? null,
      action.rejectionReason?.label ?? null,
      action.refusalReason?.label ?? null,
      action.testType?.label ?? null,
  ].filter(item => !!item).join(' • ')
}
</script>
