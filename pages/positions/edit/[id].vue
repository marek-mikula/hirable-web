<template>
  <PositionForm :classifiers="data.classifiers" :position="data.position" @update="refresh"/>

  <ClientOnly>
    <teleport to="#page-title">
      <LayoutPageTitle
          :title="data.position.name"
          :subtitle="$t('page.positions.create.subtitle')"
          :icon="BriefcaseIcon"
      >
        <template #afterTitle>
          <PositionState :state="data.position.state"/>
        </template>
      </LayoutPageTitle>
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import type {Position} from "~/repositories/resources";
import type {ClassifiersMap} from "~/repositories/classifier/responses";
import {CLASSIFIER_TYPE} from "~/types/enums";
import {BriefcaseIcon} from "@heroicons/vue/24/outline";
import {canPositionSeeForm} from "~/functions/position";

const { t } = useI18n()
const api = useApi()
const id = useRouteParam<number>('id', (val) => parseInt(val))

const {
  data,
  error,
  refresh,
} = await useAsyncData<{
  position: Position,
  classifiers: ClassifiersMap
}>('position-edit', async () => {
  // must be done like this, otherwise Nuxt
  // throws an error :(
  // @see https://github.com/nuxt/nuxt/issues/25099
  const nuxtApp = useNuxtApp()
  const position = await nuxtApp.runWithContext(() => api.position.show(id.value).then(response => response._data!.data.position))
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
    CLASSIFIER_TYPE.LANGUAGE,
    CLASSIFIER_TYPE.LANGUAGE_LEVEL,
  ]).then(response => response._data!.data.classifiers))
  return { position, classifiers }
})

if (error.value) {
  throw createError({...error.value, fatal: true})
}

if (!canPositionSeeForm(data.value!.position)) {
  throw createError({status: 403, fatal: true})
}

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

useHead({
  title: () => data.value!.position.name
})
</script>