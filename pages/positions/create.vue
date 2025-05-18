<template>
  <div class="space-y-2">
    <PositionForm/>
  </div>
</template>

<script setup lang="ts">
import {
  BriefcaseIcon,
  SparklesIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline'

const { t } = useI18n()
const app = useApp()

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

useHead({
  title: () => t('page.positions.create.title')
})

function createFromPrompt(): void {
  // todo
}

function createFromFile(): void {
  // todo
}

onMounted(() => {
  app.setTitle({
    title: 'page.positions.create.title',
    icon: BriefcaseIcon,
    actions: [
      {
        icon: SparklesIcon,
        handler: createFromPrompt,
        color: 'secondary',
        tooltip: 'page.positions.create.fromPrompt'
      },
      {
        icon: DocumentTextIcon,
        handler: createFromFile,
        color: 'secondary',
        tooltip: 'page.positions.create.fromFile'
      }
    ]
  })
})
</script>