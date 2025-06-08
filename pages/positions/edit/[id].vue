<template>
  <PositionForm :classifiers="data.classifiers" :position="data.position" @update="refresh"/>

  <ClientOnly>
    <teleport to="#page-title">
      <LayoutPageTitle
          :title="data.position.name"
          :subtitle="$t('page.positions.create.subtitle')"
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
import {BriefcaseIcon, DocumentDuplicateIcon} from "@heroicons/vue/24/outline";
import {canPositionSeeForm} from "~/functions/position";

const { t } = useI18n()
const api = useApi()
const toaster = useToaster()
const id = useRouteParam<number>('id', (val) => parseInt(val))

const {
  data,
  error,
  refresh,
} = await useAsyncData<{
  position: Position,
  classifiers: ClassifiersMap
}>(
    () => `position-edit-${id.value}`,
    async () => {
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
      return {position, classifiers}
    }
)

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

const duplicating = ref<boolean>(false)

async function duplicate(): Promise<void> {
  duplicating.value = true

  const result = await handle<number>(() => api.position.duplicate(data.value!.position.id).then(res => res._data!.data.id))

  duplicating.value = false

  if (!result.success) {
    return
  }

  await toaster.success({
    title: 'toast.position.duplicate'
  })

  await navigateTo(`/positions/edit/${result.result}`)
}
</script>