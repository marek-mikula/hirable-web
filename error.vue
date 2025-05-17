<template>
  <NuxtLayout name="default">
    <main class="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-3xl font-semibold text-primary-600">
          {{ code }}
        </p>
        <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          {{ $t(`error.title.${code}`) }}
        </h1>
        <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          {{ $t(`error.message.${code}`) }}
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <CommonButton :size="4" :label="$t('common.action.home')" @click="handleError"/>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type {NuxtError} from "nuxt/app";

const props = defineProps<{
  error: NuxtError
}>()

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

function handleError(): void {
  clearError({ redirect: '/' })
}
</script>