<template>
  <div class="space-y-3 lg:space-y-4">

    <div class="overflow-hidden bg-white shadow-xs rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 bg-gray-100">
          <h2 class="font-semibold text-gray-900">
            {{ $t('model.positionCandidate.actions') }}
          </h2>
        </div>
        <div class="p-3 space-y-3">
          <PositionCandidateActionCard v-for="action in (positionCandidate.actions ?? [])" :key="action.id" :action="action"/>
        </div>
      </dl>
    </div>

    <div class="overflow-hidden bg-white shadow-xs rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2 bg-gray-100">
          <h2 class="flex-1 min-w-0 truncate font-semibold text-gray-900">
            {{ $t('model.positionCandidate.score') }}
          </h2>
          <SparklesIcon class="shrink-0 size-5" v-tooltip="{ content: $t('common.ai.use') }"/>
        </div>
        <div class="p-3">
          <PositionCandidateScoreInfo :position-candidate="positionCandidate"/>
        </div>
      </dl>
    </div>

  </div>
</template>

<script setup lang="ts">
import { SparklesIcon } from "@heroicons/vue/24/outline";
import type {PositionCandidate} from "~/repositories/resources";

const props = defineProps<{
  positionCandidate: PositionCandidate
}>()
</script>