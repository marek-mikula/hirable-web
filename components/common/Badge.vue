<template>
  <span :class="['inline-flex items-center gap-x-0.5 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset whitespace-nowrap', colors.container]">
    <component v-if="icon" :is="icon" class="size-3"/>
    {{ label }}
    <button v-if="removable" type="button" :class="['group relative -mr-1 size-3.5 rounded-xs', colors.button]" @click="onClick">
      <XMarkIcon :class="['size-3.5', colors.icon]"/>
      <span class="absolute -inset-1"></span>
    </button>
  </span>
</template>

<script lang="ts" setup>
import type {AnyComponent, StringMap} from "~/types/common";
import type {BadgeVariant} from "~/types/components/common/badge.types";
import {XMarkIcon} from '@heroicons/vue/24/outline'

const props = withDefaults(defineProps<{
  label: string
  variant: BadgeVariant
  icon?: AnyComponent
  removable?: boolean
}>(), {
  removable: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const colors = computed<StringMap<string>>(() => ({
  'success': {
    container: 'bg-green-50 text-green-700 ring-green-600/20',
    button: 'hover:bg-green-600/20',
    icon: 'stroke-green-700/50 group-hover:stroke-green-700/75',
  },
  'info': {
    container: 'bg-blue-50 text-blue-700 ring-blue-700/10',
    button: 'hover:bg-blue-600/20',
    icon: 'stroke-blue-700/50 group-hover:stroke-blue-700/75',
  },
  'warning': {
    container: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
    button: 'hover:bg-yellow-600/20',
    icon: 'stroke-yellow-700/50 group-hover:stroke-yellow-700/75',
  },
  'danger': {
    container: 'bg-red-50 text-red-700 ring-red-600/10',
    button: 'hover:bg-red-600/20',
    icon: 'stroke-red-600/50 group-hover:stroke-red-600/75',
  },
  'secondary': {
    container: 'bg-gray-50 text-gray-600 ring-gray-500/10',
    button: 'hover:bg-gray-500/20',
    icon: 'stroke-gray-600/50 group-hover:stroke-gray-600/75',
  }
}[props.variant]))

function onClick(e: MouseEvent): void {
  emit('click', e)
}
</script>
