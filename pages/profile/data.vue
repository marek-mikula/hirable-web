<template>
  <div class="p-4 border border-gray-200 rounded-md">
    <p>Data</p>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('page.profile.data.title'),
})
</script>