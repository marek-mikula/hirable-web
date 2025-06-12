<template>
  <div class="flex items-center border border-gray-300 px-3 py-2 rounded-md space-x-3">
    <div class="shrink-0">
      <DocumentIcon class="size-5"/>
    </div>
    <p class="grow overflow-hidden truncate text-sm">
      <button
          type="button"
          class="hover:underline hover:text-primary-600 disabled:opacity-75 disabled:cursor-not-allowed"
          :disabled="disabled"
          v-tooltip="{ content: $t('tooltip.file.show') }"
          @click="showFile"
      >
        {{ file.name }}
      </button>
    </p>
    <span class="flex items-center space-x-3">
      <span class="whitespace-nowrap text-sm text-gray-400">
        {{ formatBytes(file.size) }}
      </span>
      <span v-if="!disabled" class="shrink-0 flex items-center space-x-1">
        <button
            v-for="(action, index) in actions"
            :key="index"
            v-tooltip="{ content: translate(action.label), placement: 'top' }"
            type="button"
            class="shrink-0 font-medium text-gray-900 hover:text-primary-600 disabled:opacity-75 disabled:cursor-not-allowed"
            :disabled="disabled || loading !== null"
            @click="triggerAction(action)"
          >
          <CommonSpinner v-if="loading === action.key" size="size-4"/>
          <component v-else :is="action.icon" class="size-4"/>
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
  actions?: FileAction[]
  disabled?: boolean
}>(), {
  actions: () => [],
  disabled: false,
})

const api = useApi()

const loading = ref<string | null>(null)

async function triggerAction(action: FileAction): Promise<void> {
  // user cannot trigger any action when
  // other action is loading
  if (loading.value !== null) {
    return
  }

  loading.value = action.key

  await action.handler(props.file)

  loading.value = null
}

async function showFile(): Promise<void> {
  const result = await handle<Blob>(async () => api.file.show(props.file.id).then(res => res._data!))

  if (!result.success) {
    return
  }

  const blob = result.result

  const blobUrl = URL.createObjectURL(blob);
  const mimeType = blob.type;

  // Check if the browser can display this type
  const previewTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'video/mp4',
    'text/plain'
  ];

  if (previewTypes.includes(mimeType)) {
    // Open in a new tab
    window.open(blobUrl, '_blank');
  } else {
    // Force download
    const a = document.createElement('a');
    a.href = blobUrl;
    // a.download = 'filename'; // you can set a filename here
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // release memory after some time
  setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
}
</script>
