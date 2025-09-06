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
        <CandidateDetailInfo :candidate="candidate" disable-edit/>

        <!-- position candidate detail info -->
        <PositionCandidateDetailInfo :position="position" :position-candidate="positionCandidate" @show-action="onUpdatePositionCandidateAction"/>

      </div>

      <PositionCandidateActionShowModal ref="positionCandidateActionUpdateModal" :position="position" :position-candidate="positionCandidate" @update="onPositionCandidateActionUpdated"/>

    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import { UserIcon } from "@heroicons/vue/24/outline";
import type {PositionShow, PositionCandidate, PositionCandidateAction, CandidateShow} from "~/repositories/resources";
import type {DetailModalExpose} from "~/types/components/position/candidate/detailModal.types";
import type {PositionCandidateActionUpdateModalExpose} from "~/types/components/position/candidate/action/showModal.types";

const props = defineProps<{
  position: PositionShow
}>()

const emit = defineEmits<{
  (e: 'update', positionCandidate: PositionCandidate): void
}>()

const api = useApi()

const loading = ref<boolean>(false)
const opened = ref<boolean>(false)

const candidate = ref<CandidateShow|null>(null)
const positionCandidate = ref<PositionCandidate|null>(null)

const positionCandidateActionUpdateModal = ref<PositionCandidateActionUpdateModalExpose>()

function onUpdatePositionCandidateAction(positionCandidateAction: PositionCandidateAction): void {
  positionCandidateActionUpdateModal.value!.open(positionCandidateAction.id)
}

function onPositionCandidateActionUpdated(positionCandidateAction: PositionCandidateAction): void {
  const actionIndex = positionCandidate.value!.actions.findIndex(item => item.id === positionCandidateAction.id)

  if (actionIndex === -1) {
    return
  }

  positionCandidate.value!.actions.splice(actionIndex, 1, positionCandidateAction)

  emit('update', positionCandidate.value!)
}

async function fetchData(positionCandidateId: number): Promise<void> {
  loading.value = true

  const result = await handle<{
    candidate: CandidateShow,
    positionCandidate: PositionCandidate
  }>(async () => {
    const positionCandidate = await api.positionCandidate.show(props.position.id, positionCandidateId).then(res => res._data!.data.positionCandidate)
    const candidate = await api.candidate.show(positionCandidate.candidate.id).then(res => res._data!.data.candidate)
    return { candidate, positionCandidate }
  })

  loading.value = false

  if (!result.success) {
    return
  }

  candidate.value = result.result.candidate
  positionCandidate.value = result.result.positionCandidate
}

function open(positionCandidateId: number): void {
  opened.value = true

  // we need to fetch full position candidate
  // and candidate detail, because the function
  // arguments does not have all relationships loaded
  fetchData(positionCandidateId)
}

function close(): void {
  opened.value = false
}

function clear(): void {
  candidate.value = null
  positionCandidate.value = null
}

defineExpose<DetailModalExpose>({
  open,
  close,
})
</script>