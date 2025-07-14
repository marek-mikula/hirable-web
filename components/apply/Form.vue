<template>
  <CommonForm id="apply-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

    <div class="p-3 lg:p-4 grid grid-cols-2 gap-3 lg:gap-4">

      <FormInput
          v-model="data.firstname"
          name="firstname"
          class="col-span-2 md:col-span-1"
          autocomplete="given-name"
          :label="$t('model.common.firstname')"
          :error="firstError('firstname')"
          :maxlength="255"
          required
      />

      <FormInput
          v-model="data.lastname"
          name="lastname"
          class="col-span-2 md:col-span-1"
          autocomplete="family-name"
          :label="$t('model.common.lastname')"
          :error="firstError('lastname')"
          :maxlength="255"
          required
      />

      <FormInput
          v-model="data.email"
          name="email"
          type="email"
          class="col-span-2"
          autocomplete="email"
          :label="$t('model.common.email')"
          :error="firstError('email')"
          :maxlength="255"
          required
      />

      <div class="flex flex-col sm:flex-row sm:items-start col-span-2 gap-3 lg:gap-4">

        <FormSelect
            v-model="data.phonePrefix"
            name="phonePrefix"
            class="col-span-2 md:col-span-1 sm:w-30"
            :label="$t('model.common.phonePrefix')"
            :error="firstError('phonePrefix')"
            :options="[{value: '+420', label: '+420'}]"
            :option-loader="createClassifierSelectLoader(CLASSIFIER_TYPE.PHONE_PREFIX)"
            required
            disable-empty
        />

        <FormInput
            v-model="data.phoneNumber"
            name="phoneNumber"
            type="tel"
            class="flex-1 min-w-0 col-span-2 md:col-span-1"
            autocomplete="tel-local"
            :label="$t('model.common.phoneNumber')"
            :error="firstError('phoneNumber')"
            :hint="$t('form.hint.common.phoneNumber')"
            :maxlength="20"
            required
        />

      </div>

      <FormInput
          v-model="data.linkedin"
          name="linkedin"
          type="url"
          class="col-span-2"
          :label="$t('model.common.linkedin')"
          :error="firstError('linkedin')"
          :hint="$t('form.hint.common.url')"
          :maxlength="255"
      />

      <FormFileUpload
          v-model="data.cv"
          name="cv"
          class="col-span-2"
          :label="$t('model.candidate.cv')"
          :error="firstError('cv')"
          :formats="candidateConfig.files.cv.extensions"
          :max-size="candidateConfig.files.cv.maxSize"
          required
      />

      <FormMultiFileUpload
          v-model="data.otherFiles"
          name="otherFiles"
          class="col-span-2"
          :label="$t('model.candidate.otherFiles')"
          :error="firstError('otherFiles', true)"
          :formats="candidateConfig.files.other.extensions"
          :max-size="candidateConfig.files.other.maxSize"
          :max-files="candidateConfig.files.other.maxFiles"
      />

    </div>

    <div class="p-3 lg:p-4 text-right">
      <CommonButton
          class="w-full md:w-auto"
          type="submit"
          variant="primary"
          :label="$t('common.action.submit')"
          :loading="isLoading"
          :disabled="isLoading"
      />
    </div>

  </CommonForm>
</template>

<script setup lang="ts">
import _ from 'lodash'
import {createClassifierSelectLoader} from "~/functions/classifier";
import {CLASSIFIER_TYPE} from "~/types/enums";
import type {FormHandler} from "~/types/components/common/form.types";
import type {TokenInfo} from "~/repositories/resources";
import type {ApplyData} from "~/repositories/application/inputs";
import {candidateConfig} from "~/config/candidate";

const toaster = useToaster()
const api = useApi()

const props = defineProps<{
  token: string
  tokenInfo: TokenInfo
}>()

const data = ref<ApplyData>({
  firstname: null,
  lastname: null,
  email: null,
  phonePrefix: '+420',
  phoneNumber: null,
  linkedin: null,
  cv: null,
  otherFiles: [],
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.application.apply(props.token, collectData())
  },
}

function collectData(): FormData {
  const formData = new FormData()

  formData.set('firstname', _.toString(data.value.firstname))
  formData.set('lastname', _.toString(data.value.lastname))
  formData.set('email', _.toString(data.value.email))
  formData.set('phonePrefix', _.toString(data.value.phonePrefix))
  formData.set('phoneNumber', _.toString(data.value.phoneNumber))
  formData.set('linkedin', _.toString(data.value.linkedin))
  formData.set('cv', data.value.cv!)

  for (const [index, file] of data.value.otherFiles.entries()) {
    formData.set(`otherFiles[${index}]`, file)
  }

  return formData
}
</script>
