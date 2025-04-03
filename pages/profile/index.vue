<template>
  <div class="space-y-3 lg:space-y-4">
    <UserProfilePersonalForm/>
    <UserProfileLanguageForm/>
    <UserProfileTimezoneForm/>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('page.profile.settings.title'),
})
</script>