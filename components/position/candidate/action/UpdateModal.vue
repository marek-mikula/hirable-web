<template>
  <CommonModal
      :open="opened"
      :title="action ? $t(`model.positionCandidateAction.types.${action.type}`) : ''"
      width="2xl"
      @close="close"
      @hidden="clear"
  >
    <template #content>

      <!-- loading spinner -->
      <div v-if="loading" class="p-4 flex justify-center">
        <CommonSpinner variant="primary" size="size-8"/>
      </div>

      <CommonForm v-else-if="action" id="position-candidate-action-update-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <!-- action fields -->
        <div class="p-4 grid lg:grid-cols-2 gap-3">

          <template v-if="action.type === ACTION_TYPE.INTERVIEW">

            <FormInput
                v-model="data.date"
                class="lg:col-span-2"
                name="date"
                type="date"
                :label="$t('model.positionCandidateAction.date')"
                :error="firstError('date')"
                :disabled="isFormDisabled"
                required
            />

            <FormInput
                v-model="data.timeStart"
                name="timeStart"
                type="time"
                :label="$t('model.positionCandidateAction.timeStart')"
                :error="firstError('timeStart')"
                :disabled="isFormDisabled"
                required
            />

            <FormInput
                v-model="data.timeEnd"
                name="timeEnd"
                type="time"
                :label="$t('model.positionCandidateAction.timeEnd')"
                :error="firstError('timeEnd')"
                :disabled="isFormDisabled"
                required
            />

            <FormSelect
                v-model="data.interviewForm"
                name="interviewForm"
                :label="$t('model.positionCandidateAction.interviewForm')"
                :error="firstError('interviewForm')"
                :options="classifiers[CLASSIFIER_TYPE.INTERVIEW_FORM] ?? []"
                :disabled="isFormDisabled"
                required
                @change="onInterviewFormChanged"
            />

            <FormSelect
                v-model="data.interviewType"
                name="interviewType"
                :label="$t('model.positionCandidateAction.interviewType')"
                :error="firstError('interviewType')"
                :options="classifiers[CLASSIFIER_TYPE.INTERVIEW_TYPE] ?? []"
                :disabled="isFormDisabled"
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
                :disabled="isFormDisabled"
                required
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
                :disabled="isFormDisabled"
            />

            <FormInput
                v-model="data.timeEnd"
                name="timeEnd"
                type="time"
                :label="$t('model.positionCandidateAction.timeEnd')"
                :error="firstError('timeEnd')"
                :disabled="isFormDisabled"
            />

            <FormSelect
                v-model="data.taskType"
                class="lg:col-span-2"
                name="taskType"
                :label="$t('model.positionCandidateAction.taskType')"
                :error="firstError('taskType')"
                :options="classifiers[CLASSIFIER_TYPE.TASK_TYPE] ?? []"
                :disabled="isFormDisabled"
                required
                hide-search
            />

            <FormTextarea
                v-model="data.evaluation"
                class="lg:col-span-2"
                name="evaluation"
                :label="$t('model.positionCandidateAction.evaluation')"
                :error="firstError('evaluation')"
                :maxlength="500"
                :disabled="isFormDisabled"
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
                :disabled="isFormDisabled"
                required
            />

            <FormInput
                v-model="data.timeStart"
                name="timeStart"
                type="time"
                :label="$t('model.positionCandidateAction.timeStart')"
                :error="firstError('timeStart')"
                :disabled="isFormDisabled"
                required
            />

            <FormInput
                v-model="data.timeEnd"
                name="timeEnd"
                type="time"
                :label="$t('model.positionCandidateAction.timeEnd')"
                :error="firstError('timeEnd')"
                :disabled="isFormDisabled"
                required
            />

            <FormInput
                v-model="data.place"
                class="lg:col-span-2"
                name="place"
                :label="$t('model.positionCandidateAction.place')"
                :error="firstError('place')"
                :maxlength="255"
                :disabled="isFormDisabled"
                required
            />

            <FormTextarea
                v-model="data.evaluation"
                class="lg:col-span-2"
                name="evaluation"
                :label="$t('model.positionCandidateAction.evaluation')"
                :error="firstError('evaluation')"
                :maxlength="500"
                :disabled="isFormDisabled"
            />

          </template>

          <template v-else-if="action.type === ACTION_TYPE.REJECTION">

            <FormToggle
                v-model="data.rejectedByCandidate"
                class="lg:col-span-2"
                name="rejectedByCandidate"
                :label="$t('model.positionCandidateAction.rejectedByCandidate')"
                :error="firstError('rejectedByCandidate')"
                :disabled="isFormDisabled"
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
                :disabled="isFormDisabled"
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
                :disabled="isFormDisabled"
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
                :disabled="isFormDisabled"
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
                :disabled="isFormDisabled"
                required
                hide-search
            />

            <FormInput
                v-model="data.offerJobTitle"
                name="offerJobTitle"
                :label="$t('model.positionCandidateAction.offerJobTitle')"
                :error="firstError('offerJobTitle')"
                :maxlength="255"
                :disabled="isFormDisabled"
                required
            />

            <FormInput
                v-model="data.offerCompany"
                name="offerCompany"
                :label="$t('model.positionCandidateAction.offerCompany')"
                :error="firstError('offerCompany')"
                :maxlength="255"
                :disabled="isFormDisabled"
                required
            />

            <FormMultiSelect
                v-model="data.offerEmploymentForms"
                name="offerEmploymentForms"
                class="lg:col-span-2"
                :label="$t('model.positionCandidateAction.offerEmploymentForms')"
                :error="firstError('offerEmploymentForms', true)"
                :options="classifiers[CLASSIFIER_TYPE.EMPLOYMENT_FORM] ?? []"
                :disabled="isFormDisabled"
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
                :disabled="isFormDisabled"
                required
            />

            <FormInput
                v-model="data.offerSalary"
                name="offerSalary"
                type="number"
                :label="$t('model.positionCandidateAction.offerSalary')"
                :error="firstError('offerSalary')"
                :min="0"
                :disabled="isFormDisabled"
                required
            />

            <FormSelect
                v-model="data.offerSalaryCurrency"
                name="offerSalaryCurrency"
                :label="$t('model.positionCandidateAction.offerSalaryCurrency')"
                :error="firstError('offerSalaryCurrency')"
                :options="classifiers[CLASSIFIER_TYPE.CURRENCY] ?? []"
                :disabled="isFormDisabled"
                required
                hide-search
            />

            <FormSelect
                v-model="data.offerSalaryFrequency"
                name="offerSalaryFrequency"
                :label="$t('model.positionCandidateAction.offerSalaryFrequency')"
                :error="firstError('offerSalaryFrequency')"
                :options="classifiers[CLASSIFIER_TYPE.SALARY_FREQUENCY] ?? []"
                :disabled="isFormDisabled"
                required
                hide-search
            />

            <FormSelect
                v-model="data.offerWorkload"
                name="offerWorkload"
                :label="$t('model.positionCandidateAction.offerWorkload')"
                :error="firstError('offerWorkload')"
                :options="classifiers[CLASSIFIER_TYPE.WORKLOAD] ?? []"
                :disabled="isFormDisabled"
                required
                hide-search
            />

            <FormSelect
                v-model="data.offerEmploymentRelationship"
                name="offerEmploymentRelationship"
                :label="$t('model.positionCandidateAction.offerEmploymentRelationship')"
                :error="firstError('offerEmploymentRelationship')"
                :options="classifiers[CLASSIFIER_TYPE.EMPLOYMENT_RELATIONSHIP] ?? []"
                :disabled="isFormDisabled"
                required
                hide-search
            />

            <FormInput
                v-model="data.offerStartDate"
                name="offerStartDate"
                type="date"
                :label="$t('model.positionCandidateAction.offerStartDate')"
                :error="firstError('offerStartDate')"
                :disabled="isFormDisabled"
                required
            />

            <FormSelect
                v-model="data.offerEmploymentDuration"
                name="offerEmploymentDuration"
                :label="$t('model.positionCandidateAction.offerEmploymentDuration')"
                :error="firstError('offerEmploymentDuration')"
                :options="classifiers[CLASSIFIER_TYPE.EMPLOYMENT_DURATION] ?? []"
                :disabled="isFormDisabled"
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
                :disabled="isFormDisabled"
                required
            />

            <FormInput
                v-model="data.offerTrialPeriod"
                name="offerTrialPeriod"
                type="number"
                :label="$t('model.positionCandidateAction.offerTrialPeriod')"
                :error="firstError('offerTrialPeriod')"
                :min="0"
                :disabled="isFormDisabled"
                required
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
                :disabled="isFormDisabled"
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
              :disabled="isFormDisabled"
          />

        </div>

        <div v-if="policy.positionCandidateAction.update(action, positionCandidate, position)" class="p-4 flex items-center justify-between space-x-2">
          <CommonButton
              variant="secondary"
              :label="$t('common.action.close')"
              @click="close"
          />
          <div class="flex items-center space-x-2">
            <CommonButton
                variant="danger"
                :label="$t('common.action.delete')"
                :loading="isLoading"
                @click="deleteAction"
            />
            <CommonButton
                type="submit"
                variant="primary"
                :label="$t('common.action.save')"
                :loading="isLoading"
            />
          </div>
        </div>

      </CommonForm>

    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import _ from 'lodash'
