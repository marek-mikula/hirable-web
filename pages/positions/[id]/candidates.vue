<template>
  <div>
    <PositionKanbanTable :position="position" @action="onAction"/>
    <PositionCandidateActionModal ref="actionModal"/>
  </div>
</template>

<script lang="ts" setup>
import type {Position} from "~/repositories/resources";
import type {ActionModalExpose} from "~/types/components/position/candidate/actionModal.types";
import {ACTION_TYPE} from "~/types/enums";

const props = defineProps<{
  position: Position
}>()

const {t} = useI18n()

useHead({
  title: () => t('page.position.detail.tabs.candidates')
})

const actionModal = ref<ActionModalExpose>()

function onAction(action: ACTION_TYPE): void {
  actionModal.value!.open(action)
}
</script>
