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

        <template #after>
          <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-4">
            <div class="mt-2 flex items-center text-sm">
              <AtSymbolIcon class="mr-1.5 size-5 shrink-0 text-gray-400"/>
              <CommonClipboard :value="candidate.email"/>
            </div>
            <div class="mt-2 flex items-center text-sm">
              <PhoneIcon class="mr-1.5 size-5 shrink-0 text-gray-400"/>
              <CommonClipboard :value="candidate.phone"/>
            </div>
            <div v-if="candidate.linkedinUsername" class="mt-2 flex items-center text-sm">
              <IconLinkedIn class="mr-1.5 size-4 shrink-0 text-gray-400"/>
              <CommonClipboard :value="candidate.linkedin" :label="candidate.linkedinUsername"/>
            </div>
          </div>
        </template>

      </LayoutPageTitle>
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import {UsersIcon, AtSymbolIcon, PhoneIcon} from "@heroicons/vue/24/outline";
import type {CandidateShow} from "~/repositories/resources";
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
} = await useAsyncData<CandidateShow>(
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

function onUpdate(newCandidate: CandidateShow): void {
  candidate.value = newCandidate
}

watch(() => route.name, (routeName) => {
  if (routeName === 'candidates-id-positions') {
    currentRoute.value = CANDIDATE_DETAIL_TAB.POSITIONS
  } else if (routeName === 'candidates-id-history') {
    currentRoute.value = CANDIDATE_DETAIL_TAB.HISTORY
  } else if (routeName === 'candidates-id-evaluation') {
    currentRoute.value = CANDIDATE_DETAIL_TAB.EVALUATION
  } else if (routeName === 'candidates-id-communication') {
    currentRoute.value = CANDIDATE_DETAIL_TAB.COMMUNICATION
  } else {
    currentRoute.value = CANDIDATE_DETAIL_TAB.DETAIL
  }
}, {immediate: true})
</script>