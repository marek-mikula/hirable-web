<template>
  <div class="border border-gray-200 rounded-md overflow-hidden">
    <div :class="['text-center text-xs font-medium min-w-fit px-1 rounded-xs text-gray-900', colorClass]" :style="`width: ${percentage}%`">
      {{ value }} / {{ max }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {ScaleMapper} from "~/types/components/common/scale.types";

const props = withDefaults(defineProps<{
  value: number
  min?: number
  max?: number
  mapper?: ScaleMapper
}>(), {
  min: 0,
  max: 5,
})

const scaleMapper = ref<ScaleMapper>(props.mapper ?? createDefaultScaleMapper())

const percentage = computed<number>(() => {
  return (props.value - props.min) / (props.max - props.min) * 100
})

const colorClass = computed<string>(() => {
  if (percentage.value === 0.0) {
    return ''
  }

  for (const key in scaleMapper.value) {
    const passes = scaleMapper.value[key](percentage.value)

    if (! passes) {
      continue
    }

    return key
  }

  return ''
})

function createDefaultScaleMapper(): ScaleMapper {
  return {
    'bg-primary-50': (value) => value > 0 && value < 10,
    'bg-linear-to-r from-primary-50 to-primary-50': (value) => value >= 10 && value < 20,
    'bg-linear-to-r from-primary-50 to-primary-100': (value) => value >= 20 && value < 30,
    'bg-linear-to-r from-primary-50 to-primary-200': (value) => value >= 30 && value < 40,
    'bg-linear-to-r from-primary-50 to-primary-300': (value) => value >= 40 && value < 50,
    'bg-linear-to-r from-primary-50 to-primary-400': (value) => value >= 50 && value < 60,
    'bg-linear-to-r from-primary-50 to-primary-500': (value) => value >= 60 && value < 70,
    'bg-linear-to-r from-primary-50 to-primary-600': (value) => value >= 70 && value < 80,
    'bg-linear-to-r from-primary-50 to-primary-700': (value) => value >= 80 && value < 90,
    'bg-linear-to-r from-primary-50 to-primary-800': (value) => value >= 90 && value <= 100,
  }
}
</script>
