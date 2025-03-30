<template>
  <div class="sticky top-0 z-40 flex h-14 shrink-0 items-center border-b border-gray-200 bg-white shadow-sm gap-x-2 px-3 sm:px-4 lg:px-5">

    <!-- button to open sidebar -->
    <button type="button" class="p-2 text-gray-700 ring-1 ring-inset ring-gray-200 hover:text-primary-600 hover:bg-gray-50 rounded-md lg:hidden" @click.prevent="emit('sidebarShown')">
      <Bars4Icon class="size-5"/>
    </button>

    <div class="flex flex-1 gap-x-2 self-stretch">

      <!-- search form -->
      <form id="search-form" class="relative flex flex-1 items-center space-x-2" action="#" method="GET" @submit.prevent="search">

        <div class="w-full flex rounded-md shadow-sm">
          <input
              id="search"
              v-model="query"
              type="search"
              name="search"
              class="block w-full rounded-md sm:rounded-none sm:rounded-l-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-200 text-sm"
              :placeholder="$t('layout.navbar.search.placeholder')"
              required
          >
          <button
              type="submit"
              class="relative -ml-px hidden sm:inline-flex items-center rounded-r-md p-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 hover:text-primary-600"
          >
            <MagnifyingGlassIcon class="size-5"/>
          </button>
        </div>

      </form>

      <!-- notifications, user info -->
      <div class="flex items-center gap-x-2">

        <button
            type="button"
            class="relative p-2 text-gray-700 ring-1 ring-inset ring-gray-200 hover:text-primary-600 hover:bg-gray-50 rounded-md"
            @click.prevent="emit('notificationsShown')"
        >
          <BellIcon class="size-5"/>
        </button>

        <LayoutLanguageDropdown/>

        <LayoutProfileDropdown/>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {
  Bars4Icon,
  BellIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline'

const emit = defineEmits<{
  (e: 'sidebarShown' | 'notificationsShown'): void,
}>()

const query = ref<string | null>(null)

async function search(): Promise<void> {
  await navigateTo({
    path: '/search',
    query: {
      q: query.value
    }
  })

  query.value = null
}
</script>
