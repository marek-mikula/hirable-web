<template>
  <CommonBadge
      :variant="variant"
      :label="$t(`model.position.approvalStates.${position.approvalState}`)"
      :icon="icon"
  />
</template>

<script lang="ts" setup>
import {XMarkIcon, CheckIcon, ClockIcon} from '@heroicons/vue/24/outline'
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
  }

  return map[props.position.approvalState!]
})

const icon = computed<AnyComponent>(() => {
  const map: { [key in POSITION_APPROVAL_STATE]: AnyComponent } = {
    [POSITION_APPROVAL_STATE.PENDING]: ClockIcon,
    [POSITION_APPROVAL_STATE.APPROVED]: CheckIcon,
    [POSITION_APPROVAL_STATE.REJECTED]: XMarkIcon,
  }

  return map[props.position.approvalState!]
})

onMounted(() => {
  if (!props.position.approvalState) {
    throw new Error('Cannot render position approval state with empty value.')
  }
})
</script>
