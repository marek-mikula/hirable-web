<template>
  <div class="flex h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-sm space-y-10">
      <div class="space-y-2">
        <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {{ $t('page.resetPassword.title') }}
        </h2>
      </div>

      <ResetPasswordForm :token="token"/>

      <div class="flex justify-center">
        <CommonLocaleSwitch/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {RouteLocationNormalized} from "vue-router";

definePageMeta({
  layout: 'default',
  middleware: 'guest',
  async validate(route: RouteLocationNormalized) {
    return typeof route.query.token === 'string'
  }
})

const token = useRouteQuery<string>('token')
</script>
