<template>
  <div class="mx-auto max-w-screen-xl space-y-5 p-5">

    <h1 class="text-3xl text-center font-bold tracking-tight text-gray-900">
      Components gallery
    </h1>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Buttons
    </h2>

    <div class="space-x-2">

      <CommonButton color="primary" label="Test me"/>
      <CommonButton color="secondary" label="Test me"/>
      <CommonButton color="danger" label="Test me"/>

    </div>

    <div class="space-x-2 flex items-start">

      <CommonButton color="primary" label="Test me" :size="1"/>
      <CommonButton color="primary" label="Test me" :size="2"/>
      <CommonButton color="primary" label="Test me" :size="3"/>
      <CommonButton color="primary" label="Test me" :size="4"/>
      <CommonButton color="primary" label="Test me" :size="5"/>

    </div>

    <div class="space-x-2 flex items-start">

      <CommonButton color="primary" :size="1" symmetrical><HomeIcon class="size-4"/></CommonButton>
      <CommonButton color="primary" :size="2" symmetrical><HomeIcon class="size-5"/></CommonButton>
      <CommonButton color="primary" :size="3" symmetrical><HomeIcon class="size-5"/></CommonButton>
      <CommonButton color="primary" :size="4" symmetrical><HomeIcon class="size-5"/></CommonButton>
      <CommonButton color="primary" :size="5" symmetrical><HomeIcon class="size-5"/></CommonButton>

    </div>

    <div class="space-x-2 flex items-start">

      <CommonButton color="primary" :size="1" class="flex items-center justify-center space-x-1">
        <HomeIcon class="size-4"/>
        <span>Test me</span>
      </CommonButton>
      <CommonButton color="primary" :size="2" class="flex items-center justify-center space-x-1">
        <HomeIcon class="size-5"/>
        <span>Test me</span>
      </CommonButton>
      <CommonButton color="primary" :size="3" class="flex items-center justify-center space-x-1">
        <HomeIcon class="size-5"/>
        <span>Test me</span>
      </CommonButton>
      <CommonButton color="primary" :size="4" class="flex items-center justify-center space-x-1">
        <HomeIcon class="size-5"/>
        <span>Test me</span>
      </CommonButton>
      <CommonButton color="primary" :size="5" class="flex items-center justify-center space-x-1">
        <HomeIcon class="size-5"/>
        <span>Test me</span>
      </CommonButton>

    </div>

    <div class="space-x-2 flex items-start">

      <CommonButton color="primary" label="Test me" :size="1" :loading="true"/>
      <CommonButton color="primary" label="Test me" :size="2" :loading="true"/>
      <CommonButton color="primary" label="Test me" :size="3" :loading="true"/>
      <CommonButton color="primary" label="Test me" :size="4" :loading="true"/>
      <CommonButton color="primary" label="Test me" :size="5" :loading="true"/>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Clipboard copy
    </h2>

    <div class="space-x-2">

      <CommonClipboard :value="'https://www.seznam.cz/'"/>
      <CommonClipboard :value="'https://www.seznam.cz/'">Custom text</CommonClipboard>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Alerts
    </h2>

    <div class="space-y-1">

      <CommonAlert type="success" title="Success alert"/>
      <CommonAlert type="info" title="Info alert"/>
      <CommonAlert type="warning" title="Warning alert"/>
      <CommonAlert type="danger" title="Error alert"/>
      <CommonAlert type="secondary" title="Secondary alert"/>
      <CommonAlert type="success" title="Alert with description">
        <template #description>
          Description
        </template>
      </CommonAlert>

      <CommonAlert type="success" title="Static alert" static/>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Component error
    </h2>

    <div class="space-y-1">

      <CommonError/>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Loader
    </h2>

    <div class="space-y-1 flex flex-col">

      <CommonLoader/>
      <CommonLoader label="Custom loading text"/>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Spinner
    </h2>

    <div class="space-x-1 flex items-start">

      <CommonSpinner color="primary" size="size-10"/>
      <CommonSpinner color="secondary" size="size-10"/>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Indicator
    </h2>

    <div class="space-x-1 flex items-start">

      <CommonIndicator :number="0" color="success">
        <CommonButton color="secondary" label="Click me"/>
      </CommonIndicator>

      <CommonIndicator :number="5" color="info">
        <CommonButton color="secondary" label="Click me"/>
      </CommonIndicator>

      <CommonIndicator :number="34" color="warning">
        <CommonButton color="secondary" label="Click me"/>
      </CommonIndicator>

      <CommonIndicator :number="99" color="danger">
        <CommonButton color="secondary" label="Click me"/>
      </CommonIndicator>

      <CommonIndicator :number="999" color="secondary">
        <CommonButton color="secondary" label="Click me"/>
      </CommonIndicator>

      <CommonIndicator :number="34" color="primary">
        <CommonButton color="secondary" label="Click me"/>
      </CommonIndicator>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Multiple file input
    </h2>

    <div class="space-x-1 flex items-start">

      <FormMultiFileUpload v-model="multipleFileInput" name="multiple-file-input" class="w-full"/>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Single file input
    </h2>

    <div class="space-x-1 flex items-start">

      <FormFileUpload v-model="singleFileInput" name="single-file-input" class="w-full"/>

    </div>

  </div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'default'
})

const multipleFileInput = ref<File[]>([])
const singleFileInput = ref<File|null>(null)
</script>