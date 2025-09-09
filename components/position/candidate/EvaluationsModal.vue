<template>
  <CommonModal
      :open="opened"
      :title="$t('model.positionCandidate.evaluations')"
      width="xl"
      @close="close"
      @hidden="clear"
  >
    <template #content>

      <!-- loading spinner -->
      <div v-if="loading" class="p-4 flex justify-center">
        <CommonSpinner variant="primary" size="size-8"/>
      </div>

      <div v-if="positionCandidateEvaluations.length > 0" class="p-3 lg:p-4 space-y-2">

        <div
            v-for="evaluation in positionCandidateEvaluations"
            :key="evaluation.id"
            class="rounded-md border border-gray-300 divide-y divide-gray-200"
        >
          <div class="px-3 py-2 flex items-center space-x-2">
            <div class="flex-1 min-w-0">
              <div class="flex items-center space-x-2">
                <p class="text-sm font-medium">
                  {{ evaluation.user.label }}
                </p>
                <PositionCandidateEvaluationState :state="evaluation.state"/>
              </div>
              <small v-if="evaluation.user.id !== evaluation.creator.id" class="text-xs text-gray-400">
                <span>{{ $t('model.positionCandidateEvaluation.creator') }}</span>:
                <span class="font-medium">{{ evaluation.creator.label }}</span>
              </small>
            </div>
            <div class="flex item-center space-x-2">
              <CommonWrapperButton
                  v-if="policy.positionCandidateEvaluation.update(evaluation, positionCandidate, position)"
                  class="text-sm hover:underline"
                  @click="evaluate(evaluation)"
              >
                <span v-if="evaluation.state === EVALUATION_STATE.WAITING">{{ $t('common.action.evaluate') }}</span>
                <span v-else>{{ $t('common.action.edit') }}</span>
              </CommonWrapperButton>
              <CommonWrapperButton
                  v-if="policy.positionCandidateEvaluation.delete(evaluation, positionCandidate, position)"
                  class="text-sm hover:underline"
                  :disabled="deletingId === evaluation.id"
                  @click="deleteEvaluation(evaluation)"
              >
                <CommonSpinner v-if="deletingId === evaluation.id"/>
                <span v-else>{{ $t('common.action.delete') }}</span>
              </CommonWrapperButton>
            </div>
          </div>
          <div v-if="evaluation.state === EVALUATION_STATE.FILLED" class="p-3 space-y-2">
            <div>
              <FormLabel :label="$t('model.positionCandidateEvaluation.stars')"/>
              <div>
                {{ '⭐'.repeat(evaluation.stars ?? 1) }}
              </div>
            </div>

            <div>
              <FormLabel :label="$t('model.positionCandidateEvaluation.evaluation')"/>
              <div class="bg-gray-50 rounded-md mt-2 p-2 border border-gray-200 text-sm">
                {{ evaluation.evaluation }}
              </div>
            </div>

          </div>
        </div>

      </div>

    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import type {
  Position,
  PositionCandidate,
  PositionCandidateEvaluationShow,
} from "~/repositories/resources";
import type {
  PositionCandidateEvaluationsModalExpose
} from "~/types/components/position/candidate/evaluationsModal.types";
import {EVALUATION_STATE} from "~/types/enums";

const props = defineProps<{
  position: Position
  positionCandidate: PositionCandidate
}>()

const emit = defineEmits<{
  (e: 'evaluate', positionCandidateEvaluation: PositionCandidateEvaluationShow): void
  (e: 'delete', positionCandidateEvaluation: PositionCandidateEvaluationShow): void
}>()

const policy = usePolicy()
const toaster = useToaster()
const api = useApi()

const loading = ref<boolean>(false)
const opened = ref<boolean>(false)
const deletingId = ref<number|null>(null)

const positionCandidateEvaluations = ref<PositionCandidateEvaluationShow[]>([])

async function deleteEvaluation(positionCandidateActionEvaluation: PositionCandidateEvaluationShow): Promise<void> {
  deletingId.value = positionCandidateActionEvaluation.id

  const result = await handle(() => api.positionCandidateEvaluation.deleteEvaluation(
      props.position.id,
      props.positionCandidate.id,
      positionCandidateActionEvaluation.id
  ))

  deletingId.value = null

  if (!result.success) {
    return
  }

  await toaster.success({title: 'toast.position.candidate.evaluation.delete'})

  positionCandidateEvaluations.value = positionCandidateEvaluations.value.filter(item => item.id !== positionCandidateActionEvaluation.id)

  emit('delete', positionCandidateActionEvaluation)
}

async function fetchData(): Promise<void> {
  loading.value = true

  const result = await handle<PositionCandidateEvaluationShow[]>(() => api.positionCandidateEvaluation.index(
      props.position.id,
      props.positionCandidate.candidate.id
  ).then(res => res._data!.data.positionCandidateEvaluations))

  loading.value = false

  if (!result.success) {
    return
  }

  positionCandidateEvaluations.value = result.result
}

function evaluate(positionCandidateActionEvaluation: PositionCandidateEvaluationShow): void {
  close()
  emit('evaluate', positionCandidateActionEvaluation)
}

function clear(): void {
  positionCandidateEvaluations.value = []
}

function open(): void {
  fetchData()
  opened.value = true
}

function close(): void {
  opened.value = false
}

defineExpose<PositionCandidateEvaluationsModalExpose>({
  open,
  close,
})
</script>