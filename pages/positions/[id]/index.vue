<template>
  <div class="grid lg:grid-cols-3 gap-3 lg:gap-4 items-start">

    <PositionDetailInfo :position="position" class="col-span-1 lg:col-span-2 min-w-0" @update="onUpdate"/>

    <div class="col-span-1 flex flex-col gap-3 lg:gap-4">
      <PositionDetailShare :position="position"/>
      <PositionDetailComments :position="position"/>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type {Position} from "~/repositories/resources";

const props = defineProps<{
  position: Position
}>()

const emit = defineEmits<{
  (e: 'update', position: Position): void
}>()

const {t} = useI18n()
const api = useApi()
const toaster = useToaster()

function onUpdate(position: Position): void {
  emit('update', position)
}
</script>
