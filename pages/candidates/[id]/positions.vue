<template>
  <div>
    Positions
  </div>
</template>

<script lang="ts" setup>
import type {CandidateShow} from "~/repositories/resources";

const props = defineProps<{
  candidate: CandidateShow
}>()

const {t} = useI18n()

useHead({
  title: () => t('page.candidate.detail.tabs.positions')
})
</script>
