<template>
  <CommonForm id="delete-account-form" v-slot="{ isLoading, firstError }" class="divide-y divide-gray-200 border border-gray-200 overflow-hidden rounded-lg bg-white shadow-sm" :handler="handler">
    <div class="px-4 py-3">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        {{ $t('page.profile.deleteAccount.title') }}
      </h2>
      <p class="mt-1 text-sm text-gray-600">
        {{ $t('page.profile.deleteAccount.subtitle') }}
      </p>
    </div>
    <div class="px-4 py-3 grid grid-cols-1 sm:grid-cols-6 gap-4">

      <FormInput
          v-model="data.password"
          type="password"
          class="sm:col-span-3"
          name="password"
          :error="firstError('password')"
          :label="$t('model.user.currentPassword')"
          required
      />

    </div>
    <div class="px-4 py-3 text-right sm:text-left">

      <CommonButton
          type="submit"
          color="danger"
          :label="$t('common.action.delete')"
          :loading="isLoading"
          :disabled="isLoading || ! data.password"
      />

    </div>
  </CommonForm>
</template>

<script setup lang="ts">
import type {FormHandler} from "~/types/common";

const data = ref({
  password: null,
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    // todo
  }
}
</script>