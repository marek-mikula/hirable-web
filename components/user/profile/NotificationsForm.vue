<template>
  <CommonForm id="account-delete-form" v-slot="{ isLoading, firstError }" class="divide-y divide-gray-200 border border-gray-200 overflow-hidden rounded-lg bg-white shadow-sm" :handler="handler">
    <div class="px-4 py-3">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        {{ $t('page.profile.notifications.title') }}
      </h2>
    </div>
    <div class="px-4 py-3 grid grid-cols-1 gap-4">

      <div>
        <h3 class="text-base font-semibold leading-7 text-gray-900">
          {{ $t('page.profile.notifications.application.title') }}
        </h3>
        <p class="mt-1 text-sm text-gray-600">
          {{ $t('page.profile.notifications.application.subtitle') }}
        </p>
      </div>

      <FormCheckbox
          id="application-mail-notifications"
          v-model="data.notificationApplicationMail"
          name="mail"
          :error="firstError('notificationApplicationMail')"
          :label="$t('page.profile.notifications.types.mail.label')"
          :hint="$t('page.profile.notifications.types.mail.hint')"
      />

      <FormCheckbox
          id="application-app-notifications"
          v-model="data.notificationApplicationApp"
          name="app"
          :error="firstError('notificationApplicationApp')"
          :label="$t('page.profile.notifications.types.app.label')"
          :hint="$t('page.profile.notifications.types.app.hint')"
      />

      <div>
        <h3 class="text-base font-semibold leading-7 text-gray-900">
          {{ $t('page.profile.notifications.marketing.title') }}
        </h3>
        <p class="mt-1 text-sm text-gray-600">
          {{ $t('page.profile.notifications.marketing.subtitle') }}
        </p>
      </div>

      <FormCheckbox
          id="marketing-mail-notifications"
          v-model="data.notificationMarketingMail"
          name="mail"
          :error="firstError('notificationMarketingMail')"
          :label="$t('page.profile.notifications.types.mail.label')"
          :hint="$t('page.profile.notifications.types.mail.hint')"
      />

      <FormCheckbox
          id="marketing-app-notifications"
          v-model="data.notificationMarketingApp"
          name="app"
          :error="firstError('notificationMarketingApp')"
          :label="$t('page.profile.notifications.types.app.label')"
          :hint="$t('page.profile.notifications.types.app.hint')"
      />

      <div>
        <h3 class="text-base font-semibold leading-7 text-gray-900">
          {{ $t('page.profile.notifications.technical.title') }}
        </h3>
        <p class="mt-1 text-sm text-gray-600">
          {{ $t('page.profile.notifications.technical.subtitle') }}
        </p>
      </div>

      <FormCheckbox
          id="technical-mail-notifications"
          v-model="data.notificationTechnicalMail"
          name="mail"
          :error="firstError('notificationTechnicalMail')"
          :label="$t('page.profile.notifications.types.mail.label')"
          :hint="$t('page.profile.notifications.types.mail.hint')"
      />

      <FormCheckbox
          id="technical-app-notifications"
          v-model="data.notificationTechnicalApp"
          name="app"
          :error="firstError('notificationTechnicalApp')"
          :label="$t('page.profile.notifications.types.app.label')"
          :hint="$t('page.profile.notifications.types.app.hint')"
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
import type {UpdateData} from "~/repositories/auth/inputs";

const toaster = useToaster()
const api = useApi()
const { user, setUser } = useAuth<true>()

const data = ref<Omit<UpdateData, 'keys'>>({
  notificationApplicationMail: user.value.notifications.application.mail,
  notificationApplicationApp: user.value.notifications.application.app,
  notificationMarketingMail: user.value.notifications.marketing.mail,
  notificationMarketingApp: user.value.notifications.marketing.app,
  notificationTechnicalMail: user.value.notifications.technical.mail,
  notificationTechnicalApp: user.value.notifications.technical.app,
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.auth.update({
      keys: [
        'notificationApplicationMail',
        'notificationApplicationApp',
        'notificationMarketingMail',
        'notificationMarketingApp',
        'notificationTechnicalMail',
        'notificationTechnicalApp',
      ],
      ...data.value
    })

    // update user model reference
    setUser(response._data!.data.user)

    await toaster.success({
      title: 'toast.profile.notification.success'
    })
  }
}
</script>