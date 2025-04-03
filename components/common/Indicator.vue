<template>
  <span class="relative">
    <span :class="['z-30 absolute text-white border border-white inline-flex items-center justify-center text-xs px-1.5 h-5 rounded-full -top-2 -right-2 font-semibold', {
      'bg-green-500': color === 'success',
      'bg-blue-500': color === 'info',
      'bg-yellow-500': color === 'warning',
      'bg-red-500': color === 'danger',
      'bg-gray-500': color === 'secondary',
      'bg-primary-500': color === 'primary',
    }]">{{ number > 99 ? '99+' : number }}</span>
    <slot/>
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  number: number
  color?: 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'primary'
}>(), {
  color: 'success'
})
</script>
