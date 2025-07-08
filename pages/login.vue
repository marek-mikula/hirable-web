<template>
  <div class="flex h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-sm space-y-10">
      <h2 class="text-center text-2xl font-medium text-gray-900">
        <CommonLogo/>
      </h2>

      <LoginForm :backlink="backlink"/>

      <p class="text-center text-sm space-x-1">
        <span class="text-gray-500">
          {{ $t('page.login.notAMember') }}
        </span>
        <CommonLink :to="'/register-request'">
          {{ $t('page.login.createAnAccount') }}
        </CommonLink>
      </p>

      <div class="flex justify-center">
        <CommonLocaleSwitch/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  middleware: 'guest'
})

const { t } = useI18n()
const backlink = useRouteQuery<string | null>('backlink')

useHead({
  title: () => t('page.login.title')
})
</script>