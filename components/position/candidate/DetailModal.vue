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

        <!-- candidate basic information -->
        <CandidateDetailInfo :candidate="positionCandidate.candidate" disable-edit/>

        <!-- candidate actions on position -->
        <div class="space-y-2">
          <CommonWrapperButton
              v-for="action in positionCandidate.actions ?? []"
              :key="action.id"
              class="w-full"
          >
            <PositionCandidateActionCard :action="action" class="hover:border-gray-400"/>
          </CommonWrapperButton>
        </div>

      </div>

    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import { UserIcon } from "@heroicons/vue/24/outline";
import type {Position, PositionCandidate} from "~/repositories/resources";
import type {DetailModalExpose} from "~/types/components/position/candidate/detailModal.types";

const props = defineProps<{
  position: Position
}>()

const api = useApi()

const loading = ref<boolean>(false)
const opened = ref<boolean>(false)
const positionCandidate = ref<PositionCandidate|null>(null)

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