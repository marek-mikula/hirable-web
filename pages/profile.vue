<template>
  <div class="space-y-3 lg:space-y-4">

    <div class="flex flex-col sm:flex-row sm:items-start gap-3 lg:gap-4">

      <!-- profile navigation -->
      <UserProfileNavigation class="flex flex-col shrink-0 sm:w-56 sm:sticky sm:top-16"/>

      <!-- sub-page content -->
      <div class="flex-1 min-w-0">
        <NuxtPage keepalive/>
      </div>

    </div>

    <ClientOnly>
      <teleport to="#page-title">
        <LayoutPageTitle>
          <div class="flex items-center gap-x-4">
            <UserAvatar size-class="h-10 w-10 sm:h-14 sm:w-14"/>
            <div class="space-y-1">
              <div class="text-base text-sm font-semibold text-gray-900">
                {{ user.fullName }}
              </div>
              <div class="flex items-center space-x-1">
                <span class="text-sm text-gray-500">{{ user.companyName }}</span>
                <CommonBadge variant="info" :label="$t(`model.company.roles.${user.companyRole}`)"/>
              </div>
            </div>
          </div>
        </LayoutPageTitle>
      </teleport>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { user } = useAuth<true>()
const { appName } = useAppConfig()

definePageMeta({
  layout: 'app',
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