<template>
  <CommonModal width="xl" :title="$t('modal.position.kanban.settings.title')" :title-icon="Cog6ToothIcon" :open="open" @close="emit('close')">
    <template #content>
      <CommonForm id="position-kanban-settings-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="divide-y divide-gray-200">

          <div class="p-4 space-y-2">

            <FormLabel
                class="block"
                :label="$t('modal.position.kanban.settings.order')"
                required
            />

<!--            <Draggable-->
<!--                v-model="data.columns"-->
<!--                tag="ul"-->
<!--                class="space-y-1"-->
<!--                handle=".drag-handle"-->
<!--                item-key="key"-->
<!--                easing="cubic-bezier(1, 0, 0, 1)"-->
<!--                direction="vertical"-->
<!--                :animation="200"-->
<!--            >-->
<!--              <template #item="{ element: column }">-->
<!--                <li class="border border-gray-200 rounded-md bg-gray-50 py-1 px-2 flex items-center space-x-2">-->
<!--                  <ArrowsPointingOutIcon class="shrink-0 size-5 drag-handle cursor-move"/>-->
<!--                  <span class="flex-1 text-sm">-->
<!--                  {{ $t(column.label) }}-->
<!--                </span>-->
<!--                  <FormCheckbox-->
<!--                      v-model="column.enabled"-->
<!--                      :name="`grid-${grid.identifier}-column-${column.key}`"-->
<!--                      :disabled="! column.allowToggle"-->
<!--                      class="shrink-0"-->
<!--                  />-->
<!--                </li>-->
<!--              </template>-->
<!--            </Draggable>-->

          </div>

        </div>

        <div class="p-4 flex items-center justify-between space-x-2">
          <CommonButton
              variant="secondary"
              :label="$t('common.action.cancel')"
              @click="emit('close')"
          />
          <CommonButton
              type="submit"
              variant="primary"
              :label="$t('common.action.confirm')"
              :loading="isLoading"
              :disabled="isLoading"
          />
        </div>

      </CommonForm>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import {Cog6ToothIcon} from "@heroicons/vue/24/outline";
import type {FormHandler} from "~/types/components/common/form.types";
import type {KanbanStep} from "~/repositories/resources";

const props = defineProps<{
  kanbanSteps: KanbanStep[]
  open: boolean
}>()

const api = useApi()
const toaster = useToaster()

const data = ref({})

const emit = defineEmits<{
  (e: 'close'): void,
}>()

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    // todo
  }
}
</script>
