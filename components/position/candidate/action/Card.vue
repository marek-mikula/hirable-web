<template>
  <div class="text-left w-full py-2 px-2.5 bg-white rounded-md border border-gray-300 space-y-2">
    <div class="flex items-center space-x-2">
      <FormCheckbox v-if="allowSelect" :name="`action-select-${action.id}`" @click.stop @change="onSelect"/>
      <span class="truncate text-sm font-medium flex-1 min-w-0">
        {{ getActionName(action) }}
      </span>
      <PositionCandidateActionState :state="action.state" class="shrink-0"/>
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
import type {PositionCandidateAction} from "~/repositories/resources";
import {getActionName} from "~/functions/action";
import {ACTION_TYPE} from "~/types/enums";

const props = defineProps<{
  action: PositionCandidateAction
  allowSelect?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', value: boolean): void,
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
      props.action.interviewResult ? t(`model.positionCandidateAction.interviewResults.${props.action.interviewResult}`) : null,
    ]
  } else if (props.action.type === ACTION_TYPE.TEST) {
    details = [
      props.action.testType!.label,
    ]
  } else if (props.action.type === ACTION_TYPE.TASK) {
    details = [
      props.action.date && props.action.timeEnd ? `${formatter.date(props.action.date)} ${formatter.time(props.action.timeEnd)}` : null,
    ]
  } else if (props.action.type === ACTION_TYPE.ASSESSMENT_CENTER) {
    details = [
      `${formatter.date(props.action.date!)} ${formatter.time(props.action.timeStart!)} - ${formatter.time(props.action.timeEnd!)}`,
      props.action.place,
      props.action.assessmentCenterResult ? t(`model.positionCandidateAction.assessmentCenterResults.${props.action.assessmentCenterResult}`) : null,
    ]
  } else if (props.action.type === ACTION_TYPE.OFFER) {
    details = [
       `${props.action.offerSalary} ${props.action.offerSalaryCurrency!.label} / ${props.action.offerSalaryFrequency!.label}`,
        props.action.offerWorkload!.label,
        props.action.offerEmploymentRelationship!.label,
        formatter.date(props.action.offerStartDate!),
        t(`model.positionCandidateAction.offerStates.${props.action.offerState!}`)
    ]
  } else if (props.action.type === ACTION_TYPE.REJECTION) {
    details = [
        props.action.rejectedByCandidate ? t('model.positionCandidateAction.rejectedByCandidate') : null,
        props.action.refusalReason?.label ?? null,
        props.action.rejectionReason?.label ?? null,
    ]
  } else if (props.action.type === ACTION_TYPE.START_OF_WORK) {
    details = [
      formatter.date(props.action.realStartDate!),
    ]
  }

  return details.filter((item): item is string => item !== null)
})

function onSelect(value: boolean): void {
  emit('select', value)
}
</script>
