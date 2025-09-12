<template>
  <button
      type="button"
      :class="['w-full text-left rounded-md flex gap-x-1 block p-2 text-sm', active ? 'text-primary-600 bg-gray-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50']"
      role="menuitem"
      tabindex="-1"
      @click="(event) => emit('click', event)"
  >
    <slot/>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  active?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', event: Event): void
}>()
</script>
