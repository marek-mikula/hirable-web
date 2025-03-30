<template>
  <div class="p-4 border border-gray-200 rounded-md">
    <p>Billing</p>
  </div>
</template>

<script setup lang="ts">
import {CreditCardIcon, UserCircleIcon} from "@heroicons/vue/24/outline";

definePageMeta({
  breadcrumbs: {
    items: [
      {
        label: 'page.profile.menu.profile',
        icon: UserCircleIcon,
        to: '/profile'
      },
      {
        label: 'page.profile.menu.billing',
        icon: CreditCardIcon
      }
    ]
  }
})
</script>