<template>
  <DataGridTable :identifier="GRID.COMPANY_USER" :callee="getUsers">
    <template #idSlot="{ item }">
      {{ item.id }}
    </template>

    <template #roleSlot="{ item }">
      {{ $t(`model.company.roles.${item.role}`) }}
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
</template>

<script setup lang="ts">
import type {Company} from "~/repositories/resources";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";
import {GRID} from "~/types/enums";

const props = defineProps<{
  company: Company
}>()

const api = useApi()

async function getUsers(query: GridQueryString) {
  return (await api.companyUser.index(props.company.id, query))._data!.data.users
}
</script>