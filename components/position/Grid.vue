<template>
  <DataGridTable :identifier="GRID.POSITION" :callee="getPositions" :clicker="getPositionLink">
    <template #idSlot="{ item }">
      {{ item.id }}
    </template>

    <template #stateSlot="{ item }">
      <PositionState :state="item.state"/>
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
</template>

<script setup lang="ts">
import type {GridQueryString} from "~/types/components/dataGrid/table.types";
import {GRID} from "~/types/enums";
import type {Position} from "~/repositories/resources";
import type {RouteLocationRaw} from "vue-router";
import {getRouteByPosition} from "~/functions/position";

const api = useApi()

async function getPositions(query: GridQueryString) {
  return (await api.position.index(query))._data!.data.positions
}

function getPositionLink(item: Position): RouteLocationRaw {
  return getRouteByPosition(item)
}
</script>