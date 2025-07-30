<template>
  <CommonDropdown>

    <template #button>
      <CommonButton
          variant="secondary"
          :size="2"
          symmetrical
          v-tooltip="{ content: $t('page.position.detail.candidates.kanban.columnSettings') }"
      >
        <Cog6ToothIcon class="size-4"/>
      </CommonButton>
    </template>

    <template #list>
      <div
          class="absolute right-0 z-[125] w-44 mt-2 divide-y divide-gray-100 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-200 focus:outline-hidden"
          role="menu"
          tabindex="-1"
      >
        <div class="p-1 space-y-1" role="none">
          <MenuItem>
            <button
                type="button"
                class="text-gray-700 hover:text-primary-600 hover:bg-gray-50 w-full text-left rounded-md flex gap-x-1 text-gray-700 block p-2 text-sm"
                role="menuitem"
                tabindex="-1"
                @click="emit('renameProcessStep')"
            >
              <PencilIcon class="size-5 shrink-0"/>
              {{ $t('modal.position.kanban.renameProcessStep.title') }}
            </button>
          </MenuItem>
          <MenuItem v-if="!kanbanStep.step.isFixed">
            <button
                type="button"
                class="text-gray-700 hover:text-primary-600 hover:bg-gray-50 w-full text-left rounded-md flex gap-x-1 text-gray-700 block p-2 text-sm"
                role="menuitem"
                tabindex="-1"
                @click="emit('removeProcessStep')"
            >
              <TrashIcon class="size-5 shrink-0"/>
              {{ $t('modal.position.kanban.removeProcessStep.title') }}
            </button>
          </MenuItem>
        </div>
      </div>
    </template>

  </CommonDropdown>
</template>

<script setup lang="ts">
import {TrashIcon, Cog6ToothIcon, PencilIcon} from "@heroicons/vue/24/outline";
import {MenuItem} from "@headlessui/vue";
import type {KanbanStep} from "~/repositories/resources";

const props = defineProps<{
  kanbanStep: KanbanStep
}>()

const emit = defineEmits<{
  (e: 'removeProcessStep' | 'renameProcessStep'): void,
}>()
</script>