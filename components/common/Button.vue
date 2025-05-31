<template>
  <button
      ref="button"
      :class="classList"
      :type="type"
      :disabled="disabled"
      @click="onClick"
  >
    <!-- button loader -->
    <CommonLoader v-if="loading"/>

    <!-- content of the button is defined by slot -->
    <slot v-else-if="$slots['default']"/>

    <!-- content is defined by label -->
    <span v-else>{{ label || '' }}</span>
  </button>
</template>

<script setup lang="ts">
import type {RouteLocationRaw} from "vue-router";
import type {ButtonExpose, ButtonSize, ButtonType, ButtonVariant} from "~/types/components/common/button.types";

const props = withDefaults(defineProps<{
  label?: string
  type?: ButtonType
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  symmetrical?: boolean
  to?: RouteLocationRaw
}>(), {
  type: 'button',
  variant: 'primary',
  size: 3,
  loading: false,
  disabled: false,
  symmetrical: false,
})

const emit = defineEmits<{
  (e: 'click', event: Event): void
}>()

const button = ref<HTMLButtonElement | null>(null)

const classList = computed<string>(() => {
  const items = [
    'font-medium shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-75 disabled:cursor-not-allowed'
  ]

  switch (props.size) {
    case 1:
      items.push('rounded text-xs')
      items.push(props.symmetrical ? 'p-1' : 'px-2 py-1')
      break
    case 2:
      items.push('rounded text-sm')
      items.push(props.symmetrical ? 'p-1' : 'px-2 py-1')
      break
    case 3:
      items.push('rounded-md text-sm')
      items.push(props.symmetrical ? 'p-1.5' : 'px-2.5 py-1.5')
      break
    case 4:
      items.push('rounded-md text-sm')
      items.push(props.symmetrical ? 'p-2' : 'px-3 py-2')
      break
    case 5:
      items.push('rounded-md text-sm')
      items.push(props.symmetrical ? 'p-2.5' : 'px-3.5 py-2.5')
      break
  }

  switch (props.variant) {
    case 'primary':
      items.push('bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline-primary-600')
      break
    case 'secondary':
      items.push('bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-gray-600')
      break
    case 'danger':
      items.push('bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600')
      break
    case 'success':
      items.push('bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600')
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

function focus(): void {
  button.value!.focus()
}

defineExpose<ButtonExpose>({
  focus
})
</script>
