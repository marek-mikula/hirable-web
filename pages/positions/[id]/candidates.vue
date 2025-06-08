<template>
  <div>
    Candidates
  </div>
</template>

<script lang="ts" setup>
import type {Position} from "~/repositories/resources";

const props = defineProps<{
  position: Position
}>()
</script>
