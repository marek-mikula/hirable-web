<template>
  <CommonPopover>
    <template #default>
      <CommonBadge :label="`${positionCandidate.totalScore} / 100`" :variant="variant"/>
    </template>

    <template #popover>
      <div class="w-screen max-w-md flex-auto overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200">
        <div class="divide-y divide-gray-200">
          <div class="p-3 text-sm text-gray-900 font-semibold flex items-center space-x-2 bg-gray-50">
            <span class="flex-1 min-w-0">
              {{ $t('model.positionCandidate.score') }}
            </span>
            <SparklesIcon class="shrink-0 size-5"/>
          </div>
          <div class="p-3 space-y-3">
            <div v-for="(item, index) in positionCandidate.score" :key="index" class="space-y-2">
              <FormLabel :label="$t(`model.positionCandidate.scoreCategories.${item.category}`)"/>
              <CommonScale :max="100" :value="item.score"/>
            </div>
          </div>
          <div class="p-3 text-sm text-gray-500 flex">
            <InformationCircleIcon class="shrink-0 size-5 mr-1"/>
            {{ $t('component.candidate.score.info') }}
          </div>
        </div>
      </div>
    </template>
  </CommonPopover>
</template>

<script lang="ts" setup>
import type {BadgeVariant} from "~/types/components/common/badge.types";
import type {PositionCandidate} from "~/repositories/resources";
import {InformationCircleIcon, SparklesIcon} from "@heroicons/vue/24/outline";

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
