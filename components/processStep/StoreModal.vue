<template>
  <CommonModal :open="open" :title="$t('modal.processStep.store.title')" @close="close" @hidden="onModalHidden">
    <template #content>
      <CommonForm id="position-process-step-store-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="p-4 space-y-3">

          <FormInput
              v-model="data.step"
              name="step"
              :error="firstError('step')"
              :label="$t('model.processStep.step')"
              :maxlength="50"
              required
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
              :label="$t('common.action.cancel')"
              @click="close"
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
import type {FormHandler} from "~/types/components/common/form.types";
import type {StoreData} from "~/repositories/processStep/inputs";
import type {ProcessStep} from "~/repositories/resources";

const props = defineProps<{
  open: boolean
}>()

const {user} = useAuth<true>()
const api = useApi()
const toaster = useToaster()

const data = ref<StoreData>({
  step: null,
  isRepeatable: false,
})

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'store', step: ProcessStep): void,
}>()

function close(): void {
  emit('close')
}

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.processStep.store(data.value)

    await toaster.success({
      title: 'toast.processStep.store'
    })

    emit('store', response._data!.data!.step)
  }
}

function onModalHidden(): void {
  data.value.step = null
  data.value.isRepeatable = false
}
</script>