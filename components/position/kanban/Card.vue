<template>
  <div :class="['border bg-gray-50 rounded-md flex flex-col divide-y divide-gray-300 shadow-xs', {
    'border-gray-300': positionCandidate.priority === POSITION_CANDIDATE_PRIORITY.NONE,
    'shadow-red-200 border-red-200': positionCandidate.priority === POSITION_CANDIDATE_PRIORITY.LOW,
    'shadow-red-300 border-red-300': positionCandidate.priority === POSITION_CANDIDATE_PRIORITY.HIGH,
    'shadow-red-400 border-red-400': positionCandidate.priority === POSITION_CANDIDATE_PRIORITY.HIGHEST,
  }]" :data-id="positionCandidate.id">

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

      <LazyPositionCandidateEvaluationBadge v-if="positionCandidate.evaluations.length > 0" :evaluations="positionCandidate.evaluations"/>

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

    <!-- evaluation needed from hiring manager -->
    <div v-if="myWaitingEvaluation" class="py-2 px-2.5">
      <CommonWrapperButton class="flex items-center space-x-2 w-full py-2 px-2.5 bg-white rounded-md border border-gray-300 hover:border-gray-400" @click="onEvaluationEvaluate(myWaitingEvaluation)">
        <span class="block bg-red-500 size-2 rounded-full shrink-0 animate-ping"/>
        <span class="text-sm">
          {{ $t('model.positionCandidate.waitingEvaluation') }}
        </span>
        <span class="flex-1 min-w-0 truncate text-xs text-gray-400 text-right">
          {{ $formatter.fromNow(myWaitingEvaluation.createdAt) }}
        </span>
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

        <LazyPositionCandidatePriorityDropdown
          v-if="hasRole(ROLE.HIRING_MANAGER)"
          :position="position"
          :position-candidate="positionCandidate"
          :disabled="disabled"
          @update="onPositionCandidateUpdated"
        />

        <CommonButton
            v-if="policy.positionCandidateEvaluation.index(positionCandidate, position) && positionCandidate.evaluations.length > 0"
            variant="secondary"
            :size="1"
            :icon="StarIcon"
            :label="evaluationsLabel"
            :disabled="disabled"
            v-tooltip="{ content: $t('tooltip.position.candidate.evaluations') }"
            @click="onShowEvaluations"
        />

        <CommonButton
            v-if="policy.positionCandidateShare.store(positionCandidate, position) && positionCandidate.sharesCount > 0"
            variant="secondary"
            :size="1"
            :icon="ShareIcon"
            :label="positionCandidate.sharesCount"
            :disabled="disabled"
            v-tooltip="{ content: $t('tooltip.position.candidate.share') }"
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
            @evaluate="onEvaluate"
        />

      </div>

    </div>

    <Teleport to="#teleports">

      <LazyPositionCandidateDetailModal
          v-if="policy.positionCandidate.show(positionCandidate, position)"
          ref="positionCandidateDetailModal"
          :position="position"
          @update="onPositionCandidateUpdated"
          @update-candidate="onPositionCandidateUpdated"
      />

      <PositionCandidateActionUpdateModal
        ref="positionCandidateActionUpdateModal"
        :position="position"
        :position-candidate="positionCandidate"
        @update="onPositionCandidateUpdated"
      />

      <LazyPositionCandidateShareModal
          v-if="policy.positionCandidateShare.store(positionCandidate, position)"
          ref="positionCandidateShareModal"
          @update="onPositionCandidateUpdated"
      />

      <LazyPositionCandidateRequestEvaluationModal
          v-if="policy.positionCandidateEvaluation.request(positionCandidate, position)"
          ref="positionCandidateRequestEvaluationModal"
          @request="onPositionCandidateUpdated"
      />

      <LazyPositionCandidateEvaluateModal
          v-if="policy.positionCandidateEvaluation.store(positionCandidate, position)"
          :position="position"
          ref="positionCandidateEvaluateModal"
          @evaluate="onPositionCandidateUpdated"
      />

      <LazyPositionCandidateEvaluationsModal
          v-if="policy.positionCandidateEvaluation.index(positionCandidate, position)"
          :position="position"
          :position-candidate="positionCandidate"
          ref="positionCandidateEvaluationsModal"
          @evaluate="onPositionCandidateUpdated"
          @delete="onPositionCandidateUpdated"
      />

    </Teleport>

  </div>
