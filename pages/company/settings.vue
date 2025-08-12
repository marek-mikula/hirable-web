<template>
  <div class="space-y-3 lg:space-y-4">
    <CompanyProfileAIForm :company="company" @update="onUpdated"/>
    <CompanyProfilePositionProcessForm :company="company" @update="onUpdated"/>
  </div>
</template>

<script setup lang="ts">
import type {Company} from "~/repositories/resources";
import companyRole from "~/middleware/companyRole";
import {ROLE} from "~/types/enums";

definePageMeta({
  middleware: [
    companyRole(ROLE.ADMIN)
  ]
})

defineProps<{
  company: Company
}>()

const emit = defineEmits<{
  (e: 'update', company: Company): void
}>()

const { t } = useI18n()

useHead({
  title: () => t('page.company.settings.title'),
})

function onUpdated(updatedCompany: Company): void {
  emit('update', updatedCompany)
}
</script>