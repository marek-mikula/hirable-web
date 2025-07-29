<template>
  <div class="space-y-3 lg:space-y-4">

    <div class="flex items-center justify-between space-x-2">
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
            :label="$t('page.positions.detail.candidates.kanban.hideEmpty')"
        />
      </div>

      <div class="flex items-center space-x-2">
        <CommonButton
            variant="secondary"
            symmetrical
            v-tooltip="{ content: $t('modal.position.kanban.addProcessStep.title') }"
            @click="addProcessStepModalOpened = true"
        >
          <SquaresPlusIcon class="size-5"/>
        </CommonButton>
        <CommonButton
            variant="secondary"
            symmetrical
            v-tooltip="{ content: $t('modal.position.kanban.settings.title') }"
            @click="settingsModalOpened = true"
        >
          <Cog6ToothIcon class="size-5"/>
        </CommonButton>
      </div>
    </div>

    <div class="md:overflow-x-auto flex flex-col md:flex-row flex-nowrap gap-2 scrollbar-hidden">
      <PositionCandidateKanbanColumn
          v-for="kanbanStep in visibleSteps"
          :key="kanbanStep.step.id"
          :kanban-step="kanbanStep"
          :selected="selected"
          @select="onSelect"
      />
    </div>

    <PositionCandidateKanbanSettingsModal
      :position="position"
      :kanban-steps="kanbanSteps"
      :open="settingsModalOpened"
      @close="settingsModalOpened = false"
      @update="onSettingsUpdated"
    />

    <PositionCandidateKanbanAddProcessStepModal
        :position="position"
        :open="addProcessStepModalOpened"
        @close="addProcessStepModalOpened = false"
        @add="onProcessStepAdded"
    />

  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import {SquaresPlusIcon,MagnifyingGlassIcon, Cog6ToothIcon} from "@heroicons/vue/24/outline";
import type {KanbanStep, Position} from "~/repositories/resources";
import {searchInString} from "~/utils/helpers";

const props = defineProps<{
  position: Position
  kanbanSteps: KanbanStep[]
}>()

const emit = defineEmits<{
  (e: 'update', kanbanSteps: KanbanStep[]): void,
  (e: 'add'): void,
}>()

const addProcessStepModalOpened = ref<boolean>(false)
const settingsModalOpened = ref<boolean>(false)

const visibleSteps = ref<KanbanStep[]>(props.kanbanSteps)
const search = ref<string|null>(null)
const hideEmpty = ref<boolean>(false)
const selected = ref<number[]>([])

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

function onSettingsUpdated(newKanbanSteps: KanbanStep[]): void {
  settingsModalOpened.value = false
  emit('update', newKanbanSteps)
}

function onProcessStepAdded(): void {
  addProcessStepModalOpened.value = false
  emit('add')
}

function onSelect(id: number): void {
  const index = selected.value.findIndex(item => item === id)

  if (index === -1) {
    selected.value.push(id)

    return
  }

  selected.value.splice(index, 1)
}

watch(search, debouncedFilterSteps)
watch(hideEmpty, filterSteps)
watch(() => props.kanbanSteps, filterSteps)
</script>
