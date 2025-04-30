<template>
  <div>
    <DataGridTable :identifier="GRID.CANDIDATE" :callee="getCandidates">
      <template #idSlot="{ item }">
        {{ item.id }}
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

      <template #linkedinSlot="{ item }">
        <CommonClipboard :value="item.linkedin"/>
      </template>

      <template #createdAtSlot="{ item }">
        {{ item.createdAt }}
      </template>
    </DataGridTable>
  </div>
</template>

<script setup lang="ts">
import {GRID} from "~/types/enums";
import type {GridQueryString} from "~/types/grid";

const api = useApi()
const { t } = useI18n()

definePageMeta({
  layout: 'app2',
  middleware: 'auth',
})

useHead({
  title: () => t('page.candidates.title')
})

async function getCandidates(query: GridQueryString) {
  return (await api.candidate.index(query))._data!.data.candidates
}
</script>