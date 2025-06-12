<template>
  <CommonModal :open="approval !== null" :title="$t('modal.position.approve.title')" @close="close">
    <template #content>
      <CommonForm id="position-approve-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="p-4">
          <FormTextarea
              v-model="data.note"
              name="note"
              :error="firstError('note')"
              :label="$t('model.common.note')"
              :maxlength="500"
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
import type {DecideData} from "~/repositories/positionApproval/inputs";
import type {PositionApproval} from "~/repositories/resources";
import {POSITION_APPROVAL_STATE} from "~/types/enums";

const props = defineProps<{
  approval: PositionApproval | string | null // string in case of external approver (token)
}>()

const emit = defineEmits<{
  (e: 'close' | 'approve'): void,
}>()

const api = useApi()
const toaster = useToaster()

const data = ref<DecideData>({
  state: POSITION_APPROVAL_STATE.APPROVED,
  note: null
})

function close(): void {
  emit('close')
}

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    if (props.approval === null) {
      return
    }

    if (typeof props.approval === 'string') {
      await api.positionExternalApproval.decide(props.approval, data.value)
    } else {
      await api.positionApproval.decide(props.approval!.positionId, props.approval!.id, data.value)
    }

    await toaster.success({
      title: 'toast.position.approve'
    })

    emit('approve')
  },
}
</script>