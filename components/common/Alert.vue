<template>
  <div :class="['rounded-md p-2 sm:p-3 ring-1 ring-inset', colors.container]">
    <div class="flex">
      <div v-if="icon" class="shrink-0">
        <component :is="icon" :class="['size-5', colors.icon]"/>
      </div>
      <div :class="['space-y-1 sm:space-y-2', icon ? 'ml-3' : '']">

        <!-- alert title -->
        <h3 v-if="title" :class="['text-sm font-medium', colors.title]">
          {{ title }}
        </h3>

        <!-- alert description -->
        <div v-if="$slots['description']" :class="['text-sm', colors.description]">
          <slot name="description"/>
        </div>

        <!-- alert actions -->
        <div v-if="actions.length > 0" class="flex pt-1 space-x-2">
          <button
              v-for="(action, index) in actions"
              :key="index"
              type="button"
              :class="['rounded-md px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2', colors.button]"
              @click.prevent="triggerAction(action)"
          >
            <CommonLoader v-if="action.loading"/>
            <span v-else>
              {{ translate(action.label) }}
            </span>
          </button>
        </div>

      </div>

      <div v-if="! static" class="ml-auto pl-3">
        <div class="-mx-1 -my-1 flex">
          <button
              type="button"
              :class="['inline-flex rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-offset-2', colors.closeBtn]"
              @click.prevent="remove"
          >
            <XMarkIcon class="size-5"/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import type {AnyComponent, StringMap, Translation} from "~/types/common";

type ActionHandler = (() => void) | (() => Promise<void>)

type Action = {
  handler: ActionHandler
  label: Translation
  loading?: boolean
}

const props = withDefaults(defineProps<{
  title?: string
  type?: 'success' | 'info' | 'warning' | 'danger' | 'secondary'
  static?: boolean
  actions?: Action[]
}>(), {
  type: 'info',
  static: false,
  actions: () => []
})

const emit = defineEmits<{
  (e: 'remove'): void,
}>()

const icon = computed<AnyComponent | null>(() => ({
  'success': CheckCircleIcon,
  'info': InformationCircleIcon,
  'warning': ExclamationTriangleIcon,
  'danger': XCircleIcon,
  'secondary': null,
}[props.type]))

const colors = computed<StringMap<string>>(() => ({
  'success': {
    container: 'bg-green-50 ring-green-200',
    icon: 'text-green-400',
    title: 'text-green-700',
    description: 'text-green-600',
    closeBtn: 'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50',
    button: 'bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-600 focus:ring-offset-green-50'
  },
  'info': {
    container: 'bg-blue-50 ring-blue-200',
    icon: 'text-blue-400',
    title: 'text-blue-700',
    description: 'text-blue-600',
    closeBtn: 'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50',
    button: 'bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-600 focus:ring-offset-blue-50'
  },
  'warning': {
    container: 'bg-yellow-50 ring-yellow-200',
    icon: 'text-yellow-400',
    title: 'text-yellow-700',
    description: 'text-yellow-600',
    closeBtn: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50',
    button: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-600 focus:ring-offset-yellow-50'
  },
  'danger': {
    container: 'bg-red-50 ring-red-200',
    icon: 'text-red-400',
    title: 'text-red-700',
    description: 'text-red-600',
    closeBtn: 'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50',
    button: 'bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-600 focus:ring-offset-red-50'
  },
  'secondary': {
    container: 'bg-gray-50 ring-gray-200',
    icon: 'text-gray-400',
    title: 'text-gray-700',
    description: 'text-gray-600',
    closeBtn: 'bg-gray-50 text-gray-500 hover:bg-gray-100 focus:ring-gray-600 focus:ring-offset-gray-50',
    button: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-600 focus:ring-offset-gray-50'
  }
}[props.type]))

const isLoading = computed<boolean>(() => {
  return props.actions.some(action => action.loading)
})

function remove(): void {
  if (props.static) {
    return
  }

  emit('remove')
}

async function triggerAction(action: Action): Promise<void> {
  // user cannot trigger any action when
  // other action is loading
  if (isLoading.value) {
    return
  }

  await action.handler()
}
</script>
