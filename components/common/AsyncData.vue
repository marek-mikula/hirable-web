<template>
  <div>

    <!-- error message -->
    <div v-if="showError">
      <slot name="error">
        <CommonAlert variant="danger" :title="$t('common.error')" static/>
      </slot>
    </div>

    <!-- initial loading state -->
    <div v-else-if="showInitial">
      <slot name="initial"/>
    </div>

    <!-- data state with loading indicator -->
    <div v-else-if="showData">
      <slot name="data" :data="data" :is-loading="isLoading"/>
    </div>

  </div>
</template>

<script setup lang="ts">
import type {AsyncData} from "nuxt/app";

const props = defineProps<{
  asyncData: AsyncData<unknown, unknown>
}>()

const emit = defineEmits<{
  (e: 'data', data: unknown): void
}>()

const data = ref<unknown|undefined>(undefined)
const initial = ref<boolean>(false)

const showError = computed<boolean>(() => !!props.asyncData.error.value && !props.asyncData.pending.value)
const showInitial = computed<boolean>(() => !initial.value && data.value === undefined)
const showData = computed<boolean>(() => data.value !== undefined)
const isLoading = computed<boolean>(() => props.asyncData.pending.value)

function onReceiveData(newData: unknown): void {
  // initial value
  if (newData === null) {
    return
  }

  data.value = newData

  // mark initial as false, because
  // we have received the first data
  if (initial.value) {
    initial.value = false
  }

  emit('data', newData)
}

// - everytime the data changes in the async
// data object, we receive a signal with
// new data
// - also check the data immediatelly in case
// of SSR
watch(props.asyncData.data, onReceiveData, {immediate: true})
</script>
