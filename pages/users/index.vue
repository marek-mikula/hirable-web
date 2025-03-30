<template>
  <div>
    <DataGridTable :identifier="GRID.USER" :callee="getUsers">
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

      <template #phoneSlot="{ item }">
        {{ item.phone || '-' }}
      </template>

      <template #roleSlot="{ item }">
        {{ item.role }}
      </template>

      <template #createdAtSlot="{ item }">
        {{ item.createdAt }}
      </template>
    </DataGridTable>
  </div>
</template>

<script setup lang="ts">
import {UsersIcon} from "@heroicons/vue/24/outline";
import {GRID} from "~/types/enums";
import type {GridQueryString} from "~/types/grid";

definePageMeta({
  layout: 'app2',
  middleware: 'auth',
  breadcrumbs: {
    items: [
      {
        label: 'page.user.index.title',
        icon: UsersIcon,
      },
    ]
  }
})

const api = useApi()

async function getUsers(query: GridQueryString) {
  return (await api.user.index(query))._data!.data.users
}
</script>