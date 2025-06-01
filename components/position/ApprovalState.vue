<template>
  <CommonBadge
      :variant="variant"
      :label="$t(`model.position.approvalStates.${state}`)"
      :icon="icon"
      v-tooltip="withoutTooltip ? false : { content: $t(`tooltip.position.approvalStates.${state}`) }"
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
import type {BadgeVariant} from "~/types/components/common/badge.types";
import type {AnyComponent} from "~/types/common";
import {POSITION_APPROVAL_STATE} from "~/types/enums";

const props = withDefaults(defineProps<{
  state: POSITION_APPROVAL_STATE
  withoutTooltip?: boolean
}>(), {
  withoutTooltip: false,
})

const variant = computed<BadgeVariant>(() => {
  const map: { [key in POSITION_APPROVAL_STATE]: BadgeVariant } = {
    [POSITION_APPROVAL_STATE.PENDING]: 'info',
    [POSITION_APPROVAL_STATE.APPROVED]: 'success',
    [POSITION_APPROVAL_STATE.REJECTED]: 'danger',
    [POSITION_APPROVAL_STATE.CANCELED]: 'secondary',
    [POSITION_APPROVAL_STATE.EXPIRED]: 'warning',
  }

  return map[props.state]
})

const icon = computed<AnyComponent>(() => {
  const map: { [key in POSITION_APPROVAL_STATE]: AnyComponent } = {
    [POSITION_APPROVAL_STATE.PENDING]: UsersIcon,
    [POSITION_APPROVAL_STATE.APPROVED]: HandThumbUpIcon,
    [POSITION_APPROVAL_STATE.REJECTED]: HandThumbDownIcon,
    [POSITION_APPROVAL_STATE.CANCELED]: XMarkIcon,
    [POSITION_APPROVAL_STATE.EXPIRED]: ClockIcon,
  }

  return map[props.state]
})
</script>
