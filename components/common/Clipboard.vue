<template>
  <button
      type="button"
      class="text-primary-600 hover:text-primary-500 hover:underline disabled:opacity-75 disabled:cursor-not-allowed"
      :disabled="state"
      v-tooltip="{ content: $t('common.action.copy') }"
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
