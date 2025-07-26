<template>
  <div class="border border-gray-200 bg-white rounded-md flex flex-col p-2 space-y-2">
    <div class="flex items-center space-x-2">
      <FormCheckbox :name="`select-candidate-${positionCandidate.candidate.id}`" class="shrink-0"/>
      <span class="truncate text-sm font-medium flex-1 min-w-0">
        {{ positionCandidate.candidate.fullName }}
      </span>
      <CandidateScore class="shrink-0" :total-score="positionCandidate.totalScore" :score="positionCandidate.score"/>
      <CommonButton class="shrink-0" variant="secondary" :size="2" symmetrical>
        <EllipsisVerticalIcon class="size-4"/>
      </CommonButton>
    </div>
    <div class="flex items-center">
      <span class="text-sm text-gray-500" v-tooltip="{ content: $formatter.datetime(positionCandidate.updatedAt) }">
        {{ $moment(positionCandidate.updatedAt).fromNow() }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {EllipsisVerticalIcon} from "@heroicons/vue/24/outline";
import type {PositionCandidate} from "~/repositories/resources";

const props = defineProps<{
  positionCandidate: PositionCandidate
}>()
</script>
