<template>
  <CommonModal
      v-if="positionCandidate"
      :open="opened"
      :title="$t('model.positionCandidate.otherActions.requestEvaluation')"
      width="xl"
      @close="close"
      @hidden="clear"
  >
    <template #content>
      <CommonForm id="position-candidate-request-evaluation-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="p-4 space-y-3">

          <CommonAlert :title="$t('modal.position.candidate.requestEvaluation.info')" static/>

          <FormInput
            v-model="data.fillUntil"
            type="date"
            name="fillUntil"
            :label="$t('model.positionCandidateEvaluation.fillUntil')"
            :hint="$t('form.hint.position.candidate.evaluation.fillUntil')"
            :error="firstError('fillUntil')"
          />

          <FormSearchMultiSelect
              v-model="data.users"
              ref="usersSelect"
              name="users"
              :label="$t('model.positionCandidateEvaluation.users')"
              :error="firstError('users', true)"
              :searcher="createPositionUsersSearcher(positionCandidate.positionId, true)"
              required
          />

        </div>

        <div class="p-4 flex items-center justify-between">
          <CommonButton
              variant="secondary"
              :label="$t('common.action.close')"
              @click="close"
          />
          <CommonButton
              type="submit"
              variant="primary"
              :label="$t('common.action.confirm')"
              :loading="isLoading"
          />
        </div>

      </CommonForm>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import type {PositionCandidate, PositionCandidateEvaluationShow} from "~/repositories/resources";
import type {FormHandler} from "~/types/components/common/form.types";
import type {SearchMultiSelectExpose} from "~/types/components/form/searchMultiSelect.types";
import type {PositionCandidateRequestEvaluationModalExpose} from "~/types/components/position/candidate/requestEvaluationModal.types";
import type {RequestData} from "~/repositories/positionCandidateEvaluation/inputs";
import {createPositionUsersSearcher} from "~/functions/search";
import {POSITION_ROLE} from "~/types/enums";

const emit = defineEmits<{
  (e: 'request', evaluations: PositionCandidateEvaluationShow[]): void
}>()

const toaster = useToaster()
const api = useApi()

const loading = ref<boolean>(false)
const opened = ref<boolean>(false)
const positionCandidate = ref<PositionCandidate|null>(null)

const usersSelect = useTemplateRef<SearchMultiSelectExpose | null>('usersSelect')

const data = ref<RequestData>({
  users: [],
  fillUntil: null,
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.positionCandidateEvaluation.requestEvaluation(
        positionCandidate.value!.positionId,
        positionCandidate.value!.id,
        data.value
    )

    await toaster.success({title: 'toast.position.candidate.evaluation.request'})

    const { positionCandidateEvaluations } = response._data!.data

    emit('request', positionCandidateEvaluations)

    close()
  },
}

function clear(): void {
  positionCandidate.value = null
  data.value.users = []
  data.value.fillUntil = null
}

function open(pc: PositionCandidate): void {
  positionCandidate.value = pc
  opened.value = true
}

function close(): void {
  opened.value = false
}

defineExpose<PositionCandidateRequestEvaluationModalExpose>({
  open,
  close,
})
</script>
