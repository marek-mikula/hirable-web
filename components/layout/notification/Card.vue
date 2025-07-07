<template>
  <div class="p-3 border border-gray-200 rounded-md group overflow-hidden">
    <div class="flex items-start space-x-2">

      <!-- trailing icon if any -->
      <div class="shrink-0">
        <InformationCircleIcon v-if="variant === 'info'" class="size-6 text-blue-400"/>
        <ExclamationTriangleIcon v-else-if="variant === 'warning'" class="size-6 text-yellow-400"/>
        <XCircleIcon v-else-if="variant === 'danger'" class="size-6 text-red-400"/>
        <CheckCircleIcon v-else-if="variant === 'success'" class="size-6 text-green-400"/>
      </div>

      <div class="min-w-0 flex-1 pt-0.5 space-y-2">

        <!-- notification title -->
        <p class="flex-1 flex items-center space-x-2 min-w-0 truncate text-sm font-medium text-gray-900">
          <span v-if="!notification.readAt" class="block size-2 bg-red-600 rounded-full"></span>
          <span class="flex-1 truncate">
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
import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  CheckCircleIcon
} from "@heroicons/vue/24/outline";
import type {Notification} from "~/repositories/resources";
import type {NotificationCardVariant} from "~/types/components/layout/notification/card.types";
import {NOTIFICATION_TYPE} from "~/types/enums";

const props = defineProps<{
  notification: Notification
}>()

const emit = defineEmits<{
  (e: 'markRead', notification: Notification): void
}>()

const toaster = useToaster()
const api = useApi()

const isLoading = ref<boolean>(false)

const variant = computed<NotificationCardVariant>(() => {
  if ([
      NOTIFICATION_TYPE.POSITION_APPROVAL_REJECTED,
  ].includes(props.notification.type)) {
    return 'danger'
  }

  if ([
    NOTIFICATION_TYPE.POSITION_APPROVAL_EXPIRED,
    NOTIFICATION_TYPE.POSITION_APPROVAL_CANCELED,
  ].includes(props.notification.type)) {
    return 'warning'
  }

  if ([
    NOTIFICATION_TYPE.POSITION_APPROVAL_APPROVED,
    NOTIFICATION_TYPE.POSITION_OPENED,
  ].includes(props.notification.type)) {
    return 'success'
  }

  return 'info'
})
const key = computed<string>(() => props.notification.type.replace(':', '.'))

async function markRead(): Promise<void> {
  isLoading.value = true
  const result = await handle(() => api.notification.markRead(props.notification.id).then(res => res._data!.data.notification))
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
