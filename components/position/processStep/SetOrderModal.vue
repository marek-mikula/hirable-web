<template>
  <CommonModal
      :open="opened"
      :title="$t('modal.position.processStep.setOrder.title')"
      :title-icon="ViewColumnsIcon"
      @close="close"
      @hidden="clear"
  >
    <template #content>
      <CommonForm id="position-kanban-set-process-step-order-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="divide-y divide-gray-200">

          <div class="p-4 space-y-3">

            <div class="space-y-2">
              <FormLabel
                  class="block"
                  :label="$t('modal.position.processStep.setOrder.order')"
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
              :label="$t('common.action.close')"
              @click="close"
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
import type {PositionShow, PositionProcessStep} from "~/repositories/resources";
import type {SetOrderData} from "~/repositories/positionProcessStep/inputs";
import type {PositionProcessStepSetOrderModalExpose} from "~/types/components/position/processStep/setOrderModal.types";
import {getProcessStepLabel} from "~/functions/processStep";

const props = defineProps<{
  position: PositionShow
}>()

const api = useApi()
const toaster = useToaster()

const opened = ref<boolean>(false)
const order = ref<PositionProcessStep[]>([])

const emit = defineEmits<{
  (e: 'update', newOrder: Record<number, number>): void,
}>()

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const data: SetOrderData = {
      order: _.map(order.value, 'id')
    }

    const response = await api.positionProcessStep.setOrder(props.position.id, data)

    await toaster.success({
      title: 'toast.position.processStep.setOrder'
    })

    const {order: newOrder} = response._data!.data

    emit('update', newOrder)

    close()
  }
}

function open(positionProcessSteps: PositionProcessStep[]): void {
  order.value = positionProcessSteps
  opened.value = true
}

function close(): void {
  opened.value = false
}

function clear(): void {
  order.value = []
}

defineExpose<PositionProcessStepSetOrderModalExpose>({
  open,
  close,
})
</script>
