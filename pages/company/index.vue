<template>
  <div class="space-y-3 lg:space-y-4">
    <CompanyProfileBasicInfoForm :company="company" @update="onUpdated"/>
    <CompanyProfileEnvironmentForm :company="company" @update="onUpdated"/>
  </div>
</template>

<script setup lang="ts">
import type {Company} from "~/repositories/resources";

defineProps<{
  company: Company
}>()

const emit = defineEmits<{
  (e: 'update', company: Company): void
}>()

const { t } = useI18n()

useHead({
  title: () => t('page.company.information.title'),
})

function onUpdated(updatedCompany: Company): void {
  emit('update', updatedCompany)
}
</script>