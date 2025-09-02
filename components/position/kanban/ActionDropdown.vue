<template>
  <CommonDropdown>

    <template #button="{ open }">
      <CommonButton
          variant="secondary"
          :size="1"
          :icon="BoltIcon"
          :disabled="disabled"
          v-tooltip="{ content: $t('modal.position.candidate.createAction.title') }"
          @click="open"
      />
    </template>

    <template #list="{ close }">
      <CommonDropdownMenu>
        <template #menu1>
          <CommonDropdownButton
              v-for="action in getEnumValues(ACTION_TYPE)"
              :key="action"
              @click="close(() => emit('createAction', action))"
          >
            {{ $t(`model.positionCandidateAction.types.${action}`) }}
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
import type {PositionCandidate} from "~/repositories/resources";

const props = defineProps<{
  positionCandidate: PositionCandidate
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'createAction', action: ACTION_TYPE): void,
}>()
</script>