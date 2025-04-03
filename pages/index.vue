<template>
  <div class="space-y-2">
    Dashboard
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

useHead({
  title: () => t('page.dashboard.title')
})
</script>