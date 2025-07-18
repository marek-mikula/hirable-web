<template>
  <div class="sm:p-3 lg:p-4">
    <div class="bg-white sm:rounded-md sm:border sm:border-gray-200 mx-auto max-w-screen-sm overflow-hidden divide-y divide-gray-200 shadow-sm p-3 lg:p-4">
      {{ $t('page.applySuccess.message') }}
    </div>
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