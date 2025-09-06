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
          @change="onSelect"
      />

      <!-- candidate name -->
      <CommonWrapperButton class="hover:underline text-left truncate text-sm font-semibold flex-1 min-w-0" @click="onDetail">
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
          v-for="action in positionCandidate.actions.slice(undefined, positionCandidateConfig.maxActionsInKanban)"
          :key="action.id"
          class="w-full rounded-md"
          @click="onUpdatePositionCandidateAction(action)"
      >
        <PositionCandidateActionCard :action="action" class="hover:border-gray-400"/>
      </CommonWrapperButton>

      <CommonWrapperButton v-if="(positionCandidate.actions.length - positionCandidateConfig.maxActionsInKanban) > 0" class="w-full text-xs text-gray-400 hover:underline" @click="onDetail">
        {{ $t('common.action.showAll') }} (+{{ positionCandidate.actions.length - positionCandidateConfig.maxActionsInKanban }})
      </CommonWrapperButton>

    </div>

    <!-- last update timestamp, score, actions button -->
    <div class="flex items-center justify-between py-2 px-2.5 space-x-2">

      <div class="flex-1 min-w-0 flex items-center space-x-2">
        <span v-if="positionCandidate.idleDays >= positionCandidateConfig.maxIdleDays" class="inline-block bg-red-500 size-2 rounded-full shrink-0 animate-ping"/>
        <span class="truncate text-sm text-gray-400" v-tooltip="{ content: $t('model.common.updatedAt') + ': ' + $formatter.datetime(positionCandidate.updatedAt) }">
          {{ $formatter.fromNow(positionCandidate.updatedAt) }}
        </span>
      </div>

      <div class="flex items-center space-x-2 shrink-0">

        <LazyPositionCandidateScorePopover
            v-if="positionCandidate.isScoreCalculated"
            :position-candidate="positionCandidate"
        />

        <LazyPositionCandidateActionDropdown
            v-if="policy.positionCandidateAction.store(positionCandidate, position)"
            :position-candidate="positionCandidate"
            :disabled="disabled"
            @create-action="onCreateAction"
        />

      </div>

    </div>

    <Teleport to="#teleports">

      <LazyPositionCandidateDetailModal
          v-if="policy.positionCandidate.show(positionCandidate, position)"
          ref="detailModal"
          :position="position"
          @update="onPositionCandidateUpdated"
          @update-candidate="onCandidateUpdated"
      />

      <PositionCandidateActionUpdateModal
        ref="positionCandidateActionUpdateModal"
        :position="position"
        :position-candidate="positionCandidate"
        @update="onPositionCandidateActionUpdated"
      />

    </Teleport>

  </div>
</template>

<script lang="ts" setup>
import type {CandidateShow, PositionCandidate, PositionCandidateAction, PositionShow} from "~/repositories/resources";
import type {DetailModalExpose} from "~/types/components/position/candidate/detailModal.types";
import type {KanbanEvent} from "~/types/components/position/kanban/table.types";
import type {PositionCandidateActionUpdateModalExpose} from "~/types/components/position/candidate/action/showModal.types";
import {ArrowsPointingOutIcon} from "@heroicons/vue/24/outline";
import {ACTION_TYPE} from "~/types/enums";
import {positionCandidateConfig} from "~/config/positionCandidate";

const props = defineProps<{
  position: PositionShow
  positionCandidate: PositionCandidate
  selected: number[]
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'createAction', action: ACTION_TYPE, positionCandidate: PositionCandidate): void,
  (e: 'event', event: KanbanEvent): void,
}>()

const policy = usePolicy()

const positionCandidateActionUpdateModal = ref<PositionCandidateActionUpdateModalExpose>()
const detailModal = ref<DetailModalExpose>()

const isSelected = computed<boolean>(() => props.selected.includes(props.positionCandidate.id))

function onCreateAction(action: ACTION_TYPE): void {
  emit('createAction', action, props.positionCandidate)
}

function onDetail(): void {
  detailModal.value!.open(props.positionCandidate.id)
}

function onUpdatePositionCandidateAction(positionCandidateAction: PositionCandidateAction): void {
  positionCandidateActionUpdateModal.value!.open(positionCandidateAction.id)
}

function onCandidateUpdated(candidate: CandidateShow): void {
  emit('event', {
    event: 'candidateUpdated',
    candidate,
  })
}

function onPositionCandidateUpdated(positionCandidate: PositionCandidate): void {
  emit('event', {
    event: 'positionCandidateUpdated',
    positionCandidate,
  })
}

function onPositionCandidateActionUpdated(positionCandidateAction: PositionCandidateAction): void {
  emit('event', {
    event: 'positionCandidateActionUpdated',
    positionCandidateAction,
  })
}

function onSelect(value: boolean): void {
  emit('event', {
    event: 'select',
    value,
    positionCandidateId: props.positionCandidate.id
  })
}
</script>
