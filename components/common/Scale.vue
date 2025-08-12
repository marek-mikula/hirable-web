<template>
  <div class="flex items-center space-x-2">
    <span class="w-[25px] text-sm">{{ value }}</span>
    <div class="flex-1 min-w-0 flex w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div class="flex flex-col justify-center rounded-full overflow-hidden bg-primary-600 text-xs text-white text-center whitespace-nowrap transition duration-500" :style="`width: ${percentage}%`"></div>
    </div>
    <span class="w-[25px] text-sm">{{ max }}</span>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  value: number
  min?: number
  max?: number
}>(), {
  min: 0,
  max: 5,
})

const percentage = computed<number>(() => {
  return Math.max((props.value - props.min) / (props.max - props.min) * 100, 0)
})
</script>
