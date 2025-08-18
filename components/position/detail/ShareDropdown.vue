<template>
  <CommonDropdown>

    <template #button="{ open }">
      <CommonButton
          variant="secondary"
          :icon="ShareIcon"
          v-tooltip="{ content: $t('common.action.share') }"
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
              @click="close(() => copy(position.commonLink))"
          >
            {{ $t('model.position.commonLink') }}
          </button>
          <button
              type="button"
              class="text-gray-700 hover:text-primary-600 hover:bg-gray-50 w-full text-left rounded-md flex gap-x-1 text-gray-700 block p-2 text-sm"
              role="menuitem"
              tabindex="-1"
              @click="close(() => copy(position.internLink))"
          >
            {{ $t('model.position.internLink') }}
          </button>
          <button
              type="button"
              class="text-gray-700 hover:text-primary-600 hover:bg-gray-50 w-full text-left rounded-md flex gap-x-1 text-gray-700 block p-2 text-sm"
              role="menuitem"
              tabindex="-1"
              @click="close(() => copy(position.referralLink))"
          >
            {{ $t('model.position.referralLink') }}
          </button>
        </div>
      </div>
    </template>

  </CommonDropdown>
</template>

<script setup lang="ts">
import {ShareIcon} from "@heroicons/vue/24/outline";
import type {Position} from "~/repositories/resources";

defineProps<{
  position: Position
}>()

const toaster = useToaster()

async function copy(link: string): Promise<void> {
  await navigator.clipboard.writeText(link)
  await toaster.success({title: 'toast.common.copiedToClipboard'})
}
</script>