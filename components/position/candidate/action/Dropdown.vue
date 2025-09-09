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
        <template #menu1 v-if="showMenu1">
          <CommonDropdownButton
              v-for="action in allowedActions"
              :key="action"
              @click="close(() => emit('createAction', action))"
          >
            {{ $t(`model.positionCandidateAction.types.${action}`) }}
          </CommonDropdownButton>
        </template>
        <template #menu2 v-if="showMenu2">
          <CommonDropdownButton
              v-if="policy.positionCandidateShare.store(props.positionCandidate, props.position)"
              @click="close(() => emit('share'))"
          >
            {{ $t('model.positionCandidate.otherActions.share') }}
          </CommonDropdownButton>
          <CommonDropdownButton
              v-if="policy.positionCandidateEvaluation.request(props.positionCandidate, props.position)"
              @click="close(() => emit('requestEvaluation'))"
          >
            {{ $t('model.positionCandidate.otherActions.requestEvaluation') }}
          </CommonDropdownButton>
          <CommonDropdownButton
              v-if="policy.positionCandidateEvaluation.store(props.positionCandidate, props.position)"
              @click="close(() => emit('evaluate'))"
          >
            {{ $t('model.positionCandidate.otherActions.evaluate') }}
          </CommonDropdownButton>
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

const showMenu1 = computed<boolean>(() => {
  return policy.positionCandidateAction.store(props.positionCandidate, props.position)
})

const showMenu2 = computed<boolean>(() => {
  return policy.positionCandidateShare.store(props.positionCandidate, props.position) ||
      policy.positionCandidateEvaluation.request(props.positionCandidate, props.position) ||
      policy.positionCandidateEvaluation.store(props.positionCandidate, props.position)
})

const allowedActions = computed<ACTION_TYPE[]>(() => {
  return getEnumValues(ACTION_TYPE).filter(item => isActionAllowedInStep(item, props.positionCandidate.step))
})
</script>