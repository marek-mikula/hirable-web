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
      <CommonForm id="position-candidate-action-store-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <!-- candidates card -->
        <div class="p-4 space-y-3 max-h-[300px] overflow-y-auto">

          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-400">
              {{ $t('modal.position.candidate.action.create.candidates') }}
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

          </template>

          <template v-else-if="data.type === ACTION_TYPE.TASK">

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
            />

            <FormSelect
                v-model="data.taskType"
                class="lg:col-span-2"
                name="taskType"
                :label="$t('model.positionCandidateAction.taskType')"
                :error="firstError('taskType')"
                :options="classifiers[CLASSIFIER_TYPE.TASK_TYPE] ?? []"
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
                v-model="data.evaluation"
                class="lg:col-span-2"
                name="evaluation"
                :label="$t('model.positionCandidateAction.evaluation')"
                :error="firstError('evaluation')"
                :maxlength="500"
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

          </template>

          <template v-else-if="data.type === ACTION_TYPE.START_OF_WORK">

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
          <CommonButton
              type="submit"
              variant="primary"
              :label="$t('common.action.create')"
              :loading="isLoading"
          />
        </div>

      </CommonForm>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import type {FormHandler} from "~/types/components/common/form.types";
import type {ActionStoreModalExpose} from "~/types/components/position/candidate/action/storeModal.types";
import type {PositionCandidate, PositionCandidateAction, PositionShow} from "~/repositories/resources";
import type {ClassifiersMap} from "~/repositories/classifier/responses";
import type {ActionStoreData} from "~/repositories/positionCandidateAction/inputs";
import {ACTION_TYPE, CLASSIFIER_TYPE, OFFER_STATE, RESPONSE_CODE} from "~/types/enums";
import {getClassifiersForAction} from "~/functions/action";
import {getOfferStateOptions} from "~/functions/select";

const props = defineProps<{
  position: PositionShow
}>()

const emit = defineEmits<{
  (e: 'create', actions: PositionCandidateAction[]): void
}>()

const toaster = useToaster()
const api = useApi()
const moment = useMoment()
const {user} = useAuth<true>()

const loading = ref<boolean>(false)
const opened = ref<boolean>(false)
const positionCandidate = ref<PositionCandidate|null>(null)
const nextPositionCandidates = ref<PositionCandidate[]>([])
const classifiers = ref<ClassifiersMap>({})
const showAllCandidates = ref<boolean>(false)

const data = ref<ActionStoreData>({
  type: null,
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

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.positionCandidateAction.store(
        positionCandidate.value!.positionId,
        positionCandidate.value!.id,
        data.value
    )

    await toaster.success({title: 'toast.position.candidate.action.store'})

    emit('create', [response._data!.data.positionCandidateAction])

    close()
  },
  async onError(response): Promise<boolean> {
    if (response._data!.code === RESPONSE_CODE.ACTION_EXISTS) {
      await toaster.error({title: 'toast.position.candidate.action.actionExists'})
      return true
    }

    if (response._data!.code === RESPONSE_CODE.NOT_SUFFICIENT_STEP) {
      await toaster.error({title: 'toast.position.candidate.action.notSufficientStep'})
      return true
    }

    return false
  }
}

async function loadClassifiers(type: ACTION_TYPE): Promise<void> {
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

function prepareForm(actionType: ACTION_TYPE): void {
  if (actionType === ACTION_TYPE.REJECTION) {
    data.value.rejectedByCandidate = false
  } else if (actionType === ACTION_TYPE.OFFER) {
    data.value.offerState = OFFER_STATE.WAITING
    data.value.offerJobTitle = props.position.name
    data.value.offerCompany = user.value.companyName
    data.value.offerEmploymentForms = []
    data.value.offerSalaryCurrency = props.position.salary.currency.value
    data.value.offerSalaryFrequency = props.position.salary.frequency.value
    data.value.offerTrialPeriod = 3
  } else if (actionType === ACTION_TYPE.START_OF_WORK) {
    data.value.realStartDate = moment().format('YYYY-MM-DD')
  }

  data.value.type = actionType
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

function open(type: ACTION_TYPE, positionCandidates: PositionCandidate[]): void {
  if (positionCandidates.length === 0) {
    throw new Error('Cannot open Action model with no candidates.')
  }

  // prepare the form to be rendered + set default values
  prepareForm(type)

  // start loading classifiers
  loadClassifiers(type)

  // set needed refs
  positionCandidate.value = positionCandidates[0]
  nextPositionCandidates.value = positionCandidates.slice(1)

  // open the modal
  opened.value = true
}

function close(): void {
  opened.value = false
}

function clear(): void {
  nextPositionCandidates.value = []
  positionCandidate.value = null
  classifiers.value = {}
  showAllCandidates.value = false

  data.value.type = null
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

defineExpose<ActionStoreModalExpose>({
  open,
  close,
})
</script>
