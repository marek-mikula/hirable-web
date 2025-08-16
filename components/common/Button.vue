<template>
  <button :class="classList" :type="type" :disabled="disabled || loading" @click="onClick">

    <template v-if="label && icon">
      <CommonSpinner v-if="loading"  :variant="spinnerVariant" :size="iconSize"/>
      <component v-else :is="icon" :class="iconSize"/>
      <span>{{ label }}</span>
    </template>

    <template v-else-if="label">
      <CommonSpinner v-if="loading" :variant="spinnerVariant" :size="iconSize"/>
      <span v-if="loading">{{ $t('common.loading') }}</span>
      <span v-else>{{ label }}</span>
    </template>

    <template v-else-if="icon">
      <CommonSpinner v-if="loading" :variant="spinnerVariant" :size="iconSize"/>
      <component v-else :is="icon" :class="iconSize"/>
    </template>

  </button>
</template>

<script setup lang="ts">
import type {ButtonSize, ButtonType, ButtonVariant} from "~/types/components/common/button.types";
import type {AnyComponent, StringMap} from "~/types/common";
import type {SpinnerVariant} from "~/types/components/common/spinner.types";
import type {RouteLocationRaw} from "vue-router";

const props = withDefaults(defineProps<{
  label?: string
  icon?: AnyComponent
  type?: ButtonType
  variant?: ButtonVariant
  size?: ButtonSize
  to?: RouteLocationRaw
  loading?: boolean
  disabled?: boolean
}>(), {
  type: 'button',
  variant: 'primary',
  size: 3,
  loading: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'click', event: Event): void
}>()

const spinnerVariant = computed<SpinnerVariant>(() => {
  const map: StringMap<SpinnerVariant> = {
    'primary': 'primary',
    'secondary': 'secondary',
    'danger': 'danger',
    'success': 'success',
    'blank': 'secondary',
  }
  return map[props.variant]
})

const iconSize = computed<string>(() => {
  return {
    1: 'size-4',
    2: 'size-5',
    3: 'size-5',
    4: 'size-5',
    5: 'size-5',
  }[props.size]
})

const classList = computed<string>(() => {
  const symmetrical = props.icon && !props.label

  const items = [
    'flex items-center justify-center space-x-1 whitespace-nowrap font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-75 disabled:cursor-not-allowed'
  ]

  switch (props.size) {
    case 1:
      items.push('rounded-sm text-xs')
      items.push(symmetrical ? 'p-1' : 'px-2 py-1')
      break
    case 2:
      items.push('rounded-sm text-sm')
      items.push(symmetrical ? 'p-1' : 'px-2 py-1')
      break
    case 3:
      items.push('rounded-md text-sm')
      items.push(symmetrical ? 'p-1.5' : 'px-2.5 py-1.5')
      break
    case 4:
      items.push('rounded-md text-sm')
      items.push(symmetrical ? 'p-2' : 'px-3 py-2')
      break
    case 5:
      items.push('rounded-md text-sm')
      items.push(symmetrical ? 'p-2.5' : 'px-3.5 py-2.5')
      break
  }

  switch (props.variant) {
    case 'primary':
      items.push('shadow-xs bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline-primary-600')
      break
    case 'secondary':
      items.push('shadow-xs bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-gray-600')
      break
    case 'danger':
      items.push('shadow-xs bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600')
      break
    case 'success':
      items.push('shadow-xs bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600')
      break
    case 'blank':
      items.push('text-gray-900 hover:text-gray-500 focus-visible:outline-gray-600')
      break
  }

  return items.join(' ')
})

async function onClick(e: PointerEvent): Promise<void> {
  if (props.to) {
    await navigateTo(props.to)
  }

  emit('click', e)
}

onMounted(() => {
  if (!props.label && !props.icon) {
    throw new Error('Either label or icon must be set in Button.')
  }
})
</script>
