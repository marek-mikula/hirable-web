<template>
  <div class="space-y-2">
    Create advertisement
  </div>
</template>

<script setup lang="ts">
import {MegaphoneIcon} from "@heroicons/vue/24/outline";

const { t } = useI18n()
const app = useApp()

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

useHead({
  title: () => t('page.advertisements.create.title')
})

onMounted(() => {
  app.setTitle({
    title: 'page.advertisements.create.title',
    icon: MegaphoneIcon
  })
})
</script>