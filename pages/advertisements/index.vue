<template>
  <div>
    Advertisements
  </div>

  <ClientOnly>
    <teleport to="#page-title">
      <LayoutPageTitle
          :title="$t('page.advertisements.title')"
          :icon="MegaphoneIcon"
          :actions="[
              {
                label: $t('layout.menu.create.advertisement'),
                handler: createAdvertisement,
                variant: 'primary',
              }
          ]"
      />
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import {MegaphoneIcon} from '@heroicons/vue/24/outline'

const { t } = useI18n()

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

useHead({
  title: () => t('page.advertisements.title')
})

async function createAdvertisement(): Promise<void> {
  await navigateTo('/advertisements/create')
}
</script>