<template>
  <CommonDropdown>

    <template #button="{ open }">
      <CommonButton
          variant="secondary"
          :size="1"
          :icon="FireIcon"
          :loading="loading"
          v-tooltip="{ content: $t('model.positionCandidate.priority') }"
          @click="open"
      />
    </template>

    <template #list="{ close }">
      <CommonDropdownMenu width="w-44">
        <template #menu1>
          <CommonDropdownButton
              v-for="priority in getEnumValues(POSITION_CANDIDATE_PRIORITY)"
              :key="priority"
              :active="positionCandidate.priority === priority"
              @click="close(() => setPriority(priority))"
          >
            {{ $t(`model.positionCandidate.priorities.${priority}`) }}
          </CommonDropdownButton>
        </template>
      </CommonDropdownMenu>
    </template>

  </CommonDropdown>
</template>

<script setup lang="ts">
import {FireIcon} from "@heroicons/vue/24/outline";
import {POSITION_CANDIDATE_PRIORITY} from "~/types/enums";
import {getEnumValues} from "~/functions/common";
import type {PositionCandidate, PositionShow} from "~/repositories/resources";

const props = defineProps<{
  position: PositionShow
  positionCandidate: PositionCandidate
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'update', positionCandidate: PositionCandidate): void,
}>()

const toaster = useToaster()
const api = useApi()
const policy = usePolicy()

const loading = ref<boolean>(false)

async function setPriority(priority: POSITION_CANDIDATE_PRIORITY): Promise<void> {
  if (priority === props.positionCandidate.priority) {
    return
  }

  loading.value = true

  const result = await handle<PositionCandidate>(() => api.positionCandidate.setPriority(
      props.position.id,
      props.positionCandidate.id,
      priority
  ).then(res => res._data!.data.positionCandidate))

  loading.value = false

  if (!result.success) {
    return
  }

  await toaster.success({
    title: 'toast.position.candidate.priority'
  })

  emit('update', result.result)
}
</script>