<template>
  <div class="flex flex-col gap-y-3 overflow-y-auto bg-white">
    <div class="flex h-14 shrink-0 items-center px-3 border-b border-gray-200">
      <span class="text-2xl">🪑</span>
    </div>
    <nav class="flex flex-1 flex-col px-3 pb-3">
      <ul role="list" class="flex flex-1 flex-col gap-y-3">
        <li class="space-y-2">
          <div class="text-xs/6 text-gray-400">
            Hlavní menu
          </div>
          <ul role="list" class="space-y-1">
            <li v-for="item in navigation" :key="item.name">
              <NuxtLink :to="item.to" :class="[isRoute(item.route, {startsWith: item.startsWith}) ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:text-primary-600', 'group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium']">
                <component :is="item.icon" :class="[isRoute(item.route, {startsWith: item.startsWith}) ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-600', 'h-6 w-6 shrink-0']"/>
                {{ $t(item.name) }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline'

const navigation = [
  {
    name: 'page.dashboard.title',
    to: '/',
    icon: HomeIcon,
    route: 'index',
    startsWith: false
  },
  {
    name: 'page.user.index.title',
    to: '/users',
    icon: UsersIcon,
    route: 'users',
    startsWith: true
  },
]
</script>
