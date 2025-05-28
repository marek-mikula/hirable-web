<template>
  <CommonModal :open="open" :title="$t('modal.company.storeContact.title')" @close="close">
    <template #content>
      <CommonForm id="company-contact-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="p-4 space-y-3">
          <FormInput
              v-model="data.firstname"
              name="firstname"
              :error="firstError('firstname')"
              :label="$t('model.common.firstname')"
              required
          />

          <FormInput
              v-model="data.lastname"
              name="lastname"
              :error="firstError('lastname')"
              :label="$t('model.common.lastname')"
              required
          />

          <FormInput
              v-model="data.email"
              name="email"
              type="email"
              :error="firstError('email')"
              :label="$t('model.common.email')"
              required
          />

          <FormSuggestInput
            v-model="data.companyName"
            name="companyName"
            :error="firstError('companyName')"
            :label="$t('model.company.name')"
            :hint="$t('form.hint.common.suggest')"
            :suggester="createCompanyContactCompaniesSuggester()"
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
              type="button"
              variant="secondary"
              :label="$t('common.action.cancel')"
              @click="close"
          />
          <CommonButton
              type="submit"
              variant="primary"
              :label="$t('common.action.confirm')"
              :loading="isLoading"
          />
        </div>

      </CommonForm>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import type {FormHandler} from "~/types/components/common/form.types";
import type {StoreData} from "~/repositories/companyContact/inputs";
import {createCompanyContactCompaniesSuggester} from "~/functions/suggest";

defineProps<{
  open: boolean
}>()

const api = useApi()
const toaster = useToaster()

const data = ref<StoreData>({
  firstname: null,
  lastname: null,
  email: null,
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
    await api.companyContact.store(data.value)

    await toaster.success({
      title: 'toast.company.contact.store.success'
    })

    data.value.firstname = null
    data.value.lastname = null
    data.value.email = null
    data.value.companyName = null
    data.value.note = null

    emit('store')
  }
}
</script>