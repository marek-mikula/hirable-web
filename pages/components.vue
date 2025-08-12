<template>
  <div class="mx-auto max-w-screen-xl space-y-5 p-5">

    <h1 class="text-3xl text-center font-bold tracking-tight text-gray-900">
      Components gallery
    </h1>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Buttons
    </h2>

    <div class="flex items-center space-x-2">

      <CommonButton :size="1" variant="primary" label="Test"/>
      <CommonButton :size="1" variant="primary" label="Test" :loading="true"/>
      <CommonButton :size="1" variant="primary" label="Test" :icon="HomeIcon"/>
      <CommonButton :size="1" variant="primary" label="Test" :icon="HomeIcon" :loading="true"/>
      <CommonButton :size="1" variant="primary" :icon="HomeIcon"/>
      <CommonButton :size="1" variant="primary" :icon="HomeIcon" :loading="true"/>

    </div>

    <div class="flex items-center space-x-2">

      <CommonButton :size="2" variant="primary" label="Test"/>
      <CommonButton :size="2" variant="primary" label="Test" :loading="true"/>
      <CommonButton :size="2" variant="primary" label="Test" :icon="HomeIcon"/>
      <CommonButton :size="2" variant="primary" label="Test" :icon="HomeIcon" :loading="true"/>
      <CommonButton :size="2" variant="primary" :icon="HomeIcon"/>
      <CommonButton :size="2" variant="primary" :icon="HomeIcon" :loading="true"/>

    </div>

    <div class="flex items-center space-x-2">

      <CommonButton :size="3" variant="primary" label="Test"/>
      <CommonButton :size="3" variant="primary" label="Test" :loading="true"/>
      <CommonButton :size="3" variant="primary" label="Test" :icon="HomeIcon"/>
      <CommonButton :size="3" variant="primary" label="Test" :icon="HomeIcon" :loading="true"/>
      <CommonButton :size="3" variant="primary" :icon="HomeIcon"/>
      <CommonButton :size="3" variant="primary" :icon="HomeIcon" :loading="true"/>

    </div>

    <div class="flex items-center space-x-2">

      <CommonButton :size="4" variant="primary" label="Test"/>
      <CommonButton :size="4" variant="primary" label="Test" :loading="true"/>
      <CommonButton :size="4" variant="primary" label="Test" :icon="HomeIcon"/>
      <CommonButton :size="4" variant="primary" label="Test" :icon="HomeIcon" :loading="true"/>
      <CommonButton :size="4" variant="primary" :icon="HomeIcon"/>
      <CommonButton :size="4" variant="primary" :icon="HomeIcon" :loading="true"/>

    </div>

    <div class="flex items-center space-x-2">

      <CommonButton :size="5" variant="primary" label="Test"/>
      <CommonButton :size="5" variant="primary" label="Test" :loading="true"/>
      <CommonButton :size="5" variant="primary" label="Test" :icon="HomeIcon"/>
      <CommonButton :size="5" variant="primary" label="Test" :icon="HomeIcon" :loading="true"/>
      <CommonButton :size="5" variant="primary" :icon="HomeIcon"/>
      <CommonButton :size="5" variant="primary" :icon="HomeIcon" :loading="true"/>

    </div>

    <div class="flex items-center space-x-2">

      <CommonButton variant="primary" label="Test" :icon="HomeIcon"/>
      <CommonButton variant="secondary" label="Test" :icon="HomeIcon"/>
      <CommonButton variant="danger" label="Test" :icon="HomeIcon"/>
      <CommonButton variant="success" label="Test" :icon="HomeIcon"/>
      <CommonButton variant="blank" label="Test" :icon="HomeIcon"/>

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

      <CommonAlert variant="success" title="Success alert"/>
      <CommonAlert variant="info" title="Info alert"/>
      <CommonAlert variant="warning" title="Warning alert"/>
      <CommonAlert variant="danger" title="Error alert"/>
      <CommonAlert variant="secondary" title="Secondary alert"/>
      <CommonAlert variant="success" title="Alert with description">
        <template #description>
          Description
        </template>
      </CommonAlert>

      <CommonAlert variant="success" title="Static alert" static/>

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

      <CommonSpinner variant="primary" size="size-10"/>
      <CommonSpinner variant="secondary" size="size-10"/>
      <CommonSpinner variant="danger" size="size-10"/>
      <CommonSpinner variant="success" size="size-10"/>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Indicator
    </h2>

    <div class="space-x-1 flex items-start">

      <CommonIndicator :number="0" variant="success">
        <CommonButton variant="secondary" label="Click me"/>
      </CommonIndicator>

      <CommonIndicator :number="5" variant="info">
        <CommonButton variant="secondary" label="Click me"/>
      </CommonIndicator>

      <CommonIndicator :number="34" variant="warning">
        <CommonButton variant="secondary" label="Click me"/>
      </CommonIndicator>

      <CommonIndicator :number="99" variant="danger">
        <CommonButton variant="secondary" label="Click me"/>
      </CommonIndicator>

      <CommonIndicator :number="999" variant="secondary">
        <CommonButton variant="secondary" label="Click me"/>
      </CommonIndicator>

      <CommonIndicator :number="34" variant="primary">
        <CommonButton variant="secondary" label="Click me"/>
      </CommonIndicator>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Multiple file input
    </h2>

    <div class="space-y-1 flex flex-col">

      <FormMultiFileUpload name="files-input" label="Multiple file input"/>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Single file input
    </h2>

    <div class="space-y-1 flex flex-col">

      <FormFileUpload name="file-input-1" label="Single file input"/>
      <FormFileUpload name="file-input-2" label="Single file input disabled" :disabled="true"/>
      <FormFileUpload name="file-input-3" label="Single file input with hint" hint="Something as a hint"/>
      <FormFileUpload name="file-input-4" label="Single file input with error" error="Something as an error"/>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Simple text input
    </h2>

    <div class="space-y-1 flex flex-col">

      <FormInput name="input-1" label="Text input"/>
      <FormInput name="input-2" label="Text input disabled" :disabled="true"/>
      <FormInput name="input-3" label="Text input with icon" :icon="HomeIcon"/>
      <FormInput name="input-4" label="Text input with hint" hint="Something as a hint"/>
      <FormInput name="input-5" label="Text input with error" error="Something as an error"/>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Simple text area
    </h2>

    <div class="space-y-1 flex flex-col">

      <FormTextarea name="textarea-1" label="Textarea"/>
      <FormTextarea name="textarea-2" label="Textarea disabled" :disabled="true"/>
      <FormTextarea name="textarea-4" label="Textarea with hint" hint="Something as a hint"/>
      <FormTextarea name="textarea-5" label="Textarea with error" error="Something as an error"/>
      <FormTextarea name="textarea-5" label="Textarea with counter" :maxlength="500"/>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Select
    </h2>

    <div class="space-y-1 flex flex-col">

      <FormSelect name="select-1" label="Select with search" :options="selectOptions"/>
      <FormSelect name="select-2" label="Select without search" :options="selectOptions" hide-search/>
      <FormSelect name="select-3" label="Select with disabled empty" :options="selectOptions" disable-empty/>
      <FormSelect name="select-4" label="Select with async options" :option-loader="asyncOptions"/>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Multiple select
    </h2>

    <div class="space-y-1 flex flex-col">

      <FormMultiSelect name="multiple-select-1" label="Multiple select with search" :options="selectOptions"/>
      <FormMultiSelect name="multiple-select-2" label="Multiple select without search" :options="selectOptions" hide-search/>
      <FormMultiSelect name="multiple-select-3" label="Multiple select with disabled empty" :options="selectOptions" disable-empty/>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Search select
    </h2>

    <div class="space-y-1 flex flex-col">

      <FormSearchSelect name="search-select-1" label="Search select" :searcher="asyncOptions"/>
      <FormSearchSelect name="search-select-2" label="Search select with create" :searcher="asyncOptions" allow-create/>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Suggest input
    </h2>

    <div class="space-y-1 flex flex-col">

      <FormSuggestInput name="suggest-input-1" :suggester="asyncSuggester" label="Suggest input"/>

    </div>

    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Scale
    </h2>

    <div class="space-y-2">

      <CommonScale :value="0" :max="100"/>
      <CommonScale :value="5" :max="100"/>
      <CommonScale :value="15" :max="100"/>
      <CommonScale :value="25" :max="100"/>
      <CommonScale :value="35" :max="100"/>
      <CommonScale :value="45" :max="100"/>
      <CommonScale :value="55" :max="100"/>
      <CommonScale :value="65" :max="100"/>
      <CommonScale :value="75" :max="100"/>
      <CommonScale :value="85" :max="100"/>
      <CommonScale :value="95" :max="100"/>
      <CommonScale :value="100" :max="100"/>

    </div>

  </div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
} from '@heroicons/vue/24/outline'
import {searchInString} from "~/utils/helpers";

definePageMeta({
  layout: 'default'
})

const selectOptions = [
  { value: 'option1', label: 'PHP' },
  { value: 'option2', label: 'Node.js' },
  { value: 'option3', label: 'TypeScript' },
  { value: 'option4', label: 'Java' },
  { value: 'option5', label: 'Go' },
  { value: 'option6', label: 'JavaScript' },
  { value: 'option7', label: 'HTML' },
  { value: 'option8', label: 'CSS' },
  { value: 'option9', label: 'Sass' },
  { value: 'option10', label: 'Less' },
  { value: 'option11', label: 'Cypress' },
  { value: 'option12', label: 'Next.js' },
  { value: 'option13', label: 'Nuxt.js' },
]

async function asyncOptions() {
  await delay(2000)

  return selectOptions
}

async function asyncSuggester(value: string | null) {
  await delay(2000)

  return [
      'Thomas',
      'Jeffrey',
      'Joe',
      'Jamal',
  ].filter((item) => value ? searchInString(item, value) : true)
}
</script>