import type {
  PositionCandidate,
  PositionShow,
  PositionCandidateAction
} from "~/repositories/resources";
import type {PositionCandidateActionUpdateModalExpose} from "~/types/components/position/candidate/action/showModal.types";
import type {ClassifiersMap} from "~/repositories/classifier/responses";
import type {ActionUpdateData} from "~/repositories/positionCandidateAction/inputs";
import type {FormHandler} from "~/types/components/common/form.types";
import {ACTION_TYPE, CLASSIFIER_TYPE} from "~/types/enums";
import {getClassifiersForAction} from "~/functions/action";
import {getOfferStateOptions} from "~/functions/select";

const props = defineProps<{
  position: PositionShow
  positionCandidate: PositionCandidate
}>()

const emit = defineEmits<{
  (e: 'update' | 'delete', positionCandidateAction: PositionCandidateAction): void,
}>()

const {t} = useI18n()
const modalConfirm = useModalConfirm()
const policy = usePolicy()
const toaster = useToaster()
const api = useApi()
const moment = useMoment()

const action = ref<PositionCandidateAction|null>(null)
const loading = ref<boolean>(false)
const opened = ref<boolean>(false)

const classifiers = ref<ClassifiersMap>({})

const data = ref<ActionUpdateData>({
  date: null,
  timeStart: null,
  timeEnd: null,
  place: null,
  interviewForm: null,
  interviewType: null,
  taskType: null,
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
  realStartDate: null,
  note: null,
})

