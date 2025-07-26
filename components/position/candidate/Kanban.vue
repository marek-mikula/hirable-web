<template>
  <div class="space-y-3 lg:space-y-4">

    <!-- todo: filtering, searching in kanban -->
    <div v-if="false" class="flex items-center space-x-4">
      <FormInput
          v-model="search"
          type="search"
          name="name"
          class="w-42"
          :icon="MagnifyingGlassIcon"
          :placeholder="$t('common.table.search')"
      />
      <FormCheckbox
          v-model="hideEmpty"
          name="hideEmpty"
          label="Skrýt prázdné sloupce"
      />
    </div>

    <div class="overflow-x-auto flex flex-row flex-nowrap gap-3 lg:gap-4 scrollbar-hidden">
      <div v-for="kanbanStep in visibleSteps" :key="kanbanStep.step.id" class="shrink-0 w-[350px] flex flex-col space-y-2">

        <!-- kanban column header -->
        <div class="flex items-center p-2 bg-gray-50 rounded-md border border-gray-200 space-x-2">
          <FormCheckbox :name="`select-all-${kanbanStep.step.id}`" v-tooltip="{ content: $t('common.selectAll') }"/>
          <h2 class="flex-1 min-w-0 text-lg font-medium truncate">
            {{ kanbanStep.step.isCustom ? kanbanStep.step.step : $t(`model.processStep.steps.${kanbanStep.step.step}`) }}
          </h2>
          <div class="shrink-0 flex items-center space-x-2">
            <CommonBadge variant="info" :label="$t('common.total', { n: kanbanStep.positionCandidates.length })"/>
            <CommonButton variant="secondary" :size="2" symmetrical>
              <EllipsisVerticalIcon class="size-4"/>
            </CommonButton>
          </div>
        </div>

        <!-- kanban column body -->
        <div class="flex-col space-y-1">

          <p v-if="kanbanStep.positionCandidates.length === 0" class="border border-dashed border-gray-200 p-3 lg:p-4 text-sm rounded-md text-gray-500">
            Žádní kandidáti
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
    </div>

  </div>
</template>

<script lang="ts" setup>
import {MagnifyingGlassIcon, EllipsisVerticalIcon} from "@heroicons/vue/24/outline";
import type {KanbanStep} from "~/repositories/resources";
import {searchInString} from "~/utils/helpers";

const props = defineProps<{
  kanbanSteps: KanbanStep[]
}>()

const search = ref<string|null>(null)
const hideEmpty = ref<boolean>(false)

const visibleSteps = computed<KanbanStep[]>(() => {
  let filteredSteps = props.kanbanSteps

  if (search.value) {
    filteredSteps = filteredSteps.map(step => {
      const filteredCandidates = step.positionCandidates.filter(positionCandidate => {
        return searchInString(positionCandidate.candidate.fullName, search.value!)
      })

      return {...step, candidates: filteredCandidates}
    })
  }

  if (hideEmpty.value) {
    filteredSteps = filteredSteps.filter(step => step.positionCandidates.length > 0)
  }

  return filteredSteps
})
</script>
