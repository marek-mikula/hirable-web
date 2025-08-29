<template>
  <CommonModal :open="open" width="3xl" :title="$t('modal.position.approvalHistory.title')" @close="emit('close')">
    <template #content>
      <div class="p-4 space-y-3">
        <PositionApprovalTable :approvals="position.approvals"/>
      </div>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import type {PositionShow} from "~/repositories/resources";

const props = defineProps<{
  position: PositionShow
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void,
}>()
</script>