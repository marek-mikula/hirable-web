<template>
  <div class="space-y-2">
    Dashboard
  </div>
</template>

<script setup lang="ts">
import {HomeIcon} from "@heroicons/vue/24/outline";

definePageMeta({
  layout: 'app2',
  middleware: 'auth',
  breadcrumbs: {
    items: [
      {
        label: 'page.dashboard.title',
        icon: HomeIcon,
      },
    ]
  }
})
</script>