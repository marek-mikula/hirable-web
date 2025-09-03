<template>
  <LazyCommonModal
      v-if="action"
      :open="opened"
      :title="$t(`model.positionCandidateAction.types.${action.type}`)"
      width="2xl"
      @close="close"
      @hidden="clear"
  >
    <template #content>
      <CommonForm id="position-candidate-action-update-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div v-if="loading" class="p-4 flex justify-center">
          <CommonSpinner variant="primary" size="size-8"/>
        </div>

        <!-- action fields -->
        <div v-else class="p-4 grid lg:grid-cols-2 gap-3">

          <template v-if="action.type === ACTION_TYPE.INTERVIEW">

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

            <FormSelect
                v-model="data.interviewResult"
                name="interviewResult"
                class="lg:col-span-2"
                :label="$t('model.positionCandidateAction.interviewResult')"
                :error="firstError('interviewResult')"
                :options="getInterviewResultOptions()"
                hide-search
            />

          </template>

          <template v-else-if="action.type === ACTION_TYPE.TEST">

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

          <template v-else-if="action.type === ACTION_TYPE.TASK">

            <FormInput
                v-model="data.date"
                name="date"
                type="date"
                :label="$t('model.positionCandidateAction.date')"
                :error="firstError('date')"
                :required="data.timeEnd !== null"
            />

            <FormInput
                v-model="data.timeEnd"
                name="timeEnd"
                type="time"
                :label="$t('model.positionCandidateAction.timeEnd')"
                :error="firstError('timeEnd')"
                :required="data.date !== null"
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

          <template v-else-if="action.type === ACTION_TYPE.ASSESSMENT_CENTER">

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

            <FormSelect
                v-model="data.assessmentCenterResult"
                name="assessmentCenterResult"
                class="lg:col-span-2"
                :label="$t('model.positionCandidateAction.assessmentCenterResult')"
                :error="firstError('assessmentCenterResult')"
                :options="getAssessmentCenterResultOptions()"
                hide-search
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

          <template v-else-if="action.type === ACTION_TYPE.REJECTION">

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

          <template v-else-if="action.type === ACTION_TYPE.CUSTOM">

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

          <template v-else-if="action.type === ACTION_TYPE.OFFER">

            <FormSelect
                v-model="data.offerState"
                name="offerState"
                class="lg:col-span-2"
                :label="$t('model.positionCandidateAction.offerState')"
                :error="firstError('offerState')"
                :options="getOfferStateOptions()"
                required
                hide-search
            />

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

          <template v-else-if="action.type === ACTION_TYPE.START_OF_WORK">

            <FormInput
                v-model="data.realStartDate"
                class="lg:col-span-2"
                type="date"
                name="realStartDate"
                :label="$t('model.positionCandidateAction.realStartDate')"
                :error="firstError('realStartDate')"
                required
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

        <div class="p-4 flex items-center justify-between space-x-2">
          <CommonButton
              variant="secondary"
              :label="$t('common.action.close')"
              @click="close"
          />
          <div class="flex items-center space-x-2">
            <CommonButton
                v-if="[ACTION_STATE.ACTIVE, ACTION_STATE.FINISHED].includes(action.state)"
                type="submit"
                variant="danger"
                name="operation"
                value="cancel"
                :label="$t('common.action.cancel')"
                :loading="isLoading"
            />
            <CommonButton
                v-if="[ACTION_STATE.ACTIVE, ACTION_STATE.CANCELED].includes(action.state)"
                type="submit"
                variant="success"
                name="operation"
                value="finish"
                :label="$t('common.action.finish')"
                :loading="isLoading"
            />
            <CommonButton
                type="submit"
                variant="primary"
                name="operation"
                value="save"
                :label="$t('common.action.save')"
                :loading="isLoading"
            />
          </div>
        </div>

      </CommonForm>
    </template>
  </LazyCommonModal>
</template>

<script setup lang="ts">
import _ from 'lodash'
import type {PositionCandidateAction, PositionShow} from "~/repositories/resources";
import type {ActionShowModalExpose} from "~/types/components/position/candidate/action/showModal.types";
import type {ClassifiersMap} from "~/repositories/classifier/responses";
import type {ActionUpdateData} from "~/repositories/positionCandidateAction/inputs";
import type {FormHandler} from "~/types/components/common/form.types";
import {ACTION_OPERATION, ACTION_STATE, ACTION_TYPE, CLASSIFIER_TYPE} from "~/types/enums";
import {getClassifiersForAction} from "~/functions/action";
import {getAssessmentCenterResultOptions, getInterviewResultOptions, getOfferStateOptions} from "~/functions/select";

const props = defineProps<{
  position: PositionShow
}>()

const emit = defineEmits<{
  (e: 'update', positionCandidateAction: PositionCandidateAction): void
}>()

const toaster = useToaster()
const api = useApi()
const moment = useMoment()

const action = ref<PositionCandidateAction|null>(null)
const loading = ref<boolean>(false)
const opened = ref<boolean>(false)

const classifiers = ref<ClassifiersMap>({})

const data = ref<ActionUpdateData>({
  operation: ACTION_OPERATION.SAVE,
  date: null,
  timeStart: null,
  timeEnd: null,
  place: null,
  interviewForm: null,
  interviewType: null,
  interviewResult: null,
  assessmentCenterResult: null,
  testType: null,
  instructions: null,
  evaluation: null,
  rejectedByCandidate: null,
  rejectionReason: null,
  refusalReason: null,
  name: null,
  offerState: null,
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
  realStartDate: null,
  note: null,
})

