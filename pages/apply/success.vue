<template>
  <div class="p-3 lg:p-4">
    <CommonAlert class="mx-auto max-w-screen-sm" :title="$t('page.applySuccess.message')" variant="success" static/>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const {t} = useI18n()

useHead({
  title: () => t('page.applySuccess.title'),
  bodyAttrs: {
    class: 'bg-gray-50'
  }
})
</script>