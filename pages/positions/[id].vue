<template>
  <div>
    <PositionDetailTabs :position="position" :tab="currentRoute" class="mb-3 lg:mb-4"/>
    <NuxtPage :position="position" keepalive @update="onUpdate"/>
  </div>

  <ClientOnly>
    <teleport to="#page-title">
      <LayoutPageTitle
          :title="position.name"
          :icon="BriefcaseIcon"
          :subtitle="[position.field?.label, position.department].filter(item => !!item).join(' · ')"
      >
        <template #afterTitle>
          <PositionState :state="position.state"/>
        </template>

        <template #actions>
          <PositionDetailShareDropdown :position="position"/>
          <CommonButton
            v-if="policy.position.duplicate(position)"
            variant="secondary"
            :icon="DocumentDuplicateIcon"
            :loading="duplicating"
            v-tooltip="{ content: $t('common.action.duplicate') }"
            @click="duplicate"
          />
        </template>
      </LayoutPageTitle>
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import {BriefcaseIcon, DocumentDuplicateIcon} from "@heroicons/vue/24/outline";
import type {PositionShow} from "~/repositories/resources";
import {POSITION_DETAIL_TAB, POSITION_STATE} from "~/types/enums";

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

const {appName} = useAppConfig()
const api = useApi()
const id = useRouteParam<number>('id', (val) => parseInt(val))
const route = useRoute()
const toaster = useToaster()
const policy = usePolicy()

const {
  data: position,
  error
} = await useAsyncData<PositionShow>(
    () => `position-detail-${id.value}`,
    () => api.position.show(id.value).then(response => response._data!.data.position)
)

if (error.value) {
  throw createError({...error.value, fatal: true})
}

if (position.value!.state !== POSITION_STATE.OPENED) {
  throw createError({status: 403, fatal: true})
}


useHead({
  titleTemplate: '%s %separator %position %separator %siteName',
  templateParams: {
    separator: '·',
    position: position.value!.name,
    siteName: appName as string
  }
})

const currentRoute = ref<POSITION_DETAIL_TAB>(POSITION_DETAIL_TAB.DETAIL)
const duplicating = ref<boolean>(false)

function onUpdate(newPosition: PositionShow): void {
  position.value = newPosition
}

async function duplicate(): Promise<void> {
  duplicating.value = true

  const result = await handle(() => api.position.duplicate(position.value!.id).then(res => res._data!.data.id))

  duplicating.value = false

  if (!result.success) {
    return
  }

  await toaster.success({
    title: 'toast.position.duplicate'
  })

  await navigateTo(`/positions/edit/${result.result}`)
}

watch(() => route.name, (routeName) => {
  if (routeName === 'positions-id-candidates') {
    currentRoute.value = POSITION_DETAIL_TAB.CANDIDATES
  } else if (routeName === 'positions-id-advertisements') {
    currentRoute.value = POSITION_DETAIL_TAB.ADVERTISEMENTS
  } else if (routeName === 'positions-id-statistics') {
    currentRoute.value = POSITION_DETAIL_TAB.STATISTICS
  } else {
    currentRoute.value = POSITION_DETAIL_TAB.DETAIL
  }
}, {immediate: true})
</script>