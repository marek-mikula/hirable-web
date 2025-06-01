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
import {PencilIcon, MegaphoneIcon, XMarkIcon, LockClosedIcon} from "@heroicons/vue/24/outline";

const props = defineProps<{
  state: POSITION_STATE
}>()

const variant = computed<BadgeVariant>(() => {
  const map: { [key in POSITION_STATE]: BadgeVariant } = {
    [POSITION_STATE.DRAFT]: 'info',
    [POSITION_STATE.OPENED]: 'success',
    [POSITION_STATE.CLOSED]: 'secondary',
    [POSITION_STATE.CANCELED]: 'danger',
  }

  return map[props.state]
})


const icon = computed<AnyComponent>(() => {
  const map: { [key in POSITION_STATE]: AnyComponent } = {
    [POSITION_STATE.DRAFT]: PencilIcon,
    [POSITION_STATE.OPENED]: MegaphoneIcon,
    [POSITION_STATE.CLOSED]: LockClosedIcon,
    [POSITION_STATE.CANCELED]: XMarkIcon,
  }

  return map[props.state]
})
</script>
