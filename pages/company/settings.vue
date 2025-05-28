<template>
  <div>
    settings
  </div>
</template>

<script setup lang="ts">
import type {Company} from "~/repositories/resources";

defineProps<{
  company: Company
}>()

const { t } = useI18n()

useHead({
  title: () => t('page.company.settings.title'),
})
</script>