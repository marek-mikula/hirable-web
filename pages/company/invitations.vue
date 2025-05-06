<template>
  <div class="space-y-3 lg:space-y-4">

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
        <span v-if="item.isExpired" class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
          {{ $t('model.token.states.expired') }}
        </span>
        <span v-else-if="item.isUsed" class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-600/20 ring-inset">
          {{ $t('model.token.states.used') }}
        </span>
        <span v-else class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
          {{ $t('model.token.states.active') }}
        </span>
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

    <CompanyProfileInvitationModal :open="modalOpened" @close="modalOpened = false" @invited="onInvited"/>

  </div>
</template>

<script setup lang="ts">
import {GRID} from "~/types/enums";
import type {GridQueryString} from "~/types/grid";
import type {DataGridExpose} from "~/types/components";
import type {Company} from "~/repositories/resources";

defineProps<{
  company: Company
}>()

const api = useApi()
const { t } = useI18n()

const dataGrid = ref<DataGridExpose|null>(null)
const search = ref<string | null>(null)
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