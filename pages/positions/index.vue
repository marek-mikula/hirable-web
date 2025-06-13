<template>
  <div>
    <PositionGrid/>

    <ClientOnly>
      <teleport to="#page-title">
        <LayoutPageTitle
            :title="$t('page.positions.title')"
            :icon="BriefcaseIcon"
            :actions="[
              {
                label: $t('layout.menu.create.position'),
                handler: createPosition,
                variant: 'primary',
              }
          ]"
        />
      </teleport>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import {BriefcaseIcon} from '@heroicons/vue/24/outline'

const { t } = useI18n()

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
</script>