const isFormDisabled = computed<boolean>(() => {
  return !!action.value && !policy.positionCandidateAction.update(
      action.value!,
      props.positionCandidate,
      props.position
  )
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
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

async function loadData(positionCandidateActionId: number): Promise<void> {
  loading.value = true

  const result = await handle(async () => {
    const positionCandidateAction = await api.positionCandidateAction.show(
        props.position.id,
        props.positionCandidate.id,
        positionCandidateActionId
    ).then(res => res._data!.data.positionCandidateAction)

    const neededClassifiers = getClassifiersForAction(positionCandidateAction.type)

    let classifiers = {}

    if (neededClassifiers.length > 0) {
      classifiers = await api.classifier.index(neededClassifiers).then(res => res._data!.data.classifiers)
    }

    return { positionCandidateAction, classifiers }
  })

  loading.value = false

  if (!result.success) {
    return
  }

  action.value = result.result.positionCandidateAction
  classifiers.value = result.result.classifiers

  prepareForm(result.result.positionCandidateAction)
}

function prepareForm(action: PositionCandidateAction): void {
  if (action.type === ACTION_TYPE.INTERVIEW) {
    data.value.date = action.date ? moment(action.date).format('YYYY-MM-DD') : null
    data.value.timeStart = action.timeStart ? moment(action.timeStart).format('HH:mm') : null
    data.value.timeEnd = action.timeEnd ? moment(action.timeEnd).format('HH:mm') : null
    data.value.interviewForm = action.interviewForm?.value ?? null
    data.value.interviewType = action.interviewType?.value ?? null
    data.value.place = action.place
  } else if (action.type === ACTION_TYPE.TASK) {
    data.value.date = action.date ? moment(action.date).format('YYYY-MM-DD') : null
    data.value.timeEnd = action.timeEnd ? moment(action.timeEnd).format('HH:mm') : null
    data.value.taskType = action.taskType ? action.taskType.value : null
    data.value.evaluation = action.evaluation
  } else if (action.type === ACTION_TYPE.ASSESSMENT_CENTER) {
    data.value.date = action.date ? moment(action.date).format('YYYY-MM-DD') : null
    data.value.timeStart = action.timeStart ? moment(action.timeStart).format('HH:mm') : null
    data.value.timeEnd = action.timeEnd ? moment(action.timeEnd).format('HH:mm') : null
    data.value.place = action.place
    data.value.evaluation = action.evaluation
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

function open(positionCandidateActionId: number): void {
  opened.value = true
  loadData(positionCandidateActionId)
}

function close(): void {
  opened.value = false
}

function clear(): void {
  action.value = null
  classifiers.value = {}

  data.value.date = null
  data.value.timeStart = null
  data.value.timeEnd = null
  data.value.place = null
  data.value.interviewForm = null
  data.value.interviewType = null
  data.value.taskType = null
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
  data.value.realStartDate = null
  data.value.note = null
}

async function deleteAction(): Promise<void> {
  const confirmed = await modalConfirm.showConfirmModalPromise({
    title: t('modal.position.candidate.action.delete.title'),
    text: t('modal.position.candidate.action.delete.text'),
    manual: true,
  })

  if (!confirmed) {
    return
  }

  modalConfirm.setLoading(true)

  const result = await handle(() => api.positionCandidateAction.delete(
      props.position.id,
      props.positionCandidate.id,
      action.value!.id,
  ))

  modalConfirm.setLoading(false)
  modalConfirm.hideConfirmModal()

  if (!result.success) {
    return
  }

  await toaster.success({
    title: 'toast.position.candidate.action.delete',
  })

  emit('delete', action.value!)
}

defineExpose<PositionCandidateActionUpdateModalExpose>({
  open,
  close,
})
</script>
