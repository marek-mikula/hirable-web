<template>
  <button type="button" class="text-primary-600 hover:text-primary-500 hover:underline rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600" @click="emit('click', $event)">
    <slot/>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click', event: PointerEvent): void
}>()
</script>
