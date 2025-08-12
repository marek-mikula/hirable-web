<template>
  <CommonDropdown>

    <template #button="{ open }">
      <CommonButton
          variant="secondary"
          :icon="Cog6ToothIcon"
          :disabled="disabled"
          v-tooltip="{ content: $t('page.position.detail.candidates.kanban.settings') }"
          @click="open"
      />
    </template>

    <template #list="{ close }">
      <div
          class="w-44 divide-y divide-gray-100 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-200 focus:outline-hidden"
          role="menu"
          tabindex="-1"
      >
        <div class="p-1 space-y-1" role="none">
          <button
              type="button"
              class="text-gray-700 hover:text-primary-600 hover:bg-gray-50 w-full text-left rounded-md flex gap-x-1 text-gray-700 block p-2 text-sm"
              role="menuitem"
              tabindex="-1"
              @click="close(() => emit('addProcessStep'))"
          >
            <SquaresPlusIcon class="size-5 shrink-0"/>
            {{ $t('modal.position.kanban.addProcessStep.title') }}
          </button>
          <button
              type="button"
              class="text-gray-700 hover:text-primary-600 hover:bg-gray-50 w-full text-left rounded-md flex gap-x-1 text-gray-700 block p-2 text-sm"
              role="menuitem"
              tabindex="-1"
              @click="close(() => emit('setProcessStepOrder'))"
          >
            <ViewColumnsIcon class="size-5 shrink-0"/>
            {{ $t('modal.position.kanban.setProcessStepOrder.title') }}
          </button>
        </div>
      </div>
    </template>

  </CommonDropdown>
</template>

<script setup lang="ts">
import {SquaresPlusIcon,ViewColumnsIcon, Cog6ToothIcon} from "@heroicons/vue/24/outline";

defineProps<{
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'addProcessStep' | 'setProcessStepOrder'): void,
}>()
</script>