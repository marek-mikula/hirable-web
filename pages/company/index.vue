<template>
  <div class="space-y-3 sm:space-y-4 lg:space-y-5">
    <CompanyProfileDetailForm/>
  </div>
</template>

<script setup lang="ts">
import {
  UserGroupIcon
} from "@heroicons/vue/24/outline";

definePageMeta({
  breadcrumbs: {
    items: [
      {
        label: 'page.company.menu.company',
        icon: UserGroupIcon,
      },
    ]
  }
})
</script>