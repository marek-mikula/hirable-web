<template>
  <CommonDropdown>

    <template #button="{ open }">
      <CommonButton
          variant="secondary"
          :size="1"
          :icon="BoltIcon"
          :disabled="disabled"
          v-tooltip="{ content: $t('model.positionCandidate.actions') }"
          @click="open"
      />
    </template>

    <template #list="{ close }">
      <CommonDropdownMenu>
        <template #menu1 v-if="policy.positionCandidateAction.store(positionCandidate, position)">
          <CommonDropdownButton
              v-for="action in allowedActions"
              :key="action"
              @click="close(() => emit('createAction', action))"
          >
            {{ $t(`model.positionCandidateAction.types.${action}`) }}
          </CommonDropdownButton>
        </template>
        <template #menu2 v-if="policy.positionCandidateShare.store(positionCandidate, position)">
          <CommonDropdownButton
              @click="close(() => emit('share'))"
          >
            {{ $t('model.positionCandidate.otherActions.share') }}
          </CommonDropdownButton>
<!--          <CommonDropdownButton-->
<!--              @click="close(() => emit('requestEvaluation'))"-->
<!--          >-->
<!--            {{ $t('model.positionCandidate.otherActions.requestEvaluation') }}-->
<!--          </CommonDropdownButton>-->
<!--          <CommonDropdownButton-->
<!--              @click="close(() => emit('evaluate'))"-->
<!--          >-->
<!--            {{ $t('model.positionCandidate.otherActions.evaluate') }}-->
<!--          </CommonDropdownButton>-->
        </template>
      </CommonDropdownMenu>
    </template>

  </CommonDropdown>
</template>

<script setup lang="ts">
import {BoltIcon} from "@heroicons/vue/24/outline";
import {ACTION_TYPE} from "~/types/enums";
import {getEnumValues} from "~/functions/common";
import {isActionAllowedInStep} from "~/functions/action";
import type {PositionCandidate, PositionShow} from "~/repositories/resources";

const props = defineProps<{
  position: PositionShow
  positionCandidate: PositionCandidate
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'createAction', action: ACTION_TYPE): void,
  (e: 'share' | 'evaluate' | 'requestEvaluation'): void,
}>()

const policy = usePolicy()

const allowedActions = computed<ACTION_TYPE[]>(() => {
  return getEnumValues(ACTION_TYPE).filter(item => isActionAllowedInStep(item, props.positionCandidate.step))
})
</script>