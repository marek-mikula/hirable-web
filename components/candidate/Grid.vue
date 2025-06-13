<template>
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
</template>

<script setup lang="ts">
import {GRID} from "~/types/enums";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

const api = useApi()

async function getCandidates(query: GridQueryString) {
  return (await api.candidate.index(query))._data!.data.candidates
}
</script>