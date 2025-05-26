<template>
  <CommonModal :open="open" :title="$t('modal.company.invite.title')" @close="close">
    <template #content>
      <CommonForm id="invitation-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="p-4 space-y-3">
          <FormSelect
              v-model="data.role"
              name="role"
              :error="firstError('role')"
              :label="$t('model.common.role')"
              :options="roleOptions"
              hide-search
              disable-empty
              required
          />

          <FormInput
              v-model="data.email"
              name="email"
              type="email"
              :error="firstError('email')"
              :label="$t('model.common.email')"
              required
          />
        </div>

        <div class="p-4 flex items-center justify-between">
          <CommonButton
              type="button"
              color="secondary"
              :label="$t('common.action.cancel')"
              @click="close"
          />
          <CommonButton
              type="submit"
              color="primary"
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
import type {InviteData} from "~/repositories/companyInvitation/inputs";
import {RESPONSE_CODE, ROLE} from "~/types/enums";

defineProps<{
  open: boolean
}>()

const api = useApi()
const toaster = useToaster()

const data = ref<InviteData>({
  role: ROLE.USER,
  email: null,
})

const roleOptions = Object.values(ROLE).map(role => ({
  value: role,
  label: `model.company.roles.${role}`,
  translate: true,
}))

const emit = defineEmits<{
  (e: 'close' | 'invited'): void,
}>()

function close(): void {
  emit('close')
}

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    await api.companyInvitation.invite(data.value)

    await toaster.success({
      title: 'toast.company.invitation.store.success'
    })

    data.value.role = ROLE.USER
    data.value.email = null

    emit('invited')
  },
  async onError(response): Promise<boolean> {
    if (response._data!.code === RESPONSE_CODE.INVITATION_EXISTS) {
      await toaster.error({
        title: 'toast.company.invitation.store.exists'
      })

      return true
    }

    if (response._data!.code === RESPONSE_CODE.INVITATION_USER_EXISTS) {
      await toaster.error({
        title: 'toast.company.invitation.store.userExists'
      })

      return true
    }

    return false
  }
}
</script>