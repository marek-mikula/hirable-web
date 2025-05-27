<template>
  <div class="flex items-center border border-gray-200 px-3 py-2 rounded-md space-x-3">
    <div class="shrink-0">
      <CommonSpinner v-if="loading" size="size-5"/>
      <DocumentIcon v-else class="size-5"/>
    </div>
    <p class="grow overflow-hidden truncate text-sm">
      {{ file.name }}
    </p>
    <span class="flex items-center space-x-3">
      <span class="whitespace-nowrap text-sm text-gray-400">
        {{ formatBytes(file.size) }}
      </span>
      <span class="shrink-0 flex items-center space-x-1">
        <button
            v-for="(action, index) in actions"
            :key="index"
            v-tooltip="{ content: translate(action.label), placement: 'top' }"
            type="button"
            class="shrink-0 font-medium text-gray-900 p-1 -m-1 rounded-md hover:bg-gray-50 hover:text-primary-600 disabled:opacity-75 disabled:cursor-not-allowed"
            :disabled="loading"
            @click.prevent="triggerAction(action)"
          >
          <component :is="action.icon" class="size-4"/>
        </button>
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import {DocumentIcon} from "@heroicons/vue/24/outline";
import type {File} from "~/repositories/resources";
import type {FileAction} from "~/types/components/common/file.types";

const props = withDefaults(defineProps<{
  file: File,
  actions: FileAction[]
  loading?: boolean
}>(), {
  actions: () => []
})

async function triggerAction(action: FileAction): Promise<void> {
  // user cannot trigger any action when
  // other action is loading
  if (props.loading) {
    return
  }

  await action.handler(props.file)
}
</script>
