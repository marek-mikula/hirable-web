<template>
  <CommonBadge :label="`${totalScore} / 100`" :variant="variant"/>
</template>

<script lang="ts" setup>
import type {BadgeVariant} from "~/types/components/common/badge.types";

const props = defineProps<{
  totalScore: number
  score: object
}>()

const variant = computed<BadgeVariant>(() => {
  if (props.totalScore <= 25) { // <0;25>
    return 'danger'
  } else if (props.totalScore <= 50) { // <26;50>
    return 'warning'
  } else if (props.totalScore <= 75) { // <51;75>
    return 'info'
  } else { // <76;100>
    return 'success'
  }
})
</script>
