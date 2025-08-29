<template>
  <div class="grid lg:grid-cols-3 gap-3 lg:gap-4 items-start">

    <CandidateDetailInfo :candidate="candidate" class="col-span-1 lg:col-span-2 min-w-0" @update="onUpdate"/>

    <div class="col-span-1 flex flex-col gap-3 lg:gap-4">
      2. panel
    </div>

  </div>
</template>

<script lang="ts" setup>
import type {CandidateShow} from "~/repositories/resources";

const props = defineProps<{
  candidate: CandidateShow
}>()

const emit = defineEmits<{
  (e: 'update', candidate: CandidateShow): void
}>()

function onUpdate(candidate: CandidateShow): void {
  emit('update', candidate)
}
</script>
