<template>
  <CompanyUserGrid :company="company"/>
</template>

<script setup lang="ts">
import type {Company} from "~/repositories/resources";
import {ROLE} from "~/types/enums";
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
  title: () => t('page.company.users.title'),
})
</script>