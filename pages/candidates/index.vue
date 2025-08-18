<template>
  <DataGridTable :identifier="GRID.CANDIDATE" :callee="getCandidates" :clicker="getCandidateLink">
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

    <template #createdAtSlot="{ item }">
      {{ $formatter.datetime(item.createdAt) }}
    </template>
  </DataGridTable>

  <ClientOnly>
    <teleport to="#page-title">
      <LayoutPageTitle
          :title="$t('page.candidate.title')"
          :icon="UsersIcon"
      />
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import {GRID} from "~/types/enums";
import {UsersIcon} from '@heroicons/vue/24/outline'
import type {GridQueryString} from "~/types/components/dataGrid/table.types";
import type {CandidateList} from "~/repositories/resources";
import type {RouteLocationRaw} from "vue-router";

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

const api = useApi()
const { t } = useI18n()

useHead({
  title: () => t('page.candidate.title')
})

async function getCandidates(query: GridQueryString) {
  return (await api.candidate.index(query))._data!.data.candidates
}

function getCandidateLink(item: CandidateList): RouteLocationRaw {
  return `/candidates/${item.id}`
}
</script>