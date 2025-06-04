<template>
  <div>

    <DataGridTable ref="dataGrid" :identifier="GRID.COMPANY_INVITATION" :callee="getInvitations">
      <template #actions>
        <CommonButton
            type="submit"
            :label="$t('common.action.invite')"
            @click="modalOpened = true"
        />
      </template>

      <template #idSlot="{ item }">
        {{ item.id }}
      </template>

      <template #stateSlot="{ item }">
        <CommonBadge v-if="item.isExpired" type="danger" :label="$t('model.token.states.expired')"/>
        <CommonBadge v-if="item.isUsed" type="info" :label="$t('model.token.states.used')"/>
        <CommonBadge v-else type="success" :label="$t('model.token.states.active')"/>
      </template>

      <template #linkSlot="{ item }">
        <span v-if="item.isUsed || isExpired">-</span>
        <CommonClipboard v-else :value="item.link">{{ $t('model.common.link') }}</CommonClipboard>
      </template>

      <template #emailSlot="{ item }">
        <CommonLink :href="`mailto:${item.email}`">{{ item.email }}</CommonLink>
      </template>

      <template #roleSlot="{ item }">
        {{ $t(`model.company.roles.${item.role}`) }}
      </template>

      <template #usedAtSlot="{ item }">
        {{ item.usedAt ? $formatter.datetime(item.usedAt) : '-' }}
      </template>

      <template #validUntilSlot="{ item }">
        {{ $formatter.datetime(item.validUntil) }}
      </template>

      <template #createdAtSlot="{ item }">
        {{ $formatter.datetime(item.createdAt) }}
      </template>
    </DataGridTable>

    <CompanyProfileInvitationModal :open="modalOpened" @close="modalOpened = false" @invite="onInvited"/>

  </div>
</template>

<script setup lang="ts">
import {GRID} from "~/types/enums";
import type {Company} from "~/repositories/resources";
import type {DataGridTableExpose, GridQueryString} from "~/types/components/dataGrid/table.types";

defineProps<{
  company: Company
}>()

const api = useApi()
const { t } = useI18n()

const dataGrid = ref<DataGridTableExpose|null>(null)
const modalOpened = ref<boolean>(false)

useHead({
  title: () => t('page.company.invitations.title'),
})

async function getInvitations(query: GridQueryString) {
  return (await api.companyInvitation.index(query))._data!.data.invitations
}

function onInvited(): void {
  modalOpened.value = false
  dataGrid.value!.refresh()
}
</script>