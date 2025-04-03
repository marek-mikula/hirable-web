<template>
  <div class="space-y-3 lg:space-y-4">

    <div class="sm:flex sm:items-center sm:justify-between">
      <h1 class="text-base text-xl font-semibold text-gray-900">
        {{ user.company.name }}
      </h1>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-start gap-3 lg:gap-4">

      <!-- company navigation -->
      <CompanyProfileNavigation class="flex flex-col shrink-0 sm:w-56"/>

      <!-- sub-page content -->
      <div class="grow">
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
  layout: 'app',
  middleware: 'auth'
})

useHead({
  titleTemplate: '%s %separator %subPage %separator %siteName',
  templateParams: {
    subPage: () => t('page.company.title'),
    separator: '·',
    siteName: appName as string
  }
})
</script>