<template>
  <CommonBadge
      :variant="variant"
      :label="$t(`model.position.states.${position.state}`)"
      v-tooltip="{ content: $t(`tooltip.position.states.${position.state}`) }"
  />
</template>

<script lang="ts" setup>
import type {Position} from "~/repositories/resources";
import type {BadgeVariant} from "~/types/components/common/badge.types";
import {POSITION_STATE} from "~/types/enums";

const props = defineProps<{
  position: Position
}>()

const variant = computed<BadgeVariant>(() => {
  const map: { [key in POSITION_STATE]: BadgeVariant } = {
    [POSITION_STATE.DRAFT]: 'info',
    [POSITION_STATE.OPENED]: 'success',
    [POSITION_STATE.CLOSED]: 'secondary',
    [POSITION_STATE.CANCELED]: 'danger',
  }

  return map[props.position.state]
})
</script>
