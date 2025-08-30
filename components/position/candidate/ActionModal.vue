<template>
  <CommonModal
      v-if="action && candidate"
      :open="opened"
      :title="$t('modal.position.candidate.createAction.title') + ' ' + $t(`model.positionCandidateAction.types.${action}`)"
      :title-icon="BoltIcon"
      width="2xl"
      @close="close"
      @hidden="clear"
  >
    <template #content>
      <CommonForm id="position-candidate-action-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <!-- candidate card -->
        <div class="p-4">
          <div class="col-span-1 flex rounded-md shadow-xs">
            <div class="flex w-16 shrink-0 items-center justify-center rounded-l-md bg-gray-200 text-sm font-medium text-gray-900">
              {{ initials(candidate.fullName) }}
            </div>
            <div class="flex-1 truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
              <div class="flex-1 truncate px-4 py-2 text-sm">
                <NuxtLink :to="`/candidates/${candidate.id}`" target="_blank" class="font-medium text-gray-900 hover:text-gray-600">
                  {{ candidate.fullName }}
                </NuxtLink>
                <p class="text-gray-500">
                  <CommonClipboard :value="candidate.email"/> • <CommonClipboard :value="candidate.phone"/>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="loading" class="p-4 flex justify-center">
          <CommonSpinner variant="primary" size="size-8"/>
        </div>

        <!-- action fields -->
        <div v-else class="p-4 space-y-3 grid lg:grid-cols-2 gap-3">

          <template v-if="action === ACTION_TYPE.INTERVIEW">

            <FormInput
                v-model="data.date"
                class="lg:col-span-2"
                name="date"
                type="date"
                :label="$t('model.positionCandidateAction.date')"
                required
            />

            <FormInput
                v-model="data.timeStart"
                name="timeStart"
                type="time"
                :label="$t('model.positionCandidateAction.timeStart')"
                required
            />

            <FormInput
                v-model="data.timeEnd"
                name="timeEnd"
                type="time"
                :label="$t('model.positionCandidateAction.timeEnd')"
                required
            />

            <FormSelect
                v-model="data.interviewForm"
                name="interviewForm"
                :label="$t('model.positionCandidateAction.interviewForm')"
                :options="classifiers[CLASSIFIER_TYPE.INTERVIEW_FORM] ?? []"
                required
            />

            <FormSelect
                v-model="data.interviewType"
                name="interviewType"
                :label="$t('model.positionCandidateAction.interviewType')"
                :options="classifiers[CLASSIFIER_TYPE.INTERVIEW_TYPE] ?? []"
                required
            />

            <FormInput
                v-model="data.place"
                class="lg:col-span-2"
                name="place"
                :label="$t('model.positionCandidateAction.place')"
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
                :options="classifiers[CLASSIFIER_TYPE.TEST_TYPE] ?? []"
                required
            />

            <FormTextarea
                v-model="data.instructions"
                class="lg:col-span-2"
                name="instructions"
                :label="$t('model.positionCandidateAction.instructions')"
                :maxlength="500"
                required
            />

            <FormInput
                v-model="data.result"
                class="lg:col-span-2"
                name="result"
                :label="$t('model.positionCandidateAction.result')"
                :maxlength="255"
            />

          </template>

          <template v-else-if="action === ACTION_TYPE.TASK">

            <FormTextarea
                v-model="data.instructions"
                class="lg:col-span-2"
                name="instructions"
                :label="$t('model.positionCandidateAction.instructions')"
                :maxlength="500"
                required
            />

            <FormInput
                v-model="data.result"
                class="lg:col-span-2"
                name="result"
                :label="$t('model.positionCandidateAction.result')"
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
                required
            />

            <FormInput
                v-model="data.timeStart"
                name="timeStart"
                type="time"
                :label="$t('model.positionCandidateAction.timeStart')"
                required
            />

            <FormInput
                v-model="data.timeEnd"
                name="timeEnd"
                type="time"
                :label="$t('model.positionCandidateAction.timeEnd')"
                required
            />

            <FormInput
                v-model="data.place"
                class="lg:col-span-2"
                name="place"
                :label="$t('model.positionCandidateAction.place')"
                :maxlength="255"
                required
            />

            <FormTextarea
                v-model="data.instructions"
                class="lg:col-span-2"
                name="instructions"
                :label="$t('model.positionCandidateAction.instructions')"
                :maxlength="500"
                required
            />

            <FormInput
                v-model="data.result"
                class="lg:col-span-2"
                name="result"
                :label="$t('model.positionCandidateAction.result')"
                :maxlength="255"
            />

          </template>

          <template v-if="action === ACTION_TYPE.REJECTION">

            <FormSelect
                v-model="data.rejectionReason"
                class="lg:col-span-2"
                name="rejectionReason"
                :label="$t('model.positionCandidateAction.rejectionReason')"
                :options="classifiers[CLASSIFIER_TYPE.REJECTION_REASON] ?? []"
                required
            />

          </template>

          <template v-if="action === ACTION_TYPE.REFUSAL">

            <FormSelect
                v-model="data.refusalReason"
                class="lg:col-span-2"
                name="refusalReason"
                :label="$t('model.positionCandidateAction.refusalReason')"
                :options="classifiers[CLASSIFIER_TYPE.REFUSAL_REASON] ?? []"
                required
            />

          </template>

          <template v-if="action === ACTION_TYPE.CUSTOM">

            <FormInput
                v-model="data.name"
                class="lg:col-span-2"
                name="name"
                :label="$t('model.positionCandidateAction.name')"
                :maxlength="255"
                required
            />

          </template>

          <FormTextarea
              v-model="data.note"
              class="lg:col-span-2"
              name="note"
              :label="$t('model.common.note')"
              :maxlength="500"
          />

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
import {BoltIcon} from "@heroicons/vue/24/outline";
import type {FormHandler} from "~/types/components/common/form.types";
import type {ActionModalExpose} from "~/types/components/position/candidate/actionModal.types";
import type {Candidate} from "~/repositories/resources";
import type {ClassifiersMap} from "~/repositories/classifier/responses";
import {ACTION_TYPE, CLASSIFIER_TYPE} from "~/types/enums";

