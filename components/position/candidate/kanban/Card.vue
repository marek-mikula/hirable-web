<template>
  <div class="border border-gray-200 bg-white rounded-md flex flex-col p-2 space-y-2 cursor-move hover:shadow transition">

    <div class="flex items-center space-x-2">

      <!-- checkbox for selection -->
      <FormCheckbox
          :name="`select-candidate-${positionCandidate.id}`"
          :model-value="selected.includes(positionCandidate.id)"
          class="shrink-0"
          v-tooltip="{ content: $t('common.action.select') }"
          @change="emit('select', positionCandidate.id)"
      />

      <!-- candidate name -->
      <span class="truncate text-sm font-medium flex-1 min-w-0">
        {{ positionCandidate.candidate.fullName }}
      </span>

      <!-- position candidate score -->
      <CandidateScore v-if="positionCandidate.isScoreCalculated" class="shrink-0" :position-candidate="positionCandidate"/>

    </div>

<!--    <div v-if="false" class="flex items-center space-x-2">-->
<!--      <CandidateLink v-if="positionCandidate.candidate.linkedin" type="linkedin" :link="positionCandidate.candidate.linkedin" class="size-5"/>-->
<!--      <CandidateLink v-if="positionCandidate.candidate.instagram" type="instagram" :link="positionCandidate.candidate.instagram" class="size-5"/>-->
<!--      <CandidateLink v-if="positionCandidate.candidate.github" type="github" :link="positionCandidate.candidate.github" class="size-5"/>-->
<!--      <CandidateLink v-if="positionCandidate.candidate.portfolio" type="portfolio" :link="positionCandidate.candidate.portfolio" class="size-5"/>-->
<!--    </div>-->

    <div class="flex items-center justify-between">
      <span class="text-sm text-gray-500" v-tooltip="{ content: $t('model.common.updatedAt') + ': ' + $formatter.datetime(positionCandidate.updatedAt) }">
        {{ $moment(positionCandidate.updatedAt).fromNow() }}
      </span>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type {PositionCandidate} from "~/repositories/resources";

const props = defineProps<{
  positionCandidate: PositionCandidate
  selected: number[]
}>()

const emit = defineEmits<{
  (e: 'select', id: number): void,
}>()
</script>
