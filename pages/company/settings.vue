<template>
  <div class="p-4 border border-gray-200 rounded-md">
    <p>Settings</p>
  </div>
</template>

<script setup lang="ts">
import {
  UserGroupIcon,
  Cog6ToothIcon,
} from "@heroicons/vue/24/outline";

definePageMeta({
  breadcrumbs: {
    items: [
      {
        label: 'page.company.menu.company',
        icon: UserGroupIcon,
        to: '/company'
      },
      {
        label: 'page.company.menu.settings',
        icon: Cog6ToothIcon,
      },
    ]
  }
})
</script>