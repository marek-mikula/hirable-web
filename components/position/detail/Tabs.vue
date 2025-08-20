<template>
  <nav class="flex space-x-2 overflow-x-auto scrollbar-hidden">

    <NuxtLink
        v-for="item in tabs"
        :key="item.tab"
        :to="item.route"
        :class="['inline-flex items-center gap-x-2 rounded-md py-1.5 px-3 text-sm font-medium ring-1 ring-gray-300 ring-inset', tab === item.tab ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-500 hover:text-primary-600 ']"
    >
      <component :is="item.icon" class="size-5"/>
      <span>{{ $t(item.label) }}</span>
      <span v-if="item.count !== null" class="font-semibold bg-primary-600 text-white px-1 py-0.25 rounded-md">
        {{ item.count }}
      </span>
    </NuxtLink>

  </nav>
</template>

<script lang="ts" setup>
import {
  MegaphoneIcon,
  UsersIcon,
  InformationCircleIcon,
  ChartPieIcon,
} from "@heroicons/vue/24/outline";
import type {Position} from "~/repositories/resources";
import {POSITION_DETAIL_TAB} from "~/types/enums";

const props = defineProps<{
  position: Position
  tab: POSITION_DETAIL_TAB
}>()

const tabs = [
  {
    tab: POSITION_DETAIL_TAB.DETAIL,
    icon: InformationCircleIcon,
    label: 'page.position.detail.tabs.detail',
    route: `/positions/${props.position.id}`,
    count: null
  },
  {
    tab: POSITION_DETAIL_TAB.CANDIDATES,
    icon: UsersIcon,
    label: 'page.position.detail.tabs.candidates',
    route: `/positions/${props.position.id}/candidates`,
    count: 12,
  },
  {
    tab: POSITION_DETAIL_TAB.ADVERTISEMENTS,
    icon: MegaphoneIcon,
    label: 'page.position.detail.tabs.advertisements',
    route: `/positions/${props.position.id}/advertisements`,
    count: 2,
  },
  {
    tab: POSITION_DETAIL_TAB.STATISTICS,
    icon: ChartPieIcon,
    label: 'page.position.detail.tabs.statistics',
    route: `/positions/${props.position.id}/statistics`,
    count: null
  },
]
</script>
