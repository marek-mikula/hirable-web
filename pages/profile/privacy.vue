<template>
  <div class="space-y-3 lg:space-y-4">
    <UserProfilePasswordForm/>
    <UserProfileDeleteAccountForm/>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('page.profile.privacy.title'),
})
</script>