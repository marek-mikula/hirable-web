<template>
  <NuxtLink
      class="text-primary-600 hover:text-primary-500 hover:underline"
      :to="to"
      :href="href"
      :target="target"
  >
    <slot/>
  </NuxtLink>
</template>

<script setup lang="ts">
import type {RouteLocationRaw} from "vue-router";

defineProps<{
  to?: RouteLocationRaw
  href?: string
  target?: '_blank' | '_parent' | '_self' | '_top'
}>()
</script>
