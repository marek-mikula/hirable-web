<template>
  <div class="space-y-2">
    Dashboard
  </div>
</template>

<script setup lang="ts">
import {HomeIcon} from '@heroicons/vue/24/outline'

const { t } = useI18n()
const app = useApp()

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

useHead({
  title: () => t('page.dashboard.title')
})

onMounted(() => {
  app.setTitle({
    title: 'page.dashboard.title',
    icon: HomeIcon,
  })
})
</script>