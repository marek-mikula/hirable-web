<template>
  <div>
    <PositionCandidateKanban :steps="steps"/>
  </div>
</template>

<script lang="ts" setup>
import type {Position} from "~/repositories/resources";
import type {PositionProcessStepKanban} from "~/repositories/resources";

const props = defineProps<{
  position: Position
}>()

const {t} = useI18n()
const api = useApi()

const {
  data: steps,
  error
} = await useAsyncData<PositionProcessStepKanban[]>(
    () => `position-kanban-${props.position.id}`,
    () => api.position.kanban(props.position.id).then(response => response._data!.data.steps)
)

if (error.value) {
  throw createError({...error.value, fatal: true})
}

useHead({
  title: () => t('page.positions.detail.tabs.candidates')
})
</script>
