<template>
  <CommonPopover tag="span">
    <template #default>
      <PositionCandidateScoreBadge :position-candidate="positionCandidate"/>
    </template>

    <template #popover>
      <div class="max-w-md flex-auto overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200">
        <div class="divide-y divide-gray-200">
          <div class="p-3 text-sm text-gray-900 font-semibold flex items-center space-x-2 bg-gray-100">
            <span class="flex-1 min-w-0">
              {{ $t('model.positionCandidate.score') }}
            </span>
            <SparklesIcon class="shrink-0 size-5"/>
          </div>
          <PositionCandidateScoreInfo :position-candidate="positionCandidate" class="p-3" exclude-comment/>
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
import type {PositionCandidate} from "~/repositories/resources";
import {InformationCircleIcon, SparklesIcon} from "@heroicons/vue/24/outline";

const props = defineProps<{
  positionCandidate: PositionCandidate
}>()
</script>
