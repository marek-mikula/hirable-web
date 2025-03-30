<template>
  <div class="space-y-3 sm:space-y-4 lg:space-y-5">
    <UserProfileNotificationsForm/>
  </div>
</template>

<script setup lang="ts">
import {
  BellIcon,
  UserCircleIcon
} from "@heroicons/vue/24/outline";

definePageMeta({
  breadcrumbs: {
    items: [
      {
        label: 'page.profile.menu.profile',
        icon: UserCircleIcon,
        to: '/profile'
      },
      {
        label: 'page.profile.menu.notifications',
        icon: BellIcon
      }
    ]
  }
})
</script>