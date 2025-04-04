<template>
  <CommonDropdown>

    <template #button>
      <button
          type="button"
          class="flex items-center px-2 lg:px-3 py-2 text-gray-700 ring-1 ring-inset ring-gray-200 hover:text-primary-600 hover:bg-gray-50 rounded-md"
      >

        <!-- user icon which is shown on smaller screens -->
        <UserIcon class="lg:hidden size-5"/>

        <!-- user name which is shown on larger screens -->
        <span class="hidden lg:flex lg:items-center space-x-1">
          <span class="text-sm font-semibold">
            {{ _.truncate(user.fullName, {length: 20}) }}
          </span>
        </span>

      </button>
    </template>

    <template #list="{ close }">
      <div
          class="absolute right-0 z-[125] mt-2 w-40 divide-y divide-gray-100 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          tabindex="-1"
      >
        <div class="p-1 space-y-1" role="none">
          <NuxtLink
              :to="'/profile'"
              :class="[isRoute('profile') ? 'bg-gray-50 text-primary-600' : 'text-gray-700 hover:text-primary-600', 'rounded-md flex gap-x-1 text-gray-700 block p-2 text-sm']"
              role="menuitem"
              tabindex="-1"
              @click="close"
          >
            <UserCircleIcon class="size-5"/>
            {{ $t('page.profile.title') }}
          </NuxtLink>
          <NuxtLink
              :to="'/company'"
              :class="[isRoute('company') ? 'bg-gray-50 text-primary-600' : 'text-gray-700 hover:text-primary-600', 'rounded-md flex gap-x-1 text-gray-700 block p-2 text-sm']"
              role="menuitem"
              tabindex="-1"
              @click="close"
          >
            <UserGroupIcon class="size-5"/>
            {{ $t('page.company.title') }}
          </NuxtLink>
        </div>

        <div class="p-1" role="none">
          <CommonLoader
              v-if="isLoading"
              class="rounded-md text-gray-700 block w-full p-2 text-left text-sm hover:text-primary-600 hover:bg-gray-50"
          />
          <form v-else method="POST" action="#" role="none" @submit.prevent="logout">
            <button
                type="submit"
                class="rounded-md flex gap-x-1 text-gray-700 block w-full p-2 text-left text-sm hover:text-primary-600"
                role="menuitem"
                tabindex="-1"
            >
              <ArrowLeftStartOnRectangleIcon class="size-5"/>
              {{ $t('layout.menu.logout') }}
            </button>
          </form>
        </div>
      </div>
    </template>

  </CommonDropdown>
</template>

<script setup lang="ts">
import _ from 'lodash'
import {
  UserIcon,
  UserGroupIcon,
  ArrowLeftStartOnRectangleIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'
import {HandledRequestError} from "~/exceptions/HandledRequestError";

const {user, logoutUser} = useAuth<true>()
const api = useApi()
const toaster = useToaster()

const isLoading = ref<boolean>(false)

async function logout(): Promise<void> {
  isLoading.value = true

  try {
    await api.auth.logout()

    await navigateTo({
      path: '/login',
      query: {
        afterLogout: 1
      }
    })

    await toaster.success({
      title: 'toast.logout.success'
    })

    // logout user after the redirect to
    // login, because otherwise some things
    // like watchers and computed refs
    // can behave weird, because we unset
    // the user from the state
    //
    // also some watchers can still trigger
    // some requests with useAsyncData, so
    // we wait 200 ms
    window.setTimeout(logoutUser, 200)
  } catch (e) {
    if (e instanceof HandledRequestError) {
      return
    }

    await toaster.serverError()
  } finally {
    isLoading.value = false
  }
}
</script>