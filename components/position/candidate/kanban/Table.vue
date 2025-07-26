<template>
  <div class="space-y-3 lg:space-y-4">

    <!-- todo: filtering, searching in kanban, settings -->
    <div v-if="true" class="flex items-center justify-between space-x-2">
      <div class="flex-1 min-w-0 flex items-center space-x-2">
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

      <div class="flex items-center space-x-2">
        <CommonButton variant="secondary" symmetrical v-tooltip="{ content: $t('tooltip.table.settings') }">
          <Cog6ToothIcon class="size-5"/>
        </CommonButton>
      </div>
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
import _ from 'lodash'
import {MagnifyingGlassIcon, Cog6ToothIcon} from "@heroicons/vue/24/outline";
import type {KanbanStep} from "~/repositories/resources";
import {searchInString} from "~/utils/helpers";

const props = defineProps<{
  kanbanSteps: KanbanStep[]
}>()

const visibleSteps = ref<KanbanStep[]>(props.kanbanSteps)
const search = ref<string|null>(null)
const hideEmpty = ref<boolean>(false)

function filterSteps(): void {
  let steps = deepCopy<KanbanStep[]>(props.kanbanSteps)

  if (search.value) {
    steps = steps.map(step => {
      const filteredCandidates = step.positionCandidates.filter(positionCandidate => {
        return searchInString(positionCandidate.candidate.fullName, search.value!)
      })

      return {...step, positionCandidates: filteredCandidates}
    })
  }

  if (hideEmpty.value) {
    steps = steps.filter(step => step.positionCandidates.length > 0)
  }

  visibleSteps.value = steps
}

const debouncedFilterSteps = _.debounce(filterSteps, 500)

watch(search, debouncedFilterSteps)
watch(hideEmpty, filterSteps)
</script>
