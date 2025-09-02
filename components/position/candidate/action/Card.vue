<template>
  <div class="text-left w-full py-2 px-2.5 bg-white rounded-md border border-gray-300 space-y-2">
    <div class="flex items-center space-x-2">
        <span class="truncate text-sm font-semibold flex-1 min-w-0">
          {{ getActionName(action) }}
        </span>
      <PositionCandidateActionState :state="action.state"/>
    </div>
    <p v-if="details.length > 0" class="text-sm">
      {{ details.join(' • ') }}
    </p>
    <p class="text-sm text-gray-400">
      <span v-tooltip="{ content: $t('model.common.updatedAt') + ': ' + $formatter.datetime(action.updatedAt) }">
        {{ $formatter.fromNow(action.updatedAt) }}
      </span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import type {PositionCandidateAction} from "~/repositories/resources";
import {getActionName} from "~/functions/action";
import {ACTION_TYPE} from "~/types/enums";

const props = defineProps<{
  action: PositionCandidateAction
}>()

const {t} = useI18n()
const formatter = useFormatter()

const details = computed<string[]>(() => {
  let details: (string|null)[] = []

  if (props.action.type === ACTION_TYPE.INTERVIEW) {
    details = [
      `${formatter.date(props.action.date!)} ${formatter.time(props.action.timeStart!)} - ${formatter.time(props.action.timeEnd!)}`,
      props.action.place,
      props.action.interviewForm!.label,
      props.action.interviewType!.label,
      props.action.unavailable ? t('model.positionCandidateAction.unavailable') : null,
      props.action.noShow ? t('model.positionCandidateAction.noShow') : null,
    ]
  } else if (props.action.type === ACTION_TYPE.TEST) {
    details = [
      props.action.testType!.label,
      props.action.evaluation ? _.truncate(props.action.evaluation, {length: 30}) : null,
    ]
  } else if (props.action.type === ACTION_TYPE.TASK) {
    details = [
      props.action.date && props.action.timeEnd ? `${formatter.date(props.action.date)} ${formatter.time(props.action.timeEnd)}` : null,
      props.action.evaluation ? _.truncate(props.action.evaluation, {length: 30}) : null,
    ]
  } else if (props.action.type === ACTION_TYPE.ASSESSMENT_CENTER) {
    details = [
      `${formatter.date(props.action.date!)} ${formatter.time(props.action.timeStart!)} - ${formatter.time(props.action.timeEnd!)}`,
      props.action.place,
      props.action.noShow ? t('model.positionCandidateAction.noShow') : null,
      props.action.evaluation ? _.truncate(props.action.evaluation, {length: 30}) : null,
    ]
  } else if (props.action.type === ACTION_TYPE.OFFER) {
    details = [
       `${props.action.offerSalary} ${props.action.offerSalaryCurrency!.label} / ${props.action.offerSalaryFrequency!.label}`,
        props.action.offerWorkload!.label,
        props.action.offerEmploymentRelationship!.label,
        formatter.date(props.action.offerStartDate!),
    ]
  } else if (props.action.type === ACTION_TYPE.REJECTION) {
    details = [
        props.action.rejectedByCandidate ? t('model.positionCandidateAction.rejectedByCandidate') : null,
        props.action.refusalReason?.label ?? null,
        props.action.rejectionReason?.label ?? null,
    ]
  }

  return details.filter((item): item is string => item !== null)
})
</script>
