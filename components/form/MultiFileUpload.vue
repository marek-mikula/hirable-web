<template>
  <div class="space-y-2">

    <!-- label -->
    <label
        v-if="label"
        :for="inputId"
        class="block text-sm font-medium text-gray-900"
    >
      {{ label }}
      <span v-if="required" class="font-bold text-red-500">*</span>
    </label>

    <!-- main upload element -->
    <div class="relative">
      <button
          type="button"
          :class="[
              'w-full h-36 border-0 rounded-md hover:bg-gray-50 outline-hidden focus:ring-2 focus:ring-inset disabled:opacity-75 disabled:cursor-not-allowed',
              dragging ? 'ring-2' : 'ring-1',
              error ? 'ring-red-300 focus:ring-red-600' : 'ring-gray-300 focus:ring-primary-600',
          ]"
          :disabled="disabled"
          @click="onClick"
          @dragenter="onDragEnter"
          @dragleave="onDragLeave"
          @drop="onDrop"
          @dragover.prevent
      >
        <span :class="['space-y-2 block flex flex-col items-center justify-center', dragging ? 'pointer-events-none' : '']">
          <DocumentDuplicateIcon class="h-8 w-8 text-gray-300"/>
          <span class="text-xs text-gray-500">
            {{ $t('form.fileUpload.clickOrDrag') }}
          </span>
          <span v-if="formats.length > 0 || maxSize > 0" class="text-xs text-gray-500 space-x-1">
            <span v-if="formats.length > 0" class="inline-flex items-center rounded-md bg-gray-50 px-1.5 py-0.5 text-xs text-gray-400 ring-1 ring-inset ring-gray-500/10">
              {{ formats.map(format => format.toUpperCase()).join(', ') }}
            </span>
            <span v-if="maxSize" class="inline-flex items-center rounded-md bg-gray-50 px-1.5 py-0.5 text-xs text-gray-400 ring-1 ring-inset ring-gray-500/10">
              {{ formatBytes(maxSize) }}
            </span>
          </span>
        </span>
      </button>

      <!-- keep input outside the button, because of event bubbling when clicked -->
      <input
          :id="inputId"
          ref="input"
          :name="name"
          :required="required"
          :disabled="disabled"
          :accept="accept"
          type="file"
          class="sr-only absolute inset-0"
          tabindex="-1"
          multiple
          @change="onChange"
      >

      <!-- file counter -->
      <div v-if="maxFiles && ! hideCounter" class="text-xs absolute right-1.5 bottom-1.5 rounded-md bg-gray-50 px-1 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
        {{ model.length }} / {{ maxFiles }}
      </div>
    </div>

    <!-- error container -->
    <p v-if="error" class="text-xs text-red-400">
      {{ error }}
    </p>

    <!-- hint container -->
    <p v-else-if="hint" class="text-xs text-gray-400">
      {{ hint }}
    </p>

    <!-- list of selected files -->
    <ul v-if="model.length > 0" role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
      <li v-for="(file, index) in model" :key="index" class="flex items-center justify-between px-4 py-2 text-sm">
        <div class="flex w-0 flex-1 items-center">
          <PaperClipIcon class="size-4"/>
          <div class="ml-4 flex min-w-0 flex-1 gap-2">
            <span class="truncate font-medium">
              {{ index + 1 }}. {{ file.name }}
            </span>
            <span class="shrink-0 text-gray-400">
              {{ formatBytes(file.size) }}
            </span>
          </div>
        </div>
        <button
            type="button"
            class="ml-4 shrink-0 font-medium text-gray-900 hover:text-primary-600" @click="removeFile(index)"
            v-tooltip="{ content: $t('common.action.remove') }"
        >
          <XMarkIcon class="size-4"/>
        </button>
      </li>
    </ul>

  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import {
  DocumentDuplicateIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

const props = withDefaults(defineProps<{
  name: string
  id?: string
  label?: string
  hint?: string
  error?: string | null
  required?: boolean
  disabled?: boolean
  hideCounter?: boolean
  maxSize?: number // max size in bytes
  maxFiles?: number
  accept?: string
  formats?: string[]
}>(), {
  required: false,
  disabled: false,
  hideCounter: false,
  formats: () => [],
})

const emit = defineEmits<{
  (e: 'change', value: File[]): void
}>()

const toaster = useToaster()

const input = ref<HTMLInputElement | null>(null)
const dragging = ref<boolean>(false)

const model = defineModel<File[]>({default: [], required: false})
const inputId = computed<string>(() => props.id || _.kebabCase(props.name))

function onClick(): void {
  input.value!.click()
}

async function onChange(e: Event): Promise<void> {
  const target = e.target as HTMLInputElement
  const files = await processFiles([...(target.files || [])])
  emit('change', files)
}

function onDragEnter(): void {
  if (props.disabled) {
    return
  }

  dragging.value = true
}

function onDragLeave(): void {
  if (props.disabled) {
    return
  }

  dragging.value = false
}

async function onDrop(e: DragEvent): Promise<void> {
  if (props.disabled) {
    return
  }

  // prevent file/files from being opened
  e.preventDefault()

  // turn off dragging animation
  dragging.value = false

  if (!e.dataTransfer) {
    return
  }

  // set files to input, so if input is required
  // it correctly sets the state
  input.value!.files = e.dataTransfer.files

  const files: File[] = [...e.dataTransfer.files]

  emit('change', await processFiles(files))
}

async function processFiles(files: File[]): Promise<File[]> {
  for (const file of files) {
    // validate max. number of files
    if (props.maxFiles && props.maxFiles <= model.value.length) {
      await toaster.error({
        title: {
          key: 'toast.common.fileUpload.tooManyFiles', values: {
            name: file.name,
            max: props.maxFiles
          }
        }
      })

      continue
    }

    // validate max. size of a file
    if (props.maxSize && props.maxSize < file.size) {
      await toaster.error({
        title: {
          key: 'toast.common.fileUpload.fileTooBig', values: {
            name: file.name,
            max: formatBytes(props.maxSize)
          }
        }
      })

      continue
    }

    model.value.push(file)
  }

  return model.value
}

function removeFile(index: number): void {
  model.value.splice(index, 1)

  // remove value for input, so native
  // required validation works
  if (model.value.length === 0) {
    input.value!.value = ''
  }
}
</script>