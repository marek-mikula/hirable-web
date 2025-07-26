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
      <PositionCandidateKanbanColumn
          v-for="kanbanStep in visibleSteps"
          :key="kanbanStep.step.id"
          :kanban-step="kanbanStep"
      />
    </div>

  </div>
</template>

<script lang="ts" setup>
import {MagnifyingGlassIcon} from "@heroicons/vue/24/outline";
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
