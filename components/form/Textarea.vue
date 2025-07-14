<template>
  <div class="space-y-2">

    <!-- label -->
    <FormLabel
        v-if="label"
        :input-id="inputId"
        :label="label"
        :required="required"
        class="block text-sm font-medium text-gray-900"
    />

    <!-- main textarea element -->
    <div class="relative">
      <textarea
          :id="inputId"
          v-model="model"
          :name="name"
          :placeholder="placeholder"
          :maxlength="maxlength"
          :required="required"
          :disabled="disabled"
          :class="[
            'h-36 block w-full rounded-md border-0 py-1.5 px-3 shadow-xs ring-1 ring-inset focus:ring-2 focus:ring-inset text-sm disabled:opacity-75 disabled:cursor-not-allowed resize-none',
            error ? 'text-red-900 placeholder:text-red-300 ring-red-300 focus:ring-red-600' : 'text-gray-900 placeholder:text-gray-400 ring-gray-300 focus:ring-primary-600',
          ]"
          @change="onChange"
      />

      <div v-if="maxlength && ! hideCounter" class="text-xs absolute right-1.5 bottom-1.5 rounded-md bg-gray-50 px-1 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
        {{ length }} / {{ maxlength }}
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

  </div>
</template>

<script setup lang="ts">
import _ from 'lodash'

const props = withDefaults(defineProps<{
  name: string
  label?: string
  id?: string
  maxlength?: number
  placeholder?: string
  hint?: string
  error?: string | null
  required?: boolean
  disabled?: boolean
  hideCounter?: boolean
}>(), {
  required: false,
  disabled: false,
  hideCounter: false,
})

const emit = defineEmits<{
  (e: 'change', value: string | null, event: Event): void
}>()

const model = defineModel<string | null>({
  default: null,
  required: false,
  set(value) {
    return value === '' ? null : value
  }
})
const length = computed<number>(() => model.value ? model.value.length : 0)
const inputId = computed<string>(() => props.id || _.kebabCase(props.name))

function onChange(event: Event): void {
  emit('change', model.value, event)
}
</script>