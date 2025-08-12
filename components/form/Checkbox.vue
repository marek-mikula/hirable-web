<template>
  <div class="relative flex items-start">

    <div class="flex h-6 items-center">
      <!-- main input element -->
      <input
          :id="inputId"
          v-model="model"
          :name="name"
          :required="required"
          :disabled="disabled"
          type="checkbox"
          :class="[
              'size-4 rounded-sm disabled:opacity-75 disabled:cursor-not-allowed',
              error ? 'border-red-300 text-red-600 focus:ring-red-600' : 'border-gray-300 text-primary-600 focus:ring-primary-600'
          ]"
          @click="onChange"
      >
    </div>

    <div v-if="label || error || hint" class="ml-2 space-y-1">
      <!-- label -->
      <FormLabel
          v-if="label"
          :input-id="inputId"
          :label="label"
          :required="required"
      />

      <!-- error container -->
      <p v-if="error" class="text-xs text-red-400">
        {{ error }}
      </p>

      <!-- hint container -->
      <p v-else-if="hint" class="text-xs text-gray-400">
        {{ hint }}
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">
import _ from 'lodash'

const props = withDefaults(defineProps<{
  name: string
  label?: string
  id?: string
  hint?: string
  error?: string | null
  required?: boolean
  disabled?: boolean
}>(), {
  required: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'change', value: boolean, event: KeyboardEvent): void
}>()

const model = defineModel<boolean>({default: false, required: false})
const inputId = computed<string>(() => props.id || _.kebabCase(props.name))

function onChange(event: KeyboardEvent): void {
  const target = event.target as HTMLInputElement
  emit('change', target.checked, event)
}
</script>