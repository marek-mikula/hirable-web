<template>
  <CommonModal
      v-if="action && positionCandidate"
      :open="opened"
      :title="$t(`model.positionCandidateAction.types.${action}`)"
      width="2xl"
      @close="close"
      @hidden="clear"
  >
    <template #content>
      <CommonForm id="position-candidate-action-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <!-- candidates card -->
        <div class="p-4 space-y-3 max-h-[300px] overflow-y-auto">

          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-400">
              {{ $t('modal.position.candidate.createAction.candidates') }}
            </p>
            <button v-if="nextPositionCandidates.length > 0" type="button" class="hover:underline mb-2 text-sm text-gray-400" @click="showAllCandidates = !showAllCandidates">
              +{{ nextPositionCandidates.length }}
            </button>
          </div>

          <div v-for="positionCandidate in [positionCandidate, ...(showAllCandidates ? nextPositionCandidates : [])]" :key="positionCandidate.id" class="col-span-1 flex rounded-md shadow-xs">
            <div class="flex w-16 shrink-0 items-center justify-center rounded-l-md bg-gray-200 text-sm font-medium text-gray-900">
              {{ initials(positionCandidate.candidate.fullName) }}
            </div>
            <div class="flex-1 truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
              <div class="flex-1 truncate px-4 py-2 text-sm">
                <NuxtLink :to="`/candidates/${positionCandidate.candidate.id}`" target="_blank" class="font-medium text-gray-900 hover:text-gray-600">
                  {{ positionCandidate.candidate.fullName }}
                </NuxtLink>
                <p class="text-gray-400">
                  <CommonClipboard :value="positionCandidate.candidate.email"/> • <CommonClipboard :value="positionCandidate.candidate.phone"/>
                </p>
              </div>
            </div>
          </div>

        </div>

        <div v-if="loading" class="p-4 flex justify-center">
          <CommonSpinner variant="primary" size="size-8"/>
        </div>

        <!-- action fields -->
        <div v-else class="p-4 grid lg:grid-cols-2 gap-3">

          <template v-if="action === ACTION_TYPE.INTERVIEW">

            <FormInput
                v-model="data.date"
                class="lg:col-span-2"
                name="date"
                type="date"
                :label="$t('model.positionCandidateAction.date')"
                :error="firstError('date')"
                required
            />

            <FormInput
                v-model="data.timeStart"
                name="timeStart"
                type="time"
                :label="$t('model.positionCandidateAction.timeStart')"
                :error="firstError('timeStart')"
                required
            />

            <FormInput
                v-model="data.timeEnd"
                name="timeEnd"
                type="time"
                :label="$t('model.positionCandidateAction.timeEnd')"
                :error="firstError('timeEnd')"
                required
            />

            <FormSelect
                v-model="data.interviewForm"
                name="interviewForm"
                :label="$t('model.positionCandidateAction.interviewForm')"
                :error="firstError('interviewForm')"
                :options="classifiers[CLASSIFIER_TYPE.INTERVIEW_FORM] ?? []"
                required
            />

            <FormSelect
                v-model="data.interviewType"
                name="interviewType"
                :label="$t('model.positionCandidateAction.interviewType')"
                :error="firstError('interviewType')"
                :options="classifiers[CLASSIFIER_TYPE.INTERVIEW_TYPE] ?? []"
                required
            />

            <FormInput
                v-model="data.place"
                class="lg:col-span-2"
                name="place"
                :label="$t('model.positionCandidateAction.place')"
                :error="firstError('place')"
                :maxlength="255"
                :required="data.interviewForm === 'personal'"
            />

          </template>

          <template v-else-if="action === ACTION_TYPE.TEST">

            <FormSelect
                v-model="data.testType"
                class="lg:col-span-2"
                name="testType"
                :label="$t('model.positionCandidateAction.testType')"
                :error="firstError('testType')"
                :options="classifiers[CLASSIFIER_TYPE.TEST_TYPE] ?? []"
                required
            />

            <FormTextarea
                v-model="data.instructions"
                class="lg:col-span-2"
                name="instructions"
                :label="$t('model.positionCandidateAction.instructions')"
                :error="firstError('instructions')"
                :maxlength="500"
                required
            />

            <FormInput
                v-model="data.result"
                class="lg:col-span-2"
                name="result"
                :label="$t('model.positionCandidateAction.result')"
                :error="firstError('result')"
                :maxlength="255"
            />

          </template>

          <template v-else-if="action === ACTION_TYPE.TASK">

            <FormTextarea
                v-model="data.instructions"
                class="lg:col-span-2"
                name="instructions"
                :label="$t('model.positionCandidateAction.instructions')"
                :error="firstError('instructions')"
                :maxlength="500"
                required
            />

            <FormInput
                v-model="data.result"
                class="lg:col-span-2"
                name="result"
                :label="$t('model.positionCandidateAction.result')"
                :error="firstError('result')"
                :maxlength="255"
            />

          </template>

          <template v-if="action === ACTION_TYPE.ASSESSMENT_CENTER">

            <FormInput
                v-model="data.date"
                class="lg:col-span-2"
                name="date"
                type="date"
                :label="$t('model.positionCandidateAction.date')"
                :error="firstError('date')"
                required
            />

            <FormInput
                v-model="data.timeStart"
                name="timeStart"
                type="time"
                :label="$t('model.positionCandidateAction.timeStart')"
                :error="firstError('timeStart')"
                required
            />

            <FormInput
                v-model="data.timeEnd"
                name="timeEnd"
                type="time"
                :label="$t('model.positionCandidateAction.timeEnd')"
                :error="firstError('timeEnd')"
                required
            />

            <FormInput
                v-model="data.place"
                class="lg:col-span-2"
                name="place"
                :label="$t('model.positionCandidateAction.place')"
                :error="firstError('place')"
                :maxlength="255"
                required
            />

            <FormTextarea
                v-model="data.instructions"
                class="lg:col-span-2"
                name="instructions"
                :label="$t('model.positionCandidateAction.instructions')"
                :error="firstError('instructions')"
                :maxlength="500"
                required
            />

            <FormInput
                v-model="data.result"
                class="lg:col-span-2"
                name="result"
                :label="$t('model.positionCandidateAction.result')"
                :error="firstError('result')"
                :maxlength="255"
            />

          </template>

          <template v-if="action === ACTION_TYPE.REJECTION">

            <FormToggle
              v-model="data.rejectedByCandidate"
              class="lg:col-span-2"
              name="rejectedByCandidate"
              :label="$t('model.positionCandidateAction.rejectedByCandidate')"
              :error="firstError('rejectedByCandidate')"
              @change="onRejectedByCandidateChange"
            />

            <FormSelect
                v-if="data.rejectedByCandidate"
                v-model="data.refusalReason"
                class="lg:col-span-2"
                name="refusalReason"
                :label="$t('model.positionCandidateAction.reason')"
                :error="firstError('refusalReason')"
                :options="classifiers[CLASSIFIER_TYPE.REFUSAL_REASON] ?? []"
                required
            />

            <FormSelect
                v-else
                v-model="data.rejectionReason"
                class="lg:col-span-2"
                name="rejectionReason"
                :label="$t('model.positionCandidateAction.reason')"
                :error="firstError('rejectionReason')"
                :options="classifiers[CLASSIFIER_TYPE.REJECTION_REASON] ?? []"
                required
            />

          </template>

          <template v-if="action === ACTION_TYPE.CUSTOM">

            <FormInput
                v-model="data.name"
                class="lg:col-span-2"
                name="name"
                :label="$t('model.positionCandidateAction.name')"
                :error="firstError('name')"
                :maxlength="255"
                required
            />

          </template>

          <FormTextarea
              v-model="data.note"
              class="lg:col-span-2"
              name="note"
              :label="$t('model.common.note')"
              :error="firstError('note')"
              :maxlength="500"
          />

        </div>

        <!-- communication -->
        <div class="p-4 space-y-3">

          <FormToggle
              v-model="communicationEnabled"
              class="justify-between flex-row-reverse"
              name="communication"
              label="Komunikace"
          />

          <template v-if="communicationEnabled">
            <div>
              TODO - komunikace
            </div>
          </template>

        </div>

        <div class="p-4 flex items-center justify-between">
          <CommonButton
              variant="secondary"
              :label="$t('common.action.cancel')"
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
import type {FormHandler} from "~/types/components/common/form.types";
import type {ActionModalExpose} from "~/types/components/position/candidate/actionModal.types";
import type {PositionCandidate, PositionCandidateAction, PositionProcessStep} from "~/repositories/resources";
import type {ClassifiersMap} from "~/repositories/classifier/responses";
import type {ActionData} from "~/repositories/positionCandidateAction/inputs";
import {ACTION_TYPE, CLASSIFIER_TYPE, PROCESS_STEP} from "~/types/enums";

