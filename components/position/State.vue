<template>
  <CommonBadge
      :variant="variant"
      :label="$t(`model.position.states.${state}`)"
      :icon="icon"
      v-tooltip="{ content: $t(`tooltip.position.states.${state}`) }"
  />
</template>

<script lang="ts" setup>
import type {BadgeVariant} from "~/types/components/common/badge.types";
import type {AnyComponent} from "~/types/common";
import {POSITION_STATE} from "~/types/enums";
import {
  PencilIcon,
  MegaphoneIcon,
  XMarkIcon,
  LockClosedIcon,
  UsersIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ClockIcon
} from "@heroicons/vue/24/outline";

const props = defineProps<{
  state: POSITION_STATE
}>()

const variant = computed<BadgeVariant>(() => {
  const map: { [key in POSITION_STATE]: BadgeVariant } = {
    [POSITION_STATE.DRAFT]: 'info',
    [POSITION_STATE.APPROVAL_PENDING]: 'info',
    [POSITION_STATE.APPROVAL_APPROVED]: 'success',
    [POSITION_STATE.APPROVAL_REJECTED]: 'danger',
    [POSITION_STATE.APPROVAL_CANCELED]: 'secondary',
    [POSITION_STATE.APPROVAL_EXPIRED]: 'warning',
    [POSITION_STATE.OPENED]: 'success',
    [POSITION_STATE.CLOSED]: 'secondary',
    [POSITION_STATE.CANCELED]: 'danger',
  }

  return map[props.state]
})

const icon = computed<AnyComponent>(() => {
  const map: { [key in POSITION_STATE]: AnyComponent } = {
    [POSITION_STATE.DRAFT]: PencilIcon,
    [POSITION_STATE.APPROVAL_PENDING]: UsersIcon,
    [POSITION_STATE.APPROVAL_APPROVED]: HandThumbUpIcon,
    [POSITION_STATE.APPROVAL_REJECTED]: HandThumbDownIcon,
    [POSITION_STATE.APPROVAL_CANCELED]: XMarkIcon,
    [POSITION_STATE.APPROVAL_EXPIRED]: ClockIcon,
    [POSITION_STATE.OPENED]: MegaphoneIcon,
    [POSITION_STATE.CLOSED]: LockClosedIcon,
    [POSITION_STATE.CANCELED]: XMarkIcon,
  }

  return map[props.state]
})
</script>
