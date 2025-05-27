<template>
  <div class="space-y-2">
    Positions
  </div>
</template>

<script setup lang="ts">
import {BriefcaseIcon} from '@heroicons/vue/24/outline'

const { t } = useI18n()
const app = useApp()

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

useHead({
  title: () => t('page.positions.title')
})

async function createPosition(): Promise<void> {
  await navigateTo('/positions/create')
}

onMounted(() => {
  app.setTitle({
    title: 'page.positions.title',
    icon: BriefcaseIcon,
    actions: [
      {
        label: 'layout.menu.create.position',
        handler: createPosition,
        variant: 'primary',
      }
    ]
  })
})
</script>