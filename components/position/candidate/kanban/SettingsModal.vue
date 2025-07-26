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

            <Draggable
                v-model="data.order"
                tag="ul"
                class="space-y-1"
                handle=".drag-handle"
                item-key="key"
                easing="cubic-bezier(1, 0, 0, 1)"
                direction="vertical"
                :animation="200"
            >
              <template #item="{ element: step }">
                <li class="border border-gray-200 rounded-md bg-gray-50 py-1 px-2 flex items-center space-x-2">
                  <ArrowsPointingOutIcon class="shrink-0 size-5 drag-handle cursor-move"/>
                  <span class="flex-1 text-sm">
                    {{ step.isCustom ? step.step : $t(`model.processStep.steps.${step.step}`) }}
                  </span>
                </li>
              </template>
            </Draggable>

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
import Draggable from "vuedraggable";
import {Cog6ToothIcon,ArrowsPointingOutIcon} from "@heroicons/vue/24/outline";
import type {FormHandler} from "~/types/components/common/form.types";
import type {KanbanStep, Position} from "~/repositories/resources";
import type {SettingsModalData} from "~/types/components/position/candidate/kanban/settingsModal.types";

const props = defineProps<{
  position: Position
  kanbanSteps: KanbanStep[]
  open: boolean
}>()

const api = useApi()
const toaster = useToaster()

const data = ref<SettingsModalData>({
  order: []
})

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'update', kanbanSteps: KanbanStep[]): void,
}>()

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.position.updateKanbanSettings(props.position.id, collectData())

    emit('update', response._data!.data.kanbanSteps)
  }
}

function collectData(): FormData {
  const formData = new FormData()

  for (const [index, column] of data.value.order.entries()) {
    formData.set(`order[${index}]`, column.step)
  }

  return formData
}

function copyData(kanbanSteps: KanbanStep[]): void {
  data.value.order = kanbanSteps.map(kanbanStep => ({
    step: kanbanStep.step.step,
    isCustom: kanbanStep.step.isCustom
  }))
}

function init(): void {
  copyData(props.kanbanSteps)
}

onMounted(init)
</script>
