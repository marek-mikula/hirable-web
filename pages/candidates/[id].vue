<template>
  <div>
    <CandidateDetailTabs :candidate="candidate" :tab="currentRoute" class="mb-3 lg:mb-4"/>
    <NuxtPage :candidate="candidate" keepalive @update="onUpdate"/>
  </div>

  <ClientOnly>
    <teleport to="#page-title">
      <LayoutPageTitle
          :title="candidate.fullName"
          :icon="UsersIcon"
      >
      </LayoutPageTitle>
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import {UsersIcon} from "@heroicons/vue/24/outline";
import type {Candidate} from "~/repositories/resources";
import {CANDIDATE_DETAIL_TAB} from "~/types/enums";

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

const {appName} = useAppConfig()
const api = useApi()
const id = useRouteParam<number>('id', (val) => parseInt(val))
const route = useRoute()
const toaster = useToaster()

const {
  data: candidate,
  error
} = await useAsyncData<Candidate>(
    () => `candidate-detail-${id.value}`,
    () => api.candidate.show(id.value).then(response => response._data!.data.candidate)
)

if (error.value) {
  throw createError({...error.value, fatal: true})
}

useHead({
  titleTemplate: '%s %separator %candidate %separator %siteName',
  templateParams: {
    separator: '·',
    candidate: candidate.value!.fullName,
    siteName: appName as string
  }
})

const currentRoute = ref<CANDIDATE_DETAIL_TAB>(CANDIDATE_DETAIL_TAB.DETAIL)

function onUpdate(newCandidate: Candidate): void {
  candidate.value = newCandidate
}

watch(() => route.name, (routeName) => {
  if (routeName === 'candidates-id-positions') {
    currentRoute.value = CANDIDATE_DETAIL_TAB.POSITIONS
  } else if (routeName === 'candidates-id-timeline') {
    currentRoute.value = CANDIDATE_DETAIL_TAB.TIMELINE
  } else if (routeName === 'candidates-id-evaluation') {
    currentRoute.value = CANDIDATE_DETAIL_TAB.EVALUATION
  } else if (routeName === 'candidates-id-communication') {
    currentRoute.value = CANDIDATE_DETAIL_TAB.COMMUNICATION
  } else {
    currentRoute.value = CANDIDATE_DETAIL_TAB.DETAIL
  }
}, {immediate: true})
</script>