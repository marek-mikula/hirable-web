<template>
  <div>
    Statistics
  </div>
</template>

<script lang="ts" setup>
import type {PositionShow} from "~/repositories/resources";

const props = defineProps<{
  position: PositionShow
}>()

const {t} = useI18n()

useHead({
  title: () => t('page.position.detail.tabs.statistics')
})
</script>
