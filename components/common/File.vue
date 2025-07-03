<template>
  <div class="flex items-center border border-gray-300 px-3 py-2 rounded-md space-x-3 group">
    <div class="shrink-0">
      <DocumentIcon class="size-5"/>
    </div>
    <p class="flex-1 min-w-0 truncate text-sm">
      {{ file.name }}
    </p>
    <div class="shrink-0 flex items-center space-x-3">
      <div class="whitespace-nowrap text-sm text-gray-400">
        {{ formatBytes(file.size) }}
      </div>
      <div v-if="!disabled" class="shrink-0 flex items-center space-x-2">
        <button
            v-for="action in mergedActions"
            :key="action.key"
            v-tooltip="{ content: translate(action.label), placement: 'top' }"
            type="button"
            class="shrink-0 font-medium text-gray-900 hover:text-primary-600 disabled:opacity-75 disabled:cursor-not-allowed"
            :disabled="disabled || loading !== null"
            @click="triggerAction(action)"
          >
          <CommonSpinner v-if="loading === action.key" size="size-5"/>
          <component :is="action.icon" v-else class="size-5"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {DocumentIcon, DocumentArrowDownIcon, DocumentMagnifyingGlassIcon} from "@heroicons/vue/24/outline";
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

const mergedActions = computed<FileAction[]>(() => {
  const result = []

  if (supportPreview.value) {
    result.push({
      key: 'show',
      handler: showFile,
      icon: DocumentMagnifyingGlassIcon,
      label: 'tooltip.file.show',
    })
  }

  result.push({
    key: 'download',
    handler: downloadFile,
    icon: DocumentArrowDownIcon,
    label: 'tooltip.file.download',
  })

  return [...result, ...(props.actions ?? [])]
})
const supportPreview = computed<boolean>(() => {
  return [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'video/mp4',
    'text/plain'
  ].includes(props.file.mime)
})

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

async function downloadFile(file: File): Promise<void> {
  const result = await handle(async () => api.file.download(file.id))

  if (!result.success) {
    return
  }

  const disposition = result.result.headers.get('content-disposition');
  let filename = generateUid() + '.' + file.extension;

  // try to extract filename from Content-Disposition header
  if (disposition && disposition.includes('filename=')) {
    const match = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);

    if (match && match[1]) {
      filename = match[1].replace(/['"]/g, '');
    }
  }

  const blob = result.result._data!
  const blobUrl = URL.createObjectURL(blob);

  // download file
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // release memory after some time
  setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
}

async function showFile(file: File): Promise<void> {
  const result = await handle(async () => api.file.show(file.id))

  if (!result.success) {
    return
  }

  const response = result.result
  const blob = response._data!

  const blobUrl = URL.createObjectURL(blob);

  // Open in a new tab
  window.open(blobUrl, '_blank');

  // release memory after some time
  setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
}
</script>
