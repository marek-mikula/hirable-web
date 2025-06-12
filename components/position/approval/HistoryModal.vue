<template>
  <CommonModal width="3xl" :open="open" :title="$t('modal.position.approvalHistory.title')" @close="emit('close')">
    <template #content>
      <div class="p-4">
        <PositionApprovalTable :approvals="position.approvals"/>
      </div>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import type {Position} from "~/repositories/resources";

const props = defineProps<{
  position: Position
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void,
}>()
</script>