<template>
  <div class="space-y-3 lg:space-y-4">
    <div class="flex items-center gap-x-4">
      <UserAvatar size-class="h-10 w-10 sm:h-14 sm:w-14"/>
      <div class="space-y-1">
        <div class="text-base text-sm font-semibold text-gray-900">
          {{ user.fullName }}
        </div>
        <div class="flex items-center space-x-1">
          <span class="text-sm text-gray-500">{{ user.company.name }}</span>
          <span class="inline-flex items-center rounded-md bg-primary-50 px-1.5 py-0.5 text-xs font-medium text-primary-600 ring-1 ring-inset ring-primary-500/10">
            {{ $t(`model.company.roles.${user.companyRole}`)}}
          </span>
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-start gap-3 lg:gap-4">

      <!-- profile navigation -->
      <UserProfileNavigation class="flex flex-col shrink-0 sm:w-56 sm:sticky sm:top-5"/>

      <!-- sub-page content -->
      <div class="flex-1 min-w-0">
        <NuxtPage keepalive/>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { user } = useAuth<true>()
const { appName } = useAppConfig()

definePageMeta({
  layout: 'app2',
  middleware: 'auth'
})

useHead({
  titleTemplate: '%s %separator %subPage %separator %siteName',
  templateParams: {
    subPage: () => t('page.profile.title'),
    separator: '·',
    siteName: appName as string
  }
})
</script>