<template>
  <div>
    {{ position }}
  </div>

  <ClientOnly>
    <teleport to="#page-title">
      <LayoutPageTitle
          :title="position.name"
          :icon="BriefcaseIcon"
      />
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import {BriefcaseIcon} from "@heroicons/vue/24/outline";
import type {Position} from "~/repositories/resources";
import {POSITION_STATE} from "~/types/enums";

const { t } = useI18n()
const api = useApi()
const id = useRouteParam<number>('id', (val) => parseInt(val))

const {
  data: position,
  error
} = await useAsyncData<Position>('position', () => api.position.show(id.value).then(response => response._data!.data.position))

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
  title: () => position.value!.name
})
</script>