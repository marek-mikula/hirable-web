<template>
  <TransitionRoot as="template" :show="show">
    <Dialog as="div" class="relative z-50" @close="emit('close')">

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
        <div class="fixed inset-0 bg-gray-900/80 backdrop-blur-xs"/>
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
            @before-enter="onShow"
            @after-leave="onHide"
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
                <button type="button" class="-m-2.5 p-2.5" @click="emit('close')">
                  <XMarkIcon class="h-6 w-6 text-white"/>
                </button>
              </div>
            </TransitionChild>

            <div class="flex grow h-full flex-col overflow-y-scroll bg-white shadow-xl">

              <div class="p-4 border-b border-gray-200 sticky top-0 bg-white z-20">
                <h2 class="text-base font-semibold text-gray-900 flex items-center space-x-2">
                  <BellIcon class="size-5 shrink-0"/>

                  <span class="flex-1 min-w-0 truncate">
                    {{ $t('layout.notifications.title') }}
                  </span>

                  <button
                      type="button"
                      class="text-gray-500 hover:text-primary-600 shrink-0 disabled:opacity-75 disabled:cursor-not-allowed"
                      :disabled="isLoading || markingAllAsRead || !canMarkAllRead"
                      v-tooltip="{ content: $t('tooltip.layout.markAllAsRead') }"
                      @click="markAllRead"
                  >
                    <CommonSpinner v-if="markingAllAsRead" class="size-5"/>
                    <CheckCircleIcon v-else class="size-5"/>
                  </button>

                </h2>
              </div>

              <div ref="scrollContainer" class="p-4 relative flex-1 space-y-1">

                <template v-if="notifications.length > 0">
                  <LayoutNotificationCard
                      v-for="notification in notifications"
                      :key="notification.id"
                      :notification="notification"
                      @mark-read="onMarkRead"
                  />
                </template>

                <div v-if="isLoading" class="p-3 border border-gray-200 rounded-md flex items-center justify-center">
                  <CommonSpinner variant="primary"/>
                </div>

                <div v-else-if="notifications.length === 0" class="p-3 border border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500">
                  {{ $t('layout.notifications.empty') }}
                </div>

                <div ref="scrollSentinel"></div>

              </div>

            </div>

          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  BellIcon,
  XMarkIcon,
  CheckCircleIcon,
} from '@heroicons/vue/24/outline'
import type {Notification, PaginatedResource} from "~/repositories/resources";

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close' | 'markAllRead'): void
  (e: 'markRead', notification: Notification): void
}>()

const { startInfiniteScroll, stopInfiniteScroll} = useInfiniteScroll()
const toaster = useToaster()
const api = useApi()

const scrollContainer = ref<HTMLElement|null>(null)
const scrollSentinel = ref<HTMLElement|null>(null)

const notifications = ref<Notification[]>([])
const page = ref<number>(0)
const hasMoreData = ref<boolean>(true)
const isLoading = ref<boolean>(false)
const markingAllAsRead = ref<boolean>(false)

const canMarkAllRead = computed<boolean>(() => {
  return notifications.value.some(item => !item.readAt)
})

function onMarkRead(notification: Notification): void {
  const index = notifications.value.findIndex(item => item.id === notification.id)

  if (index === -1) {
    return
  }

  // replace object in the data array
  notifications.value.splice(index, 1, notification)

  emit('markRead', notification)
}

async function markAllRead(): Promise<void> {
  if (!canMarkAllRead.value) {
    return
  }

  markingAllAsRead.value = true
  const result = await handle(async () => api.notification.markAllRead())
  markingAllAsRead.value = false

  if (!result.success) {
    return
  }

  await toaster.success({
    title: 'toast.notification.markAllRead'
  })

  emit('markAllRead')

  // reset data
  page.value = 0
  notifications.value = []

  // reload the notifications
  await loadNotifications()
}

async function loadNotifications(): Promise<void> {
  if (isLoading.value) {
    return
  }

  isLoading.value = true
  const result = await handle(() => api.notification.index(page.value + 1).then(res => res._data!.data.notifications))
  isLoading.value = false

  if (!result.success) {
    return
  }

  // update meta values from response
  page.value = result.result.meta.currentPage
  hasMoreData.value = result.result.meta.total > result.result.meta.to

  // spread new data into the array
  notifications.value = [...notifications.value, ...result.result.data]

  if (!hasMoreData.value) {
    stopInfiniteScroll(scrollSentinel.value!)
  }
}

function onShow(): void {
  if (!isLoading.value) {
    loadNotifications().then(() => {
      startInfiniteScroll(scrollContainer.value!, scrollSentinel.value!, loadNotifications)
    })
  }
}

function onHide(): void {
  page.value = 0
  notifications.value = []
}

onBeforeUnmount(() => {
  stopInfiniteScroll(scrollSentinel.value!)
})
</script>