const handler: FormHandler = {
  async onSubmit(form, event): Promise<void> {
    // set correct operation
    data.value.operation = (event.submitter as HTMLButtonElement).value as ACTION_OPERATION

    const response = await api.positionCandidateAction.update(
        props.position.id,
        action.value!.positionCandidateId,
        action.value!.id,
        data.value
    )

    await toaster.success({title: 'toast.position.candidate.action.update'})

    emit('update', response._data!.data.positionCandidateAction)

    close()
  },
}

async function loadClassifiers({type}: PositionCandidateAction): Promise<void> {
  const neededClassifiers = getClassifiersForAction(type)

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

function prepareForm(action: PositionCandidateAction): void {
  if (action.type === ACTION_TYPE.INTERVIEW) {
    data.value.date = action.date ? moment(action.date).format('YYYY-MM-DD') : null
    data.value.timeStart = action.timeStart ? moment(action.timeStart).format('HH:mm') : null
    data.value.timeEnd = action.timeEnd ? moment(action.timeEnd).format('HH:mm') : null
    data.value.interviewForm = action.interviewForm?.value ?? null
    data.value.interviewType = action.interviewType?.value ?? null
    data.value.place = action.place
    data.value.interviewResult = action.interviewResult
  } else if (action.type === ACTION_TYPE.TEST) {
    data.value.testType = action.testType?.value ?? null
    data.value.instructions = action.instructions
    data.value.evaluation = action.evaluation
  } else if (action.type === ACTION_TYPE.TASK) {
    data.value.date = action.date ? moment(action.date).format('YYYY-MM-DD') : null
    data.value.timeEnd = action.timeEnd ? moment(action.timeEnd).format('HH:mm') : null
    data.value.instructions = action.instructions
    data.value.evaluation = action.evaluation
  } else if (action.type === ACTION_TYPE.ASSESSMENT_CENTER) {
    data.value.date = action.date ? moment(action.date).format('YYYY-MM-DD : null') : null
    data.value.timeStart = action.timeStart ? moment(action.timeStart).format('HH:mm') : null
    data.value.timeEnd = action.timeEnd ? moment(action.timeEnd).format('HH:mm') : null
    data.value.place = action.place
    data.value.instructions = action.instructions
    data.value.evaluation = action.evaluation
    data.value.assessmentCenterResult = action.assessmentCenterResult
  } else if (action.type === ACTION_TYPE.OFFER) {
    data.value.offerState = action.offerState
    data.value.offerJobTitle = action.offerJobTitle
    data.value.offerCompany = action.offerCompany
    data.value.offerEmploymentForms = action.offerEmploymentForms ? _.map(action.offerEmploymentForms, 'value') : []
    data.value.offerPlace = action.offerPlace
    data.value.offerSalary = action.offerSalary
    data.value.offerSalaryCurrency = action.offerSalaryCurrency?.value ?? null
    data.value.offerSalaryFrequency = action.offerSalaryFrequency?.value ?? null
    data.value.offerWorkload = action.offerWorkload?.value ?? null
    data.value.offerEmploymentRelationship = action.offerEmploymentRelationship?.value ?? null
    data.value.offerStartDate = action.offerStartDate ? moment(action.offerStartDate).format('YYYY-MM-DD') : null
    data.value.offerEmploymentDuration = action.offerEmploymentDuration?.value ?? null
    data.value.offerCertainPeriodTo = action.offerCertainPeriodTo ? moment(action.offerCertainPeriodTo).format('YYYY-MM-DD') : null
    data.value.offerTrialPeriod = action.offerTrialPeriod
    data.value.offerCandidateNote = action.offerCandidateNote
  } else if (action.type === ACTION_TYPE.REJECTION) {
    data.value.rejectedByCandidate = action.rejectedByCandidate
    data.value.refusalReason = action.refusalReason?.value ?? null
    data.value.rejectionReason = action.rejectionReason?.value ?? null
  } else if (action.type === ACTION_TYPE.CUSTOM) {
    data.value.name = action.name
  } else if (action.type === ACTION_TYPE.START_OF_WORK) {
    data.value.realStartDate = action.realStartDate ? moment(action.realStartDate).format('YYYY-MM-DD') : null
  }

  data.value.note = action.note
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

function open(positionCandidateAction: PositionCandidateAction): void {
  // prepare the form to be rendered + set default values
  prepareForm(positionCandidateAction)

  // start loading classifiers
  loadClassifiers(positionCandidateAction)

  // set needed refs
  action.value = positionCandidateAction

  // open the modal
  opened.value = true
}

function close(): void {
  opened.value = false
}

function clear(): void {
  action.value = null

  data.value.operation = ACTION_OPERATION.SAVE
  data.value.date = null
  data.value.timeStart = null
  data.value.timeEnd = null
  data.value.place = null
  data.value.interviewForm = null
  data.value.interviewType = null
  data.value.interviewResult = null
  data.value.assessmentCenterResult = null
  data.value.testType = null
  data.value.instructions = null
  data.value.evaluation = null
  data.value.rejectedByCandidate = null
  data.value.rejectionReason = null
  data.value.refusalReason = null
  data.value.name = null
  data.value.offerState = null
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
  data.value.realStartDate = null
  data.value.note = null
}

defineExpose<ActionShowModalExpose>({
  open,
  close,
})
</script>