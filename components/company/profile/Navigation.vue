<template>
  <nav>
    <ul role="list" class="flex items-center overflow-x-auto sm:overflow-x-auto scrollbar-hidden space-x-1 sm:space-x-0 sm:space-y-1 sm:block">
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
import {AtSymbolIcon, InformationCircleIcon, UserGroupIcon, UserPlusIcon} from '@heroicons/vue/24/outline'
import {ROLE} from "~/types/enums";

const {hasRole} = useAuth()

const navigation = [
  {
    label: 'page.company.information.title',
    to: '/company',
    icon: InformationCircleIcon,
    route: 'company',
  },
  hasRole(ROLE.ADMIN) ? {
    label: 'page.company.invitations.title',
    to: '/company/invitations',
    icon: UserPlusIcon,
    route: 'company-invitations',
  } : null,
  hasRole(ROLE.ADMIN) ? {
    label: 'page.company.users.title',
    to: '/company/users',
    icon: UserGroupIcon,
    route: 'company-users',
  } : null,
  {
    label: 'page.company.contacts.title',
    to: '/company/contacts',
    icon: AtSymbolIcon,
    route: 'company-contacts',
  },
].filter(item => item !== null)
</script>
