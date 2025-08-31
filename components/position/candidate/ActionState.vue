<template>
  <CommonBadge
      :label="$t(`model.positionCandidateAction.states.${state}`)"
      :variant="variant"
  />
</template>

<script lang="ts" setup>
import type {BadgeVariant} from "~/types/components/common/badge.types";
import {ACTION_STATE} from "~/types/enums";

const props = defineProps<{
  state: ACTION_STATE
}>()

const variant = computed<BadgeVariant>(() => {
  const map: { [key in ACTION_STATE]: BadgeVariant } = {
    [ACTION_STATE.CREATED]: 'secondary',
    [ACTION_STATE.SENT]: 'info',
    [ACTION_STATE.FINISHED]: 'success',
    [ACTION_STATE.CANCELED]: 'danger',
  }

  return map[props.state]
})
</script>
