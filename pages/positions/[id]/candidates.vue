<template>
  <div>
    <PositionCandidateKanbanTable :kanban-steps="kanbanSteps"/>
  </div>
</template>

<script lang="ts" setup>
import type {Position} from "~/repositories/resources";
import type {KanbanStep} from "~/repositories/resources";

const props = defineProps<{
  position: Position
}>()

const {t} = useI18n()
const api = useApi()

const {
  data: kanbanSteps,
  error
} = await useAsyncData<KanbanStep[]>(
    () => `position-kanban-${props.position.id}`,
    () => api.position.kanban(props.position.id).then(response => response._data!.data.kanbanSteps)
)

if (error.value) {
  throw createError({...error.value, fatal: true})
}

useHead({
  title: () => t('page.positions.detail.tabs.candidates')
})
</script>
