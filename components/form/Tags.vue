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

    <div class="relative">

      <!-- input for native validation -->
      <input
          type="text"
          class="absolute block w-full rounded-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 focus:ring-0 focus:ring-primary-600 text-sm"
          tabindex="-1"
          :value="underlyingValue"
          :name="name"
          :required="required"
          :disabled="disabled"
      />

      <button
          :id="inputId"
          ref="buttonElement"
          type="button"
          :class="[
              'flex items-center space-x-1 relative w-full cursor-default rounded-md bg-white py-1.5 px-3 text-left text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 focus:outline-hidden focus:ring-2 focus:ring-primary-600 text-sm disabled:opacity-75 disabled:cursor-not-allowed',
              error ? 'text-red-900 ring-red-300 focus:ring-red-600' : 'text-gray-900 ring-gray-300 focus:ring-primary-600',
          ]"
          :disabled="disabled"
          @click="open"
      >

        <template v-if="opened">
          <span class="inline-flex items-center flex-wrap -ml-1 -mt-1">

            <!-- tags as badges -->
            <span v-for="(item, index) in model" :key="index" class="mt-1 ml-1 inline-flex items-center gap-x-0.5 rounded-md bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10 whitespace-nowrap">
              {{ item }}
              <button
                  type="button"
                  class="group relative -mr-1 size-3.5 rounded-xs hover:bg-gray-500/20"
                  @click.prevent="onRemove(index)"
                  v-tooltip="{ content: $t('common.action.remove') }"
              >
                <XMarkIcon class="size-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75"/>
                <span class="absolute -inset-1"></span>
              </button>
            </span>

            <input
                v-model="tag"
                name="tag-input"
                ref="inputElement"
                type="text"
                class="mt-1 ml-1 p-0 border-0 ring-0 text-sm disabled:opacity-75 disabled:cursor-not-allowed"
                :placeholder="$t('form.tags.placeholder')"
                :minlength="minlength"
                :maxlength="maxlength"
                :disabled="isInputDisabled"
                required
                @keydown.enter.prevent="onEnter"
                @keydown.delete="onBackspace"
            >

          </span>
        </template>

        <template v-else>

          <!-- selected text -->
          <span v-if="model.length === 0" class="block truncate flex-1">
            {{ $t('form.tags.empty') }}
          </span>

          <span v-else class="block flex-1 flex items-center space-x-1 overflow-x-scroll scrollbar-hidden">
            <span v-for="(item, index) in model" :key="index" class="inline-flex items-center rounded-md bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10 whitespace-nowrap">
              {{ item }}
            </span>
          </span>

          <!-- selected tags counter -->
          <span
              v-if="model.length > 1"
              class="px-1.5 rounded-md bg-gray-50 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
              v-tooltip="{ content: model.join(', ') }"
          >
            {{ model.length }}
          </span>

        </template>

      </button>

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
import {XMarkIcon} from "@heroicons/vue/24/outline";
import type {TooltipOptions} from "~/types/directives/tooltip.types";

const props = withDefaults(defineProps<{
  name: string
  label?: string
  id?: string
  hint?: string
  help?: TooltipOptions
  error?: string | null
  required?: boolean
  disabled?: boolean
  maxlength?: number
  minlength?: number
  max?: number
}>(), {
  required: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'change', value: string[]): void
}>()

const opened = ref<boolean>(false)
const tag = ref<string|null>(null)

const buttonElement = ref<HTMLButtonElement|null>(null)
const inputElement = ref<HTMLInputElement|null>(null)

const model = defineModel<string[]>({default: [], required: false})
const inputId = computed<string>(() => props.id || _.kebabCase(props.name))

const isInputDisabled = computed<boolean>(() => {
  return props.max !== undefined && model.value.length === props.max
})

const underlyingValue = computed<null | string>(() => {
  return model.value.length > 0 ? model.value[0] : null
})

function onEnter(): void {
  if (!tag.value) {
    return
  }

  const isValid = inputElement.value!.reportValidity()

  if (!isValid) {
    return
  }

  // firstly, filter out already selected
  // tag with the same value to prevent
  // duplicates
  model.value = model.value.filter(item => item !== tag.value)

  model.value = [...model.value, tag.value]

  // clear input value
  tag.value = null

  emit('change', model.value)
}

function onBackspace(): void {
  if (tag.value) {
    return
  }

  if (model.value.length === 0) {
    return
  }

  model.value = [...model.value.slice(0, model.value.length - 1)]

  emit('change', model.value)
}

function onRemove(index: number): void {
  const tag = model.value[index]

  model.value = model.value.filter(item => item !== tag)

  emit('change', model.value)
}

function open(): void {
  // show input
  opened.value = true

  // add event listener for clicking outside
  document.addEventListener('click', handleClickOutside, true)

  // focus input element once the input is opened
  nextTick(() => {
    inputElement.value!.focus()
  })
}

function close(): void {
  // hide input
  opened.value = false

  // clear input element
  tag.value = null

  // remove event listener for clicking outside
  document.removeEventListener('click', handleClickOutside, true)
}

function handleClickOutside(e: MouseEvent): void {
  const target = e.target as HTMLElement

  if (
      target !== buttonElement.value &&
      !buttonElement.value!.contains(target)
  ) {
    close()
  }
}
</script>