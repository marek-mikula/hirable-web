<template>
  <div>
    <NuxtPage :position="position" @update="onUpdate"/>

    <ClientOnly>
      <teleport to="#page-title">
        <LayoutPageTitle
            :title="position.name"
            :icon="BriefcaseIcon"
            :actions="[
                {
                  handler: duplicate,
                  variant: 'secondary',
                  icon: DocumentDuplicateIcon,
                  tooltip: { content: $t('common.action.duplicate') },
                  loading: duplicating
                }
            ]"
            :subtitle="[position.field?.label, position.department].filter(item => !!item).join(' · ')"
        >
          <template #afterTitle>
            <PositionState :state="position.state"/>
          </template>

          <template #after>
            <PositionDetailTabs :position="position" :tab="currentRoute" class="mt-3 lg:mt-4"/>
          </template>
        </LayoutPageTitle>
      </teleport>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash'
import {BriefcaseIcon, DocumentDuplicateIcon} from "@heroicons/vue/24/outline";
import type {Position} from "~/repositories/resources";
import {POSITION_DETAIL_TAB, POSITION_STATE} from "~/types/enums";

const {t} = useI18n()
const {appName} = useAppConfig()
const api = useApi()
const id = useRouteParam<number>('id', (val) => parseInt(val))
const route = useRoute()
const toaster = useToaster()

const {
  data: position,
  error
} = await useAsyncData<Position>(
    () => `position-detail-${id.value}`,
    () => api.position.show(id.value).then(response => response._data!.data.position)
)

if (error.value) {
  throw createError({...error.value, fatal: true})
}

if (position.value!.state !== POSITION_STATE.OPENED) {
  throw createError({status: 403, fatal: true})
}

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

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

function onUpdate(newPosition: Position): void {
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
  if (_.toString(routeName).startsWith('positions-id-candidates')) {
    currentRoute.value = POSITION_DETAIL_TAB.CANDIDATES
  } else if (_.toString(routeName).startsWith('positions-id-advertisements')) {
    currentRoute.value = POSITION_DETAIL_TAB.ADVERTISEMENTS
  } else if (_.toString(routeName).startsWith('positions-id-statistics')) {
    currentRoute.value = POSITION_DETAIL_TAB.STATISTICS
  } else {
    currentRoute.value = POSITION_DETAIL_TAB.DETAIL
  }
}, {immediate: true})
</script>