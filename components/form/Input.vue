<template>
  <div class="space-y-2">

    <!-- label -->
    <FormLabel
        v-if="label"
        :input-id="inputId"
        :label="label"
        :required="required"
        :help="help"
        class="block"
    />

    <div class="space-x-2 flex items-center">

      <div :class="[icon ? 'relative rounded-md' : '', 'flex-1 min-w-0']">

        <!-- icon -->
        <div v-if="icon" class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <component :is="icon" class="size-5 text-gray-400"/>
        </div>

        <!-- main input element -->
        <input
            :id="inputId"
            v-model="model"
            :type="type"
            :name="name"
            :placeholder="placeholder"
            :autocomplete="autocomplete"
            :maxlength="maxlength"
            :max="max"
            :min="min"
            :step="step"
            :required="required"
            :disabled="disabled"
            :class="[
            'block w-full rounded-md border-0 py-1.5 shadow-xs ring-1 ring-inset focus:ring-2 focus:ring-inset text-sm disabled:opacity-75 disabled:cursor-not-allowed',
            error ? 'text-red-900 placeholder:text-red-300 ring-red-300 focus:ring-red-600' : 'text-gray-900 placeholder:text-gray-400 ring-gray-300 focus:ring-primary-600',
            icon ? 'pl-10' : '',
          ]"
            @change="onChange"
            @input="onInput"
        >

      </div>

      <slot name="after"/>

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
import type {AnyComponent} from "~/types/common";
import type {TooltipOptions} from "~/types/directives/tooltip.types";

const props = withDefaults(defineProps<{
  name: string
  type?: 'color'
      | 'date'
      | 'datetime-local'
      | 'email'
      | 'month'
      | 'number'
      | 'password'
      | 'reset'
      | 'search'
      | 'tel'
      | 'text'
      | 'time'
      | 'url'
      | 'week'
  label?: string
  id?: string
  autocomplete?: string
  maxlength?: number
  min?: number | string
  max?: number | string
  step?: number
  placeholder?: string
  hint?: string
  help?: TooltipOptions
  error?: string | null
  required?: boolean
  disabled?: boolean
  icon?: AnyComponent
}>(), {
  type: 'text',
  autocomplete: 'none', // turn off autocomplete
  required: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'change' | 'input', value: string | number | null, event: Event): void
}>()

const model = defineModel<string | number | null>({
  default: null,
  required: false,
  set(value) {
    return value === '' ? null : value
  }
})
const inputId = computed<string>(() => props.id || _.kebabCase(props.name))

function onChange(event: Event): void {
  emit('change', model.value, event)
}

function onInput(event: Event): void {
  emit('input', model.value, event)
}
</script>