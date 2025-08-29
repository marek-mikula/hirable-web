<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">

    <!-- approval info -->
    <PositionApprovalInfo :position="position" class="col-span-1 lg:col-span-2" exclude-header/>

    <!-- approval form -->
    <div class="col-span-1 sticky bottom-0">
      <PositionApprovalForm :position="position" class="sticky top-16" @approve="onDecided" @reject="onDecided"/>
    </div>

  </div>

  <ClientOnly>
    <teleport to="#page-title">
      <LayoutPageTitle
          :title="position.name"
          :icon="BriefcaseIcon"
          :subtitle="$t('page.position.approve.title')"
      >
        <template #afterTitle>
          <PositionState :state="position.state"/>
        </template>
      </LayoutPageTitle>
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import type {PositionShow} from "~/repositories/resources";
import {BriefcaseIcon} from "@heroicons/vue/24/outline";

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

const policy = usePolicy()
const { appName } = useAppConfig()
const { t } = useI18n()
const { user } = useAuth<true>()
const api = useApi()
const id = useRouteParam<number>('id', (val) => parseInt(val))

const {
  data: position,
  error,
} = await useAsyncData<PositionShow>(
    () => `position-approve-${id.value}`,
    async () => api.position.show(id.value).then(response => response._data!.data.position)
)

if (error.value) {
  throw createError({...error.value, fatal: true})
}

if (!policy.position.approve(position.value!)) {
  throw createError({status: 403, fatal: true})
}


useHead({
  titleTemplate: '%position %separator %s %separator %siteName',
  templateParams: {
    separator: '·',
    position: position.value!.name,
    siteName: appName as string
  },
  title: () => t('page.position.approve.title'),
})

async function onDecided(): Promise<void> {
  await navigateTo('/positions')
}
</script>