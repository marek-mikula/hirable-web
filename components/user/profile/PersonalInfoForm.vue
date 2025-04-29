<template>
  <CommonForm id="profile-form" v-slot="{ isLoading, firstError }" class="divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white shadow-sm" :handler="handler">

    <div class="px-4 py-3">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        {{ $t('page.profile.information.personal.title') }}
      </h2>
    </div>

    <div class="px-4 py-3 grid grid-cols-1 sm:grid-cols-6 gap-4">

      <FormInput
          v-model="data.firstname"
          class="sm:col-span-3"
          name="firstname"
          type="text"
          :error="firstError('firstname')"
          :maxlength="255"
          :label="$t('model.common.firstname')"
          required
      />

      <FormInput
          v-model="data.lastname"
          class="sm:col-span-3"
          name="lastname"
          type="text"
          :error="firstError('lastname')"
          :maxlength="255"
          :label="$t('model.common.lastname')"
          required
      />

      <FormInput
          v-model="data.prefix"
          class="sm:col-span-3"
          name="prefix"
          type="text"
          :error="firstError('prefix')"
          :maxlength="10"
          :label="$t('model.user.prefix')"
      />

      <FormInput
          v-model="data.postfix"
          class="sm:col-span-3"
          name="postfix"
          type="text"
          :error="firstError('postfix')"
          :maxlength="10"
          :label="$t('model.user.postfix')"
      />

      <FormInput
          v-model="data.phone"
          class="sm:col-span-3"
          name="phone"
          type="text"
          :error="firstError('phone')"
          :maxlength="20"
          :label="$t('model.common.phone')"
      />

      <FormInput
          v-model="data.email"
          class="sm:col-span-3"
          name="email"
          type="email"
          :error="firstError('email')"
          :maxlength="255"
          :label="$t('model.common.email')"
          required
      />

    </div>

    <div class="px-4 py-3 text-right sm:text-left">
      <CommonButton
          type="submit"
          :label="$t('common.action.save')"
          :loading="isLoading"
          :disabled="isLoading"
      />
    </div>

  </CommonForm>
</template>

<script setup lang="ts">
import type {FormHandler} from "~/types/common";
import type {UpdateData} from "~/repositories/auth/input";

const toaster = useToaster()
const api = useApi()
const { user, setUser } = useAuth<true>()

const data = ref<Omit<UpdateData, 'keys'>>({
  firstname: user.value.firstname,
  lastname: user.value.lastname,
  email: user.value.email,
  prefix: user.value.prefix,
  postfix: user.value.postfix,
  phone: user.value.phone,
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.auth.update({
      keys: ['firstname', 'lastname', 'email', 'prefix', 'postfix', 'phone'],
      ...data.value
    })

    // update user model reference
    setUser(response._data!.data.user)

    await toaster.success({
      title: 'toast.profile.personal.success'
    })
  }
}
</script>