<template>
  <div>
    {{ position }}
  </div>
</template>

<script setup lang="ts">
import type {Position} from "~/repositories/resources";

const { t } = useI18n()
const app = useApp()
const api = useApi()
const id = useRouteParam<number>('id', (val) => parseInt(val))

const {
  data: position,
  error
} = await useAsyncData<Position>('position', () => api.position.show(id.value).then(response => response._data!.data.position))

if (error.value) {
  throw createError({...error.value, fatal: true})
}

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

useHead({
  title: () => position.value!.name
})

onMounted(() => {
  app.setTitle({
    title: position.value!.name,
  })
})
</script>