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
      <CommonWrapperButton class="hover:underline text-left truncate text-sm font-medium flex-1 min-w-0" @click="onDetail">
        {{ positionCandidate.candidate.fullName }}
      </CommonWrapperButton>

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

    <!-- latest action card if any -->
    <div v-if="positionCandidate.actions.length > 0" class="py-2 px-2.5 space-y-2">

      <CommonWrapperButton
          v-for="action in activeActions"
          :key="action.id"
          class="w-full rounded-md"
          @click="onShowAction(lastItem(action))"
      >
        <PositionCandidateActionCard :action="action" class="hover:border-gray-400"/>
      </CommonWrapperButton>

      <CommonWrapperButton v-if="positionCandidate.actions.length > activeActions.length" class="w-full text-xs text-gray-400 hover:underline" @click="onDetail">
        {{ $t('common.action.showAll') }} (+{{ activeActions.length - positionCandidate.actions.length }})
      </CommonWrapperButton>

    </div>

    <!-- last update timestamp, score, actions button -->
    <div class="flex items-center justify-between py-2 px-2.5 space-x-2">

      <div class="flex-1 min-w-0 flex items-center space-x-2">
        <span v-if="positionCandidate.idleDays >= 2" class="inline-block bg-red-500 size-2 rounded-full shrink-0 animate-ping"/>
        <span class="truncate text-sm text-gray-400" v-tooltip="{ content: $t('model.common.updatedAt') + ': ' + $formatter.datetime(positionCandidate.updatedAt) }">
          {{ $formatter.fromNow(positionCandidate.updatedAt) }}
        </span>
      </div>

      <div class="flex items-center space-x-2 shrink-0">
        <PositionCandidateScorePopover v-if="positionCandidate.isScoreCalculated" :position-candidate="positionCandidate"/>
        <PositionKanbanActionDropdown :disabled="disabled" @create-action="onCreateAction"/>
      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
import type {PositionCandidate, PositionCandidateAction} from "~/repositories/resources";
import {ArrowsPointingOutIcon} from "@heroicons/vue/24/outline";
import {ACTION_STATE, ACTION_TYPE} from "~/types/enums";

const props = defineProps<{
  positionCandidate: PositionCandidate
  selected: number[]
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'select', id: number): void,
  (e: 'createAction', action: ACTION_TYPE, positionCandidate: PositionCandidate): void,
  (e: 'showAction', positionCandidateAction: PositionCandidateAction): void,
  (e: 'detail', positionCandidate: PositionCandidate): void,
}>()

const formatter = useFormatter()

const isSelected = computed<boolean>(() => props.selected.includes(props.positionCandidate.id))
const activeActions = computed<PositionCandidateAction[]>(() => {
  return props.positionCandidate.actions.filter(item => item.state === ACTION_STATE.ACTIVE)
})

function onCreateAction(action: ACTION_TYPE): void {
  emit('createAction', action, props.positionCandidate)
}

function onShowAction(positionCandidateAction: PositionCandidateAction): void {
  emit('showAction', positionCandidateAction)
}

function onDetail(): void {
  emit('detail', props.positionCandidate)
}
</script>
