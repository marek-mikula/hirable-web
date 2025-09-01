<template>
    <CommonBadge :label="`${positionCandidate.totalScore} / 100`" :variant="variant"/>
</template>

<script lang="ts" setup>
import type {BadgeVariant} from "~/types/components/common/badge.types";
import type {PositionCandidate} from "~/repositories/resources";

const props = defineProps<{
  positionCandidate: PositionCandidate
}>()

const variant = computed<BadgeVariant>(() => {
  if (props.positionCandidate.totalScore! <= 25) { // <0;25>
    return 'danger'
  } else if (props.positionCandidate.totalScore! <= 50) { // <26;50>
    return 'warning'
  } else if (props.positionCandidate.totalScore! <= 75) { // <51;75>
    return 'info'
  } else { // <76;100>
    return 'success'
  }
})
</script>
