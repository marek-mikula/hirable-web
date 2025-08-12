<template>
  <a :href="link" target="_blank" class="inline-block hover:opacity-75">
    <img v-if="type === 'linkedin'" src="assets/images/icons/linkedin.svg" alt="LinkedIn icon" v-tooltip="{ content: $t('model.common.linkedin') }">
    <img v-else-if="type === 'instagram'" src="assets/images/icons/instagram.svg" alt="Instagram icon" v-tooltip="{ content: $t('model.common.instagram') }">
    <img v-else-if="type === 'github'" src="assets/images/icons/github.svg" alt="Github icon" v-tooltip="{ content: $t('model.common.github') }">
    <GlobeAltIcon v-else-if="type === 'portfolio'" v-tooltip="{ content: $t('model.common.portfolio') }"/>
  </a>
</template>

<script lang="ts" setup>
import {GlobeAltIcon} from "@heroicons/vue/24/outline";
import type {CandidateLinkType} from "~/types/components/candidate/link.types";

defineProps<{
  link: string
  type: CandidateLinkType
}>()
</script>
