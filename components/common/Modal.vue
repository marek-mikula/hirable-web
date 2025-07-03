<template>
  <TransitionRoot appear :show="open" as="div" @after-enter="emit('shown')" @after-leave="emit('hidden')" @before-enter="emit('show')" @before-leave="emit('hide')">
    <Dialog as="div" class="relative z-[100]" @close="emit('close')">

      <!-- modal backdrop -->
      <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25 backdrop-blur-xs"/>
      </TransitionChild>

      <!-- modal content -->
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
          >
            <DialogPanel :class="['w-full transform rounded-xl bg-white text-left align-middle shadow-xl transition-all divide-y divide-gray-200 overflow-hidden', {
              'max-w-sm': width === 'sm',
              'max-w-md': width === 'md',
              'max-w-xl': width === 'xl',
              'max-w-2xl': width === '2xl',
              'max-w-3xl': width === '3xl',
            }]">

              <!-- modal title -->
              <DialogTitle as="h3" class="p-4 text-lg font-medium text-gray-900 flex items-start space-x-2">
                <component v-if="titleIcon" :is="titleIcon" class="size-6 mt-0.5 shrink-0"/>
                <span class="flex-1">
                  {{ title }}
                </span>
                <button
                    v-if="! hideCloseButton"
                    type="button"
                    class="shrink-0 mt-0.5 rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    @click="emit('close')"
                >
                  <XMarkIcon class="size-6"/>
                </button>
              </DialogTitle>

              <!-- body and foot together if needed -->
              <template v-if="$slots.content">
                <slot name="content"/>
              </template>

              <template v-else>

                <!-- modal body -->
                <div class="p-4">
                  <slot name="body"/>
                </div>

                <!-- modal footer -->
                <div v-if="$slots.foot" class="p-4">
                  <slot name="foot"/>
                </div>

              </template>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>

    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { XMarkIcon } from "@heroicons/vue/24/outline";
import type {AnyComponent} from "~/types/common";

withDefaults(defineProps<{
  title: string
  open: boolean
  titleIcon?: AnyComponent
  width?: 'sm' | 'md' | 'xl' | '2xl' | '3xl' | 'full'
  hideCloseButton?: boolean
}>(), {
  width: 'md',
  hideCloseButton: false,
})

const emit = defineEmits<{
  (e: 'shown' | 'show' | 'hidden' | 'hide' | 'close'): void,
}>()
</script>