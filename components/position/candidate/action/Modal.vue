<template>
  <CommonModal
      v-if="data.type && positionCandidate"
      :open="opened"
      :title="$t(`model.positionCandidateAction.types.${data.type}`)"
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

          <template v-if="data.type === ACTION_TYPE.INTERVIEW">

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
                @change="onInterviewFormChanged"
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
                v-if="data.interviewForm === 'personal'"
                v-model="data.place"
                class="lg:col-span-2"
                name="place"
                :label="$t('model.positionCandidateAction.place')"
                :error="firstError('place')"
                :maxlength="255"
                required
            />

            <FormToggle
                v-if="data.interviewType === 'screening'"
                v-model="data.unavailable"
                class="lg:col-span-2"
                name="unavailable"
                :label="$t('model.positionCandidateAction.unavailable')"
                :error="firstError('unavailable')"
            />

            <FormToggle
                v-else
                v-model="data.noShow"
                class="lg:col-span-2"
                name="noShow"
                :label="$t('model.positionCandidateAction.noShow')"
                :error="firstError('noShow')"
            />

          </template>

          <template v-else-if="data.type === ACTION_TYPE.TEST">

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

            <FormTextarea
                v-model="data.evaluation"
                class="lg:col-span-2"
                name="evaluation"
                :label="$t('model.positionCandidateAction.evaluation')"
                :error="firstError('evaluation')"
                :maxlength="500"
            />

          </template>

          <template v-else-if="data.type === ACTION_TYPE.TASK">

            <FormInput
                v-model="data.date"
                name="date"
                type="date"
                :label="$t('model.positionCandidateAction.date')"
                :error="firstError('date')"
            />

            <FormInput
                v-model="data.timeEnd"
                name="timeEnd"
                type="time"
                :label="$t('model.positionCandidateAction.timeEnd')"
                :error="firstError('timeEnd')"
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

            <FormTextarea
                v-model="data.evaluation"
                class="lg:col-span-2"
                name="evaluation"
                :label="$t('model.positionCandidateAction.evaluation')"
                :error="firstError('evaluation')"
                :maxlength="500"
            />

          </template>

          <template v-else-if="data.type === ACTION_TYPE.ASSESSMENT_CENTER">

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

            <FormTextarea
                v-model="data.evaluation"
                class="lg:col-span-2"
                name="evaluation"
                :label="$t('model.positionCandidateAction.evaluation')"
                :error="firstError('evaluation')"
                :maxlength="500"
            />

            <FormToggle
              v-model="data.noShow"
              name="noShow"
              :label="$t('model.positionCandidateAction.noShow')"
              :error="firstError('noShow')"
            />

          </template>

          <template v-else-if="data.type === ACTION_TYPE.REJECTION">

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

          <template v-else-if="data.type === ACTION_TYPE.CUSTOM">

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

          <template v-else-if="data.type === ACTION_TYPE.OFFER">

            <FormInput
                v-model="data.offerJobTitle"
                name="offerJobTitle"
                :label="$t('model.positionCandidateAction.offerJobTitle')"
                :error="firstError('offerJobTitle')"
                :maxlength="255"
                required
            />

            <FormInput
                v-model="data.offerCompany"
                name="offerCompany"
                :label="$t('model.positionCandidateAction.offerCompany')"
                :error="firstError('offerCompany')"
                :maxlength="255"
                required
            />

            <FormMultiSelect
                v-model="data.offerEmploymentForms"
                name="offerEmploymentForms"
                class="lg:col-span-2"
                :label="$t('model.positionCandidateAction.offerEmploymentForms')"
                :error="firstError('offerEmploymentForms', true)"
                :options="classifiers[CLASSIFIER_TYPE.EMPLOYMENT_FORM] ?? []"
                required
                hide-search
                @change="onOfferEmploymentFormsChange"
            />

            <FormInput
                v-if="data.offerEmploymentForms.includes('on_site')"
                v-model="data.offerPlace"
                name="offerPlace"
                class="lg:col-span-2"
                :label="$t('model.positionCandidateAction.offerPlace')"
                :error="firstError('offerPlace')"
                :maxlength="255"
                required
            />

            <FormInput
                v-model="data.offerSalary"
                name="offerSalary"
                type="number"
                :label="$t('model.positionCandidateAction.offerSalary')"
                :error="firstError('offerSalary')"
                :min="0"
                required
            />

            <FormSelect
                v-model="data.offerSalaryCurrency"
                name="offerSalaryCurrency"
                :label="$t('model.positionCandidateAction.offerSalaryCurrency')"
                :error="firstError('offerSalaryCurrency')"
                :options="classifiers[CLASSIFIER_TYPE.CURRENCY] ?? []"
                required
                hide-search
            />

            <FormSelect
                v-model="data.offerSalaryFrequency"
                name="offerSalaryFrequency"
                :label="$t('model.positionCandidateAction.offerSalaryFrequency')"
                :error="firstError('offerSalaryFrequency')"
                :options="classifiers[CLASSIFIER_TYPE.SALARY_FREQUENCY] ?? []"
                required
                hide-search
            />

            <FormSelect
                v-model="data.offerWorkload"
                name="offerWorkload"
                :label="$t('model.positionCandidateAction.offerWorkload')"
                :error="firstError('offerWorkload')"
                :options="classifiers[CLASSIFIER_TYPE.WORKLOAD] ?? []"
                required
                hide-search
            />

            <FormSelect
                v-model="data.offerEmploymentRelationship"
                name="offerEmploymentRelationship"
                :label="$t('model.positionCandidateAction.offerEmploymentRelationship')"
                :error="firstError('offerEmploymentRelationship')"
                :options="classifiers[CLASSIFIER_TYPE.EMPLOYMENT_RELATIONSHIP] ?? []"
                required
                hide-search
            />

            <FormInput
                v-model="data.offerStartDate"
                name="offerStartDate"
                type="date"
                :label="$t('model.positionCandidateAction.offerStartDate')"
                :error="firstError('offerStartDate')"
                required
            />

            <FormSelect
                v-model="data.offerEmploymentDuration"
                name="offerEmploymentDuration"
                :label="$t('model.positionCandidateAction.offerEmploymentDuration')"
                :error="firstError('offerEmploymentDuration')"
                :options="classifiers[CLASSIFIER_TYPE.EMPLOYMENT_DURATION] ?? []"
                required
                hide-search
                @change="onOfferEmploymentDurationChange"
            />

            <FormInput
                v-if="data.offerEmploymentDuration === 'certain'"
                v-model="data.offerCertainPeriodTo"
                name="offerCertainPeriodTo"
                type="date"
                :label="$t('model.positionCandidateAction.offerCertainPeriodTo')"
                :error="firstError('offerCertainPeriodTo')"
                required
            />

            <FormInput
                v-model="data.offerTrialPeriod"
                name="offerTrialPeriod"
                type="number"
                :label="$t('model.positionCandidateAction.offerTrialPeriod')"
                :error="firstError('offerTrialPeriod')"
                :min="0"
                required
            />

            <FormTextarea
                v-model="data.offerCandidateNote"
                class="lg:col-span-2"
                name="offerCandidateNote"
                :label="$t('model.positionCandidateAction.offerCandidateNote')"
                :error="firstError('offerCandidateNote')"
                :maxlength="500"
            />

          </template>

          <FormTextarea
              v-model="data.note"
              class="lg:col-span-2"
              name="note"
              :label="$t('model.positionCandidateAction.note')"
              :error="firstError('note')"
              :maxlength="500"
          />

        </div>

        <!-- communication card -->
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
import type {PositionCandidate, PositionCandidateAction, PositionShow} from "~/repositories/resources";
import type {ClassifiersMap} from "~/repositories/classifier/responses";
import type {ActionData} from "~/repositories/positionCandidateAction/inputs";
import {ACTION_TYPE, CLASSIFIER_TYPE} from "~/types/enums";