const api = useApi()

const loading = ref<boolean>(false)
const opened = ref<boolean>(false)
const action = ref<ACTION_TYPE|null>(null)
const candidate = ref<Candidate|null>(null)
const nextCandidates = ref<Candidate[]>([])
const classifiers = ref<ClassifiersMap>({})

const data = ref<{
  date: string | null
  timeStart: string | null
  timeEnd: string | null
  note: string | null
  place: string | null
  instructions: string | null
  result: string | null
  name: string | null
  interviewForm: string | null
  interviewType: string | null
  rejectionReason: string | null
  refusalReason: string | null
  testType: string | null
}>({
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
  rejectionReason: null,
  refusalReason: null,
  testType: null,
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {

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
  } else if (actionType === ACTION_TYPE.REFUSAL) {
    return [
      CLASSIFIER_TYPE.REFUSAL_REASON,
    ]
  } else if (actionType === ACTION_TYPE.REJECTION) {
    return [
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

function prepareForm(actionType: ACTION_TYPE): void {

}

async function init(actionType: ACTION_TYPE): Promise<void> {
  await loadClassifiers(actionType)
  prepareForm(actionType)
}

function open(actionType: ACTION_TYPE, candidates: Candidate[]): void {
  if (candidates.length === 0) {
    throw new Error('Cannot open Action model with no candidates.')
  }

  candidate.value = candidates[0]
  nextCandidates.value = candidates.slice(1)
  action.value = actionType
  opened.value = true

  init(actionType)
}

function close(): void {
  opened.value = false
}

function clear(): void {
  action.value = null
  nextCandidates.value = []
  candidate.value = null
  classifiers.value = {}
}

defineExpose<ActionModalExpose>({
  open,
  close,
})
</script>