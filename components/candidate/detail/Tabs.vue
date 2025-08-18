<template>
  <nav class="flex space-x-2 overflow-x-auto scrollbar-hidden">

    <NuxtLink
        v-for="item in tabs"
        :key="item.tab"
        :to="item.route"
        :class="['inline-flex items-center gap-x-2 rounded-md py-2 px-3 text-sm font-medium ring-1 ring-gray-300 ring-inset', tab === item.tab ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-500 hover:text-primary-600 ']"
    >
      <component :is="item.icon" class="size-5"/>
      <span>{{ $t(item.label) }}</span>
      <span v-if="item.count !== null" class="font-semibold bg-primary-600 text-white px-1 py-0.25 rounded-md">
        {{ item.count }}
      </span>
    </NuxtLink>

  </nav>
</template>

<script lang="ts" setup>
import {
  BriefcaseIcon,
  InformationCircleIcon,
  ChatBubbleLeftRightIcon,
  HandThumbUpIcon,
  QueueListIcon,
} from "@heroicons/vue/24/outline";
import type {Candidate} from "~/repositories/resources";
import {CANDIDATE_DETAIL_TAB} from "~/types/enums";

const props = defineProps<{
  candidate: Candidate
  tab: CANDIDATE_DETAIL_TAB
}>()

const tabs = [
  {
    tab: CANDIDATE_DETAIL_TAB.DETAIL,
    icon: InformationCircleIcon,
    label: 'page.candidate.detail.tabs.detail',
    route: `/candidates/${props.candidate.id}`,
    count: null
  },
  {
    tab: CANDIDATE_DETAIL_TAB.POSITIONS,
    icon: BriefcaseIcon,
    label: 'page.candidate.detail.tabs.positions',
    route: `/candidates/${props.candidate.id}/positions`,
    count: 12,
  },
  {
    tab: CANDIDATE_DETAIL_TAB.COMMUNICATION,
    icon: ChatBubbleLeftRightIcon,
    label: 'page.candidate.detail.tabs.communication',
    route: `/candidates/${props.candidate.id}/communication`,
    count: null,
  },
  {
    tab: CANDIDATE_DETAIL_TAB.EVALUATION,
    icon: HandThumbUpIcon,
    label: 'page.candidate.detail.tabs.evaluation',
    route: `/candidates/${props.candidate.id}/evaluation`,
    count: null,
  },
  {
    tab: CANDIDATE_DETAIL_TAB.TIMELINE,
    icon: QueueListIcon,
    label: 'page.candidate.detail.tabs.timeline',
    route: `/candidates/${props.candidate.id}/timeline`,
    count: null,
  }
]
</script>
