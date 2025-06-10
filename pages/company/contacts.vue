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
import {ChatBubbleBottomCenterIcon} from '@heroicons/vue/24/outline'
import {GRID} from "~/types/enums";
import type {Company, CompanyContact} from "~/repositories/resources";
import type {DataGridTableExpose, GridQueryString} from "~/types/components/dataGrid/table.types";

defineProps<{
  company: Company
}>()

const {user} = useAuth<true>()
const api = useApi()
const {t} = useI18n()

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
</script>