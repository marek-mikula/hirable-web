<template>
  <CommonModal
      v-if="positionCandidate"
      :open="opened"
      :title="$t('modal.position.candidate.detail.title', {candidate: positionCandidate.candidate.fullName, position: position.name})"
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

      <div v-else-if="positionCandidate" class="grid lg:grid-cols-2 p-3 lg:p-4 gap-3 lg:gap-4">

        <!-- candidate info -->
        <CandidateDetailInfo :candidate="positionCandidate.candidate" disable-edit/>

        <!-- position candidate detail info -->
        <PositionCandidateDetailInfo :position-candidate="positionCandidate" @show-action="onShowAction"/>

      </div>

      <PositionCandidateActionShowModal ref="actionShowModal"/>

    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import { UserIcon } from "@heroicons/vue/24/outline";
import type {Position, PositionCandidate, PositionCandidateAction} from "~/repositories/resources";
import type {DetailModalExpose} from "~/types/components/position/candidate/detailModal.types";
import type {ActionShowModalExpose} from "~/types/components/position/candidate/action/showModal.types";

const props = defineProps<{
  position: Position
}>()

const api = useApi()

const loading = ref<boolean>(false)
const opened = ref<boolean>(false)
const positionCandidate = ref<PositionCandidate|null>(null)

const actionShowModal = ref<ActionShowModalExpose>()

function onShowAction(positionCandidateAction: PositionCandidateAction): void {
  actionShowModal.value!.open(positionCandidateAction)
}

async function fetchPositionCandidateDetail(positionId: number, id: number): Promise<void> {
  loading.value = true

  const result = await handle<PositionCandidate>(() => api.positionCandidate.show(positionId, id).then(res => res._data!.data.positionCandidate))

  loading.value = false

  if (!result.success) {
    return
  }

  positionCandidate.value = result.result
}

function open(newPositionCandidate: PositionCandidate): void {
  positionCandidate.value = newPositionCandidate
  opened.value = true

  // we need to fetch full position candidate
  // detail, because the function arguments
  // does not have all relationships loaded
  fetchPositionCandidateDetail(newPositionCandidate.positionId, newPositionCandidate.id)
}

function close(): void {
  opened.value = false
}

function clear(): void {
  positionCandidate.value = null
}

defineExpose<DetailModalExpose>({
  open,
  close,
})
</script>