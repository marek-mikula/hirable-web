<template>
  <CommonForm id="timezone-form" v-slot="{ isLoading, firstError }" class="divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white shadow-sm" :handler="handler">
    <div class="px-4 py-3">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        {{ $t('page.profile.settings.timezone.title') }}
      </h2>
      <p class="mt-1 text-sm text-gray-600">
        {{ $t('page.profile.settings.timezone.subtitle') }}
      </p>
    </div>
    <div class="px-4 py-3 grid grid-cols-1 sm:grid-cols-6 gap-4">

      <FormSelect
          v-model="data.timezone"
          class="sm:col-span-3"
          name="timezone"
          :error="firstError('timezone')"
          :label="$t('model.user.timezone')"
          :options="options"
          :hint="$t('form.hint.user.timezone')"
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
import type {UpdateData} from "~/repositories/auth/inputs";
import {timezones} from "~/data/timezones";

const toaster = useToaster()
const api = useApi()
const { user, setUser } = useAuth<true>()

const data = ref<Omit<UpdateData, 'keys'>>({
  timezone: user.value.timezone,
})

const options = timezones.map(timezone => ({
  value: timezone,
  label: timezone
}))

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.auth.update({
      keys: ['timezone'],
      ...data.value
    })

    // update user model reference
    setUser(response._data!.data.user)

    await toaster.success({
      title: 'toast.profile.timezone.success'
    })
  }
}
</script>