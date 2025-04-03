<template>
  <p>
    You searched "{{ query }}".
  </p>
</template>

<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const query = useRouteQuery<string>('q')

definePageMeta({
  layout: 'app',
  middleware: 'auth',
  async validate(route) {
    return typeof route.query.q === 'string'
  }
})

useHead({
  title: () => t('page.search.title', { query: route.query.q })
})

watch(() => query.value, () => {
  // query changed
})
</script>