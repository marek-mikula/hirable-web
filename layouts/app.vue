<template>
  <div class="min-h-screen max-w-screen-2xl mx-auto flex items-start">

    <!-- app-wide loading state -->
    <div v-if="isLoading" class="flex items-center justify-center text-sm fixed inset-0 bg-white/80 backdrop-blur-sm z-[100]">
      <CommonLoader/>
    </div>

    <!-- left side menu for smaller screens -->
    <TransitionRoot as="template" :show="menuShown">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="menuShown = false">

        <!-- backdrop for sidebar -->
        <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80 backdrop-blur-sm"/>
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="-translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">

              <!-- close button to close sidebar -->
              <TransitionChild
                  as="template"
                  enter="ease-in-out duration-300"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="ease-in-out duration-300"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
              >
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="menuShown = false">
                    <XMarkIcon class="h-6 w-6 text-white" />
                  </button>
                </div>
              </TransitionChild>

              <div class="w-full h-screen overflow-y-auto">
                <div class="h-full bg-white divide-y divide-gray-200">

                  <!-- top menu badge with low budget logo -->
                  <div class="p-4">
                    <div class="rounded-md flex items-center space-x-2">
                      <div class="size-8 rounded-md border border-gray-200 flex items-center justify-center">
                        <span>🪑</span>
                      </div>
                      <span class="font-medium">{{ appName }}</span>
                    </div>
                  </div>

                  <!-- main menu -->
                  <div class="p-4">
                    <nav class="flex flex-1 flex-col">
                      <ul role="list" class="flex flex-1 flex-col gap-y-3">
                        <li class="space-y-2">
                          <div class="text-xs/6 text-gray-500 font-medium">
                            {{ $t('layout.menu.main') }}
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

                        <li class="space-y-2">
                          <div class="text-xs/6 text-gray-500 font-medium">
                            {{ $t('layout.menu.settings') }}
                          </div>
                          <ul role="list" class="space-y-1">
                            <li v-for="item in userNavigation" :key="item.name">
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

                  <!-- logout section -->
                  <div class="p-4">
                    <form method="POST" action="#" role="none" @submit.prevent="logout">
                      <button
                          type="submit"
                          class="text-gray-700 hover:text-primary-600 group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium"
                          role="menuitem"
                          tabindex="-1"
                      >
                        <ArrowLeftStartOnRectangleIcon class="text-gray-400 group-hover:text-primary-600 h-6 w-6 shrink-0"/>
                        {{ $t('layout.menu.logout') }}
                      </button>
                    </form>
                  </div>

                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- right notifications sidebar -->
    <TransitionRoot as="template" :show="notificationsShown">
      <Dialog as="div" class="relative z-50" @close="notificationsShown = false">

        <!-- backdrop for notifications sidebar -->
        <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80 backdrop-blur-sm"/>
        </TransitionChild>

        <div class="fixed inset-0 flex justify-end">
          <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
          >
            <DialogPanel class="relative ml-16 flex w-full max-w-sm flex-1">

              <!-- button to close notifications sidebar -->
              <TransitionChild
                  as="template"
                  enter="ease-in-out duration-300"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="ease-in-out duration-300"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
              >
                <div class="absolute right-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="notificationsShown = false">
                    <XMarkIcon class="h-6 w-6 text-white"/>
                  </button>
                </div>
              </TransitionChild>

              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white p-4">
                <div>
                  <nav class="flex flex-1 flex-col">
                    <ul role="list" class="flex flex-1 flex-col gap-y-4">
                      TODO
                    </ul>
                  </nav>
                </div>
              </div>

            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- left static side menu -->
    <div class="hidden lg:block w-72 shrink-0 h-screen sticky top-0">
      <div class="p-3 lg:p-4 h-full flex flex-col">
        <div class="flex flex-col min-h-0 bg-white divide-y divide-gray-200 rounded-md border border-gray-200">

          <!-- top menu badge with low budget logo -->
          <div class="shrink-0 p-3 lg:p-4">
            <div class="rounded-md flex items-center space-x-2">
              <div class="size-8 rounded-md border border-gray-200 flex items-center justify-center">
                <span>🪑</span>
              </div>
              <span class="font-medium">{{ appName }}</span>
            </div>
          </div>

          <!-- main menu -->
          <div class="flex-1 min-h-0 p-3 lg:p-4 overflow-y-auto">
            <nav class="flex flex-1 flex-col">
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
            </nav>
          </div>

          <!-- logout section -->
          <div class="shrink-0 p-3 lg:p-4">
            <form method="POST" action="#" role="none" @submit.prevent="logout">
              <button
                  type="submit"
                  class="text-gray-700 hover:text-primary-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium w-full"
                  role="menuitem"
                  tabindex="-1"
              >
                <ArrowLeftStartOnRectangleIcon class="text-gray-400 group-hover:text-primary-600 h-6 w-6 shrink-0"/>
                <CommonLoader v-if="loggingOut"/>
                <span v-else>
                  {{ $t('layout.menu.logout') }}
                </span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>

    <!-- right side content card -->
    <div class="flex-1 min-w-0 min-h-screen grid">
      <div class="min-w-0 grid h-full lg:py-4 lg:pr-4">
        <main class="min-w-0 h-full">
          <div class="h-full bg-white p-3 lg:p-4 lg:rounded-md lg:border lg:border-gray-200">

            <!-- application navbar - search, language, notifications -->
            <div class="z-40 flex shrink-0 items-center gap-x-2 mb-3 lg:mb-4">

              <!-- button to open sidebar -->
              <button type="button" class="p-2 text-gray-700 ring-1 ring-inset ring-gray-200 hover:text-primary-600 hover:bg-gray-50 rounded-md lg:hidden" @click="menuShown = true">
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

                <!-- notifications, user info, language -->
                <div class="flex items-center gap-x-2">

                  <button
                      type="button"
                      class="relative p-2 text-gray-700 ring-1 ring-inset ring-gray-200 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                      @click="notificationsShown = true"
                  >
                    <BellIcon class="size-5"/>
                  </button>

                  <LayoutLanguageDropdown/>

                  <LayoutProfileDropdown/>

                </div>
              </div>

            </div>

            <!-- page content slot -->
            <slot/>

          </div>
        </main>
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
  XMarkIcon,
  BriefcaseIcon,
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
    name: 'page.recruitments.title',
    to: '/recruitments',
    icon: BriefcaseIcon,
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