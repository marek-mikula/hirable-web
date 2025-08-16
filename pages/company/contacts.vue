<template>
  <div>

    <DataGridTable ref="dataGrid" :identifier="GRID.COMPANY_CONTACT" :callee="getContacts" :clicker="onRowClick">

      <template #actions>
        <CommonButton
          variant="primary"
          :label="$t('modal.company.storeContact.title')"
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

      <template #companyNameSlot="{ item }">
        {{ item.companyName || '-' }}
      </template>

      <template #firstnameSlot="{ item }">
        {{ item.firstname }}
      </template>

      <template #lastnameSlot="{ item }">
        {{ item.lastname }}
      </template>

      <template #emailSlot="{ item }">
        <CommonLink :href="`mailto:${item.email}`">{{ item.email }}</CommonLink>
      </template>

      <template #noteSlot="{ item }">
        <ChatBubbleBottomCenterIcon v-if="item.note" v-tooltip="{ content: item.note }" class="size-4"/>
        <span v-else>-</span>
      </template>

    </DataGridTable>

    <CompanyContactStoreModal :open="modalOpened" @close="modalOpened = false" @store="onStored"/>
    <CompanyContactUpdateModal :contact="updateModal" @close="updateModal = null" @update="onUpdated"/>

  </div>
</template>

<script setup lang="ts">
import {ChatBubbleBottomCenterIcon, TrashIcon} from '@heroicons/vue/24/outline'
import {GRID, RESPONSE_CODE} from "~/types/enums";
import type {Company, CompanyContact} from "~/repositories/resources";
import type {DataGridTableExpose, GridQueryString} from "~/types/components/dataGrid/table.types";
import type {ContactPendingApprovalsResponse} from "~/repositories/companyContact/responses";

defineProps<{
  company: Company
}>()

const {user} = useAuth<true>()
const api = useApi()
const {t} = useI18n()
const modalConfirm = useModalConfirm()
const toaster = useToaster()

const dataGrid = ref<DataGridTableExpose|null>(null)
const modalOpened = ref<boolean>(false)
const updateModal = ref<CompanyContact|null>(null)

useHead({
  title: () => t('page.company.contacts.title'),
})

async function getContacts(query: GridQueryString) {
  return (await api.companyContact.index(user.value.companyId, query))._data!.data.contacts
}

function onRowClick(contact: CompanyContact): void {
  updateModal.value = contact
}

function onStored(): void {
  modalOpened.value = false
  dataGrid.value!.refresh()
}

function onUpdated(contact: CompanyContact): void {
  updateModal.value = null
  dataGrid.value!.refresh()
}

async function onDelete(contact: CompanyContact): Promise<void> {
  const confirmed = await modalConfirm.showConfirmModalPromise({
    title: t('modal.company.deleteContact.title'),
    text: t('modal.company.deleteContact.text'),
    manual: true
  })

  if (!confirmed) {
    return
  }

  modalConfirm.setLoading(true)

  const result = await handle(async () => api.companyContact.deleteContact(user.value.companyId, contact.id), async (e) => {
    if (!isJsonResponseError<ContactPendingApprovalsResponse>(e, RESPONSE_CODE.CONTACT_PENDING_APPROVALS)) {
      return false
    }

    await toaster.error({
      title: {
        key: 'toast.company.contact.delete.pendingApprovals', values: {
          positions: e.response!._data!.data.positions.map(p => `"${p.name}"`).join(', ')
        }
      },
    })

    return true
  })

  modalConfirm.setLoading(false)
  modalConfirm.hideConfirmModal()

  if (!result.success) {
    return
  }

  await toaster.success({
    title: 'toast.company.contact.delete.success'
  })

  dataGrid.value!.refresh()
}
</script>