const emit = defineEmits<{
  (e: 'create', actions: PositionCandidateAction[]): void
}>()

const api = useApi()
const moment = useMoment()

const loading = ref<boolean>(false)
const opened = ref<boolean>(false)
const action = ref<ACTION_TYPE|null>(null)
const positionCandidate = ref<PositionCandidate|null>(null)
const nextPositionCandidates = ref<PositionCandidate[]>([])
const positionProcessStep = ref<PositionProcessStep|null>(null) // step in which candidates are or were moved to
const classifiers = ref<ClassifiersMap>({})
const communicationEnabled = ref<boolean>(false)
const showAllCandidates = ref<boolean>(false)

const data = ref<ActionData>({
  type: ACTION_TYPE.INTERVIEW,
  date: null,
  timeStart: null,
  timeEnd: null,
  note: null,
  place: null,
  instructions: null,
  result: null,
  name: null,
  interviewForm: null,
  interviewType: null,
  rejectedByCandidate: null,
  rejectionReason: null,
  refusalReason: null,
  testType: null,
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.positionCandidateAction.store(
        positionCandidate.value!.positionId,
        positionCandidate.value!.id,
        data.value
    )

    emit('create', [response._data!.data.positionCandidateAction])

    close()
  }
}

function getClassifiersByAction(actionType: ACTION_TYPE): CLASSIFIER_TYPE[] {
  if (actionType === ACTION_TYPE.INTERVIEW) {
    return [
        CLASSIFIER_TYPE.INTERVIEW_TYPE,
        CLASSIFIER_TYPE.INTERVIEW_FORM,
    ]
  } else if (actionType === ACTION_TYPE.TEST) {
    return [
      CLASSIFIER_TYPE.TEST_TYPE,
      CLASSIFIER_TYPE.INTERVIEW_FORM,
    ]
  } else if (actionType === ACTION_TYPE.REJECTION) {
    return [
      CLASSIFIER_TYPE.REFUSAL_REASON,
      CLASSIFIER_TYPE.REJECTION_REASON,
    ]
  }

  return []
}

