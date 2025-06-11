<template>
  <CommonForm id="language-form" v-slot="{ isLoading, firstError }" class="divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white shadow-sm" :handler="handler">
    <div class="px-4 py-3">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        {{ $t('page.profile.settings.language.title') }}
      </h2>
    </div>
    <div class="px-4 py-3 grid grid-cols-1 sm:grid-cols-6 gap-4">

      <FormSelect
          v-model="data.language"
          class="sm:col-span-3"
          name="language"
          :error="firstError('language')"
          :label="$t('model.common.language')"
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
import type {Locale} from "~/types/common";
import type {FormHandler} from "~/types/components/common/form.types";
import type {LANGUAGE} from "~/types/enums";
import type {UpdateData} from "~/repositories/user/inputs";

const toaster = useToaster()
const api = useApi()
const { user, setUser } = useAuth<true>()
// @ts-expect-error wrongly typed composable
const { locales, locale: currentLocale, setLocale } = useI18n()
const moment = useMoment()

const data = ref<Omit<UpdateData, 'keys'>>({
  language: user.value.language,
})

const options = locales.value.map((locale: Locale) => ({
  value: locale.code,
  label: locale.label
}))

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.user.update(user.value.id, {
      keys: ['language'],
      ...data.value
    })

    const newUser = response._data!.data.user

    // update user model reference
    setUser(newUser)

    setLocale(newUser.language)
    moment.locale(newUser.language)

    await toaster.success({
      title: 'toast.profile.language.success'
    })
  }
}

// update value in form when user changes the language
// somewhere else
watch(() => currentLocale.value, (val) => {
  if (val) {
    data.value.language = val as LANGUAGE
  }
})
</script>