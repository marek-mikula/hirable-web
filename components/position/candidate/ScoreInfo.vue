<template>
  <div class="space-y-3">
    <div v-for="(item, index) in positionCandidate.score" :key="index" class="space-y-2">
      <FormLabel :label="$t(`model.positionCandidate.scoreCategories.${item.category}`)"/>
      <CommonScale :max="100" :value="item.score"/>
      <p v-if="!excludeComment" class="border border-gray-200 rounded-md p-2 text-sm bg-gray-50">
        <span class="font-medium">
          {{ $t('component.candidate.score.comment') }}:
        </span>
        {{ ' ' }}
        <span class="text-gray-400">
          {{ item.comment }}
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {BadgeVariant} from "~/types/components/common/badge.types";
import type {PositionCandidate} from "~/repositories/resources";

const props = defineProps<{
  positionCandidate: PositionCandidate
  excludeComment?: boolean
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
