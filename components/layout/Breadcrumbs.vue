<template>
  <nav v-if="breadcrumbs" class="flex">
    <ol role="list" class="flex items-center space-x-1 bg-gray-50 py-1.5 px-2 rounded-md">
      <li v-for="(breadcrumb, index) in breadcrumbs.items" :key="index">
        <div class="flex items-center space-x-1">

          <!-- chevron icon which divides the breadcrumbs -->
          <ChevronRightIcon v-if="index > 0" class="size-4 shrink-0 text-gray-500"/>

          <!-- if breadcrumb has an icon, show it here -->
          <component :is="breadcrumb.icon" v-if="breadcrumb.icon" class="size-4 shrink-0 text-gray-500"/>

          <!-- breadcrumb link or basic label -->
          <NuxtLink v-if="breadcrumb.to" :to="breadcrumb.to" class="text-xs text-gray-500 hover:text-gray-700">
            {{ _.truncate(translate(breadcrumb.label), {length: 25}) }}
          </NuxtLink>
          <span v-else class="text-xs text-gray-500">
            {{ _.truncate(translate(breadcrumb.label), {length: 25}) }}
          </span>

        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import _ from 'lodash'
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import type { BreadcrumbsMeta } from "~/types/common";

const route = useRoute()

const breadcrumbs = computed<BreadcrumbsMeta | null>(() => {
  const meta = route.meta.breadcrumbs as BreadcrumbsMeta | undefined

  if (! meta) {
    return null
  }

  return _.isFunction(meta) ? meta(route) : meta
})
</script>
