<template>
  <CommonModal
      v-if="positionCandidate"
      :open="opened"
      :title="$t('model.positionCandidate.otherActions.share')"
      @close="close"
      @hidden="clear"
  >
    <template #content>

      <!-- loading spinner -->
      <div v-if="loading" class="p-4 flex justify-center">
        <CommonSpinner variant="primary" size="size-8"/>
      </div>

      <div v-else class="divide-y divide-gray-200">

        <CommonForm id="position-candidate-share-form" v-slot="{ isLoading, firstError }" :handler="handler" class="p-3 lg:p-4">

          <FormSearchMultiSelect
              v-model="data.hiringManagers"
              name="hiringManagers"
              :error="firstError('hiringManagers', true)"
              :searcher="createPositionUsersSearcher(positionCandidate.positionId, true, [POSITION_ROLE.HIRING_MANAGER])"
              required
          >
            <template #after>
              <CommonButton
                  type="submit"
                  :label="$t('common.action.confirm')"
                  :loading="isLoading"
              />
            </template>
          </FormSearchMultiSelect>

        </CommonForm>

        <div v-if="shares.length > 0" class="p-3 lg:p-4">

          <div
              v-for="share in shares"
              :key="share.id"
              class="px-3 py-2 rounded-md border border-gray-200 shadow-xs flex items-center"
          >
            <p class="flex-1 min-w-0 text-sm font-medium">
              {{ share.user.label }}
            </p>
            <CommonButton
                :icon="XMarkIcon"
                :size="1"
                :loading="deletingId === share.id"
                variant="danger"
                v-tooltip="{ content: $t('common.action.delete') }"
                @click="deleteShare(share)"
            />
          </div>

        </div>

      </div>

    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import type {PositionCandidate, PositionCandidateShare} from "~/repositories/resources";
import type {PositionCandidateShareModalExpose} from "~/types/components/position/candidate/shareModal.types";
import type {FormHandler} from "~/types/components/common/form.types";
import type {StoreData} from "~/repositories/positionCandidateShare/inputs";
import {createPositionUsersSearcher} from "~/functions/search";
import {POSITION_ROLE} from "~/types/enums";
import {XMarkIcon} from "@heroicons/vue/24/outline";

const toaster = useToaster()
const api = useApi()

const deletingId = ref<number|null>(null)
const loading = ref<boolean>(false)
const opened = ref<boolean>(false)
const positionCandidate = ref<PositionCandidate|null>(null)
const shares = ref<PositionCandidateShare[]>([])

const data = ref<StoreData>({
  hiringManagers: []
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.positionCandidateShare.store(
        positionCandidate.value!.positionId,
        positionCandidate.value!.id,
        data.value
    )

    await toaster.success({title: 'toast.position.candidate.share.store'})

    const { positionCandidateShares: newShares } = response._data!.data

    shares.value = [...shares.value, ...newShares]
  },
}

async function deleteShare(positionCandidateActionShare: PositionCandidateShare): Promise<void> {
  deletingId.value = positionCandidateActionShare.id

  const result = await handle(() => api.positionCandidateShare.deleteShare(
      positionCandidate.value!.positionId,
      positionCandidate.value!.id,
      positionCandidateActionShare.id
  ))

  deletingId.value = null

  if (!result.success) {
    return
  }

  await toaster.success({title: 'toast.position.candidate.share.delete'})

  shares.value = shares.value.filter(item => item.id !== positionCandidateActionShare.id)
}

async function loadShares(): Promise<void> {
  loading.value = true

  const result = await handle(() => api.positionCandidateShare.index(
      positionCandidate.value!.positionId,
      positionCandidate.value!.id
  ).then(res => res._data!.data.positionCandidateShares))

  loading.value = false

  if (!result.success) {
    return
  }

  shares.value = result.result
}

function clear(): void {
  positionCandidate.value = null
  shares.value = []
}

function open(pc: PositionCandidate): void {
  positionCandidate.value = pc
  loadShares()
  opened.value = true
}

function close(): void {
  opened.value = false
}

defineExpose<PositionCandidateShareModalExpose>({
  open,
  close,
})
</script>