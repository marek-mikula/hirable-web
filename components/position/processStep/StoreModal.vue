<template>
  <CommonModal :open="opened" :title="$t('modal.position.processStep.store.title')" :title-icon="SquaresPlusIcon" @close="close" @hidden="clear">
    <template #content>
      <CommonForm id="position-process-step-store-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="p-4 space-y-3">

          <FormSelect
              v-model="data.processStep"
              name="processStep"
              :error="firstError('processStep')"
              :label="$t('model.processStep.step')"
              :option-loader="createProcessStepOptionLoader(true)"
              required
          />

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
import {SquaresPlusIcon} from "@heroicons/vue/24/outline";
import type {FormHandler} from "~/types/components/common/form.types";
import type {PositionShow, PositionProcessStep} from "~/repositories/resources";
import {createProcessStepOptionLoader} from "~/functions/processStep";
import type {StoreData} from "~/repositories/positionProcessStep/inputs";
import type {PositionProcessStepStoreModalExpose} from "~/types/components/position/processStep/storeModal.types";
import {RESPONSE_CODE} from "~/types/enums";

const props = defineProps<{
  position: PositionShow
}>()

const emit = defineEmits<{
  (e: 'create', positionProcessStep: PositionProcessStep): void,
}>()

const api = useApi()
const toaster = useToaster()

const opened = ref<boolean>(false)
const data = ref<StoreData>({
  processStep: null
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.positionProcessStep.store(props.position.id, data.value)

    await toaster.success({
      title: 'toast.position.processStep.store.success'
    })

    emit('create', response._data!.data.positionProcessStep)

    close()
  },
  async onError(response): Promise<boolean> {
    if (response._data!.code === RESPONSE_CODE.STEP_EXISTS) {
      await toaster.error({
        title: 'toast.position.processStep.store.exists'
      })

      return true
    }

    return false
  }
}

function open(): void {
  opened.value = true
}

function close(): void {
  opened.value = false
}

function clear(): void {
  data.value.processStep = null
}

defineExpose<PositionProcessStepStoreModalExpose>({
  open,
  close
})
</script>
