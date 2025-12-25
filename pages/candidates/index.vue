<template>
  <div>
    <DataGridTable :identifier="GRID.CANDIDATE" :callee="getCandidates" :clicker="getCandidateLink">
      <template v-if="policy.candidate.store()" #actions>
        <CommonButton
            variant="primary"
            :label="$t('common.action.add')"
            @click="storeModalOpened = true"
        />
      </template>

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

    <LazyCandidateStoreModal
        v-if="policy.candidate.store()"
        :open="storeModalOpened"
        @close="storeModalOpened = false"
    />
  </div>
</template>

<script setup lang="ts">
import {GRID} from "~/types/enums";
import {UsersIcon} from '@heroicons/vue/24/outline'
import type {GridQueryString} from "~/types/components/dataGrid/table.types";
import type {Candidate} from "~/repositories/resources";
import type {RouteLocationRaw} from "vue-router";

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

const policy = usePolicy()
const api = useApi()
const { t } = useI18n()

const storeModalOpened = ref(false)

useHead({
  title: () => t('page.candidate.title')
})

async function getCandidates(query: GridQueryString) {
  return (await api.candidate.index(query))._data!.data.candidates
}

function getCandidateLink(item: Candidate): RouteLocationRaw {
  return `/candidates/${item.id}`
}
</script>
