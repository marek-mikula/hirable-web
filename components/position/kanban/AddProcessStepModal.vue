<template>
  <CommonModal :open="open" :title="$t('modal.position.kanban.addProcessStep.title')" :title-icon="SquaresPlusIcon" @close="emit('close')" @hidden="clearForm">
    <template #content>
      <CommonForm id="position-kanban-add-column-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

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
import {SquaresPlusIcon} from "@heroicons/vue/24/outline";
import type {FormHandler} from "~/types/components/common/form.types";
import type {Position, PositionProcessStep} from "~/repositories/resources";
import {createProcessStepOptionLoader} from "~/functions/processStep";
import type {StoreData} from "~/repositories/positionProcessStep/inputs";
import {RESPONSE_CODE} from "~/types/enums";

const props = defineProps<{
  position: Position
  open: boolean
}>()

const api = useApi()
const toaster = useToaster()

const data = ref<StoreData>({
  processStep: null
})

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'add', positionProcessStep: PositionProcessStep): void,
}>()

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.positionProcessStep.store(props.position.id, data.value)

    await toaster.success({
      title: 'toast.position.kanban.addProcessStep.success'
    })

    emit('add', response._data!.data.positionProcessStep)
  },
  async onError(response): Promise<boolean> {
    if (response._data!.code === RESPONSE_CODE.STEP_EXISTS) {
      await toaster.error({
        title: 'toast.position.kanban.addProcessStep.exists'
      })

      return true
    }

    return false
  }
}

function clearForm(): void {
  data.value.processStep = null
}
</script>
