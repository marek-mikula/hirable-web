<template>
  <CommonForm id="company-form" v-slot="{ isLoading, firstError }" class="divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white shadow-sm" :handler="handler">

    <div class="px-4 py-3">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        {{ $t('page.company.information.basic.title') }}
      </h2>
    </div>

    <div class="px-4 py-3 grid grid-cols-1 sm:grid-cols-6 gap-4">

      <FormInput
          v-model="data.name"
          class="sm:col-span-3"
          name="name"
          type="text"
          :error="firstError('name')"
          :maxlength="255"
          :label="$t('model.company.name')"
          :disabled="isDisabled"
          required
      />

      <FormInput
          v-model="data.email"
          class="sm:col-span-3"
          name="email"
          type="email"
          :error="firstError('email')"
          :maxlength="255"
          :label="$t('model.company.email')"
          :disabled="isDisabled"
          required
      />

      <FormInput
          v-model="data.idNumber"
          class="sm:col-span-3"
          name="idNumber"
          type="text"
          :error="firstError('idNumber')"
          :maxlength="255"
          :label="$t('model.company.idNumber')"
          :disabled="isDisabled"
          required
      />

      <FormInput
          v-model="data.website"
          class="sm:col-span-3"
          name="website"
          type="url"
          :error="firstError('website')"
          :maxlength="255"
          :label="$t('model.company.website')"
          :hint="$t('form.hint.common.url')"
          :disabled="isDisabled"
      />

    </div>

    <div v-if="!isDisabled" class="px-4 py-3 text-right">
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
import type {FormHandler} from "~/types/components/common/form.types";
import type {UpdateData} from "~/repositories/company/inputs";
import type {Company} from "~/repositories/resources";
import {ROLE} from "~/types/enums";

const props = defineProps<{
  company: Company
}>()

const emit = defineEmits<{
  (e: 'update', company: Company): void
}>()

const toaster = useToaster()
const api = useApi()
const { user, setUser, hasRole } = useAuth<true>()

const data = ref<Omit<UpdateData, 'keys'>>({
  name: props.company.name,
  email: props.company.email,
  idNumber: props.company.idNumber,
  website: props.company.website,
})

const isDisabled = computed<boolean>(() => {
  return ! hasRole(ROLE.ADMIN)
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.company.update(user.value.companyId, {
      keys: ['name', 'email', 'idNumber', 'website'],
      ...data.value
    })

    const company = response._data!.data.company

    // update user model reference
    setUser({ ...user.value, companyName: company.name })

    // emit update
    emit('update', company)

    await toaster.success({
      title: 'toast.company.update'
    })
  }
}
</script>