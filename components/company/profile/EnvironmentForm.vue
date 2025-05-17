<template>
  <CommonForm id="environment-form" v-slot="{ isLoading, firstError }" class="divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white shadow-sm" :handler="handler">

    <div class="px-4 py-3">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        {{ $t('model.company.environment') }}
      </h2>
      <p class="mt-1 text-sm text-gray-600">
        {{ $t('page.company.information.environment.description') }}
      </p>
    </div>

    <div class="px-4 py-3 grid grid-cols-6 gap-4">

      <FormTextarea
          v-model="data.environment"
          class="col-span-6"
          name="environment"
          :error="firstError('environment')"
          :maxlength="1000"
          :placeholder="$t('page.company.information.environment.placeholder')"
      />

      <FormMultiSelect
          v-model="data.benefits"
          class="col-span-6 lg:col-span-3"
          name="benefits"
          :options="company.benefits"
          :option-loader="createClassifierSelectLoader(CLASSIFIER_TYPE.BENEFIT)"
          :error="firstError('benefits')"
          :label="$t('model.company.benefits')"
          :hint="$t('form.hint.company.profile.environment.benefits')"
      />

    </div>

    <div class="px-4 py-3 text-right sm:text-left">
      <CommonButton
          type="submit"
          :label="$t('common.action.save')"
          :loading="isLoading"
          :disabled="isLoading"
      />
    </div>

  </CommonForm>
</template>

<script setup lang="ts">
import type {FormHandler} from "~/types/common";
import type {UpdateData} from "~/repositories/company/inputs";
import {createClassifierSelectLoader} from "~/functions/classifier";
import {CLASSIFIER_TYPE} from "~/types/enums";
import type {Company} from "~/repositories/resources";

const props = defineProps<{
  company: Company
}>()

const emit = defineEmits<{
  (e: 'updated', company: Company): void
}>()

const toaster = useToaster()
const api = useApi()

const data = ref<Omit<UpdateData, 'keys'>>({
  environment: props.company.environment,
  benefits: props.company.benefits.map(item => item.value),
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.company.update({
      keys: ['environment', 'benefits'],
      ...data.value
    })

    const company = response._data!.data.company

    // emit update
    emit('updated', company)

    await toaster.success({
      title: 'toast.company.update.success'
    })
  }
}
</script>