const props = defineProps<{
  position: PositionShow
}>()

const emit = defineEmits<{
  (e: 'create', actions: PositionCandidateAction[]): void
}>()

const api = useApi()
const moment = useMoment()
const {user} = useAuth<true>()

const loading = ref<boolean>(false)
const opened = ref<boolean>(false)
const positionCandidate = ref<PositionCandidate|null>(null)
const nextPositionCandidates = ref<PositionCandidate[]>([])
const classifiers = ref<ClassifiersMap>({})
const communicationEnabled = ref<boolean>(false)
const showAllCandidates = ref<boolean>(false)

const data = ref<ActionData>({
  type: null,
  date: null,
  timeStart: null,
  timeEnd: null,
  place: null,
  interviewForm: null,
  interviewType: null,
  unavailable: null,
  noShow: null,
  testType: null,
  instructions: null,
  evaluation: null,
  rejectedByCandidate: null,
  rejectionReason: null,
  refusalReason: null,
  name: null,
  offerJobTitle: null,
  offerCompany: null,
  offerEmploymentForms: null,
  offerPlace: null,
  offerSalary: null,
  offerSalaryCurrency: null,
  offerSalaryFrequency: null,
  offerWorkload: null,
  offerEmploymentRelationship: null,
  offerStartDate: null,
  offerEmploymentDuration: null,
  offerCertainPeriodTo: null,
  offerTrialPeriod: null,
  offerCandidateNote: null,
  note: null,
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
  } else if (actionType === ACTION_TYPE.OFFER) {
    return [
      CLASSIFIER_TYPE.EMPLOYMENT_FORM,
      CLASSIFIER_TYPE.CURRENCY,
      CLASSIFIER_TYPE.SALARY_FREQUENCY,
      CLASSIFIER_TYPE.WORKLOAD,
      CLASSIFIER_TYPE.EMPLOYMENT_RELATIONSHIP,
      CLASSIFIER_TYPE.EMPLOYMENT_DURATION,
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
  if (actionType === ACTION_TYPE.INTERVIEW) {
    data.value.noShow = false
    data.value.unavailable = false
  } else if (actionType === ACTION_TYPE.COMMUNICATION) {
    communicationEnabled.value = true
  } else if (actionType === ACTION_TYPE.REJECTION) {
    data.value.rejectedByCandidate = false
  } else if (actionType === ACTION_TYPE.OFFER) {
    data.value.offerJobTitle = props.position.name
    data.value.offerCompany = user.value.companyName
    data.value.offerEmploymentForms = []
    data.value.offerSalaryCurrency = props.position.salary.currency.value
    data.value.offerSalaryFrequency = props.position.salary.frequency.value
    data.value.offerTrialPeriod = 3
  }

  data.value.type = actionType
}

function open(actionType: ACTION_TYPE, positionCandidates: PositionCandidate[]): void {
  if (positionCandidates.length === 0) {
    throw new Error('Cannot open Action model with no candidates.')
  }

  // prepare the form to be rendered + set default values
  prepareForm(actionType)

  // set needed refs
  positionCandidate.value = positionCandidates[0]
  nextPositionCandidates.value = positionCandidates.slice(1)
  opened.value = true

  loadClassifiers(actionType)
}

function close(): void {
  opened.value = false
}

function clear(): void {
  nextPositionCandidates.value = []
  positionCandidate.value = null
  classifiers.value = {}
  communicationEnabled.value = false
  showAllCandidates.value = false

  data.value.type = null
  data.value.date = null
  data.value.timeStart = null
  data.value.timeEnd = null
  data.value.place = null
  data.value.interviewForm = null
  data.value.interviewType = null
  data.value.unavailable = null
  data.value.noShow = null
  data.value.testType = null
  data.value.instructions = null
  data.value.evaluation = null
  data.value.rejectedByCandidate = null
  data.value.rejectionReason = null
  data.value.refusalReason = null
  data.value.name = null
  data.value.offerJobTitle = null
  data.value.offerCompany = null
  data.value.offerEmploymentForms = null
  data.value.offerPlace = null
  data.value.offerSalary = null
  data.value.offerSalaryCurrency = null
  data.value.offerSalaryFrequency = null
  data.value.offerWorkload = null
  data.value.offerEmploymentRelationship = null
  data.value.offerStartDate = null
  data.value.offerEmploymentDuration = null
  data.value.offerCertainPeriodTo = null
  data.value.offerTrialPeriod = null
  data.value.offerCandidateNote = null
  data.value.note = null
}

function onOfferEmploymentFormsChange(): void {
  data.value.offerPlace = null
}

function onOfferEmploymentDurationChange(): void {
  data.value.offerCertainPeriodTo = null
}

function onInterviewFormChanged(): void {
  data.value.place = null
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