async function loadClassifiers(actionType: ACTION_TYPE): Promise<void> {
  const neededClassifiers = getClassifiersByAction(actionType)

  if (neededClassifiers.length === 0) {
    return
  }

  loading.value = true

  const result = await handle(() => api.classifier.index(neededClassifiers).then(res => res._data!.data.classifiers))

  loading.value = false

  if (!result.success) {
    return
  }

  // merge in loaded classifiers
  classifiers.value = result.result
}

function prepareForm(actionType: ACTION_TYPE, step: PositionProcessStep): void {
  data.value.type = actionType

  if (actionType === ACTION_TYPE.INTERVIEW && step.step === PROCESS_STEP.SCREENING) {
    data.value.date = moment().format('YYYY-MM-DD')
    data.value.timeStart = moment().set({seconds: 0}).format('HH:mm')
    data.value.timeEnd = moment().set({seconds: 0}).add(30, 'm').format('HH:mm')
    data.value.interviewForm = 'phone'
    data.value.interviewType = 'screening_interview'
  } else if (actionType === ACTION_TYPE.COMMUNICATION) {
    communicationEnabled.value = true
  } else if (actionType === ACTION_TYPE.REJECTION) {
    data.value.rejectedByCandidate = false
  }
}

async function init(actionType: ACTION_TYPE, step: PositionProcessStep): Promise<void> {
  await loadClassifiers(actionType)
  prepareForm(actionType, step)
}

function open(actionType: ACTION_TYPE, positionCandidates: PositionCandidate[], step: PositionProcessStep): void {
  if (positionCandidates.length === 0) {
    throw new Error('Cannot open Action model with no candidates.')
  }

  positionProcessStep.value = step
  positionCandidate.value = positionCandidates[0]
  nextPositionCandidates.value = positionCandidates.slice(1)
  action.value = actionType
  opened.value = true

  init(actionType, step)
}

function close(): void {
  opened.value = false
}

function clear(): void {
  action.value = null
  nextPositionCandidates.value = []
  positionCandidate.value = null
  positionProcessStep.value = null
  classifiers.value = {}
  communicationEnabled.value = false
  showAllCandidates.value = false

  data.value.date = null
  data.value.timeStart = null
  data.value.timeEnd = null
  data.value.note = null
  data.value.place = null
  data.value.instructions = null
  data.value.result = null
  data.value.name = null
  data.value.interviewForm = null
  data.value.interviewType = null
  data.value.rejectedByCandidate = null
  data.value.rejectionReason = null
  data.value.refusalReason = null
  data.value.testType = null
}

function onRejectedByCandidateChange(): void {
  data.value.rejectionReason = null
  data.value.refusalReason = null
}

defineExpose<ActionModalExpose>({
  open,
  close,
})
</script>