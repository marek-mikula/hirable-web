<template>
  <div class="space-y-2">
    Positions
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'app2',
  middleware: 'auth',
})

useHead({
  title: () => t('page.positions.title')
})
</script>