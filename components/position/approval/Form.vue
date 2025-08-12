<template>
  <CommonForm id="position-approval-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200 border border-gray-200 rounded-md bg-white shadow-xs">

    <div class="p-3 space-y-3">
      <FormTextarea
          v-model="data.note"
          name="note"
          :error="firstError('note')"
          :label="$t('model.common.note')"
          :maxlength="500"
      />
    </div>

    <div class="p-3 flex items-center justify-between space-x-2">
      <CommonButton
          type="submit"
          value="reject"
          variant="danger"
          :label="$t('common.action.reject')"
          :loading="isLoading"
      />
      <CommonButton
          type="submit"
          value="approve"
          variant="success"
          :label="$t('common.action.approve')"
          :loading="isLoading"
      />
    </div>

  </CommonForm>
</template>

<script lang="ts" setup>
import type {FormHandler} from "~/types/components/common/form.types";
import type {Position} from "~/repositories/resources";
import type {DecideData} from "~/repositories/positionApproval/inputs";
import type {Operation} from "~/types/components/position/approval/form.types";
import {POSITION_APPROVAL_STATE, POSITION_ROLE} from "~/types/enums";

const props = defineProps<{
  position: Position
  token?: string
}>()

const emit = defineEmits<{
  (e: Operation): void,
}>()

const {user} = useAuth<true>()
const toaster = useToaster()
const api = useApi()

const data = ref<Omit<DecideData, 'state'>>({
  note: null
})

const handler: FormHandler = {
  async onSubmit(form, event): Promise<void> {
    // get form operation by clicked form button
    const operation = (event.submitter as HTMLButtonElement).value as Operation

    const requestData: DecideData = {
      state: operation === 'approve' ? POSITION_APPROVAL_STATE.APPROVED : POSITION_APPROVAL_STATE.REJECTED,
      note: data.value.note
    }

    if (props.token) {
      await api.positionExternalApproval.decide(props.token, requestData)
    } else {
      const approval = props.position.approvals.find(approval => {
        return approval.role === POSITION_ROLE.APPROVER &&
            approval.state === POSITION_APPROVAL_STATE.PENDING &&
            approval.model.id === user.value.id
      })

      if (!approval) {
        throw new Error('Undefined approval.')
      }

      await api.positionApproval.decide(props.position.id, approval.id, requestData)
    }

    await toaster.success({
      title: operation === 'approve' ? 'toast.position.approve' : 'toast.position.reject'
    })

    emit(operation)
  },
}
</script>