</template>

<script lang="ts" setup>
import type {
  PositionCandidate,
  PositionCandidateAction,
  PositionCandidateEvaluation,
  PositionCandidateEvaluationShow,
  PositionShow
} from "~/repositories/resources";
import type {PositionCandidateDetailModalExpose} from "~/types/components/position/candidate/detailModal.types";
import type {KanbanEvent} from "~/types/components/position/kanban/table.types";
import type {PositionCandidateActionUpdateModalExpose} from "~/types/components/position/candidate/action/showModal.types";
import type {PositionCandidateShareModalExpose} from "~/types/components/position/candidate/shareModal.types";
import type {PositionCandidateEvaluateModalExpose} from "~/types/components/position/candidate/evaluateModal.types";
import type {PositionCandidateEvaluationsModalExpose} from "~/types/components/position/candidate/evaluationsModal.types";
import {ArrowsPointingOutIcon, ShareIcon, StarIcon} from "@heroicons/vue/24/outline";
import {ACTION_TYPE, EVALUATION_STATE, POSITION_CANDIDATE_PRIORITY, ROLE} from "~/types/enums";
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

const {user, hasRole} = useAuth<true>()
const policy = usePolicy()

const positionCandidateActionUpdateModal = useTemplateRef<PositionCandidateActionUpdateModalExpose>('positionCandidateActionUpdateModal')
const positionCandidateDetailModal = useTemplateRef<PositionCandidateDetailModalExpose>('positionCandidateDetailModal')
const positionCandidateShareModal = useTemplateRef<PositionCandidateShareModalExpose>('positionCandidateShareModal')
const positionCandidateRequestEvaluationModal = useTemplateRef<PositionCandidateShareModalExpose>('positionCandidateRequestEvaluationModal')
const positionCandidateEvaluateModal = useTemplateRef<PositionCandidateEvaluateModalExpose>('positionCandidateEvaluateModal')
const positionCandidateEvaluationsModal = useTemplateRef<PositionCandidateEvaluationsModalExpose>('positionCandidateEvaluationsModal')

const isSelected = computed<boolean>(() => props.selected.includes(props.positionCandidate.id))

const evaluationsLabel = computed<string>(() => {
  if (props.positionCandidate.evaluations.length === 0) {
    return ''
  }

  const filled = props.positionCandidate.evaluations.filter(item => item.state === EVALUATION_STATE.FILLED)

  return `${filled.length}/${props.positionCandidate.evaluations.length}`
})

const showActionDropdown = computed<boolean>(() => {
  return policy.positionCandidateAction.store(props.positionCandidate, props.position) ||
      policy.positionCandidateShare.store(props.positionCandidate, props.position) ||
      policy.positionCandidateEvaluation.request(props.positionCandidate, props.position) ||
      policy.positionCandidateEvaluation.store(props.positionCandidate, props.position)
})

const myWaitingEvaluation = computed<PositionCandidateEvaluation|null>(() => {
  return props.positionCandidate.evaluations.find(item => item.state === EVALUATION_STATE.WAITING && item.userId === user.value.id) ?? null
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

function onEvaluationEvaluate(positionCandidateEvaluation: PositionCandidateEvaluationShow): void {
  positionCandidateEvaluateModal.value!.open(props.positionCandidate, positionCandidateEvaluation)
}

function onEvaluate(): void {
  positionCandidateEvaluateModal.value!.open(props.positionCandidate)
}

function onShowEvaluations(): void {
  positionCandidateEvaluationsModal.value!.open()
}

function onDetail(): void {
  positionCandidateDetailModal.value!.open(props.positionCandidate)
}

function onUpdatePositionCandidateAction(positionCandidateAction: PositionCandidateAction): void {
  positionCandidateActionUpdateModal.value!.open(positionCandidateAction.id)
}

function onPositionCandidateUpdated(): void {
  emit('event', {event: 'positionCandidateUpdated', id: props.positionCandidate.id})
}

function onSelect(value: boolean): void {
  emit('event', {
    event: 'select',
    value,
    positionCandidateId: props.positionCandidate.id
  })
}
</script>
