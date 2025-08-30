<template>
  <div class="flex items-start">

    <label :for="inputId" class="inline-flex items-center cursor-pointer">
      <input
          :id="inputId"
          v-model="model"
          :name="name"
          :disabled="disabled"
          :required="required"
          type="checkbox"
          class="sr-only peer"
          @change="onChange"
      >
      <span class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-disabled:opacity-75 peer-disabled:cursor-not-allowed peer-focus:ring-2 peer-focus:ring-primary-600 peer-focus:ring-offset-2 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></span>
    </label>

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
  (e: 'change', value: boolean, event: Event): void
}>()

const model = defineModel<boolean>({default: false, required: false})
const inputId = computed<string>(() => props.id || _.kebabCase(props.name))

function onChange(event: Event): void {
  const target = event.target as HTMLInputElement
  emit('change', target.checked, event)
}
</script>