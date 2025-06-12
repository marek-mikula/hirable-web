<template>
  <CommonModal :open="open" :title="$t('modal.company.storeContact.title')" :title-icon="AtSymbolIcon" @close="close">
    <template #content>
      <CommonForm id="company-contact-store-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="p-4 space-y-4">
          <FormInput
              v-model="data.firstname"
              name="firstname"
              :error="firstError('firstname')"
              :label="$t('model.common.firstname')"
              :maxlength="255"
              required
          />

          <FormInput
              v-model="data.lastname"
              name="lastname"
              :error="firstError('lastname')"
              :label="$t('model.common.lastname')"
              :maxlength="255"
              required
          />

          <FormInput
              v-model="data.email"
              name="email"
              type="email"
              :error="firstError('email')"
              :label="$t('model.common.email')"
              :maxlength="255"
              required
          />

          <FormSelect
              v-model="data.language"
              name="language"
              :error="firstError('language')"
              :label="$t('model.common.communicationLanguage')"
              :options="languageOptions"
              required
              hide-search
          />

          <FormSuggestInput
            v-model="data.companyName"
            name="companyName"
            :error="firstError('companyName')"
            :label="$t('model.company.name')"
            :hint="$t('form.hint.common.suggest')"
            :maxlength="255"
            :suggester="createCompanyContactCompaniesSuggester(user.companyId)"
          />

          <FormTextarea
            v-model="data.note"
            name="note"
            :error="firstError('note')"
            :label="$t('model.common.note')"
            :maxlength="300"
          />

        </div>

        <div class="p-4 flex items-center justify-between">
          <CommonButton
              variant="secondary"
              :label="$t('common.action.cancel')"
              @click="close"
          />
          <CommonButton
              type="submit"
              variant="primary"
              :label="$t('common.action.confirm')"
              :loading="isLoading"
              :disabled="isLoading"
          />
        </div>

      </CommonForm>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import {AtSymbolIcon} from "@heroicons/vue/24/outline";
import type {FormHandler} from "~/types/components/common/form.types";
import type {StoreData} from "~/repositories/companyContact/inputs";
import type {Locale} from "~/types/common";
import {createCompanyContactCompaniesSuggester} from "~/functions/suggest";

const props = defineProps<{
  open: boolean
}>()

const {user} = useAuth<true>()
const api = useApi()
const toaster = useToaster()
// @ts-expect-error wrongly typed composable
const { locales } = useI18n()

const languageOptions = locales.value.map((locale: Locale) => ({
  value: locale.code,
  label: locale.label,
}))

const data = ref<StoreData>({
  firstname: null,
  lastname: null,
  email: null,
  language: null,
  companyName: null,
  note: null,
})

const emit = defineEmits<{
  (e: 'close' | 'store'): void,
}>()

function close(): void {
  emit('close')
}

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    await api.companyContact.store(user.value.companyId, data.value)

    await toaster.success({
      title: 'toast.company.contact.store'
    })

    emit('store')
  }
}

watch(() => props.open, (value) => {
  if (!value) {
    data.value.firstname = null
    data.value.lastname = null
    data.value.email = null
    data.value.language = null
    data.value.companyName = null
    data.value.note = null
  }
})
</script>