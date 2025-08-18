<template>
  <div>
    <div class="grid grid-cols-6 gap-3">
      <div class="col-span-2">
        <FormTags v-model="tags" name="tags[]" label="Klíčová slova"/>
      </div>
    </div>

    <div class="mt-2">
      {{ tags }}
    </div>
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

const tags = ref<string[]>([])
</script>