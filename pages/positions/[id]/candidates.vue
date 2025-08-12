<template>
  <PositionKanbanTable :position="position"/>
</template>

<script lang="ts" setup>
import type {Position} from "~/repositories/resources";

const props = defineProps<{
  position: Position
}>()

const {t} = useI18n()
const api = useApi()

useHead({
  title: () => t('page.position.detail.tabs.candidates')
})
</script>
