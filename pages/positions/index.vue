<template>
  <DataGridTable :identifier="GRID.POSITION" :callee="getPositions" :linker="getPositionLink">
    <template #idSlot="{ item }">
      {{ item.id }}
    </template>

    <template #stateSlot="{ item }">
      <PositionState :position="item"/>
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
          :actions="[
              {
                label: $t('layout.menu.create.position'),
                handler: createPosition,
                variant: 'primary',
              }
          ]"
      />
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import {BriefcaseIcon} from '@heroicons/vue/24/outline'
import type {GridQueryString} from "~/types/components/dataGrid/table.types";
import {GRID} from "~/types/enums";
import type {Position} from "~/repositories/resources";
import type {RouteLocationRaw} from "vue-router";
import {getRouteByPosition} from "~/functions/position";

const { t } = useI18n()
const api = useApi()

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

function getPositionLink(item: Position): RouteLocationRaw {
  return getRouteByPosition(item)
}
</script>