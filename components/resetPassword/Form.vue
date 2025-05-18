<template>
  <CommonForm id="reset-password-form" v-slot="{ isLoading, firstError }" class="space-y-10" :handler="handler">

    <div class="space-y-5">

      <FormInput
          v-model="data.password"
          type="password"
          name="password"
          autocomplete="new-password"
          :placeholder="$t('model.user.newPassword')"
          :error="firstError('password')"
          :hint="$t('form.hint.user.password')"
          required
      />

      <FormInput
          v-model="data.passwordConfirm"
          type="password"
          name="passwordConfirm"
          :placeholder="$t('model.user.passwordConfirm')"
          :error="firstError('passwordConfirm')"
          required
      />

    </div>

    <div class="space-y-2">
      <CommonButton
          class="w-full"
          type="submit"
          :label="$t('page.resetPassword.submit')"
          :loading="isLoading"
          :disabled="isLoading"
      />

      <CommonButton
          class="w-full"
          type="button" :color="'secondary'"
          :label="$t('common.action.backToLogin')"
          :to="'/login'"
      />
    </div>

  </CommonForm>
</template>

<script setup lang="ts">
import type {FormHandler} from "~/types/common";
import type {JsonResponse} from "~/types/request";
import {RESPONSE_CODE} from "~/types/enums";
import type {ResetData} from "~/repositories/password/inputs";

const toaster = useToaster()
const api = useApi()
const {t} = useI18n()

const props = defineProps<{
  token: string
}>()

const data = ref<ResetData>({
  password: null,
  passwordConfirm: null,
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    await api.password.reset(props.token, data.value)

    await navigateTo('/')

    await toaster.success({
      title: 'toast.passwordReset.success'
    })
  },
  async onError(response): Promise<boolean> {
    const data = response._data as JsonResponse

    if ([
      RESPONSE_CODE.TOKEN_CORRUPTED,
      RESPONSE_CODE.TOKEN_INVALID,
      RESPONSE_CODE.TOKEN_MISSING,
      RESPONSE_CODE.TOKEN_MISMATCH,
    ].includes(data.code)) {
      await toaster.error({
        title: 'toast.passwordReset.linkInvalid'
      })

      return true
    }

    return false
  }
}
</script>
