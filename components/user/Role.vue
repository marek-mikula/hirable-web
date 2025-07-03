<template>
  <CommonBadge
      variant="info"
      :label="$t(`model.company.roles.${role}`)"
  />
</template>

<script lang="ts" setup>
import {ROLE} from "~/types/enums";

const props = defineProps<{
  role: ROLE
}>()
</script>
