<template>
  <div class="space-y-2">

    <!-- label -->
    <FormLabel
        v-if="label"
        :input-id="inputId"
        :label="label"
        :required="required"
        class="block"
    />

    <div>
      <div class="flex rounded-md shadow-xs">
        <button
            type="button"
            :class="[
                'shrink-0 whitespace-nowrap -mr-px rounded-l-md px-2.5 py-1.5 text-sm ring-1 ring-inset hover:bg-gray-50 disabled:opacity-75 disabled:cursor-not-allowed',
                error ? 'text-red-900 ring-red-300 focus-visible:outline-0 focus:ring-2 focus:ring-inset focus:ring-red-600' : 'text-gray-900 ring-gray-300'
            ]"
            :disabled="disabled"
            @click="onClick"
        >
          {{ $t('form.fileUpload.select') }}
        </button>

        <p
          :class="[
            'grow py-1.5 px-3 ring-1 overflow-hidden ring-inset rounded-r-md flex items-center justify-between text-sm',
            error ? 'text-red-900 ring-red-300' : 'ring-gray-300'
         ]"
        >
          <span v-if="model" class="truncate">
            {{ model.name }}
          </span>
          <span v-if="model" class="flex items-center">
            <span :class="['ml-3 whitespace-nowrap', error ? 'text-red-400' : 'text-gray-400']">
              {{ formatBytes(model.size) }}
            </span>
            <button
                type="button"
                class="ml-3 shrink-0 font-medium text-gray-900 hover:text-primary-600" @click="removeFile"
                v-tooltip="$t('common.action.remove')"
            >
              <XMarkIcon class="size-4"/>
            </button>
          </span>
        </p>
      </div>

      <input
          :id="inputId"
          ref="input"
          :name="name"
          :required="required"
          :disabled="disabled"
          :accept="accept"
          type="file"
          class="sr-only"
          @change="onChange"
      >
    </div>

    <!-- error container -->
    <p v-if="error" class="text-xs text-red-400">
      {{ error }}
    </p>

    <!-- hint container -->
    <p v-else-if="hint" class="text-xs text-gray-400">
      {{ hint }}
    </p>

  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = withDefaults(defineProps<{
  name: string
  id?: string
  label?: string
  hint?: string
  error?: string | null
  required?: boolean
  disabled?: boolean
  maxSize?: number // max size in bytes
  accept?: string
  formats?: string[]
}>(), {
  required: false,
  disabled: false,
  formats: () => [],
})

const emit = defineEmits<{
  (e: 'change', value: File | null): void
}>()

const toaster = useToaster()

const input = ref<HTMLInputElement | null>(null)

const model = defineModel<File | null>({default: null, required: false})
const inputId = computed<string>(() => props.id || _.kebabCase(props.name))

function removeFile(): void {
  model.value = null
  input.value!.value = ''
  emit('change', null)
}

function onClick(): void {
  if (props.disabled) {
    return
  }

  input.value!.click()
}

async function onChange(e: Event): Promise<void> {
  const target = e.target as HTMLInputElement
  const file = target.files![0] || null

  // user selected no file
  if (! file) {
    removeFile()

    return
  }

  if (props.maxSize && props.maxSize < file.size) {
    await toaster.error({
      title: {
        key: 'toast.common.fileUpload.fileTooBig', values: {
          name: file.name,
          max: formatBytes(props.maxSize)
        }
      }
    })

    removeFile()

    return
  }

  model.value = file
  emit('change', file)
}
</script>
