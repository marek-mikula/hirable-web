<template>
  <span class="inline-flex flex-wrap items-center space-x-2">
    <span class="inline-flex items-center flex-nowrap space-x-1">
      <UserIcon class="size-4"/>
      <span>
        {{ contact.fullName }}
      </span>
    </span>
    <span class="inline-flex items-center flex-nowrap space-x-1">
      <EnvelopeIcon class="size-4"/>
      <CommonClipboard :value="contact.email"/>
    </span>
    <span v-if="contact.phone" class="inline-flex items-center flex-nowrap space-x-1">
      <PhoneIcon class="size-4"/>
      <CommonClipboard :value="contact.phone"/>
    </span>
  </span>
</template>

<script lang="ts" setup>
import {UserIcon, EnvelopeIcon, PhoneIcon} from "@heroicons/vue/24/outline";
import type {UserContact} from "~/repositories/resources";

defineProps<{
  contact: UserContact
}>()
</script>
