<template>
  <nav>
    <ul role="list" class="flex items-center overflow-auto scrollbar-hidden space-x-1 sm:space-x-0 sm:space-y-1 sm:block">
      <li v-for="item in navigation" :key="item.route" class="whitespace-nowrap sm:whitespace-normal">
        <NuxtLink :to="item.to" :class="[isRoute(item.route) ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:text-primary-600', 'group flex items-center gap-x-2 rounded-md p-2 text-sm font-medium focus-visible:outline-0 focus-visible:ring focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-600']">
          <component :is="item.icon" :class="[isRoute(item.route) ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-600', 'size-5 shrink-0']"/>
          {{ $t(item.label) }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import {
  BellIcon,
  KeyIcon,
  DocumentTextIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  Cog6ToothIcon,
} from '@heroicons/vue/24/outline'

const navigation = [
  {
    label: 'page.profile.settings.title',
    to: '/profile',
    icon: Cog6ToothIcon,
    route: 'profile'
  },
  {
    label: 'page.profile.notifications.title',
    to: '/profile/notifications',
    icon: BellIcon,
    route: 'profile-notifications'
  },
  {
    label: 'page.profile.privacy.title',
    to: '/profile/privacy',
    icon: KeyIcon,
    route: 'profile-privacy'
  },
  {
    label: 'page.profile.billing.title',
    to: '/profile/billing',
    icon: CreditCardIcon,
    route: 'profile-billing'
  },
  {
    label: 'page.profile.data.title',
    to: '/profile/data',
    icon: DocumentTextIcon,
    route: 'profile-data'
  },
  {
    label: 'page.profile.devices.title',
    to: '/profile/devices',
    icon: DevicePhoneMobileIcon,
    route: 'profile-devices'
  },
]
</script>
