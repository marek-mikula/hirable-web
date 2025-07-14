<template>
  <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-900"
  >
    {{ label }}
    <span
        v-if="required"
        class="font-bold text-red-500"
        v-tooltip="{ content: $t('form.required') }"
    >*</span>
  </label>
</template>

<script lang="ts" setup>
defineProps<{
  inputId: string
  label: string
  required: boolean
}>()
</script>
