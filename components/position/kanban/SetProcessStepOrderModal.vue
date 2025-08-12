<template>
  <CommonModal :open="open" :title="$t('modal.position.kanban.setProcessStepOrder.title')" :title-icon="ViewColumnsIcon" @close="emit('close')">
    <template #content>
      <CommonForm id="position-kanban-set-process-step-order-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="divide-y divide-gray-200">

          <div class="p-4 space-y-3">

            <div class="space-y-2">
              <FormLabel
                  class="block"
                  :label="$t('modal.position.kanban.setProcessStepOrder.order')"
                  required
              />

              <Draggable
                  v-model="order"
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
                    {{ getProcessStepLabel(step) }}
                  </span>
                  </li>
                </template>
              </Draggable>
            </div>

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
          />
        </div>

      </CommonForm>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import _ from 'lodash'
import Draggable from "vuedraggable";
import {ViewColumnsIcon,ArrowsPointingOutIcon} from "@heroicons/vue/24/outline";
import type {FormHandler} from "~/types/components/common/form.types";
import type {KanbanStep, Position, PositionProcessStep} from "~/repositories/resources";
import type {SetProcessStepOrderData} from "~/repositories/position/inputs";
import {getProcessStepLabel} from "~/functions/processStep";

const props = defineProps<{
  position: Position
  kanbanSteps: KanbanStep[]
  open: boolean
}>()

const api = useApi()
const toaster = useToaster()

const order = ref<PositionProcessStep[]>([])
const data = ref<SetProcessStepOrderData>({
  order: []
})

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'update'): void,
}>()

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    await api.position.setProcessStepOrder(props.position.id, {
      order: _.map(order.value, 'step')
    })

    await toaster.success({
      title: 'toast.position.kanban.setProcessStepOrder'
    })

    emit('update')
  }
}

function copyData(kanbanSteps: KanbanStep[]): void {
  order.value = _.map(kanbanSteps, 'step')
}

watch(() => props.open, (value) => {
  if (value) {
    copyData(props.kanbanSteps)
  }
})
</script>
