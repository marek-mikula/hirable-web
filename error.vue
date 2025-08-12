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
          <CommonButton
              :size="4"
              :label="isLoggedIn ? $t('common.action.home') : $t('common.action.backToLogin')"
              @click="handleError"
          />
        </div>

      </div>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
import _ from 'lodash'
import type {NuxtError} from "nuxt/app";
import {RESPONSE_CODE} from "~/types/enums";
import type {ErrorRule} from "~/types/error.types";

const { isLoggedIn } = useAuth()
const { t } = useI18n()
const route = useRoute()

const props = defineProps<{
  error: NuxtError
}>()

const rules: ErrorRule[] = [
  {
    routes: ['approve'],
    codes: [RESPONSE_CODE.TOKEN_MISSING, RESPONSE_CODE.TOKEN_CORRUPTED, RESPONSE_CODE.TOKEN_INVALID],
    translations: {
      title: 'error.custom.approve.invalidToken.title',
      message: 'error.custom.approve.invalidToken.message'
    },
  },
  {
    routes: ['apply'],
    codes: [RESPONSE_CODE.TOKEN_MISSING, RESPONSE_CODE.TOKEN_INVALID],
    translations: {
      title: 'error.custom.apply.invalidToken.title',
      message: 'error.custom.apply.invalidToken.message'
    },
  },
  {
    routes: ['apply'],
    codes: [RESPONSE_CODE.APPLICATION_ENDED],
    translations: {
      title: 'error.custom.apply.applicationEnded.title',
      message: 'error.custom.apply.applicationEnded.message'
    },
  }
]

const code = ((): number => {
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
})()

const responseCode = ((): RESPONSE_CODE | null => {
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
})()

const rule = ((): ErrorRule|null => {
  if (responseCode === null) {
    return null
  }

  for (const rule of rules) {
    if (!rule.routes.includes(_.toString(route.name))) {
      continue
    }

    if (!rule.codes.includes(responseCode)) {
      continue
    }

    return rule
  }

  return null
})()

const title = ((): string => t(rule?.translations.title ?? `error.title.${code}`))()
const message = ((): string => t(rule?.translations.message ?? `error.message.${code}`))()

function handleError(): void {
  if (isLoggedIn.value) {
    clearError({ redirect: '/' })
  } else {
    clearError({ redirect: '/login' })
  }
}
</script>