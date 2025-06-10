<template>
  <CommonBadge
      :variant="variant"
      :label="$t(label)"
  />
</template>

<script lang="ts" setup>
import type {BadgeVariant} from "~/types/components/common/badge.types";
import type {TokenInvitation} from "~/repositories/resources";

const props = defineProps<{
  invitation: TokenInvitation
}>()

const variant = computed<BadgeVariant>(() => {
  if (props.invitation.isExpired) {
    return 'danger'
  }

  if (props.invitation.isUsed) {
    return 'info'
  }

  return 'success'
})

const label = computed<string>(() => {
  if (props.invitation.isExpired) {
    return 'model.token.states.expired'
  }

  if (props.invitation.isUsed) {
    return 'model.token.states.used'
  }

  return 'model.token.states.active'
})
</script>
