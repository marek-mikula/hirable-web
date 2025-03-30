<template>
  <div ref="toaster" class="pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5">

    <!-- toaster progress -->
    <div
        v-if="showTimer"
        :class="[
          'absolute left-0 bottom-0 right-0 h-0.5 rounded',
          {
            'bg-blue-400': type === 'info',
            'bg-yellow-400': type === 'warning',
            'bg-red-400': type === 'danger',
            'bg-green-400': type === 'success'
          }
        ]"
        :style="progressStyle"
    />

    <div class="p-4">
      <div class="flex items-start">

        <!-- icon -->
        <div class="shrink-0">
          <svg
              v-if="type === 'info'"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-blue-400"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
          <svg
              v-else-if="type === 'warning'"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-yellow-400"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <svg
              v-else-if="type === 'danger'"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-red-400"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <svg
              v-else
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-green-400"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div v-if="html" class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium text-gray-900" v-html="translate(title)"/>
          <p v-if="message" class="mt-1 text-sm text-gray-500" v-html="translate(message)"/>
        </div>

        <div v-else class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium text-gray-900">
            {{ translate(title) }}
          </p>
          <p v-if="message" class="mt-1 text-sm text-gray-500">
            {{ translate(message) }}
          </p>
        </div>

        <!-- closable button -->
        <div v-if="closable" class="ml-4 flex shrink-0">
          <button
              type="button"
              class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
              @click.prevent="close"
          >
            <svg
                class="size-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
              <path
                  d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Translation} from "~/types/common";

const props = withDefaults(defineProps<{
  title: Translation
  type: 'info' | 'danger' | 'warning' | 'success'
  message?: Translation
  closable?: boolean
  showTimer?: boolean
  html?: boolean
}>(), {
  closable: true,
  showTimer: false,
  html: false,
})

const {close} = useNinjaToasterState()
const {percent} = useNinjaToasterProgress()

const toaster = ref<HTMLElement|null>(null)

const progressStyle = computed(() => props.showTimer ? `width: ${(1 - percent.value) * 100}%; transition: width 0.1s linear;` : '')

onMounted(() => {
  // remove tabIndex from parent not when toaster appears,
  // otherwise user can focus weird empty box
  toaster.value?.parentElement?.removeAttribute('tabIndex')
})
</script>