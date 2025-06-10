<template>
  <div class="space-y-3 lg:space-y-4">

    <div class="flex flex-col sm:flex-row sm:items-start gap-3 lg:gap-4">

      <!-- company navigation -->
      <CompanyProfileNavigation class="flex flex-col shrink-0 sm:w-56 sm:sticky sm:top-16"/>

      <!-- sub-page content -->
      <div class="flex-1 min-w-0">
        <NuxtPage :company="company" keepalive @update="onUpdated"/>
      </div>

    </div>

    <ClientOnly>
      <teleport to="#page-title">
        <LayoutPageTitle
            :title="company.name"
            :icon="UsersIcon"
        />
      </teleport>
    </ClientOnly>

  </div>
</template>

<script setup lang="ts">
import {UsersIcon} from "@heroicons/vue/24/outline";
import type {Company} from "~/repositories/resources";

const { t } = useI18n()
const { user } = useAuth<true>()
const { appName } = useAppConfig()
const api = useApi()

const { data: company, error } = await useAsyncData<Company>('company', () => api.company.show(user.value.companyId).then(response => response._data!.data.company))

if (error.value) {
  throw createError({...error.value, fatal: true})
}

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