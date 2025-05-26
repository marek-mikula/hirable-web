<template>
  <CommonForm id="login-form" v-slot="{ isLoading, firstError }" class="space-y-5" :handler="handler">

    <FormInput
        v-model="data.email"
        type="email"
        name="email"
        autocomplete="email"
        :placeholder="$t('model.common.email')"
        :error="firstError('email')"
        required
    />

    <FormInput
        v-model="data.password"
        type="password"
        name="password"
        autocomplete="current-password"
        :placeholder="$t('model.user.password')"
        :error="firstError('password')"
        required
    />

    <div class="flex items-center justify-between">
      <FormCheckbox
          v-model="data.rememberMe"
          name="rememberMe"
          :label="$t('page.login.rememberMe')"
      />

      <div class="text-sm">
        <CommonLink :to="'/forgotten-password'">
          {{ $t('page.login.forgotPassword') }}
        </CommonLink>
      </div>
    </div>

    <div>
      <CommonButton
          class="w-full"
          type="submit"
          :label="$t('page.login.signIn')"
          :loading="isLoading"
          :disabled="isLoading"
      />
    </div>

  </CommonForm>
</template>

<script setup lang="ts">
import type {FormHandler} from "~/types/components/common/form.types";
import type {JsonResponse} from "~/types/request";
import {RESPONSE_CODE} from "~/types/enums";

const props = defineProps<{
  backlink: string | null
}>()

const {loginUser} = useAuth()
const toaster = useToaster()
const api = useApi()
const { locale } = useI18n()

const data = ref({
  email: null,
  password: null,
  rememberMe: false,
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.auth.login(data.value)

    let user = response._data!.data.user

    // user updated language when he was
    // logged out => update language
    if (user.language !== locale.value) {
      const response = await api.auth.update({
        keys: ['language'],
        language: locale.value
      })

      user = response._data!.data.user
    }

    loginUser(user)

    await navigateTo(props.backlink || '/')

    await toaster.success({
      title: 'toast.login.success'
    })
  },
  async onError(response): Promise<boolean> {
    const data = response._data as JsonResponse

    if (data.code === RESPONSE_CODE.INVALID_CREDENTIALS) {
      await toaster.error({
        title: 'toast.login.invalidCredentials'
      })

      return true
    }

    if (data.code === RESPONSE_CODE.EMAIL_VERIFICATION_NEEDED) {
      await toaster.error({
        title: 'toast.login.verificationNeeded'
      })

      return true
    }

    return false
  }
}
</script>
