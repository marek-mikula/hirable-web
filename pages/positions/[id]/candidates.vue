<template>
  <div>
    Candidates
  </div>
</template>

<script lang="ts" setup>
import type {Position} from "~/repositories/resources";

const props = defineProps<{
  position: Position
}>()

const {t} = useI18n()

useHead({
  title: () => t('page.positions.detail.tabs.candidates'),
})
</script>
