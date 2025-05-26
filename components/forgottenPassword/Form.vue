<template>
  <CommonForm id="forgotten-password-form" v-slot="{ isLoading, firstError }" class="space-y-5" :handler="handler">

    <FormInput
        v-model="data.email"
        type="email"
        name="email"
        autocomplete="email"
        :placeholder="$t('model.common.email')"
        :error="firstError('email')"
        required
    />

    <div class="space-y-2">
      <CommonButton
          class="w-full"
          type="submit"
          :size="3"
          :label="$t('page.forgottenPassword.submit')"
          :loading="isLoading"
          :disabled="isLoading"
      />

      <CommonButton
          class="w-full"
          type="button"
          color="secondary"
          :label="$t('common.action.backToLogin')"
          :to="'/login'"
      />
    </div>

  </CommonForm>
</template>

<script setup lang="ts">
import type {FormHandler} from "~/types/components/common/form.types";
import {RESPONSE_CODE} from "~/types/enums";
import type {RequestResetData} from "~/repositories/password/inputs";

const toaster = useToaster()
const api = useApi()

const data = ref<RequestResetData>({
  email: null
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    await api.password.requestReset(data.value)

    await navigateTo('/login')

    await toaster.success({
      title: 'toast.forgottenPassword.success'
    })
  },
  async onError(response): Promise<boolean> {
    if (response._data!.code === RESPONSE_CODE.RESET_ALREADY_REQUESTED) {
      await toaster.error({
        title: 'toast.forgottenPassword.alreadyRequested'
      })

      return true
    }

    return false
  }
}
</script>
