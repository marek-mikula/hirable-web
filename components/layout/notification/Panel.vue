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
                <button type="button" class="-m-2.5 p-2.5" @click="emit('close')">
                  <XMarkIcon class="h-6 w-6 text-white"/>
                </button>
              </div>
            </TransitionChild>

            <div class="flex grow h-full flex-col overflow-y-scroll bg-white shadow-xl">

              <div class="p-4 border-b border-gray-200 sticky top-0 bg-white z-20 shadow-sm">
                <h2 class="text-base font-semibold text-gray-900 flex items-center space-x-2">
                  <BellIcon class="size-5 shrink-0"/>

                  <span class="flex-1 min-w-0 truncate">
                    {{ $t('layout.notifications') }}
                  </span>

                  <button
                      type="button"
                      class="hover:text-primary-600 shrink-0"
                      v-tooltip="{ content: $t('tooltip.layout.markAllAsRead') }"
                      @click="markAllAsRead"
                  >
                    <CommonSpinner v-if="false" class="size-5"/>
                    <EyeIcon v-else class="size-5"/>
                  </button>
                </h2>
              </div>

              <div class="p-4 relative flex-1 space-y-1">

                <LayoutNotificationCard :notification="{
                  id: 1,
                  type: NOTIFICATION_TYPE.INVITATION_ACCEPTED,
                  data: {
                    id: 10,
                    name: 'Thomas Shelby'
                  },
                  readAt: null,
                  createdAt: '2021-01-01 13:33:33'
                }" v-for="n in 30"/>

                <div v-if="isLoading" class="p-3 border border-gray-200 rounded-md flex items-center justify-center">
                  <CommonSpinner variant="primary"/>
                </div>

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
  EyeIcon,
} from '@heroicons/vue/24/outline'
import {NOTIFICATION_TYPE} from "~/types/enums";

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const isLoading = ref<boolean>(true)

async function markAllAsRead(): Promise<void> {

}
</script>