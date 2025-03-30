<template>
  <p>
    You searched "{{ query }}".
  </p>
</template>

<script setup lang="ts">
import type {RouteLocationNormalized} from "vue-router";
import {MagnifyingGlassIcon} from "@heroicons/vue/24/outline";

definePageMeta({
  layout: 'app2',
  middleware: 'auth',
  async validate(route: RouteLocationNormalized) {
    return typeof route.query.q === 'string'
  },
  breadcrumbs: (route: RouteLocationNormalized) => ({
    items: [
      {
        label: {key: 'page.search.title', values: {'query': route.query.q}},
        icon: MagnifyingGlassIcon,
      },
    ]
  })
})

const query = useRouteQuery<string>('q')

watch(() => query.value, () => {
  // query changed
})
</script>