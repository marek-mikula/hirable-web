<template>
  <div class="mx-auto max-w-2xl p-3 lg:p-4 space-y-3 lg:space-y-4">

    <!-- approval info -->
    <PositionApprovalInfo :position="position"/>

    <!-- approval form -->
    <div class="col-span-1 sticky bottom-0">
      <PositionApprovalForm :position="position" :token="token" class="sticky top-16" @approve="onDecided" @reject="onDecided"/>
    </div>

    <div class="flex items-center justify-center">
      <CommonLocaleSwitch/>
    </div>

  </div>
</template>

<script setup lang="ts">
import type {Position} from "~/repositories/resources";

definePageMeta({
  layout: 'default',
  middleware: 'guest',
  async validate(route) {
    return typeof route.query.token === 'string'
  }
})

const { t } = useI18n()
const { appName } = useAppConfig()
const token = useRouteQuery<string>('token')
const api = useApi()

const {
  data: position,
  error
} = await useAsyncData<Position>('position', () => api.positionExternalApproval.show(token.value).then(response => response._data!.data.position))

if (error.value) {
  throw createError({...error.value, fatal: true})
}

useHead({
  titleTemplate: '%position %separator %s %separator %siteName',
  templateParams: {
    separator: '·',
    position: position.value!.name,
    siteName: appName as string
  },
  title: () => t('page.position.approve.title'),
  bodyAttrs: {
    class: 'bg-gray-50'
  }
})

async function onDecided(): Promise<void> {
  await navigateTo('/login')
}
</script>