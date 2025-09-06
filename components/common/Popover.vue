<template>
  <component ref="element" :is="tag" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <slot/>
    <teleport to="#teleports">
      <transition
          enter-active-class="transition-opacity ease-out duration-100"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity ease-in duration-75"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          @after-leave="onPopoverHidden"
      >
        <div ref="popover" v-if="shown" class="z-[125]">
          <slot name="popover"/>
        </div>
      </transition>
    </teleport>
  </component>
</template>

<script lang="ts" setup>
import type {Instance} from "@popperjs/core";
import {createPopper} from "@popperjs/core";

withDefaults(defineProps<{
  tag?: string
}>(), {
  tag: 'div'
})

const shown = ref<boolean>(false)
const popper = ref<Instance|null>(null)

const element = ref<HTMLElement|null>(null)
const popover = ref<HTMLElement|null>(null)

function initPopper(): Instance {
  return createPopper(element.value!, popover.value!, {
    placement: 'auto',
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

function onMouseEnter(): void {
  shown.value = true

  nextTick(() => {
    popper.value = initPopper()
  })
}

function onMouseLeave(): void {
  shown.value = false
}

function onPopoverHidden(): void {
  popper.value?.destroy()
  popper.value = null
}
</script>
