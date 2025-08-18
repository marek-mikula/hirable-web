<template>
  <div class="grid lg:grid-cols-3 gap-3 lg:gap-4 items-start">

    <div class="col-span-1 lg:col-span-2 min-w-0">
      1. panel
    </div>

    <div class="col-span-1 flex flex-col gap-3 lg:gap-4">
      2. panel
    </div>

  </div>
</template>

<script lang="ts" setup>
import type {Candidate} from "~/repositories/resources";

const props = defineProps<{
  candidate: Candidate
}>()

const emit = defineEmits<{
  (e: 'update', candidate: Candidate): void
}>()

function onUpdate(candidate: Candidate): void {
  emit('update', candidate)
}
</script>
