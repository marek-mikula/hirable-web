<template>
  <label
      v-if="label"
      :for="inputId"
      class="text-sm font-medium text-gray-900 flex"
  >
    <span class="inline-flex items-center space-x-1">
      <span>
        {{ label }}
      </span>
      <QuestionMarkCircleIcon v-if="help" class="size-5" v-tooltip="help"/>
      <span
          v-if="required"
          class="font-bold text-red-500"
          v-tooltip="{ content: $t('form.required') }"
      >*</span>
    </span>
  </label>
</template>

<script lang="ts" setup>
import {QuestionMarkCircleIcon} from "@heroicons/vue/24/outline";
import type {TooltipOptions} from "~/types/directives/tooltip.types";

withDefaults(defineProps<{
  label: string
  required?: boolean
  inputId?: string
  help?: TooltipOptions
}>(), {
  required: false,
})
</script>
