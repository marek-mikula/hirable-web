<template>
  <NuxtLayout name="default">
    <main class="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">

        <p class="text-3xl font-semibold text-primary-600">
          {{ code }}
        </p>

        <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          {{ title }}
        </h1>

        <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          {{ message }}
        </p>

        <div class="mt-10 flex items-center justify-center">
          <CommonButton :size="4" :label="isLoggedIn ? $t('common.action.home') : $t('common.action.backToLogin')" @click="handleError"/>
        </div>

      </div>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
import _ from 'lodash'
import type {NuxtError} from "nuxt/app";
import type {StringMap} from "~/types/common";
import {RESPONSE_CODE} from "~/types/enums";

const { isLoggedIn } = useAuth()
const { t } = useI18n()
const route = useRoute()

const props = defineProps<{
  error: NuxtError
}>()

const map: StringMap<[RESPONSE_CODE[], { title: string, message: string }]> = {
  'approve': [
    [
      RESPONSE_CODE.TOKEN_MISSING,
      RESPONSE_CODE.TOKEN_CORRUPTED,
      RESPONSE_CODE.TOKEN_INVALID,
    ], {
      title: 'error.custom.approve.invalidToken.title',
      message: 'error.custom.approve.invalidToken.message'
    }
  ]
}

const code = computed<number>(() => {
  const handledErrors = [
    401,
    403,
    404,
    429,
    500,
    503,
  ]

  return handledErrors.includes(props.error.statusCode)
      ? props.error.statusCode
      : 500
})

const title = computed<string>(() => {
  let key = `error.title.${code.value}`

  if (responseCode.value !== null) {
    const translations = _.get(map, _.toString(route.name))

    if (translations && translations[0].includes(responseCode.value)) {
      key = translations[1].title
    }
  }

  return t(key)
})

const message = computed<string>(() => {
  let key = `error.message.${code.value}`

  if (responseCode.value !== null) {
    const translations = _.get(map, _.toString(route.name))

    if (translations && translations[0].includes(responseCode.value)) {
      key = translations[1].message
    }
  }

  return t(key)
})

const responseCode = computed<RESPONSE_CODE | null>(() => {
  if (typeof props.error.data !== 'string') {
    return null
  }

  let json

  try {
    json = JSON.parse(props.error.data)
  } catch (e) {
    return null
  }

  if (!('code' in json)) {
    return null
  }

  return json['code'] as RESPONSE_CODE
})

function handleError(): void {
  if (isLoggedIn.value) {
    clearError({ redirect: '/' })
  } else {
    clearError({ redirect: '/login' })
  }
}
</script>