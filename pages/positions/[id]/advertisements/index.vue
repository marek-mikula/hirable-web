<template>
  <div>
    <NuxtLink :to="`/positions/${position.id}/advertisements/create`">Nový inzerát</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import type {Position} from "~/repositories/resources";

const props = defineProps<{
  position: Position
}>()
</script>
