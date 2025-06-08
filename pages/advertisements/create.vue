<template>
  <div>
    <div>
      Create advertisement
    </div>

    <ClientOnly>
      <teleport to="#page-title">
        <LayoutPageTitle
            :title="$t('page.advertisements.create.title')"
            :icon="MegaphoneIcon"
        />
      </teleport>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import {MegaphoneIcon} from "@heroicons/vue/24/outline";

const { t } = useI18n()

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

useHead({
  title: () => t('page.advertisements.create.title')
})
</script>