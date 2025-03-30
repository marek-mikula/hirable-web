<template>
  <div class="space-y-3 sm:space-y-4 lg:space-y-5">
    <UserProfilePersonalForm/>
    <UserProfileLanguageForm/>
    <UserProfileTimezoneForm/>
  </div>
</template>

<script setup lang="ts">
import {
  UserCircleIcon
} from "@heroicons/vue/24/outline";

definePageMeta({
  breadcrumbs: {
    items: [
      {
        label: 'page.profile.menu.profile',
        icon: UserCircleIcon
      }
    ]
  }
})
</script>