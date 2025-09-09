<template>
  <CommonModal
      :open="opened"
      :title="$t('model.positionCandidate.otherActions.evaluate')"
      width="full"
      @close="close"
      @hidden="clear"
  >
    <template #content>

      <!-- loading spinner -->
      <div v-if="loading" class="p-4 flex justify-center">
        <CommonSpinner variant="primary" size="size-8"/>
      </div>

      <div v-else-if="candidate && positionCandidate" class=" grid lg:grid-cols-3 p-3 lg:p-4 gap-3 lg:gap-4">

        <div class="lg:col-span-2 grid gap-3 lg:gap-4">

          <!-- candidate info -->
          <CandidateDetailInfo
              :candidate="candidate"
          />

          <!-- position candidate detail info -->
          <PositionCandidateDetailInfo
              :position="position"
              :position-candidate="positionCandidate"
          />

        </div>

        <div class="sticky bottom-0">
          <CommonForm id="position-candidate-evaluate-form" v-slot="{ isLoading, firstError }" :handler="handler" class="sticky top-5 bg-white divide-y divide-gray-200 border border-gray-200 rounded-md">

            <div class="p-4 space-y-3">

              <FormTextarea
                  v-model="data.evaluation"
                  name="evaluation"
                  :label="$t('model.positionCandidateEvaluation.evaluation')"
                  :error="firstError('evaluation')"
                  :maxlength="500"
                  required
              />

              <FormSelect
                  v-model="data.stars"
                  name="stars"
                  :label="$t('model.positionCandidateEvaluation.stars')"
                  :error="firstError('stars')"
                  :options="getStarsOptions()"
                  required
                  hide-search
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
        </div>

      </div>

    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import type {
  CandidateShow,
  Position,
  PositionCandidate,
  PositionCandidateEvaluation,
  PositionCandidateEvaluationShow,
} from "~/repositories/resources";
import type {FormHandler} from "~/types/components/common/form.types";
import type {StoreData} from "~/repositories/positionCandidateEvaluation/inputs";
import type {PositionCandidateEvaluateModalExpose} from "~/types/components/position/candidate/evaluateModal.types";
import {getStarsOptions} from "~/functions/select";

const props = defineProps<{
  position: Position
}>()

const emit = defineEmits<{
  (e: 'evaluate', evaluation: PositionCandidateEvaluationShow): void
}>()

const toaster = useToaster()
const api = useApi()

const loading = ref<boolean>(false)
const opened = ref<boolean>(false)

const candidate = ref<CandidateShow|null>(null)
const positionCandidate = ref<PositionCandidate|null>(null)
const positionCandidateEvaluation = ref<PositionCandidateEvaluation|null>(null)

const data = ref<StoreData>({
  evaluation: null,
  stars: null,
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    if (positionCandidateEvaluation.value) {
      const response = await api.positionCandidateEvaluation.update(
          positionCandidate.value!.positionId,
          positionCandidate.value!.id,
          positionCandidateEvaluation.value!.id,
          data.value
      )

      await toaster.success({title: 'toast.position.candidate.evaluate.update'})

      const { positionCandidateEvaluation: newPositionCandidateEvaluation } = response._data!.data

      emit('evaluate', newPositionCandidateEvaluation)
    } else {
      const response = await api.positionCandidateEvaluation.store(
          positionCandidate.value!.positionId,
          positionCandidate.value!.id,
          data.value
      )

      await toaster.success({title: 'toast.position.candidate.evaluate.store'})

      const { positionCandidateEvaluation: newPositionCandidateEvaluation } = response._data!.data

      emit('evaluate', newPositionCandidateEvaluation)
    }

    close()
  },
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

function initForm(evaluation: PositionCandidateEvaluation): void {
  data.value.evaluation = evaluation.evaluation
  data.value.stars = evaluation.stars
}

function clear(): void {
  positionCandidateEvaluation.value = null
  positionCandidate.value = null
  candidate.value = null
  data.value.evaluation = null
  data.value.stars = null
}

function open(pc: PositionCandidate, evaluation?: PositionCandidateEvaluation): void {
  positionCandidate.value = pc

  if (evaluation) {
    positionCandidateEvaluation.value = evaluation
    initForm(evaluation)
  }

  fetchData()

  opened.value = true
}

function close(): void {
  opened.value = false
}

defineExpose<PositionCandidateEvaluateModalExpose>({
  open,
  close,
})
</script>