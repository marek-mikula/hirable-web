<template>
  <CommonBadge
      :variant="variant"
      :label="$t(`model.position.approvalStates.${position.approvalState}`)"
  />
</template>

<script lang="ts" setup>
import type {Position} from "~/repositories/resources";
import type {BadgeVariant} from "~/types/components/common/badge.types";
import {POSITION_APPROVAL_STATE} from "~/types/enums";

const props = defineProps<{
  position: Position
}>()

const variant = computed<BadgeVariant>(() => {
  const map: { [key in POSITION_APPROVAL_STATE]: BadgeVariant } = {
    [POSITION_APPROVAL_STATE.PENDING]: 'secondary',
    [POSITION_APPROVAL_STATE.APPROVED]: 'success',
    [POSITION_APPROVAL_STATE.REJECTED]: 'danger',
    [POSITION_APPROVAL_STATE.REJECTED_HM]: 'danger',
  }

  return map[props.position.approvalState!]
})

onMounted(() => {
  if (!props.position.approvalState) {
    throw new Error('Cannot render position approval state with empty value.')
  }
})
</script>
