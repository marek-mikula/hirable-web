<template>
  <div>
    <!-- navigation for smaller screens -->
    <nav class="sm:hidden flex space-x-2 overflow-x-auto scrollbar-hidden">
      <NuxtLink
          v-for="item in tabs"
          :key="item.tab"
          :to="item.route"
          :class="['inline-flex items-center gap-x-2 rounded-md py-2 px-3 text-sm font-medium bg-white ring-1 ring-gray-200 ring-inset', tab === item.tab ? 'text-primary-600' : 'text-gray-900 hover:text-primary-600 ']"
      >
        <component :is="item.icon" class="size-5"/>
        <span>{{ $t(item.label) }}</span>
        <span v-if="item.count !== null" class="font-semibold bg-primary-600 text-white px-1 py-0.25 rounded-md">
        {{ item.count }}
      </span>
      </NuxtLink>
    </nav>

    <!-- navigation for larger screens -->
    <div class="hidden sm:block">
      <nav class="isolate flex divide-x divide-gray-200 rounded-md shadow-sm border border-gray-200 shadow-sm">
        <NuxtLink
            v-for="(item, index) in tabs"
            :key="item.tab"
            :to="item.route"
            :class="['group relative min-w-0 flex-1 overflow-hidden bg-white p-3 text-sm text-center font-medium focus:z-10', tab === item.tab ? 'text-primary-600' : 'hover:text-primary-600', {
              'rounded-l-md': index === 0,
              'rounded-r-md': index === (tabs.length - 1),
            }]"
        >
          <div class="flex items-center justify-center space-x-2">
            <component :is="item.icon" class="size-5"/>
            <span>{{ $t(item.label) }}</span>
            <span v-if="item.count !== null" class="font-semibold bg-primary-600 text-white px-1 py-0.25 rounded-md">
              {{ item.count }}
            </span>
          </div>
          <span v-if="tab === item.tab" class="absolute inset-x-0 bottom-0 h-0.5 bg-primary-600"></span>
        </NuxtLink>
      </nav>
    </div>

  </div>
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
    label: 'page.positions.detail.tabs.detail',
    route: `/positions/${props.position.id}`,
    count: null
  },
  {
    tab: POSITION_DETAIL_TAB.CANDIDATES,
    icon: UsersIcon,
    label: 'page.positions.detail.tabs.candidates',
    route: `/positions/${props.position.id}/candidates`,
    count: 12,
  },
  {
    tab: POSITION_DETAIL_TAB.ADVERTISEMENTS,
    icon: MegaphoneIcon,
    label: 'page.positions.detail.tabs.advertisements',
    route: `/positions/${props.position.id}/advertisements`,
    count: 2,
  },
  {
    tab: POSITION_DETAIL_TAB.STATISTICS,
    icon: ChartPieIcon,
    label: 'page.positions.detail.tabs.statistics',
    route: `/positions/${props.position.id}/statistics`,
    count: null
  },
]
</script>
