<template>
  <p>
    You searched "{{ query }}".
  </p>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: 'auth',
  async validate(route) {
    return typeof route.query.q === 'string'
  }
})

const route = useRoute()
const { t } = useI18n()
const query = useRouteQuery<string>('q')

useHead({
  title: () => t('page.search.title', { query: route.query.q })
})

watch(() => query.value, () => {
  // query changed
})
</script>