<template>
  <slot v-if="number === 0"/>
  <span v-else class="relative">
    <span :class="['z-30 absolute text-white border border-white inline-flex items-center justify-center text-[10px] px-1.5 h-5 rounded-full -top-2 -right-2 font-semibold', {
      'bg-green-500': variant === 'success',
      'bg-blue-500': variant === 'info',
      'bg-yellow-500': variant === 'warning',
      'bg-red-500': variant === 'danger',
      'bg-gray-500': variant === 'secondary',
      'bg-primary-500': variant === 'primary',
    }]">{{ number > 99 ? '99+' : number }}</span>
    <slot/>
  </span>
</template>

<script setup lang="ts">
import type {IndicatorVariant} from "~/types/components/common/indicator.types";

withDefaults(defineProps<{
  number: number
  variant?: IndicatorVariant
}>(), {
  variant: 'success'
})
</script>
