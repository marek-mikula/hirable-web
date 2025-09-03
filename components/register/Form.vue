<template>
  <CommonForm id="register-form" v-slot="{ isLoading, firstError }" :handler="handler" class="space-y-5">

    <FormInput
        v-model="data.firstname"
        type="text"
        name="firstname"
        autocomplete="given-name"
        :label="$t('model.common.firstname')"
        :error="firstError('firstname')"
        :maxlength="255"
        required
    />

    <FormInput
        v-model="data.lastname"
        type="text"
        name="lastname"
        autocomplete="family-name"
        :label="$t('model.common.lastname')"
        :error="firstError('lastname')"
        :maxlength="255"
        required
    />

    <FormInput
        v-model="data.password"
        type="password"
        name="password"
        autocomplete="new-password"
        :label="$t('model.user.password')"
        :error="firstError('password')"
        :hint="$t('form.hint.user.password')"
        required
    />

    <FormInput
        v-model="data.passwordConfirm"
        type="password"
        name="passwordConfirm"
        :label="$t('model.user.passwordConfirm')"
        :error="firstError('passwordConfirm')"
        required
    />

    <FormInput
        v-if="! noCompany"
        v-model="data.companyName"
        type="text"
        name="companyName"
        :label="$t('model.company.name')"
        :error="firstError('companyName')"
        :maxlength="255"
        required
    />

    <FormInput
        v-if="! noCompany"
        v-model="data.companyIdNumber"
        type="text"
        name="companyIdNumber"
        :label="$t('model.company.idNumber')"
        :error="firstError('companyIdNumber')"
        :maxlength="255"
        required
    />

    <FormInput
        v-if="! noCompany"
        v-model="data.companyEmail"
        type="email"
        name="companyEmail"
        :label="$t('model.company.email')"
        :error="firstError('companyEmail')"
        :maxlength="255"
        required
    />

    <FormInput
        v-if="! noCompany"
        v-model="data.companyWebsite"
        type="url"
        name="companyWebsite"
        :label="$t('model.company.website')"
        :error="firstError('companyWebsite')"
        :maxlength="255"
        :hint="$t('form.hint.common.url')"
    />

    <p class="text-xs text-gray-500">
      <i18n-t keypath="page.register.gdpr.text" tag="span" scope="global">
        <template #gdprButton>
          <CommonLink to="/gdpr" target="_blank">
            {{ $t('page.register.gdpr.gdprButton') }}
          </CommonLink>
        </template>
        <template #termsButton>
          <CommonLink to="/terms-and-conditions" target="_blank">
            {{ $t('page.register.gdpr.termsButton') }}
          </CommonLink>
        </template>
      </i18n-t>
    </p>

    <div class="space-y-2">
      <CommonButton
          class="w-full"
          type="submit"
          :label="$t('page.register.submit')"
          :loading="isLoading"
      />

      <CommonButton
          class="w-full"
          variant="secondary"
          :label="$t('common.action.backToLogin')"
          :to="'/login'"
      />
    </div>

  </CommonForm>
</template>

<script setup lang="ts">
import _ from 'lodash'
import type {FormHandler} from "~/types/components/common/form.types";
import {RESPONSE_CODE} from "~/types/enums";
import type {JsonResponse} from "~/types/request";
import type {RegisterData} from "~/repositories/register/inputs";

const {loginUser} = useAuth()
const toaster = useToaster()
const api = useApi()

const props = withDefaults(defineProps<{
  token: string
  noCompany?: boolean
}>(), {
  noCompany: false,
})

const data = ref<RegisterData>({
  firstname: null,
  lastname: null,
  password: null,
  passwordConfirm: null,
  companyName: null,
  companyIdNumber: null,
  companyWebsite: null,
  companyEmail: null,
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const formData = data.value

    // unset company fields
    // if company is ignored
    if (props.noCompany) {
      _.unset(formData, [
          'companyName',
          'companyIdNumber',
          'companyWebsite',
          'companyEmail',
      ])
    }

    const response = await api.register.register(props.token, formData)

    loginUser(response._data!.data.user)

    await navigateTo('/')

    await toaster.success({
      title: 'toast.register.success'
    })
  },
  async onError(response): Promise<boolean> {
    if ([
      RESPONSE_CODE.TOKEN_CORRUPTED,
      RESPONSE_CODE.TOKEN_INVALID,
      RESPONSE_CODE.TOKEN_MISSING,
      RESPONSE_CODE.TOKEN_MISMATCH,
    ].includes(response._data!.code)) {
      await toaster.error({
        title: 'toast.register.linkInvalid'
      })

      return true
    }

    return false
  }
}
</script>
