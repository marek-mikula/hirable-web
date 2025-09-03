<template>
  <CommonModal :open="processStep !== null" :title="$t('modal.processStep.update.title')" @close="emit('close')" @hidden="onModalHidden">
    <template #content>
      <CommonForm id="process-step-update-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="p-4 space-y-3">

          <FormInput
              v-model="data.step"
              name="step"
              :error="firstError('step')"
              :label="$t('model.processStep.step')"
              :maxlength="50"
              required
          />

          <FormSelect
              v-model="data.triggersAction"
              name="triggersAction"
              :options="getTriggerableActionOptions()"
              :error="firstError('triggersAction')"
              :label="$t('model.processStep.triggersAction')"
              hide-search
          />

          <FormCheckbox
              v-model="data.isRepeatable"
              name="isRepeatable"
              :error="firstError('isRepeatable')"
              :label="$t('model.processStep.isRepeatable')"
              :hint="$t('form.hint.processStep.isRepeatable')"
          />

        </div>

        <div class="p-4 flex items-center justify-between">
          <CommonButton
              variant="secondary"
              :label="$t('common.action.close')"
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
import type {FormHandler} from "~/types/components/common/form.types";
import type {UpdateData} from "~/repositories/processStep/inputs";
import type {ProcessStep} from "~/repositories/resources";
import {getTriggerableActionOptions} from "~/functions/select";

const props = defineProps<{
  processStep: ProcessStep | null
}>()

const api = useApi()
const toaster = useToaster()

const data = ref<UpdateData>({
  step: null,
  isRepeatable: false,
  triggersAction: null,
})

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'update', processStep: ProcessStep): void,
}>()

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.processStep.update(props.processStep!.id, data.value)

    await toaster.success({
      title: 'toast.processStep.update'
    })

    emit('update', response._data!.data!.processStep)
  }
}

function onModalHidden(): void {
  data.value.step = null
  data.value.isRepeatable = false
  data.value.triggersAction = null
}

watch(() => props.processStep, (value) => {
  if (value) {
    data.value.step = value.step
    data.value.isRepeatable = value.isRepeatable
    data.value.triggersAction = value.triggersAction
  }
})
</script>