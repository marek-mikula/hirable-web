<template>
  <div class="lg:pb-0 lg:pt-4 lg:px-4 pt-3 pb-3 px-3 md:flex md:items-center md:justify-between border-b lg:border-b-0 border-gray-200">

    <!-- complete custom page title defined by slot -->
    <slot v-if="$slots.default"/>

    <template v-else>

      <!-- page title with possible icon -->
      <div class="min-w-0 flex-1">
        <h2 class="text-2xl font-medium text-gray-900 flex items-center space-x-2">
          <component v-if="icon" :is="icon" class="size-6 shrink-0"/>
          <span v-if="title" class="truncate">
            {{ title }}
          </span>
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
            :symmetrical="!!action.icon"
            @click="action.handler"
            v-tooltip="action.tooltip ? action.tooltip : false"
        >
          <span v-if="action.label">{{ action.label }}</span>
          <component v-else-if="action.icon" :is="action.icon" class="size-5"/>
        </CommonButton>
      </div>

    </template>

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
