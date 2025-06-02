<template>
  <CommonForm id="password-form" v-slot="{ isLoading, firstError }" class="divide-y divide-gray-200 border border-gray-200 overflow-hidden rounded-lg bg-white shadow-sm" :handler="handler">
    <div class="px-4 py-3">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        {{ $t('page.profile.privacy.password.title') }}
      </h2>
      <p class="mt-1 text-sm text-gray-600">
        {{ $t('form.hint.user.password') }}
      </p>
    </div>
    <div class="px-4 py-3 grid grid-cols-1 sm:grid-cols-6 gap-4">

      <FormInput
          v-model="data.oldPassword"
          type="password"
          class="sm:col-span-3"
          name="oldPassword"
          :error="firstError('oldPassword')"
          :label="$t('model.user.currentPassword')"
          required
      />

      <FormInput
          v-model="data.password"
          type="password"
          class="sm:col-span-3"
          name="password"
          autocomplete="new-password"
          :error="firstError('password')"
          :label="$t('model.user.newPassword')"
          required
      />

      <FormInput
          v-model="data.passwordConfirm"
          type="password"
          class="sm:col-span-3"
          name="passwordConfirm"
          autocomplete="new-password"
          :error="firstError('passwordConfirm')"
          :label="$t('model.user.passwordConfirm')"
          required
      />

    </div>
    <div class="px-4 py-3 text-right">

      <CommonButton
          type="submit"
          :label="$t('common.action.update')"
          :loading="isLoading"
          :disabled="isLoading || ! data.password || ! data.oldPassword || ! data.passwordConfirm"
      />

    </div>
  </CommonForm>
</template>

<script setup lang="ts">
import type {FormHandler} from "~/types/components/common/form.types";
import type {JsonResponse} from "~/types/request";
import {RESPONSE_CODE} from "~/types/enums";
import type {UpdateData} from "~/repositories/auth/inputs";

const toaster = useToaster()
const api = useApi()

const data = ref<Omit<UpdateData, 'keys'>>({
  password: null,
  oldPassword: null,
  passwordConfirm: null,
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    await api.auth.update({
      keys: ['password'],
      ...data.value
    })

    data.value.password = null
    data.value.oldPassword = null
    data.value.passwordConfirm = null

    await toaster.success({
      title: 'toast.profile.password.success'
    })
  },
  async onError(response): Promise<boolean> {
    const data = response._data as JsonResponse

    if (data.code === RESPONSE_CODE.CLIENT_ERROR) {
      await toaster.error({
        title: 'toast.profile.password.samePassword'
      })

      return true
    }

    return false
  }
}
</script>
