<template>
  <CommonForm id="language-form" v-slot="{ isLoading, firstError }" class="divide-y divide-gray-200 border border-gray-200 rounded-md bg-white shadow-xs" :handler="handler">
    <div class="px-4 py-3">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        {{ $t('page.company.settings.language.title') }}
      </h2>
    </div>
    <div class="px-4 py-3 grid grid-cols-1 sm:grid-cols-6 gap-4">

      <FormSelect
          v-model="data.language"
          class="sm:col-span-3"
          name="language"
          :error="firstError('language')"
          :label="$t('model.common.language')"
          :help="{ content: $t('form.help.company.language')}"
          :options="options"
          hide-search
          disable-empty
      />

    </div>
    <div class="px-4 py-3 text-right">

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
import type {Company} from "~/repositories/resources";
import type {UpdateData} from "~/repositories/company/inputs";
import type {Locale} from "~/types/common";

const props = defineProps<{
  company: Company
}>()

const emit = defineEmits<{
  (e: 'update', company: Company): void
}>()

const toaster = useToaster()
const api = useApi()
const { user } = useAuth<true>()
// @ts-expect-error wrongly typed composable
const { locales, locale: currentLocale, setLocale } = useI18n()

const data = ref<Omit<UpdateData, 'keys'>>({
  language: props.company.language,
})

const options = locales.value.map((locale: Locale) => ({
  value: locale.code,
  label: locale.label
}))

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.company.update(user.value.companyId, {
      keys: ['language'],
      ...data.value
    })

    const company = response._data!.data.company

    // emit update
    emit('update', company)

    await toaster.success({
      title: 'toast.company.update'
    })
  }
}
</script>