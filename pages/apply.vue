<template>
  <div class="sm:p-3 lg:p-4">
    <div class="bg-white sm:rounded-md sm:border sm:border-gray-200 mx-auto max-w-screen-sm overflow-hidden divide-y divide-gray-200 shadow-sm">

      <div class="p-3 lg:p-4 space-y-3 lg:space-y-4">

        <!-- background image with logo and title -->
        <template v-if="true">
          <div v-if="false" class="relative">
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

        <!-- welcome message -->
        <p class="text-sm">
          {{ $t('page.apply.message') }}
        </p>

        <!-- position detail -->
        <dl class="grid grid-cols-1 md:grid-cols-2 p-2 gap-2 bg-gray-50 rounded-md border border-gray-200 shadow-sm">
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
          <div class="md:col-span-2 flex">
            <CommonLinkButton class="text-sm w-full inline-flex items-center justify-center space-x-1" @click="detailShown = !detailShown">
              <ChevronUpIcon v-if="detailShown" class="size-4"/>
              <ChevronDownIcon v-else class="size-4"/>
              <span>{{ $t('page.apply.positionDetail') }}</span>
            </CommonLinkButton>
          </div>
        </dl>

      </div>

      <ApplyForm :token="token" :token-info="tokenInfo"/>

    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash'
import type {TokenInfo} from "~/repositories/resources";
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
</script>