<template>
  <CommonBadge :icon="StarIcon" :variant="variant" :label="String(score.toFixed(1))" v-tooltip="{ content: $t('tooltip.position.candidate.evaluationByUsers') }"/>
</template>

<script lang="ts" setup>
import { StarIcon } from "@heroicons/vue/24/outline";
import type {BadgeVariant} from "~/types/components/common/badge.types";
import {EVALUATION_STATE} from "~/types/enums";
import type {PositionCandidateEvaluation} from "~/repositories/resources";

const props = defineProps<{
  evaluations: PositionCandidateEvaluation[]
}>()

const score = computed<number>(() => {
  const filled = props.evaluations.filter(item => item.state === EVALUATION_STATE.FILLED)

  if (filled.length === 0) {
    return 0
  }

  const total = filled.reduce((total, item) => total + (item.stars ?? 0), 0)

  return total / filled.length
})

const variant = computed<BadgeVariant>(() => {
  if (score.value === 0.0) {
    return 'secondary'
  } else if (score.value! <= 1.25) { // <0,01;1,25>
    return 'danger'
  } else if (score.value! <= 2.5) { // <1,26;2,50>
    return 'warning'
  } else if (score.value! <= 3.75) { // <2,51;3,75>
    return 'info'
  } else { // <3,76;5>
    return 'success'
  }
})
</script>
