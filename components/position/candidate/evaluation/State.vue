<template>
  <CommonBadge :variant="variant" :label="$t(`model.positionCandidateEvaluation.states.${state}`)"/>
</template>

<script lang="ts" setup>
import type {BadgeVariant} from "~/types/components/common/badge.types";
import {EVALUATION_STATE} from "~/types/enums";

const props = defineProps<{
  state: EVALUATION_STATE
}>()

const variant = computed<BadgeVariant>(() => {
  const map: { [key in EVALUATION_STATE]: BadgeVariant } = {
    [EVALUATION_STATE.WAITING]: 'info',
    [EVALUATION_STATE.FILLED]: 'success',
  }

  return map[props.state]
})
</script>
