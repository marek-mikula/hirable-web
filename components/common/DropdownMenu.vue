<template>
  <div
      class="w-44 max-h-60 overflow-y-auto divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-gray-200 focus:outline-hidden"
      role="menu"
      tabindex="-1"
  >
    <div v-for="(slot, name) in $slots" :key="name" class="p-1 space-y-1" role="none">
      <component :is="slot"/>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
