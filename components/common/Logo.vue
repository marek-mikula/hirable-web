<template>
  <span>🪑 {{ appName }}</span>
</template>

<script lang="ts" setup>
const { appName } = useAppConfig()
</script>