<template>
  <div class="space-y-3 lg:space-y-4">

    <div class="flex items-center justify-end space-x-2">
      <FormInput
          v-model="search"
          type="search"
          name="name"
          class="w-40"
          :icon="MagnifyingGlassIcon"
          :placeholder="$t('common.action.search')"
      />
      <CommonButton
          type="submit"
          :label="$t('common.action.invite')"
          @click="modalOpened = true"
      />
    </div>

    <div class="px-4 py-3 divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white shadow-sm">
      todo - seznam pozvánek
    </div>

    <CompanyProfileInvitationModal :open="modalOpened" @close="modalOpened = false"/>

  </div>
</template>

<script setup lang="ts">
import {
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";

const { t } = useI18n()

const search = ref<string | null>(null)
const modalOpened = ref<boolean>(false)

useHead({
  title: () => t('page.company.invitations.title'),
})
</script>