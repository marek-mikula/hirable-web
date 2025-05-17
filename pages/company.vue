<template>
  <div class="space-y-3 lg:space-y-4">

    <div class="sm:flex sm:items-center sm:justify-between">
      <h1 class="text-base text-xl font-semibold text-gray-900">
        {{ company.name }}
      </h1>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-start gap-3 lg:gap-4">

      <!-- company navigation -->
      <CompanyProfileNavigation class="flex flex-col shrink-0 sm:w-56 sm:sticky sm:top-16"/>

      <!-- sub-page content -->
      <div class="flex-1 min-w-0">
        <NuxtPage :company="company" keepalive @updated="onUpdated"/>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import type {Company} from "~/repositories/resources";

const { t } = useI18n()
const { user } = useAuth<true>()
const { appName } = useAppConfig()
const api = useApi()

const { data: company } = await useAsyncData<Company>('company', () => api.company.show().then(response => response._data!.data.company))

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

function onUpdated(updatedCompany: Company): void {
  company.value = updatedCompany
}
</script>