<template>
  <div>
    <PositionKanbanTable
        :position="position"
        :kanban-steps="kanbanSteps"
        @remove="onRemoveProcessStep"
        @update="onUpdateProcessStep"
        @refresh="refresh"
    />
  </div>
</template>

<script lang="ts" setup>
import type {Position, PositionProcessStep} from "~/repositories/resources";
import type {KanbanStep} from "~/repositories/resources";

const props = defineProps<{
  position: Position
}>()

const {t} = useI18n()
const api = useApi()

const {
  data: kanbanSteps,
  error,
  refresh,
} = await useAsyncData<KanbanStep[]>(
    () => `position-kanban-${props.position.id}`,
    () => api.position.kanban(props.position.id).then(response => response._data!.data.kanbanSteps)
)

if (error.value) {
  throw createError({...error.value, fatal: true})
}

useHead({
  title: () => t('page.position.detail.tabs.candidates')
})

function onRemoveProcessStep(kanbanStep: KanbanStep): void {
  const index = kanbanSteps.value!.findIndex(item => item.step.id === kanbanStep.step.id)

  if (index === -1) {
    return
  }

  kanbanSteps.value!.splice(index, 1)
}

function onUpdateProcessStep(positionProcessStep: PositionProcessStep): void {
  const index = kanbanSteps.value!.findIndex(item => item.step.id === positionProcessStep.id)

  if (index === -1) {
    return
  }

  kanbanSteps.value!.splice(index, 1, {...kanbanSteps.value![index], step: positionProcessStep})
}
</script>
