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

      <template #actionsSlot="{ item }">
        <CommonButton
            variant="danger"
            :size="2"
            :icon="TrashIcon"
            v-tooltip="{ content: $t('common.action.delete') }"
            @click="onDelete(item)"
        />
      </template>

      <template #stateSlot="{ item }">
        <TokenInvitationState :invitation="item"/>
      </template>

      <template #linkSlot="{ item }">
        <span v-if="item.isUsed || item.isExpired">-</span>
        <CommonClipboard v-else :value="item.link">{{ $t('model.common.link') }}</CommonClipboard>
      </template>

      <template #emailSlot="{ item }">
        <CommonLink :href="`mailto:${item.email}`">{{ item.email }}</CommonLink>
      </template>

      <template #roleSlot="{ item }">
        <UserRole :role="item.role"/>
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

    <CompanyInvitationStoreModal :open="modalOpened" @close="modalOpened = false" @invite="onInvited"/>

  </div>
</template>

<script setup lang="ts">
import {TrashIcon} from "@heroicons/vue/24/outline";
import {GRID, ROLE} from "~/types/enums";
import type {Company, TokenInvitation} from "~/repositories/resources";
import type {DataGridTableExpose, GridQueryString} from "~/types/components/dataGrid/table.types";
import companyRole from "~/middleware/companyRole";

definePageMeta({
  middleware: [
    companyRole(ROLE.ADMIN)
  ]
})

defineProps<{
  company: Company
}>()

const toaster = useToaster()
const modalConfirm = useModalConfirm()
const {user} = useAuth<true>()
const api = useApi()
const { t } = useI18n()

const dataGrid = ref<DataGridTableExpose|null>(null)
const modalOpened = ref<boolean>(false)

useHead({
  title: () => t('page.company.invitations.title'),
})

async function getInvitations(query: GridQueryString) {
  return (await api.companyInvitation.index(user.value.companyId, query))._data!.data.invitations
}

function onInvited(): void {
  modalOpened.value = false
  dataGrid.value!.refresh()
}

async function onDelete(invitation: TokenInvitation): Promise<void> {
  const confirmed = await modalConfirm.showConfirmModalPromise({
    title: t('modal.company.deleteInvitation.title'),
    text: t('modal.company.deleteInvitation.text'),
    manual: true
  })

  if (!confirmed) {
    return
  }

  modalConfirm.setLoading(true)

  const result = await handle(async () => api.companyInvitation.deleteInvitation(user.value.companyId, invitation.id))

  modalConfirm.setLoading(false)
  modalConfirm.hideConfirmModal()

  if (!result.success) {
    return
  }

  await toaster.success({
    title: 'toast.company.invitation.delete'
  })

  dataGrid.value!.refresh()
}
</script>