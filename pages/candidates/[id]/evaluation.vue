<template>
  <div>
    Evaluation
  </div>
</template>

<script lang="ts" setup>
import type {Candidate} from "~/repositories/resources";

const props = defineProps<{
  candidate: Candidate
}>()

const {t} = useI18n()

useHead({
  title: () => t('page.candidate.detail.tabs.evaluation')
})
</script>
