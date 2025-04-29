<template>
  <div class="space-y-3 lg:space-y-4">
    settings
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('page.company.settings.title'),
})
</script>