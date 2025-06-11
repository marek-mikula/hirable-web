<template>
  <div class="p-3 border border-gray-200 rounded-md group">
    <div class="flex items-start space-x-3">

      <!-- trailing icon if any -->
      <div v-if="false" class="shrink-0">
        <svg class="size-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>

      <div class="min-w-0 flex-1 pt-0.5 space-y-2">

        <!-- notification title -->
        <p class="flex-1 flex items-center space-x-2 min-w-0 truncate text-sm font-medium text-gray-900">
          <span v-if="!notification.readAt" class="block size-2 bg-red-600 rounded-full"></span>
          <span>
            {{ $t(`notification.${key}.title`, notification.data) }}
          </span>
        </p>

        <!-- notification text -->
        <p class="text-sm text-gray-500" v-html="$t(`notification.${key}.message`, notification.data)"/>

        <!-- notification time -->
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500" v-tooltip="{ content: $formatter.datetime(notification.createdAt) }">
            {{ $moment(notification.createdAt).fromNow() }}
          </span>

          <!-- button to mark notification as read -->
          <button
              v-if="!notification.readAt"
              type="button"
              class="group-hover:visible invisible inline-flex rounded-md bg-white text-gray-500 hover:text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-hidden"
              v-tooltip="{ content: $t('tooltip.layout.markAsRead') }"
              :disabled="isLoading"
              @click="markRead"
          >
            <CommonSpinner v-if="isLoading" class="size-5"/>
            <CheckCircleIcon v-else class="size-5"/>
          </button>
        </div>

      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {CheckCircleIcon} from "@heroicons/vue/24/outline";
import type {Notification} from "~/repositories/resources";

const props = defineProps<{
  notification: Notification
}>()

const emit = defineEmits<{
  (e: 'markRead', notification: Notification): void
}>()

const toaster = useToaster()
const api = useApi()

const isLoading = ref<boolean>(false)

const key = computed<string>(() => props.notification.type.replace(':', '.'))

async function markRead(): Promise<void> {
  isLoading.value = true
  const result = await handle<Notification>(() => api.notification.markRead(props.notification.id).then(res => res._data!.data.notification))
  isLoading.value = false

  if (! result.success) {
    return
  }

  await toaster.success({
    title: 'toast.notification.markRead'
  })

  emit('markRead', result.result)
}
</script>
