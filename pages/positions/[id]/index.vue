<template>
  <div class="grid lg:grid-cols-3 gap-3 lg:gap-4 items-start">

    <PositionDetailInfo :position="position" class="col-span-1 lg:col-span-2"/>

    <PositionDetailComments :position="position" class="col-span-1"/>

  </div>
</template>

<script lang="ts" setup>
import type {Position} from "~/repositories/resources";

const props = defineProps<{
  position: Position
}>()

const {t} = useI18n()
const api = useApi()
const toaster = useToaster()
</script>
