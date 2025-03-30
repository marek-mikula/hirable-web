<template>
  <span>{{ label || $t('common.loading') }}{{ postfix }}</span>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
}>()

const postfix = ref<string>('')
const interval = ref<number | null>(null)

// this component cannot be initialized
// on the server, because of the window
// reference, which is not defined on
// the server
if (import.meta.browser) {
  onBeforeUnmount((): void => {
    if (interval.value) {
      window.clearInterval(interval.value)
    }
  })

  onMounted(() => {
    interval.value = window.setInterval(() => {
      postfix.value = postfix.value.length >= 3 ? '' : postfix.value + '.'
    }, 500)
  })
}
</script>