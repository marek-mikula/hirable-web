<template>
  <CommonTable
      :columns="[
          {key: 'name', label: $t('model.common.name')},
          {key: 'role', label: $t('model.common.role')},
          {key: 'state', label: $t('model.common.state')},
          {key: 'note', label: $t('model.common.note')},
          {key: 'round', label: $t('model.positionApproval.round')},
          {key: 'decidedAt', label: $t('model.positionApproval.decidedAt')},
          {key: 'remindedAt', label: $t('model.positionApproval.remindedAt')},
      ]"
      :items="approvals"
      key-attribute="id"
  >

    <template #noteSlot="{item}">
      <ChatBubbleBottomCenterIcon v-if="item.note" v-tooltip="{ content: item.note }" class="size-4"/>
    </template>

    <template #roleSlot="{item}">
          <span v-if="item.role">
            {{ $t(`model.position.roles.${item.role}`) }}
          </span>
      <CommonBadge v-else variant="danger" :label="$t('common.deleted')"/>
    </template>

    <template #nameSlot="{item}">
      {{ item.model ? item.model.label : '-' }}
    </template>

    <template #stateSlot="{item}">
      <PositionApprovalState :state="item.state"/>
    </template>

    <template #roundSlot="{item}">
      {{ item.round }}
    </template>

    <template #decidedAtSlot="{item}">
      {{ item.decidedAt ? $formatter.datetime(item.decidedAt) : '-' }}
    </template>

    <template #remindedAtSlot="{item}">
      {{ item.remindedAt ? $formatter.datetime(item.remindedAt) : '-' }}
    </template>

  </CommonTable>
</template>

<script lang="ts" setup>
import {ChatBubbleBottomCenterIcon} from '@heroicons/vue/24/outline'
import type {PositionApproval} from "~/repositories/resources";

defineProps<{
  approvals: PositionApproval[]
}>()
</script>