<template>
  <div>
    Apply for position! :) {{ token }}
  </div>
</template>

<script setup lang="ts">
const token = useRouteQuery<string>('token')

definePageMeta({
  layout: 'default',
  async validate(route) {
    return typeof route.query.token === 'string'
  }
})
</script>