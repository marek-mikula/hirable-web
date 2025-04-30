<template>
  <div class="space-y-2">
    Create recruitment
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'app2',
  middleware: 'auth',
})

useHead({
  title: () => t('page.recruitments.create.title')
})
</script>