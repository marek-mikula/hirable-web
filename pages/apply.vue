<template>
  <div>
    Apply for position! :) {{ token }}
  </div>
</template>

<script setup lang="ts">
import type {TokenInfo} from "~/repositories/resources";

definePageMeta({
  layout: 'default',
  async validate(route) {
    return typeof route.query.token === 'string'
  }
})

const token = useRouteQuery<string>('token')
const api = useApi()

const {
  data,
  error
} = await useAsyncData<TokenInfo>(`token-info-${token.value}`, () => api.application.tokenInfo(token.value).then(response => response._data!.data))

if (error.value) {
  throw createError({...error.value, fatal: true})
}
</script>