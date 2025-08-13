<template>
  <dl class="border border-gray-200 rounded-md divide-y divide-gray-200 shadow-xs overflow-hidden">
    <div class="p-3 font-semibold bg-gray-100">
      {{ $t('page.position.detail.links') }}
    </div>
    <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
      <dt class="text-sm font-medium text-gray-900">
        {{ $t('model.position.commonLink') }}
      </dt>
      <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
        <CommonClipboard :value="position.commonLink">{{ $t('model.common.link') }}</CommonClipboard>
      </dd>
    </div>
    <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
      <dt class="text-sm font-medium text-gray-900">
        {{ $t('model.position.internLink') }}
      </dt>
      <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
        <CommonClipboard :value="position.internLink">{{ $t('model.common.link') }}</CommonClipboard>
      </dd>
    </div>
    <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
      <dt class="text-sm font-medium text-gray-900">
        {{ $t('model.position.referralLink') }}
      </dt>
      <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
        <CommonClipboard :value="position.referralLink">{{ $t('model.common.link') }}</CommonClipboard>
      </dd>
    </div>
  </dl>
</template>

<script lang="ts" setup>
import type {Position} from "~/repositories/resources";

const props = defineProps<{
  position: Position
}>()
</script>
