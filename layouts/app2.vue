<template>
  <div class="h-screen">

    <div class="flex flex-nowrap h-full">

      <!-- left-side menu -->
      <div class="w-72 h-full flex flex-col bg-white border-r border-gray-200 shadow-sm">

        <!-- left-side menu header -->
        <div class="shrink-0 h-14 border-b border-gray-200 flex items-center justify-between p-3 lg:p-4">

          <div class="rounded-md flex items-center space-x-2">
            <div class="size-8 rounded-md border border-gray-200 flex items-center justify-center">
              <span>🪑</span>
            </div>
            <span>{{ appName }}</span>
          </div>

          <CommonButton
              color="secondary"
              :size="1"
              symmetrical
              v-tooltip="{ content: $t('hint.layout.menu.collapse') }"
          >
            <ArrowLeftIcon class="size-4"/>
          </CommonButton>

        </div>

        <div class="flex-1 min-h-0 overflow-y-auto p-3 lg:p-4">
          <ul role="list" class="flex flex-1 flex-col gap-y-3">
            <li class="space-y-2">
              <div class="text-xs/6 text-gray-500 font-medium">
                {{ $t('layout.menu.main') }}
              </div>
              <ul role="list" class="space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink :to="item.to" :class="[isRoute(item.route, {startsWith: item.startsWith}) ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50', 'group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium']">
                    <component :is="item.icon" :class="[isRoute(item.route, {startsWith: item.startsWith}) ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-600', 'h-6 w-6 shrink-0']"/>
                    {{ $t(item.name) }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
            <li class="space-y-2">
              <div class="text-xs/6 text-gray-500 font-medium">
                {{ $t('layout.menu.settings') }}
              </div>
              <ul role="list" class="space-y-1">
                <li v-for="item in userNavigation" :key="item.name">
                  <NuxtLink :to="item.to" :class="[isRoute(item.route, {startsWith: item.startsWith}) ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50', 'group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium']">
                    <component :is="item.icon" :class="[isRoute(item.route, {startsWith: item.startsWith}) ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-600', 'h-6 w-6 shrink-0']"/>
                    {{ $t(item.name) }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- left-side menu footer -->
        <div class="shrink-0 h-14 border-t border-gray-200 flex items-center justify-center text-gray-500 text-sm">
          &copy; {{ getYear() }} {{ appName }}
        </div>

      </div>

      <!-- right-side content -->
      <div class="flex-1 min-w-0 h-full overflow-y-auto flex flex-col">

        <!-- application navbar - search, language, notifications -->
        <div class="z-40 shrink-0 h-14 p-3 lg:p-4 sticky top-0 bg-white border-b border-gray-200 flex items-center gap-x-2 shadow-sm">

          <!-- button to open sidebar -->
          <button type="button" class="p-2 text-gray-700 ring-1 ring-inset ring-gray-200 hover:text-primary-600 hover:bg-gray-50 rounded-md lg:hidden" @click="menuShown = true">
            <Bars4Icon class="size-5"/>
          </button>

          <div class="flex flex-1 gap-x-2 self-stretch">

            <!-- search form -->
            <form id="search-form" class="relative flex flex-1 items-center space-x-2" action="#" method="GET" @submit.prevent="search">

              <div class="w-full flex rounded-md">
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

            <!-- notifications, user info, language -->
            <div class="flex items-center gap-x-2">

              <button
                  type="button"
                  class="relative p-2 text-gray-700 ring-1 ring-inset ring-gray-200 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                  @click="notificationsShown = true"
                  v-tooltip="{ content: $t('hint.layout.notifications') }"
              >
                <BellIcon class="size-5"/>
              </button>

              <LayoutLanguageDropdown/>

              <LayoutProfileDropdown/>

            </div>
          </div>

        </div>

        <!-- page content -->
        <div class="bg-white mt-2 mx-2 p-3 lg:p-4 rounded-t-md flex-1 border-t border-x border-gray-200">
          <slot/>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  HomeIcon,
  UsersIcon,
  Bars4Icon,
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  UserGroupIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowLeftIcon,
  XMarkIcon,
  BriefcaseIcon,
  MegaphoneIcon,
} from '@heroicons/vue/24/outline'
import {HandledRequestError} from "~/exceptions/HandledRequestError";

useHead({
  bodyAttrs: {
    class: 'bg-gray-50'
  }
})

const { appName } = useAppConfig()
const {isLoading} = useLoading()
const {user, logoutUser} = useAuth<true>()
const api = useApi()
const toaster = useToaster()
const route = useRoute()

const loggingOut = ref<boolean>(false)
const query = ref<string | null>(null)

const menuShown = ref<boolean>(false)
const notificationsShown = ref<boolean>(false)

const navigation = [
  {
    name: 'page.dashboard.title',
    to: '/',
    icon: HomeIcon,
    route: 'index',
    startsWith: false
  },
  {
    name: 'page.positions.title',
    to: '/positions',
    icon: BriefcaseIcon,
    route: 'positions',
    startsWith: true
  },
  {
    name: 'page.recruitments.title',
    to: '/recruitments',
    icon: MegaphoneIcon,
    route: 'recruitments',
    startsWith: true
  },
  {
    name: 'page.candidates.title',
    to: '/candidates',
    icon: UsersIcon,
    route: 'candidates',
    startsWith: true
  },
]

const userNavigation = [
  {
    name: 'page.profile.title',
    to: '/profile',
    icon: UserCircleIcon,
    route: 'profile',
    startsWith: true
  },
  {
    name: 'page.company.title',
    to: '/company',
    icon: UserGroupIcon,
    route: 'company',
    startsWith: true
  },
]

async function search(): Promise<void> {
  await navigateTo({
    path: '/search',
    query: {
      q: query.value
    }
  })

  query.value = null
}

async function logout(): Promise<void> {
  loggingOut.value = true

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
    loggingOut.value = false
  }
}

// close side menus when route changes
watch(() => route.path, () => {
  menuShown.value = false
})

onMounted(() => {
  window.addEventListener('scroll', (e) => {
    // todo logic of showing top navbar
  })
})
</script>