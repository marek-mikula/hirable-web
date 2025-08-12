<template>
  <CommonDropdown>

    <template #button="{ open }">
      <CommonButton
          variant="secondary"
          :size="2"
          :icon="Cog6ToothIcon"
          :disabled="disabled"
          v-tooltip="{ content: $t('page.position.detail.candidates.kanban.columnSettings') }"
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
              @click="close(() => emit('updateProcessStep'))"
          >
            <PencilIcon class="size-5 shrink-0"/>
            {{ $t('modal.position.kanban.updateProcessStep.title') }}
          </button>
          <button
              v-if="!kanbanStep.step.isFixed"
              type="button"
              class="text-gray-700 hover:text-primary-600 hover:bg-gray-50 w-full text-left rounded-md flex gap-x-1 text-gray-700 block p-2 text-sm"
              role="menuitem"
              tabindex="-1"
              @click="close(() => emit('removeProcessStep'))"
          >
            <TrashIcon class="size-5 shrink-0"/>
            {{ $t('modal.position.kanban.removeProcessStep.title') }}
          </button>
        </div>
      </div>
    </template>

  </CommonDropdown>
</template>

<script setup lang="ts">
import {TrashIcon, Cog6ToothIcon, PencilIcon} from "@heroicons/vue/24/outline";
import type {KanbanStep} from "~/repositories/resources";

const props = defineProps<{
  kanbanStep: KanbanStep
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'removeProcessStep' | 'updateProcessStep'): void,
}>()
</script>