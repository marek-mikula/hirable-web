<template>
  <CompanyInvitationGrid :company="company"/>
</template>

<script setup lang="ts">
import {ROLE} from "~/types/enums";
import type {Company} from "~/repositories/resources";
import companyRole from "~/middleware/companyRole";

defineProps<{
  company: Company
}>()

const { t } = useI18n()

definePageMeta({
  middleware: [
    companyRole(ROLE.ADMIN)
  ]
})

useHead({
  title: () => t('page.company.invitations.title'),
})
</script>