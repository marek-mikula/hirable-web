<template>
  <div>
    Dashboard
  </div>

  <ClientOnly>
    <teleport to="#page-title">
      <LayoutPageTitle
          :title="$t('page.dashboard.title')"
          :icon="HomeIcon"
      />
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import {HomeIcon} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

const { t } = useI18n()

useHead({
  title: () => t('page.dashboard.title')
})
</script>