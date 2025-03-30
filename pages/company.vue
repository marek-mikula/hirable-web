<template>
  <div class="space-y-2 sm:space-y-3 lg:space-y-4">

    <div class="sm:flex sm:items-center sm:justify-between">
      <h1 class="text-base text-xl font-semibold text-gray-900">
        {{ user.company.name }}
      </h1>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 lg:gap-5">

      <!-- company navigation -->
      <CompanyProfileNavigation class="flex flex-col shrink-0 sm:w-56"/>

      <!-- sub-page content -->
      <div class="grow">
        <NuxtPage keepalive/>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'app2',
  middleware: 'auth'
})

const { user } = useAuth<true>()
</script>