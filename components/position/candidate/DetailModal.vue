<template>
  <CommonModal
      :open="opened"
      :title="positionCandidate ? $t('modal.position.candidate.detail.title', {candidate: positionCandidate.candidate.fullName, position: position.name}) : ''"
      :title-icon="UserIcon"
      width="full"
      @close="close"
      @hidden="clear"
  >
    <template #content>

      <!-- loading spinner -->
      <div v-if="loading" class="p-4 flex justify-center">
        <CommonSpinner variant="primary" size="size-8"/>
      </div>

      <div v-else-if="positionCandidate && candidate" class="grid lg:grid-cols-2 p-3 lg:p-4 gap-3 lg:gap-4">

        <!-- candidate info -->
        <CandidateDetailInfo
            :candidate="candidate"
            @update="onCandidateUpdated"
        />

        <!-- position candidate detail info -->
        <PositionCandidateDetailInfo
            :position="position"
            :position-candidate="positionCandidate"
            @update-action="onPositionCandidateActionUpdated"
        />

      </div>

    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import { UserIcon } from "@heroicons/vue/24/outline";
import type {
  PositionShow,
  PositionCandidate,
  PositionCandidateAction,
  CandidateShow,
} from "~/repositories/resources";
import type {PositionCandidateDetailModalExpose} from "~/types/components/position/candidate/detailModal.types";

const props = defineProps<{
  position: PositionShow
}>()

const emit = defineEmits<{
  (e: 'update', positionCandidate: PositionCandidate): void
  (e: 'update-candidate', candidate: CandidateShow): void
}>()

const api = useApi()

const loading = ref<boolean>(false)
const opened = ref<boolean>(false)

const candidate = ref<CandidateShow|null>(null)
const positionCandidate = ref<PositionCandidate|null>(null)

function onPositionCandidateActionUpdated(positionCandidateAction: PositionCandidateAction): void {
  const actionIndex = positionCandidate.value!.actions.findIndex(item => item.id === positionCandidateAction.id)

  if (actionIndex === -1) {
    return
  }

  positionCandidate.value!.actions.splice(actionIndex, 1, positionCandidateAction)

  emit('update', positionCandidate.value!)
}

function onCandidateUpdated(newCandidate: CandidateShow): void {
  candidate.value = newCandidate
  positionCandidate.value!.candidate = newCandidate
  emit('update-candidate', newCandidate)
}

async function fetchData(): Promise<void> {
  loading.value = true

  const result = await handle<CandidateShow>(() => api.candidate.show(positionCandidate.value!.candidate.id).then(res => res._data!.data.candidate))

  loading.value = false

  if (!result.success) {
    return
  }

  candidate.value = result.result
}

function open(pc: PositionCandidate): void {
  positionCandidate.value = pc
  fetchData()
  opened.value = true
}

function close(): void {
  opened.value = false
}

function clear(): void {
  candidate.value = null
  positionCandidate.value = null
}

defineExpose<PositionCandidateDetailModalExpose>({
  open,
  close,
})
</script>