<template>
  <div>

    <slot v-if="$slots.default"></slot>

    <div class="md:flex md:items-center md:justify-between">

      <!-- page title with possible icon -->
      <div class="min-w-0 flex-1">
        <h2 class="text-2xl font-medium text-gray-900 flex items-center space-x-2">
          <component v-if="icon" :is="icon" class="size-6 shrink-0"/>
          <span v-if="title" class="truncate">
            {{ title }}
          </span>
          <slot name="afterTitle"/>
        </h2>
        <p v-if="subtitle" class="mt-1 text-sm text-gray-500">
          {{ subtitle }}
        </p>
      </div>

      <!-- page title actions -->
      <div v-if="actions && actions.length > 0" class="mt-3 flex md:mt-0 md:ml-3 space-x-2">
        <CommonButton
            v-for="(action, index) in actions"
            :key="index"
            :variant="action.variant"
            :label="action.label"
            :icon="action.icon"
            :loading="action.loading"
            @click="action.handler"
            v-tooltip="action.tooltip ? action.tooltip : false"
        />
      </div>

    </div>

    <slot name="after"/>

  </div>
</template>

<script lang="ts" setup>
import type {AnyComponent} from "~/types/common";
import type {PageTitleAction} from "~/types/components/layout/pageTitle.types";

const props = defineProps<{
  icon?: AnyComponent
  title?: string
  subtitle?: string
  actions?: PageTitleAction[]
}>()
</script>
