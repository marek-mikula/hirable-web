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

    <!-- main input element -->
    <select
        :id="inputId"
        v-model="model"
        :name="name"
        :required="required"
        :disabled="disabled"
        :class="[
            'block w-full rounded-md border-0 py-1.5 pl-3 pr-8 ring-1 ring-inset focus:ring-2 text-sm',
            error ? 'text-red-900 ring-red-300 focus:ring-red-600' : 'text-gray-900 ring-gray-300 focus:ring-primary-600',
        ]"
        @change="onChange"
    >
      <option v-if="addEmptyOption" :value="null">
        {{ emptyOption ?? $t('form.select.chooseOption') }}
      </option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

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
import type {SelectOption} from "~/types/common";

const props = withDefaults(defineProps<{
  options: SelectOption[]
  name: string
  label?: string
  id?: string
  hint?: string
  error?: string | null
  required?: boolean
  disabled?: boolean
  addEmptyOption?: boolean
  emptyOption?: string
}>(), {
  required: false,
  disabled: false,
  addEmptyOption: false,
})

const emit = defineEmits<{
  (e: 'change', value: null | string | number): void
}>()

const model = defineModel<null | string | number>({default: null, required: false})
const inputId = computed<string>(() => props.id || _.kebabCase(props.name))

function onChange(event: Event): void {
  const target = event.target as HTMLSelectElement
  emit('change', target.value)
}
</script>