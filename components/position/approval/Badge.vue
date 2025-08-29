<template>
  <CommonBadge
      variant="info"
      :label="label"
      v-tooltip="{ content: $t('tooltip.position.approval') }"
  />
</template>

<script lang="ts" setup>
import type {PositionApproval} from "~/repositories/resources";
import {POSITION_APPROVAL_STATE} from "~/types/enums";

const props = defineProps<{
  approvals: PositionApproval[]
  round: number
}>()

const label = computed<string>(() => {
  const currentRound = props.approvals.filter(approval => approval.round === props.round)
  const approved = currentRound.filter(approval => approval.state === POSITION_APPROVAL_STATE.APPROVED).length
  const total = currentRound.length

  return `${approved} / ${total}`
})
</script>
