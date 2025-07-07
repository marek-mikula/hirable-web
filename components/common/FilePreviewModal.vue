<template>
  <CommonModal dialog-class="min-h-[500px] h-[95vh] grid grid-rows-[auto_1fr]" :open="file !== null" width="full" :title="file?.name ?? ''" :title-icon="DocumentIcon" @close="close">
    <template #content>
      <div class="h-full w-full flex items-center justify-center">

        <div v-if="loading">
          <CommonLoader/>
        </div>

        <iframe v-else-if="url" :src="url" class="w-full h-full"/>

      </div>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import {DocumentIcon} from "@heroicons/vue/24/outline";
import type {File} from '~/repositories/resources'

const props = defineProps<{
  file: File | null
}>()

const api = useApi()

const url = ref<string|null>(null)
const loading = ref<boolean>(false)

const emit = defineEmits<{
  (e: 'close'): void,
}>()

function close(): void {
  emit('close')
}

async function showFile(file: File): Promise<void> {
  loading.value = true

  const result = await handle(async () => api.file.show(file.id))

  loading.value = false

  if (!result.success) {
    return
  }

  const response = result.result
  const blob = response._data!

  const blobUrl = URL.createObjectURL(blob);

  url.value = blobUrl

  // release memory after some time
  setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
}

watch(() => props.file, (value) => {
  if (value) {
    showFile(value)
  } else {
    url.value = null
  }
})
</script>