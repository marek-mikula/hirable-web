<template>
  <CommonModal width="3xl" :title="$t('modal.grid.filter.title')" :title-icon="FunnelIcon" :open="open" @close="emit('close')">
    <template #content>

      <div class="divide-x divide-x-200 min-h-[500px] flex">

        <!-- left-side menu with filter items -->
        <ul class="w-[30%] min-w-[200px] max-h-[500px] overflow-y-auto">
          <li class="text-sm py-2 px-4 border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
            Přednastavené filtry
          </li>
          <li v-for="n in 10" class="text-sm py-2 px-4 border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
            Jméno
          </li>
        </ul>

        <!-- filter inputs -->
        <div class="p-4 flex-1 max-h-[500px] overflow-y-auto">
          <FormInput type="url" label="Jméno" name="firstname"/>
        </div>

      </div>

      <div class="p-4 flex items-center justify-between space-x-2">
        <div class="flex items-center space-x-2">
          <CommonButton
              type="button"
              variant="secondary"
              :label="$t('common.action.cancel')"
              @click="emit('close')"
          />
          <CommonButton
              type="button"
              variant="secondary"
              :label="$t('modal.grid.filter.reset')"
          />
        </div>
        <CommonButton
            type="submit"
            variant="primary"
            :label="$t('common.action.confirm')"
        />
      </div>

    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import {
  FunnelIcon,
} from "@heroicons/vue/24/outline";
import {Grid} from "~/repositories/resources";

const props = defineProps<{
  grid: Grid
  open: boolean
}>()

const api = useApi()
const toaster = useToaster()

const emit = defineEmits<{
  (e: 'close'): void,
}>()
</script>
