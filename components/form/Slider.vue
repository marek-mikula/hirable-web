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

    <div class="flex items-center">

      <!-- left label -->
      <span class="mr-2 text-sm text-gray-900">
        {{ unit ? `${model}&nbsp;${unit}` : model }}
      </span>

      <!-- main input model -->
      <input
        v-model="model"
        :id="inputId"
        :name="name"
        :required="required"
        :disabled="disabled"
        :min="min"
        :max="max"
        :step="step"
        type="range"
        class="h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary-600 disabled:cursor-not-allowed disabled:accent-gray-500"
        @input="onInput"
      />

      <!-- right label -->
      <span class="ml-2 text-sm text-gray-900">
        {{ unit ? `${max}&nbsp;${unit}` : max }}
      </span>

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

const props = withDefaults(defineProps<{
  name: string
  label?: string
  id?: string
  min?: number
  max?: number
  step?: number
  unit?: string | null
  hint?: string | null
  error?: string | null
  required?: boolean
  disabled?: boolean
}>(), {
  min: 0,
  max: 5,
  step: 1,
  unit: null,
  hint: null,
  error: null,
  required: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'input', value: number): void
}>()

const model = defineModel<number>({
  required: false,
  set(value) {
    return _.isNumber(value) ? value : parseInt(value)
  }
})
const inputId = computed<string>(() => props.id || _.kebabCase(props.name))

function onInput(event: Event): void {
  emit('input', (event.target as HTMLInputElement).valueAsNumber)
}

// if user enables the slider with some of his actions
// we want to set the current value as the minimum so
// the value would match with what he sees
watch(() => props.disabled, (value): void => {
  if (!value) {
    emit('input', props.min)
  }
})

onMounted((): void => {
  // if the slider is rendered has no value,
  // set minimum value as the current value
  if (model.value === undefined) {
    model.value = props.min
  }
})
</script>
