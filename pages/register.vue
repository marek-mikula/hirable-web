<template>
  <div class="flex justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-sm space-y-10">
      <div class="space-y-2">
        <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {{ $t('page.register.title') }}
        </h2>
        <p class="text-sm text-gray-500 text-center">
          {{ $t('page.register.subtitle') }}
        </p>
      </div>

      <RegisterForm :token="token"/>

      <div class="flex justify-center">
        <CommonLocaleSwitch/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'guest',
  async validate(route) {
    return typeof route.query.token === 'string'
  }
})

const token = useRouteQuery<string>('token')
const { t } = useI18n()

useHead({
  title: () => t('page.register.title')
})
</script>