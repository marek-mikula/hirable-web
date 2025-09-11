<template>
  <button type="button" :disabled="disabled" class="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-75 disabled:cursor-not-allowed">
    <slot/>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  disabled?: boolean
}>()
</script>
