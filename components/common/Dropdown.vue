<template>
  <component ref="element" :is="tag">
    <slot name="button" v-bind="{ open }"/>
    <teleport to="#teleports">
      <transition
          enter-active-class="transition-opacity ease-out duration-100"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity ease-in duration-75"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          @after-leave="onDropdownHidden"
      >
        <div ref="dropdown" v-if="opened" class="z-[125]">
          <slot name="list" v-bind="{ close }"/>
        </div>
      </transition>
    </teleport>
  </component>
</template>

<script setup lang="ts">
import type {Instance, Placement} from "@popperjs/core";
import type {CallbackFn} from "~/types/common";
import {createPopper} from "@popperjs/core";

const props = withDefaults(defineProps<{
  placement?: Placement
  tag?: string
}>(), {
  placement: 'bottom-end',
  tag: 'div'
})

const opened = ref<boolean>(false)
const popper = ref<Instance|null>(null)

const element = ref<HTMLElement|null>(null)
const dropdown = ref<HTMLElement|null>(null)

function initPopper(): Instance {
  return createPopper(element.value!, dropdown.value!, {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5]
        }
      }
    ]
  })
}

function open(): void {
  // show dropdown
  opened.value = true

  // add event listener for clicking outside
  document.addEventListener('click', handleClickOutside, true)

  // add event listener for esc key
  document.addEventListener('keydown', handleEscape, true)

  // initialize Popper instance once the dropdown is rendered
  nextTick(() => {
    popper.value = initPopper()
  })
}

function close(callback?: CallbackFn): void {
  // hide dropdown
  opened.value = false

  // remove event listener for clicking outside
  document.removeEventListener('click', handleClickOutside, true)

  // remove event listener for esc key
  document.removeEventListener('keydown', handleEscape, true)

  if (callback) {
    callback()
  }
}

function handleClickOutside(e: MouseEvent): void {
  const target = e.target as HTMLElement

  if (
      target !== dropdown.value &&
      !dropdown.value?.contains(target)
  ) {
    close()
  }
}

function handleEscape(e: KeyboardEvent): void {
  if (e.key === 'Escape' && opened.value) {
    close()
  }
}

function onDropdownHidden(): void {
  popper.value?.destroy()
  popper.value = null
}
</script>
