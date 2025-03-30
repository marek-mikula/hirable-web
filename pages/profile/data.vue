<template>
  <div class="p-4 border border-gray-200 rounded-md">
    <p>Data</p>
  </div>
</template>

<script setup lang="ts">
import {DocumentTextIcon, UserCircleIcon} from "@heroicons/vue/24/outline";

definePageMeta({
  breadcrumbs: {
    items: [
      {
        label: 'page.profile.menu.profile',
        icon: UserCircleIcon,
        to: '/profile'
      },
      {
        label: 'page.profile.menu.data',
        icon: DocumentTextIcon
      }
    ]
  }
})
</script>