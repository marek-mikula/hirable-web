<template>
  <div>
    <CandidateGrid/>

    <ClientOnly>
      <teleport to="#page-title">
        <LayoutPageTitle
            :title="$t('page.candidates.title')"
            :icon="UsersIcon"
        />
      </teleport>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import {UsersIcon} from '@heroicons/vue/24/outline'

const { t } = useI18n()

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

useHead({
  title: () => t('page.candidates.title')
})
</script>