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

      <LazyPositionCandidateScorePopover v-if="positionCandidate.isScoreCalculated" :position-candidate="positionCandidate"/>

      <!-- drag handle button -->
      <CommonButton
        v-if="policy.positionCandidate.update(positionCandidate, position)"
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
        <span class="truncate text-xs text-gray-400" v-tooltip="{ content: $t('model.common.updatedAt') + ': ' + $formatter.datetime(positionCandidate.updatedAt) }">
          {{ $formatter.fromNow(positionCandidate.updatedAt) }}
        </span>
      </div>

      <div class="flex items-center space-x-2 shrink-0">

        <CommonButton
            v-if="positionCandidate.evaluationsCount > 0"
            variant="secondary"
            :size="1"
            :icon="HandThumbUpIcon"
            :label="`${positionCandidate.filledEvaluationsCount}/${positionCandidate.evaluationsCount}`"
            v-tooltip="{ content: $t('tooltip.position.candidate.evaluations') }"
        />

        <CommonButton
            v-if="policy.positionCandidateShare.store(positionCandidate, position) && positionCandidate.sharesCount > 0"
            variant="secondary"
            :size="1"
            :icon="ShareIcon"
            :label="String(positionCandidate.sharesCount)"
            v-tooltip="{ content: $t('tooltip.position.candidate.shared') }"
            @click="onShare"
        />

        <LazyPositionCandidateActionDropdown
            v-if="showActionDropdown"
            :position="position"
            :position-candidate="positionCandidate"
            :disabled="disabled"
            @create-action="onCreateAction"
            @share="onShare"
            @request-evaluation="onRequestEvaluation"
        />

      </div>

    </div>

    <Teleport to="#teleports">

      <LazyPositionCandidateDetailModal
          v-if="policy.positionCandidate.show(positionCandidate, position)"
          ref="positionCandidateDetailModal"
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

      <LazyPositionCandidateShareModal
          v-if="policy.positionCandidateShare.store(positionCandidate, position)"
          ref="positionCandidateShareModal"
          @update="onPositionCandidateShareUpdated"
      />

      <LazyPositionCandidateRequestEvaluationModal
          v-if="true"
          ref="positionCandidateRequestEvaluationModal"
      />

    </Teleport>

  </div>
</template>

<script lang="ts" setup>
import type {
  CandidateShow,
  PositionCandidate,
  PositionCandidateAction,
  PositionCandidateShare,
  PositionShow
} from "~/repositories/resources";
import type {PositionCandidateDetailModalExpose} from "~/types/components/position/candidate/detailModal.types";
import type {KanbanEvent} from "~/types/components/position/kanban/table.types";
import type {PositionCandidateActionUpdateModalExpose} from "~/types/components/position/candidate/action/showModal.types";
import type {PositionCandidateShareModalExpose} from "~/types/components/position/candidate/shareModal.types";
import {ShareIcon, ArrowsPointingOutIcon, HandThumbUpIcon} from "@heroicons/vue/24/outline";
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

const positionCandidateActionUpdateModal = useTemplateRef<PositionCandidateActionUpdateModalExpose>('positionCandidateActionUpdateModal')
const positionCandidateDetailModal = useTemplateRef<PositionCandidateDetailModalExpose>('positionCandidateDetailModal')
const positionCandidateShareModal = useTemplateRef<PositionCandidateShareModalExpose>('positionCandidateShareModal')
const positionCandidateRequestEvaluationModal = useTemplateRef<PositionCandidateShareModalExpose>('positionCandidateRequestEvaluationModal')

const isSelected = computed<boolean>(() => props.selected.includes(props.positionCandidate.id))

const showActionDropdown = computed<boolean>(() => {
  return policy.positionCandidateAction.store(props.positionCandidate, props.position) ||
      policy.positionCandidateShare.store(props.positionCandidate, props.position) ||
      policy.positionCandidateEvaluation.request(props.positionCandidate, props.position) ||
      policy.positionCandidateEvaluation.store(props.positionCandidate, props.position)
})

function onCreateAction(action: ACTION_TYPE): void {
  emit('createAction', action, props.positionCandidate)
}

function onShare(): void {
  positionCandidateShareModal.value!.open(props.positionCandidate)
}

function onRequestEvaluation(): void {
  positionCandidateRequestEvaluationModal.value!.open(props.positionCandidate)
}

function onDetail(): void {
  positionCandidateDetailModal.value!.open(props.positionCandidate.id)
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

function onPositionCandidateShareUpdated(shares: PositionCandidateShare[]): void {
  emit('event', {
    event: 'positionCandidateShareCountUpdated',
    positionCandidateId: props.positionCandidate.id,
    sharesCount: shares.length
  })
}
</script>
