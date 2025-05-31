<template>
  <CommonBadge
      :variant="variant"
      :label="$t(`model.position.approvalStates.${position.approvalState}`)"
      :icon="icon"
      v-tooltip="{ content: $t(`tooltip.position.approvalStates.${position.approvalState}`) }"
  />
</template>

<script lang="ts" setup>
import {
  UsersIcon,
  XMarkIcon,
  ClockIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/vue/24/outline'
import type {Position} from "~/repositories/resources";
import type {BadgeVariant} from "~/types/components/common/badge.types";
import {POSITION_APPROVAL_STATE} from "~/types/enums";
import type {AnyComponent} from "~/types/common";

const props = defineProps<{
  position: Position
}>()

const variant = computed<BadgeVariant>(() => {
  const map: { [key in POSITION_APPROVAL_STATE]: BadgeVariant } = {
    [POSITION_APPROVAL_STATE.PENDING]: 'info',
    [POSITION_APPROVAL_STATE.APPROVED]: 'success',
    [POSITION_APPROVAL_STATE.REJECTED]: 'danger',
    [POSITION_APPROVAL_STATE.CANCELED]: 'secondary',
    [POSITION_APPROVAL_STATE.EXPIRED]: 'warning',
  }

  return map[props.position.approvalState!]
})

const icon = computed<AnyComponent>(() => {
  const map: { [key in POSITION_APPROVAL_STATE]: AnyComponent } = {
    [POSITION_APPROVAL_STATE.PENDING]: UsersIcon,
    [POSITION_APPROVAL_STATE.APPROVED]: HandThumbUpIcon,
    [POSITION_APPROVAL_STATE.REJECTED]: HandThumbDownIcon,
    [POSITION_APPROVAL_STATE.CANCELED]: XMarkIcon,
    [POSITION_APPROVAL_STATE.EXPIRED]: ClockIcon,
  }

  return map[props.position.approvalState!]
})

onMounted(() => {
  if (!props.position.approvalState) {
    throw new Error('Cannot render position approval state with empty value.')
  }
})
</script>
