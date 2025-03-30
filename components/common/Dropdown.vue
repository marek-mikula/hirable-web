<template>
  <Menu v-slot="{ open, close }" as="div" class="relative inline-block text-left">

    <MenuButton as="div" class="flex items-center">
      <slot name="button" v-bind="{ open, close }"/>
    </MenuButton>

    <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems>
        <slot name="list" v-bind="{ open, close }"/>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
</script>
