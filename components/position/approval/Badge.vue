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
}>()

const {t} = useI18n()

const label = computed<string>(() => {
  const approved = props.approvals.filter(approval => approval.state === POSITION_APPROVAL_STATE.APPROVED).length
  const total = props.approvals.length

  return `${approved} / ${total}`
})
</script>
