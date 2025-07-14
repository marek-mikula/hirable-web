<template>
  <CommonForm id="apply-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

    <div class="p-3 lg:p-4 grid grid-cols-2 gap-3 lg:gap-4">

      <FormInput
          v-model="data.firstname"
          name="firstname"
          class="col-span-2 md:col-span-1"
          autocomplete="given-name"
          :label="$t('model.common.firstname')"
          :maxlength="255"
          required
      />

      <FormInput
          v-model="data.lastname"
          name="lastname"
          class="col-span-2 md:col-span-1"
          autocomplete="family-name"
          :label="$t('model.common.lastname')"
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
          :maxlength="255"
          required
      />

      <div class="flex items-center col-span-2 gap-3 lg:gap-4">

        <FormSelect
            v-model="data.phonePrefix"
            name="phonePrefix"
            class="col-span-2 md:col-span-1 w-30"
            :label="$t('model.common.phonePrefix')"
            :options="[{value: '+420', label: '+420'}]"
            :option-loader="createClassifierSelectLoader(CLASSIFIER_TYPE.PHONE_PREFIX)"
            required
            disable-empty
        />

        <FormInput
            v-model="data.phone"
            name="phone"
            type="tel"
            class="flex-1 min-w-0 col-span-2 md:col-span-1"
            autocomplete="tel-local"
            :label="$t('model.common.phone')"
            :maxlength="255"
            required
        />

      </div>

      <FormInput
          v-model="data.linkedin"
          name="linkedin"
          type="url"
          class="col-span-2"
          :label="$t('model.common.linkedin')"
          :hint="$t('form.hint.common.url')"
          :maxlength="255"
      />

      <FormFileUpload
          v-model="data.cv"
          name="cv"
          class="col-span-2"
          :label="$t('model.candidate.cv')"
          required
      />

      <FormMultiFileUpload
          v-model="data.otherFiles"
          name="otherFiles"
          class="col-span-2"
          :label="$t('model.candidate.otherFiles')"
      />

    </div>

    <div class="p-3 lg:p-4 text-right">
      <CommonButton
          class="w-full md:w-auto"
          type="submit"
          variant="primary"
          :label="$t('common.action.submit')"
      />
    </div>

  </CommonForm>
</template>

<script setup lang="ts">
import {createClassifierSelectLoader} from "~/functions/classifier";
import {CLASSIFIER_TYPE} from "~/types/enums";
import type {FormHandler} from "~/types/components/common/form.types";
import type {TokenInfo} from "~/repositories/resources";
import type {ApplyData} from "~/repositories/application/inputs";

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
  phone: null,
  linkedin: null,
  cv: null,
  otherFiles: [],
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    // todo
  },
}
</script>
