<template>
  <div class="shrink-0 w-[350px] flex flex-col space-y-2">

    <!-- kanban column header -->
    <div class="flex items-center p-2 bg-gray-50 rounded-md border border-gray-200 space-x-2">

      <!-- checkbox to select all candidates -->
      <FormCheckbox :name="`select-all-${kanbanStep.step.id}`" v-tooltip="{ content: $t('common.selectAll') }"/>

      <!-- kanban column title -->
      <h2 class="flex-1 min-w-0 text-base font-medium flex items-center space-x-1">
        <span class="truncate">
          {{ kanbanStep.step.isCustom ? kanbanStep.step.step : $t(`model.processStep.steps.${kanbanStep.step.step}`) }}
        </span>
        <span v-if="kanbanStep.positionCandidates.length > 0" class="shrink-0">
          ({{ kanbanStep.positionCandidates.length }})
        </span>
      </h2>

      <!-- kanban column settings button -->
      <CommonButton class="shrink-0" variant="secondary" :size="2" symmetrical>
        <EllipsisVerticalIcon class="size-4"/>
      </CommonButton>

    </div>

    <!-- kanban column body -->
    <div class="flex-col space-y-1">

      <p v-if="kanbanStep.positionCandidates.length === 0" class="border border-dashed border-gray-200 p-3 lg:p-4 text-sm rounded-md text-gray-500">
        {{ $t('page.positions.detail.candidates.kanban.empty') }}
      </p>

      <template v-else>
        <PositionCandidateKanbanCard
            v-for="positionCandidate in kanbanStep.positionCandidates"
            :key="positionCandidate.id"
            :position-candidate="positionCandidate"
        />
      </template>

    </div>

  </div>
</template>

<script lang="ts" setup>
import {EllipsisVerticalIcon} from "@heroicons/vue/24/outline";
import type {KanbanStep} from "~/repositories/resources";

const props = defineProps<{
  kanbanStep: KanbanStep
}>()
</script>
