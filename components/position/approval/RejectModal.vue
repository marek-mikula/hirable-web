<template>
  <CommonModal :open="approval !== null" :title="$t('modal.position.reject.title')" @close="close">
    <template #content>
      <CommonForm id="position-reject-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="p-4 space-y-3">
          <FormTextarea
              v-model="data.note"
              name="note"
              :error="firstError('note')"
              :label="$t('model.common.note')"
              :maxlength="300"
          />
        </div>

        <div class="p-4 flex items-center justify-between">
          <CommonButton
              type="button"
              variant="secondary"
              :label="$t('common.action.cancel')"
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
import type {FormHandler} from "~/types/components/common/form.types";
import type {UpdateData} from "~/repositories/positionApproval/inputs";
import type {PositionApproval} from "~/repositories/resources";
import {POSITION_APPROVAL_STATE} from "~/types/enums";

const props = defineProps<{
  approval: PositionApproval | null
}>()

const api = useApi()
const toaster = useToaster()

const data = ref<UpdateData>({
  state: POSITION_APPROVAL_STATE.REJECTED,
  note: null
})

const emit = defineEmits<{
  (e: 'close' | 'reject'): void,
}>()

function close(): void {
  emit('close')
}

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    await api.positionApproval.update(props.approval!.positionId, props.approval!.id, data.value)

    await toaster.success({
      title: 'toast.position.reject.success'
    })

    emit('reject')
  },
}
</script>