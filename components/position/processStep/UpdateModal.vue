<template>
  <CommonModal
      v-if="step !== null"
      :open="opened"
      :title="$t('modal.position.processStep.update.title')"
      :title-icon="PencilIcon"
      @close="close"
      @hidden="clear"
  >
    <template #content>
      <CommonForm id="position-process-step-update-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="p-4 space-y-3">

          <FormInput
              v-model="data.label"
              name="label"
              :error="firstError('label')"
              :label="$t('model.common.title')"
              :hint="$t('form.hint.positionProcessStep.label')"
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
import {PencilIcon} from "@heroicons/vue/24/outline";
import type {FormHandler} from "~/types/components/common/form.types";
import type {PositionShow, PositionProcessStep} from "~/repositories/resources";
import type {UpdateData} from "~/repositories/positionProcessStep/inputs";
import type {UpdateModalExpose} from "~/types/components/position/processStep/updateModal.types";

const props = defineProps<{
  position: PositionShow
}>()

const api = useApi()
const toaster = useToaster()

const opened = ref<boolean>(false)
const step = ref<PositionProcessStep|null>(null)

const data = ref<UpdateData>({
  label: null
})

const emit = defineEmits<{
  (e: 'update', positionProcessStep: PositionProcessStep): void,
}>()

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.positionProcessStep.update(props.position.id, step.value!.id, data.value)

    await toaster.success({
      title: 'toast.position.processStep.update'
    })

    emit('update', response._data!.data.positionProcessStep)

    close()
  }
}

function prepareForm(positionProcessStep: PositionProcessStep): void {
  data.value.label = positionProcessStep.label
}

function open(positionProcessStep: PositionProcessStep): void {
  step.value = positionProcessStep
  prepareForm(positionProcessStep)
  opened.value = true
}

function close(): void {
  opened.value = false
}

function clear(): void {
  data.value.label = null
  step.value = null
}

defineExpose<UpdateModalExpose>({
  open,
  close,
})
</script>
