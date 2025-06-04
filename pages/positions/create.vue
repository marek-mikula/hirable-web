<template>
  <PositionForm :classifiers="data.classifiers" :company="data.company"/>

  <ClientOnly>
    <teleport to="#page-title">
      <LayoutPageTitle
          :title="$t('page.positions.create.title')"
          :subtitle="$t('page.positions.create.subtitle')"
          :icon="BriefcaseIcon"
          :actions="[
              {
                icon: SparklesIcon,
                handler: createFromPrompt,
                variant: 'secondary',
                tooltip: { content: $t('page.positions.create.fromPrompt') }
              },
              {
                icon: DocumentTextIcon,
                handler: createFromFile,
                variant: 'secondary',
                tooltip: { content: $t('page.positions.create.fromFile') }
              }
          ]"
      />
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import {BriefcaseIcon, DocumentTextIcon, SparklesIcon} from '@heroicons/vue/24/outline'
import type {ClassifiersMap} from "~/repositories/classifier/responses";
import {CLASSIFIER_TYPE} from "~/types/enums";
import type {Company} from "~/repositories/resources";

const { t } = useI18n()
const api = useApi()

const {
  data,
  error,
} = await useAsyncData<{
  classifiers: ClassifiersMap
  company: Company
}>('position-create', async () => {
  // must be done like this, otherwise Nuxt
  // throws an error :(
  // @see https://github.com/nuxt/nuxt/issues/25099
  const nuxtApp = useNuxtApp()
  const company = await nuxtApp.runWithContext(() => api.company.show().then(response => response._data!.data.company))
  const classifiers = await nuxtApp.runWithContext(() => api.classifier.index([
    CLASSIFIER_TYPE.FIELD,
    CLASSIFIER_TYPE.EMPLOYMENT_FORM,
    CLASSIFIER_TYPE.EMPLOYMENT_RELATIONSHIP,
    CLASSIFIER_TYPE.WORKLOAD,
    CLASSIFIER_TYPE.SALARY_TYPE,
    CLASSIFIER_TYPE.SALARY_FREQUENCY,
    CLASSIFIER_TYPE.CURRENCY,
    CLASSIFIER_TYPE.BENEFIT,
    CLASSIFIER_TYPE.SENIORITY,
    CLASSIFIER_TYPE.EDUCATION_LEVEL,
    CLASSIFIER_TYPE.DRIVING_LICENCE,
    CLASSIFIER_TYPE.LANGUAGE,
    CLASSIFIER_TYPE.LANGUAGE_LEVEL,
  ]).then(response => response._data!.data.classifiers))
  return { classifiers, company }
})

if (error.value) {
  throw createError({...error.value, fatal: true})
}

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

useHead({
  title: () => t('page.positions.create.title')
})

function createFromPrompt(): void {
  // todo
}

function createFromFile(): void {
  // todo
}
</script>