<template>
  <PositionForm :classifiers="classifiers"/>

  <ClientOnly>
    <teleport to="#page-title">
      <LayoutPageTitle
          :title="$t('page.position.create.title')"
          :icon="BriefcaseIcon"
          :subtitle="$t('page.position.create.subtitle')"
      >
        <template #actions>
          <CommonButton
            variant="secondary"
            :icon="SparklesIcon"
            v-tooltip="{ content: $t('page.position.create.fromPrompt') }"
            @click="createFromPrompt"
          />
          <CommonButton
              variant="secondary"
              :icon="DocumentTextIcon"
              v-tooltip="{ content: $t('page.position.create.fromFile') }"
              @click="createFromFile"
          />
        </template>
      </LayoutPageTitle>
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import {BriefcaseIcon, DocumentTextIcon, SparklesIcon} from '@heroicons/vue/24/outline'
import type {ClassifiersMap} from "~/repositories/classifier/responses";
import {CLASSIFIER_TYPE} from "~/types/enums";

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

const {user} = useAuth<true>()
const { t } = useI18n()
const api = useApi()

const {
  data: classifiers,
  error,
} = await useAsyncData<ClassifiersMap>('position-create', async () => {
  return api.classifier.index([
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
  ]).then(response => response._data!.data.classifiers)
})

if (error.value) {
  throw createError({...error.value, fatal: true})
}

useHead({
  title: () => t('page.position.create.title')
})

function createFromPrompt(): void {
  // todo
}

function createFromFile(): void {
  // todo
}
</script>