<template>
  <button
      type="button"
      class="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      v-tooltip="{ content: $t('tooltip.common.clipboard') }"
      @click="handleClick"
  >
    {{ label ?? value }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string
  label?: string
}>()

const toaster = useToaster()

const state = ref<boolean>(false)

async function handleClick(): Promise<void> {
  await navigator.clipboard.writeText(props.value);
  await toaster.success({title: 'toast.common.copiedToClipboard'})
}
</script>
