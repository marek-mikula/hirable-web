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
      {{ $formatter.datetime(action.createdAt) }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import type {PositionCandidateAction} from "~/repositories/resources";
import {getActionName} from "~/functions/action";

const props = defineProps<{
  action: PositionCandidateAction
}>()

const {t} = useI18n()
const formatter = useFormatter()

const details = computed<string[]>(() => {
  return [
    props.action.date ? formatter.date(props.action.date) : null,
    props.action.timeStart && props.action.timeEnd ? `${formatter.time(props.action.timeStart)} - ${formatter.time(props.action.timeEnd)}` : null,
    props.action.place ?? null,
    props.action.interviewForm?.label ?? null,
    props.action.interviewType?.label ?? null,
    props.action.rejectedByCandidate ? t('model.positionCandidateAction.rejectedByCandidate') : null,
    props.action.rejectionReason?.label ?? null,
    props.action.refusalReason?.label ?? null,
    props.action.testType?.label ?? null,
    props.action.result ? _.truncate(props.action.result, {length: 20}) : null,
  ].filter((part): part is string => part !== null)
})
</script>
