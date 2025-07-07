<template>
  <button
      type="button"
      class="hover:underline hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
      v-tooltip="{ content: $t('tooltip.common.clipboard') }"
      @click="handleClick"
  >
    <span v-if="state">
      {{ $t('common.copied') }}
    </span>
    <span v-else-if="! $slots.default">
      {{ value }}
    </span>
    <slot v-else/>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string
}>()

const state = ref<boolean>(false)

async function handleClick(): Promise<void> {
  if (state.value) {
    return
  }

  await navigator.clipboard.writeText(props.value);

  state.value = true

  window.setTimeout(() => {
    state.value = false
  }, 1000)
}
</script>
