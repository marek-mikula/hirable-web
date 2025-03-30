<template>
  <div>
    <!-- app-wide loading state -->
    <div v-if="isLoading" class="flex items-center justify-center opacity-90 fixed inset-0 bg-white/95 z-[100]">
      <CommonLoader/>
    </div>

    <!-- left menu sidebar for smaller screens -->
    <TransitionRoot as="template" :show="sidebarOpened">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpened = false">

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
          <div class="fixed inset-0 bg-gray-900/80" />
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
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpened = false">
                    <XMarkIcon class="h-6 w-6 text-white" />
                  </button>
                </div>
              </TransitionChild>

              <LayoutMenuSidebar class="grow"/>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- right notifications sidebar -->
    <TransitionRoot as="template" :show="notificationsOpened">
      <Dialog as="div" class="relative z-50" @close="notificationsOpened = false">

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
          <div class="fixed inset-0 bg-gray-900/80" />
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
                  <button type="button" class="-m-2.5 p-2.5" @click="notificationsOpened = false">
                    <XMarkIcon class="h-6 w-6 text-white"/>
                  </button>
                </div>
              </TransitionChild>

              <LayoutNotificationSidebar class="flex grow flex-col gap-y-5 overflow-y-auto bg-white p-5"/>

            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- static left menu sidebar for bigger screens -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col">
      <LayoutMenuSidebar class="grow border-r border-gray-200"/>
    </div>

    <!-- main content wrapper -->
    <div class="lg:pl-60">

      <!-- sticky content navbar -->
      <LayoutNavbar
          @sidebar-shown="sidebarOpened = true"
          @notifications-shown="notificationsOpened = true"
      />

      <!-- main content -->
      <main class="p-3 sm:p-4 lg:p-5 mx-auto">
          <!-- breadcrumbs container -->
          <LayoutBreadcrumbs class="mb-3 sm:mb-4 lg:mb-5"/>

          <!-- page content -->
          <slot/>
      </main>

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
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const route = useRoute()
const { isLoading } = useLoading()

const notificationsOpened = ref<boolean>(false)
const sidebarOpened = ref<boolean>(false)

watch(() => route.path, () => {
  // close sidebars when route changes
  notificationsOpened.value = false
  sidebarOpened.value = false
})
</script>