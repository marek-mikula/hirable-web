<template>
  <div class="p-3 border border-gray-200 rounded-md">
    <div class="flex items-start space-x-3">

      <!-- trailing icon if any -->
      <div v-if="true" class="shrink-0">
        <svg class="size-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>

      <div class="min-w-0 flex-1 pt-0.5">

        <!-- notification title -->
        <p class="text-sm font-medium text-gray-900">
          {{ $t(`notification.${notification.type}.title`, notification.data) }}
        </p>

        <!-- notification text -->
        <p class="mt-1 text-sm text-gray-500">
          {{ $t(`notification.${notification.type}.message`, notification.data) }}
        </p>

        <!-- notification actions -->
        <div v-if="false" class="mt-3 flex space-x-3">
          <button type="button" class="rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">Undo</button>
          <button type="button" class="rounded-md bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">Dismiss</button>
        </div>

      </div>

      <!-- button to mark notification as read -->
      <div class="flex shrink-0">
        <button
            type="button"
            class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
            v-tooltip="{ content: $t('tooltip.layout.markAsRead') }"
            @click="emit('markAsRead', notification)"
        >
          <EyeIcon class="size-5"/>
        </button>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {EyeIcon} from "@heroicons/vue/24/outline";
import type {Notification} from "~/repositories/resources";

defineProps<{
  notification: Notification
}>()

const emit = defineEmits<{
  (e: 'markAsRead', notification: Notification): void
}>()
</script>
