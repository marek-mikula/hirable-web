<template>
  <button
      type="button"
      class="text-gray-700 hover:text-primary-600 hover:bg-gray-50 w-full text-left rounded-md flex gap-x-1 text-gray-700 block p-2 text-sm"
      role="menuitem"
      tabindex="-1"
      @click="(event) => emit('click', event)"
  >
    <slot/>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click', event: Event): void
}>()
</script>
