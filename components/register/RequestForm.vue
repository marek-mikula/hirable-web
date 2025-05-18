<template>
  <CommonForm id="register-request-form" v-slot="{ isLoading, firstError }" class="space-y-5" :handler="handler">

    <FormInput
        v-model="data.email"
        type="email"
        name="email"
        autocomplete="email"
        :placeholder="$t('model.common.email')"
        :error="firstError('email')"
        :maxlength="255"
        required
    />

    <div class="space-y-2">
      <CommonButton
          class="w-full"
          type="submit"
          :label="$t('page.registerRequest.requestRegistration')"
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
import type {FormHandler} from "~/types/common";
import {RESPONSE_CODE} from "~/types/enums";
import type {RequestData} from "~/repositories/register/inputs";

const toaster = useToaster()
const api = useApi()

const data = ref<RequestData>({
  email: null,
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    await api.register.requestRegistration(data.value)

    await navigateTo('/login')

    await toaster.success({
      title: 'toast.registerRequest.success'
    })
  },
  async onError(response): Promise<boolean> {
    // email is not reachable
    if (response._data!.code === RESPONSE_CODE.CLIENT_ERROR) {
      await toaster.error({
        title: 'toast.registerRequest.notReachable'
      })

      return true
    }

    if (response._data!.code === RESPONSE_CODE.REGISTRATION_ALREADY_REQUESTED) {
      await toaster.error({
        title: 'toast.registerRequest.alreadyRequested'
      })

      return true
    }

    return false
  }
}
</script>
