<template>
  <DataGridTable :identifier="GRID.POSITION" :callee="getPositions" :clicker="getPositionLink">
    <template #idSlot="{ item }">
      {{ item.id }}
    </template>

    <template #stateSlot="{ item }">
      <span class="inline-flex items-center space-x-1">
        <PositionState :state="item.state"/>
        <PositionApprovalBadge v-if="item.state === POSITION_STATE.APPROVAL_PENDING" :approvals="item.approvals"/>
      </span>
    </template>

    <template #nameSlot="{ item }">
      {{ item.name }}
    </template>

    <template #departmentSlot="{ item }">
      {{ item.department ?? '-' }}
    </template>

    <template #createdAtSlot="{ item }">
      {{ $formatter.datetime(item.createdAt) }}
    </template>
  </DataGridTable>

  <ClientOnly>
    <teleport to="#page-title">
      <LayoutPageTitle
          :title="$t('page.positions.title')"
          :icon="BriefcaseIcon"
          :actions="filterNull([
              policy.position.store() ? {
                label: $t('layout.menu.create.position'),
                handler: createPosition,
                variant: 'primary',
              } : null
          ])"
      />
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import {BriefcaseIcon} from '@heroicons/vue/24/outline'
import type {GridQueryString} from "~/types/components/dataGrid/table.types";
import {GRID, POSITION_STATE} from "~/types/enums";
import type {PositionList} from "~/repositories/resources";
import type {RouteLocationRaw} from "vue-router";
import {getPositionFormStates} from "~/functions/position";

const {user} = useAuth<true>()
const { t } = useI18n()
const api = useApi()
const policy = usePolicy()

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

useHead({
  title: () => t('page.positions.title')
})

async function createPosition(): Promise<void> {
  await navigateTo('/positions/create')
}

async function getPositions(query: GridQueryString) {
  return (await api.position.index(query))._data!.data.positions
}

function getPositionLink(item: PositionList): RouteLocationRaw {
  if (item.state === POSITION_STATE.APPROVAL_PENDING) {
    return item.userId === user.value.id
        ? `/positions/edit/${item.id}`
        : `/positions/approve/${item.id}`
  }

  if (getPositionFormStates().includes(item.state)) {
    return `/positions/edit/${item.id}`
  }

  return `/positions/${item.id}`
}
</script>