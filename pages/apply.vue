<template>
  <div class="sm:p-3 lg:p-4">
    <div class="bg-white sm:rounded-md sm:border sm:border-gray-200 mx-auto max-w-screen-sm overflow-hidden divide-y divide-gray-200 shadow-sm">

      <div class="p-3 lg:p-4 space-y-3 lg:space-y-4">

        <!-- background image with logo and title -->
        <template v-if="true">
          <div class="relative">
            <img
                src="https://media.istockphoto.com/id/1481370371/photo/portrait-of-enthusiastic-hispanic-young-woman-working-on-computer-in-a-modern-bright-office.jpg?s=612x612&w=0&k=20&c=8kNce9Ruc9F2KXvnwf0stWQXCwwQTBCrW8efrqhUIa4="
                alt="Position image"
                class="aspect-16/9 object-cover rounded-md w-full"
            >

            <a
                v-if="tokenInfo.position.companyWebsite"
                :href="tokenInfo.position.companyWebsite"
                target="_blank"
            >
              <img
                  src="https://images.seeklogo.com/logo-png/37/1/mcdonalds-logo-png_seeklogo-370359.png"
                  alt="Company logo"
                  class="aspect-1/1 object-cover rounded-md h-10 absolute left-3 bottom-3"
              >
            </a>

            <img
                v-else
                src="https://images.seeklogo.com/logo-png/37/1/mcdonalds-logo-png_seeklogo-370359.png"
                alt="Company logo"
                class="aspect-1/1 object-cover rounded-md h-10 absolute left-3 bottom-3"
            >
          </div>

          <div>
            <h1 class="font-semibold text-xl">
              {{ tokenInfo.position.name }}
            </h1>
            <p class="mt-1 text-gray-600 text-sm">
              {{ tokenInfo.position.companyName }}
            </p>
          </div>
        </template>

        <!-- logo with title -->
        <template v-else>
          <div class="flex space-x-2">
            <a
                v-if="tokenInfo.position.companyWebsite"
                :href="tokenInfo.position.companyWebsite"
                target="_blank"
                class="shrink-0"
            >
              <img
                  src="https://images.seeklogo.com/logo-png/37/1/mcdonalds-logo-png_seeklogo-370359.png"
                  alt="Company logo"
                  class="aspect-1/1 object-cover rounded-md h-10"
              >
            </a>

            <img
                v-else
                src="https://images.seeklogo.com/logo-png/37/1/mcdonalds-logo-png_seeklogo-370359.png"
                alt="Company logo"
                class="aspect-1/1 object-cover rounded-md h-10 shrink-0"
            >

            <div>
              <h1 class="font-semibold text-xl">
                {{ tokenInfo.position.name }}
              </h1>
              <p class="mt-1 text-gray-600 text-sm">
                {{ tokenInfo.position.companyName }}
              </p>
            </div>
          </div>
        </template>

        <dl class="grid grid-cols-1 md:grid-cols-2 p-2 gap-2 bg-gray-50 rounded-md border border-gray-200">
          <template v-if="detailShown">
            <div class="text-sm space-y-1 bg-white rounded-md p-2 border border-gray-200">
              <dd class="font-medium">{{ $t('model.position.workload') }}:</dd>
              <dt>
                {{ _.map(tokenInfo.position.workloads, 'label').join(', ') }}
              </dt>
            </div>
            <div class="text-sm space-y-1 bg-white rounded-md p-2 border border-gray-200">
              <dd class="font-medium">{{ $t('model.position.employmentRelationship') }}:</dd>
              <dt>
                {{ _.map(tokenInfo.position.employmentRelationships, 'label').join(', ') }}
              </dt>
            </div>
            <div class="text-sm space-y-1 bg-white rounded-md p-2 border border-gray-200">
              <dd class="font-medium">{{ $t('model.position.employmentForm') }}:</dd>
              <dt>
                {{ _.map(tokenInfo.position.employmentForms, 'label').join(', ') }}
              </dt>
            </div>
            <div v-if="tokenInfo.position.salary" class="text-sm space-y-1 bg-white rounded-md p-2 border border-gray-200">
              <dd class="font-medium">{{ $t('model.position.salary') }}:</dd>
              <dt>
                {{ formatSalary(tokenInfo.position.salary) }}
              </dt>
            </div>
            <div v-if="tokenInfo.position.address" class="md:col-span-2 text-sm space-y-1 bg-white rounded-md p-2 border border-gray-200">
              <dd class="font-medium">{{ $t('model.position.address') }}:</dd>
              <dt>
                {{ tokenInfo.position.address }}
              </dt>
            </div>
            <div v-if="tokenInfo.position.benefits.length > 0" class="md:col-span-2 text-sm space-y-1 bg-white rounded-md p-2 border border-gray-200">
              <dd class="font-medium">{{ $t('model.position.benefits') }}:</dd>
              <dt>
                {{ _.map(tokenInfo.position.benefits, 'label').join(', ') }}
              </dt>
            </div>
            <div v-if="tokenInfo.position.contact" class="md:col-span-2 text-sm space-y-1 bg-white rounded-md p-2 border border-gray-200">
              <dd class="font-medium">{{ $t('model.common.contact') }}:</dd>
              <dt>
                <UserContact :contact="tokenInfo.position.contact"/>
              </dt>
            </div>
          </template>
          <div class="md:col-span-2">
            <button type="button" class="hover:underline hover:text-primary-600 text-sm w-full inline-flex items-center justify-center space-x-1" @click="detailShown = !detailShown">
              <ChevronUpIcon v-if="detailShown" class="size-4"/>
              <ChevronDownIcon v-else class="size-4"/>
              <span>{{ $t('page.apply.positionDetail') }}</span>
            </button>
          </div>
        </dl>
      </div>

      <div class="p-3 lg:p-4 grid grid-cols-2 gap-3 lg:gap-4">

        <FormInput
          v-model="data.firstname"
          name="firstname"
          class="col-span-2 md:col-span-1"
          autocomplete="given-name"
          :label="$t('model.common.firstname')"
          :maxlength="255"
          required
        />

        <FormInput
            v-model="data.lastname"
            name="lastname"
            class="col-span-2 md:col-span-1"
            autocomplete="family-name"
            :label="$t('model.common.lastname')"
            :maxlength="255"
            required
        />

        <FormInput
            v-model="data.email"
            name="email"
            type="email"
            class="col-span-2"
            autocomplete="email"
            :label="$t('model.common.email')"
            :maxlength="255"
            required
        />

        <div class="flex items-center col-span-2 gap-3 lg:gap-4">

          <FormSelect
              v-model="data.phonePrefix"
              name="phonePrefix"
              class="col-span-2 md:col-span-1 w-30"
              :label="$t('model.common.phonePrefix')"
              :options="[{value: '+420', label: '+420'}]"
              :option-loader="createClassifierSelectLoader(CLASSIFIER_TYPE.PHONE_PREFIX)"
              required
          />

          <FormInput
              v-model="data.phone"
              name="phone"
              type="tel"
              class="flex-1 min-w-0 col-span-2 md:col-span-1"
              autocomplete="tel-local"
              :label="$t('model.common.phone')"
              :maxlength="255"
              required
          />

        </div>

        <FormInput
            v-model="data.linkedin"
            name="linkedin"
            type="url"
            class="col-span-2"
            :label="$t('model.common.linkedin')"
            :hint="$t('form.hint.common.url')"
            :maxlength="255"
        />

        <FormFileUpload
            v-model="data.cv"
            name="cv"
            class="col-span-2"
            :label="$t('model.candidate.cv')"
            required
        />

        <FormMultiFileUpload
            v-model="data.otherFiles"
            name="otherFiles"
            class="col-span-2"
            :label="$t('model.candidate.otherFiles')"
        />

      </div>

      <div class="p-3 lg:p-4 text-right">
        <CommonButton
          class="w-full md:w-auto"
          type="submit"
          variant="primary"
          :label="$t('common.action.submit')"
        />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash'
import type {TokenInfo} from "~/repositories/resources";
import {createClassifierSelectLoader} from "~/functions/classifier";
import {CLASSIFIER_TYPE} from "~/types/enums";
import {formatSalary} from "~/functions/position";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/vue/24/outline";

definePageMeta({
  layout: 'default',
  async validate(route) {
    return typeof route.query.token === 'string'
  }
})

const token = useRouteQuery<string>('token')
const api = useApi()

const {
  data: tokenInfo,
  error
} = await useAsyncData<TokenInfo>(`token-info-${token.value}`, () => api.application.tokenInfo(token.value).then(response => response._data!.data))

if (error.value) {
  throw createError({...error.value, fatal: true})
}

useHead({
  title: tokenInfo.value!.position.name,
  bodyAttrs: {
    class: 'bg-gray-50'
  }
})

const detailShown = ref<boolean>(false)
const data = ref({
  firstname: null,
  lastname: null,
  email: null,
  phonePrefix: '+420',
  phone: null,
  linkedin: null,
  cv: null,
  otherFiles: [],
})
</script>