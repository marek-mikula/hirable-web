<template>
  <div class="space-y-3 lg:space-y-4">

    <!-- todo: filtering, searching in kanban -->
    <div v-if="false" class="flex items-center">
      <FormInput
          type="search"
          name="name"
          class="w-42"
          :icon="MagnifyingGlassIcon"
          :placeholder="$t('common.table.search')"
      />
    </div>

    <div class="overflow-x-auto flex flex-row flex-nowrap gap-3 lg:gap-4 scrollbar-hidden">
      <div v-for="step in steps" :key="step.step.id" class="shrink-0 w-[350px] flex flex-col space-y-2">

        <!-- kanban column header -->
        <div class="flex items-center p-2 bg-gray-50 rounded-md border border-gray-200 space-x-2">
          <FormCheckbox class="shrink-0" v-tooltip="{ content: $t('common.selectAll') }"/>
          <h2 class="flex-1 min-w-0 text-lg font-medium truncate">
            {{ step.step.isCustom ? step.step.step : $t(`model.processStep.steps.${step.step.step}`) }}
          </h2>
          <div class="shrink-0 flex items-center space-x-2">
            <CommonBadge variant="info" :label="$t('common.total', { n: step.candidates.length })"/>
            <CommonButton variant="secondary" :size="2" symmetrical>
              <EllipsisVerticalIcon class="size-4"/>
            </CommonButton>
          </div>
        </div>

        <!-- kanban column body -->
        <div class="flex-col space-y-1">

          <p v-if="step.candidates.length === 0" class="border border-dashed border-gray-200 p-3 lg:p-4 text-sm rounded-md text-gray-500">
            Žádní kandidáti
          </p>

          <template v-else>
            <div v-for="candidate in step.candidates" :key="candidate.id" class="border border-gray-200 bg-white rounded-md flex flex-col p-2 space-y-2">
              <div class="flex items-center space-x-2">
                <FormCheckbox class="shrink-0"/>
                <span class="truncate text-sm font-medium flex-1 min-w-0">
                  {{ candidate.candidate.fullName }}
                </span>
                <CandidateScore class="shrink-0" :total-score="candidate.totalScore" :score="candidate.score"/>
                <CommonButton class="shrink-0" variant="secondary" :size="2" symmetrical>
                  <EllipsisVerticalIcon class="size-4"/>
                </CommonButton>
              </div>
              <div class="flex items-center">
              <span class="text-sm text-gray-500" v-tooltip="{ content: $formatter.datetime(candidate.updatedAt) }">
                {{ $moment(candidate.updatedAt).fromNow() }}
              </span>
              </div>
            </div>
          </template>

        </div>

      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {MagnifyingGlassIcon, EllipsisVerticalIcon} from "@heroicons/vue/24/outline";
import type {PositionProcessStepKanban} from "~/repositories/resources";

const props = defineProps<{
  steps: PositionProcessStepKanban[]
}>()
</script>
