<template>
  <div>
    <AdvertisementForm :position="position"/>

    <ClientOnly>
      <teleport to="#page-title">
        <LayoutPageTitle
            :title="$t('page.advertisements.create.title')"
            :icon="MegaphoneIcon"
            :subtitle="$t('page.positions.detail.onPosition', { position: position.name })"
        />
      </teleport>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import {MegaphoneIcon} from "@heroicons/vue/24/outline";
import type {Position} from "~/repositories/resources";

const props = defineProps<{
  position: Position
}>()

onBeforeUnmount(() => {
  console.log("Unmount")
})
</script>
