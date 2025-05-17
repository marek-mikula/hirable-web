<template>
  <div class="space-y-2">
    Recruitments
  </div>
</template>

<script setup lang="ts">
import {MegaphoneIcon} from '@heroicons/vue/24/outline'

const { t } = useI18n()
const app = useApp()

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

useHead({
  title: () => t('page.recruitments.title')
})

onMounted(() => {
  app.setTitle({
    title: 'page.recruitments.title',
    icon: MegaphoneIcon
  })
})
</script>