<template>
  <CommonForm id="position-form" v-slot="{ isLoading, firstError }" class="space-y-8" :handler="handler">

    <div class="grid grid-cols-6 lg:gap-4 gap-3">

      <h2 class="col-span-6 text-base font-semibold">
        {{ $t('page.positions.create.sections.basicInfo') }}
      </h2>

      <FormInput
          v-model="data.name"
          class="col-span-6"
          name="name"
          :label="$t('model.position.name')"
          :maxlength="255"
          :error="firstError('name')"
          :disabled="isFormDisabled"
          required
      />

      <FormSuggestInput
          v-model="data.department"
          class="col-span-6 md:col-span-3"
          name="department"
          :suggester="createPositionDepartmentsSuggester()"
          :label="$t('model.position.department')"
          :hint="$t('form.hint.common.suggest')"
          :error="firstError('department')"
          :disabled="isFormDisabled"
          :maxlength="255"
      />

      <FormSelect
          v-model="data.field"
          class="col-span-6 md:col-span-3"
          name="field"
          :options="classifiers[CLASSIFIER_TYPE.FIELD] ?? []"
          :label="$t('model.position.field')"
          :error="firstError('field')"
          :disabled="isFormDisabled"
      />

      <FormMultiSelect
          v-model="data.workloads"
          class="col-span-6 md:col-span-3"
          name="workloads"
          :label="$t('model.position.workload')"
          :options="classifiers[CLASSIFIER_TYPE.WORKLOAD] ?? []"
          :error="firstError('workloads', true)"
          :disabled="isFormDisabled"
          required
          hide-search
      />

      <FormMultiSelect
          v-model="data.employmentRelationships"
          class="col-span-6 md:col-span-3"
          name="employmentRelationships"
          :label="$t('model.position.employmentRelationship')"
          :options="classifiers[CLASSIFIER_TYPE.EMPLOYMENT_RELATIONSHIP] ?? []"
          :error="firstError('employmentRelationships', true)"
          :disabled="isFormDisabled"
          required
          hide-search
      />

      <FormMultiSelect
          v-model="data.employmentForms"
          class="col-span-6 md:col-span-3"
          name="employmentForms"
          :label="$t('model.position.employmentForm')"
          :options="classifiers[CLASSIFIER_TYPE.EMPLOYMENT_FORM] ?? []"
          :error="firstError('employmentForms', true)"
          :disabled="isFormDisabled"
          required
          hide-search
      />

      <FormInput
          v-model="data.jobSeatsNum"
          class="col-span-6 md:col-span-3"
          name="jobSeatsNum"
          type="number"
          :label="$t('model.position.jobSeatsNum')"
          :error="firstError('jobSeatsNum')"
          :disabled="isFormDisabled"
          :max="1000"
          :min="1"
          required
      />

      <FormTextarea
          v-model="data.description"
          class="col-span-6"
          name="description"
          :label="$t('model.position.description')"
          :placeholder="$t('page.positions.create.placeholder.description')"
          :hint="$t('form.hint.position.description')"
          :error="firstError('description')"
          :disabled="isFormDisabled"
          :maxlength="2000"
          required
      />

      <FormCheckbox
          v-model="data.isTechnical"
          class="col-span-6 md:col-span-3"
          name="isTechnical"
          :label="$t('model.position.isTechnical')"
          :hint="$t('form.hint.position.isTechnical')"
          :error="firstError('isTechnical')"
          :disabled="isFormDisabled"
          @change="onIsTechnicalChange"
      />

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 lg:gap-4 gap-3">

      <div class="col-span-6">
        <h2 class="text-base font-semibold">
          {{ $t('page.positions.create.sections.roles.title') }}
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          {{ $t('page.positions.create.sections.roles.subtitle') }}
        </p>
      </div>

      <FormSearchMultiSelect
          v-model="data.hiringManagers"
          class="col-span-6"
          name="hiringManagers"
          ref="hiringManagersSelect"
          :options="hiringManagersDefaultOptions"
          :label="$t('model.position.hiringManagers')"
          :error="firstError('hiringManagers', true)"
          :disabled="isFormDisabled"
          :searcher="createCompanyUsersSearcher(true)"
      />

      <FormSearchMultiSelect
          v-model="data.approvers"
          class="col-span-6 md:col-span-3"
          name="approvers"
          ref="approversSelect"
          :options="approversDefaultOptions"
          :label="$t('model.position.approvers')"
          :error="firstError('approvers', true)"
          :disabled="isFormDisabled"
          :searcher="createCompanyUsersSearcher(true)"
      />

      <FormSearchMultiSelect
          v-model="data.externalApprovers"
          class="col-span-6 md:col-span-3"
          name="externalApprovers"
          ref="externalApproversSelect"
          :options="externalApproversDefaultOptions"
          :label="$t('model.position.externalApprovers')"
          :hint="$t('form.hint.position.externalApprovers')"
          :error="firstError('externalApprovers', true)"
          :disabled="isFormDisabled"
          :searcher="createCompanyContactsSearcher()"
      >
        <template #after>
          <CommonButton
              class="shrink-0 whitespace-nowrap"
              :label="$t('modal.company.storeContact.title')"
              :disabled="isFormDisabled"
              variant="secondary"
              @click="contactModalOpened = true"
          />
        </template>
      </FormSearchMultiSelect>

      <FormInput
        v-model="data.approveUntil"
        type="date"
        class="col-span-6 md:col-span-3"
        name="approveUntil"
        :label="$t('model.position.approveUntil')"
        :hint="$t('form.hint.position.approveUntil')"
        :error="firstError('approveUntil', true)"
        :disabled="isFormDisabled || !isApproveUntilRequired"
        :required="isApproveUntilRequired"
        :min="useMoment()().add(1, 'd').format('YYYY-MM-DD')"
      />

      <CommonTable
          v-if="position && position.approvals.length > 0"
          :columns="[
              {key: 'name', label: $t('model.common.name')},
              {key: 'role', label: $t('model.common.role')},
              {key: 'state', label: $t('model.common.state')},
              {key: 'note', label: $t('model.common.note')},
              {key: 'decidedAt', label: $t('model.positionApproval.decidedAt')},
              {key: 'notifiedAt', label: $t('model.positionApproval.notifiedAt')},
          ]"
          :items="position.approvals"
          class="col-span-6"
      >

        <template #noteSlot="{item}">
          <ChatBubbleBottomCenterIcon v-if="item.note" v-tooltip="{ content: item.note }" class="size-4"/>
        </template>

        <template #roleSlot="{item}">
          {{ $t(`model.position.roles.${item.role}`) }}
        </template>

        <template #nameSlot="{item}">
          {{ item.model.fullName }}
        </template>

        <template #stateSlot="{item}">
          <PositionApprovalState :state="item.state" without-tooltip/>
        </template>

        <template #decidedAtSlot="{item}">
          {{ item.decidedAt ? $formatter.datetime(item.decidedAt) : '-' }}
        </template>

        <template #notifiedAtSlot="{item}">
          {{ item.notifiedAt ? $formatter.datetime(item.notifiedAt) : '-' }}
        </template>

      </CommonTable>

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <template v-if="shouldShowAddress">

      <div class="grid grid-cols-6 lg:gap-4 gap-3">

        <h2 class="col-span-6 text-base font-semibold">
          {{ $t('page.positions.create.sections.place') }}
        </h2>

        <FormInput
            v-model="data.address"
            class="col-span-6 md:col-span-3"
            name="address"
            :label="$t('model.position.address')"
            :error="firstError('address')"
            :disabled="isFormDisabled"
            :maxlength="255"
        />

      </div>

      <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    </template>

    <div class="grid grid-cols-6 lg:gap-4 gap-3">

      <h2 class="col-span-6 text-base font-semibold">
        {{ $t('page.positions.create.sections.offer') }}
      </h2>

      <FormCheckbox
          v-model="salarySpan"
          class="col-span-6"
          name="salarySpan"
          :label="$t('model.position.salarySpan')"
          :disabled="isFormDisabled"
          @change="onSalarySpanChange"
      />

      <FormInput
          v-if="salarySpan"
          v-model="data.salaryFrom"
          type="number"
          class="col-span-6 md:col-span-3"
          name="salaryFrom"
          :label="$t('model.position.salaryFrom')"
          :error="firstError('salaryFrom')"
          :disabled="isFormDisabled"
          :min="0"
          :step="1"
          required
      />

      <FormInput
          v-if="salarySpan"
          v-model="data.salaryTo"
          type="number"
          class="col-span-6 md:col-span-3"
          name="salaryTo"
          :label="$t('model.position.salaryTo')"
          :min="data.salaryFrom"
          :step="1"
          :error="firstError('salaryTo')"
          :disabled="isFormDisabled"
          required
      />

      <FormInput
          v-if="!salarySpan"
          v-model="data.salary"
          type="number"
          class="col-span-6"
          name="salary"
          :label="$t('model.position.salary')"
          :min="0"
          :step="1"
          :error="firstError('salary')"
          :disabled="isFormDisabled"
          required
      />

      <FormSelect
          v-model="data.salaryType"
          class="col-span-6 md:col-span-3"
          name="salaryType"
          :label="$t('model.position.salaryType')"
          :options="classifiers[CLASSIFIER_TYPE.SALARY_TYPE] ?? []"
          :error="firstError('salaryType')"
          :disabled="isFormDisabled"
          required
          hide-search
          disable-empty
      />

      <FormSelect
          v-model="data.salaryFrequency"
          class="col-span-6 md:col-span-3"
          name="salaryFrequency"
          :label="$t('model.position.salaryFrequency')"
          :options="classifiers[CLASSIFIER_TYPE.SALARY_FREQUENCY] ?? []"
          :error="firstError('salaryFrequency')"
          :disabled="isFormDisabled"
          required
          hide-search
          disable-empty
      />

      <FormSelect
          v-model="data.salaryCurrency"
          class="col-span-6 md:col-span-3"
          name="salaryCurrency"
          :label="$t('model.position.salaryCurrency')"
          :options="classifiers[CLASSIFIER_TYPE.CURRENCY] ?? []"
          :error="firstError('salaryCurrency')"
          :disabled="isFormDisabled"
          required
          hide-search
          disable-empty
      />

      <FormInput
          v-model="data.salaryVar"
          type="text"
          class="col-span-6 md:col-span-3"
          name="salaryVar"
          :label="$t('model.position.salaryVar')"
          :error="firstError('salaryVar')"
          :disabled="isFormDisabled"
          :maxlength="255"
      />

      <FormMultiSelect
          v-model="data.benefits"
          class="col-span-6 md:col-span-3"
          name="benefits"
          :label="$t('model.position.benefits')"
          :options="classifiers[CLASSIFIER_TYPE.BENEFIT] ?? []"
          :error="firstError('benefits', true)"
          :disabled="isFormDisabled"
      />

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 lg:gap-4 gap-3">

      <h2 class="col-span-6 text-base font-semibold">
        {{ $t('page.positions.create.sections.hardSkills') }}
      </h2>

      <FormSelect
          v-model="data.minEducationLevel"
          class="col-span-6 md:col-span-3"
          name="minEducationLevel"
          :label="$t('model.position.minEducationLevel')"
          :options="classifiers[CLASSIFIER_TYPE.EDUCATION_LEVEL] ?? []"
          :error="firstError('minEducationLevel')"
          :disabled="isFormDisabled"
      />

      <FormSelect
          v-if="data.isTechnical"
          v-model="data.seniority"
          class="col-span-6 md:col-span-3"
          name="seniority"
          :label="$t('model.position.seniority')"
          :options="classifiers[CLASSIFIER_TYPE.SENIORITY] ?? []"
          :error="firstError('seniority')"
          :disabled="isFormDisabled"
      />

      <FormInput
          v-model="data.experience"
          type="number"
          class="col-span-6 md:col-span-3"
          name="experience"
          :min="0"
          :step="1"
          :label="$t('model.position.experience')"
          :error="firstError('experience')"
          :disabled="isFormDisabled"
      />

      <FormMultiSelect
          v-model="data.drivingLicences"
          class="col-span-6 md:col-span-3"
          name="drivingLicences"
          :label="$t('model.position.drivingLicence')"
          :options="classifiers[CLASSIFIER_TYPE.DRIVING_LICENCE] ?? []"
          :error="firstError('drivingLicences', true)"
          :disabled="isFormDisabled"
      />

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 lg:gap-4 gap-3">

      <div class="col-span-6">
        <h2 class="text-base font-semibold">
          {{ $t('page.positions.create.sections.languageSkills.title') }}
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          {{ $t('page.positions.create.sections.languageSkills.subtitle') }}
        </p>
      </div>

      <FormSelect
          v-model="language"
          ref="languageSelect"
          class="col-span-6 md:col-span-3"
          name="language"
          :label="$t('model.common.language')"
          :options="classifiers[CLASSIFIER_TYPE.LANGUAGE] ?? []"
          :disabled="isFormDisabled"
      />

      <FormSelect
          v-model="languageLevel"
          ref="languageLevelSelect"
          class="col-span-6 md:col-span-3"
          name="languageLevel"
          :label="$t('model.common.languageLevel')"
          :disabled="!language || isFormDisabled"
          :options="classifiers[CLASSIFIER_TYPE.LANGUAGE_LEVEL] ?? []"
          hide-search
      />

      <div class="col-span-6">
        <CommonButton
            :label="$t('common.action.add')"
            :disabled="!language || !languageLevel || isFormDisabled"
            @click="addLanguageRequirement"
        />
      </div>

      <!-- list of language requirements as tabs -->
      <div v-if="languageRequirements.length > 0" class="col-span-6 -ml-1 -mb-1">
        <CommonBadge
            v-for="(requirement, index) in languageRequirements"
            :key="index"
            :label="`${ translateOption(requirement.language) } - ${ translateOption(requirement.level) }`"
            variant="secondary"
            removable
            class="ml-1 mb-1"
            @click="removeLanguageRequirement(requirement.language)"
          />
      </div>

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 lg:gap-4 gap-3">

      <div class="col-span-6">
        <h2 class="text-base font-semibold">
          {{ $t('page.positions.create.sections.softSkills.title') }}
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          {{ $t('page.positions.create.sections.softSkills.subtitle') }}
        </p>
      </div>

      <FormSlider
          v-model="data.organisationSkills"
          class="col-span-6"
          name="organisationSkills"
          :label="$t('model.position.organisationSkills')"
          :step="1"
          :max="10"
          :error="firstError('organisationSkills')"
          :disabled="isFormDisabled"
      />

      <FormSlider
          v-model="data.teamSkills"
          class="col-span-6"
          name="teamSkills"
          :label="$t('model.position.teamSkills')"
          :step="1"
          :max="10"
          :error="firstError('teamSkills')"
          :disabled="isFormDisabled"
      />

      <FormSlider
          v-model="data.timeManagement"
          class="col-span-6"
          name="timeManagement"
          :label="$t('model.position.timeManagement')"
          :step="1"
          :max="10"
          :error="firstError('timeManagement')"
          :disabled="isFormDisabled"
      />

      <FormSlider
          v-model="data.communicationSkills"
          class="col-span-6"
          name="communicationSkills"
          :label="$t('model.position.communicationSkills')"
          :step="1"
          :max="10"
          :error="firstError('communicationSkills')"
          :disabled="isFormDisabled"
      />

      <FormSlider
          v-model="data.leadership"
          class="col-span-6"
          name="leadership"
          :label="$t('model.position.leadership')"
          :step="1"
          :max="10"
          :error="firstError('leadership')"
          :disabled="isFormDisabled"
      />

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 lg:gap-4 gap-3">

      <h2 class="col-span-6 text-base font-semibold">
        {{ $t('page.positions.create.sections.other') }}
      </h2>

      <FormTextarea
          v-model="data.note"
          class="col-span-6"
          name="note"
          :label="$t('model.position.note')"
          :maxlength="2000"
          :error="firstError('note')"
          :disabled="isFormDisabled"
      />

      <FormMultiFileUpload
          v-model="data.files"
          class="col-span-6"
          name="files"
          :label="$t('model.position.files')"
          :formats="['pdf', 'docx', 'xlsx']"
          :max-size="10 * 1024 * 1024"
          :error="firstError('files', true)"
          :disabled="isFormDisabled"
      />

      <!-- already uploaded files -->
      <div v-if="existingFiles.length > 0" class="col-span-6 space-y-2">
        <CommonFile
            v-for="file in existingFiles"
            :key="file.id"
            :file="file"
            :actions="[
                {
                  key: 'delete',
                  handler: deleteFile,
                  icon: TrashIcon,
                  label: 'common.action.remove'
                }
            ]"
            :disabled="isFormDisabled"
        />
      </div>

    </div>

    <div class="text-right space-x-2">

      <!-- save button -->
      <CommonButton
          v-if="formButtons.includes('save')"
          value="save"
          type="submit"
          variant="secondary"
          :label="position ? $t('common.action.save') : $t('common.action.create')"
          :loading="isLoading"
          :disabled="isLoading"
          v-tooltip="{ content: position ? $t('tooltip.position.save') : $t('tooltip.position.create'), placement: 'top' }"
      />

      <!-- send for approval button -->
      <CommonButton
          v-if="formButtons.includes('sendForApproval') && shouldShowSendForApprovalButton"
          value="sendForApproval"
          type="submit"
          :label="$t('page.positions.create.sendForApproval')"
          :loading="isLoading"
          :disabled="isLoading"
          v-tooltip="{ content: $t('tooltip.position.sendForApproval'), placement: 'top' }"
      />

      <!-- open button -->
      <CommonButton
          v-if="formButtons.includes('open') && ! shouldShowSendForApprovalButton"
          value="open"
          type="submit"
          :label="$t('common.action.open')"
          :loading="isLoading"
          :disabled="isLoading"
          v-tooltip="{ content: $t('tooltip.position.open'), placement: 'top' }"
      />

      <!-- approve button -->
      <CommonButton
          v-if="formButtons.includes('approve')"
          type="button"
          variant="success"
          :label="$t('common.action.approve')"
          :loading="isLoading"
          :disabled="isLoading"
          @click="approvePosition"
      />

      <!-- reject button -->
      <CommonButton
          v-if="formButtons.includes('reject')"
          type="button"
          variant="danger"
          :label="$t('common.action.reject')"
          :loading="isLoading"
          :disabled="isLoading"
          @click="rejectPosition"
      />

      <!-- cancel approval button -->
      <CommonButton
          v-if="formButtons.includes('cancelApproval')"
          type="button"
          variant="secondary"
          :label="$t('page.positions.create.cancelApproval')"
          :loading="isLoading"
          :disabled="isLoading"
          v-tooltip="{ content: $t('tooltip.position.cancelApproval'), placement: 'top' }"
          @click="cancelApproval"
      />

    </div>

    <CompanyProfileContactModal
        :open="contactModalOpened"
        @store="contactModalOpened = false"
        @close="contactModalOpened = false"
    />

    <PositionApprovalApproveModal
        v-if="formButtons.includes('approve')"
        :approval="approveModalApproval"
        @close="approveModalApproval = null"
        @approve="onApprove"
    />

    <PositionApprovalRejectModal
        v-if="formButtons.includes('reject')"
        :approval="rejectModalApproval"
        @close="rejectModalApproval = null"
        @reject="onReject"
    />

  </CommonForm>
</template>

<script setup lang="ts">
import _ from 'lodash'
import {TrashIcon, ChatBubbleBottomCenterIcon} from '@heroicons/vue/24/outline'
import type {SelectOption} from "~/types/common";
import type {FormHandler} from "~/types/components/common/form.types";
import type {ClassifiersMap} from "~/repositories/classifier/responses";
import type {SelectExpose} from "~/types/components/form/select.types";
import type {File as FileResource, Position, PositionApproval} from "~/repositories/resources";
import type {FormButton, FormOperation} from "~/types/components/position/form.types";
import type {SearchMultiSelectExpose} from "~/types/components/form/searchMultiSelect.types";
import {CLASSIFIER_TYPE, POSITION_APPROVAL_STATE, POSITION_ROLE, POSITION_STATE} from "~/types/enums";
import {createPositionDepartmentsSuggester} from "~/functions/suggest";
import {createCompanyContactsSearcher, createCompanyUsersSearcher} from "~/functions/search";
import {getFormButtons} from "~/functions/position";

const props = defineProps<{
  classifiers: ClassifiersMap
  position?: Position
}>()

const emit = defineEmits<{
  (e: 'update'): void,
}>()

const { user } = useAuth<true>()
const { t } = useI18n()
const toaster = useToaster()
const api = useApi()
const modalConfirm = useModalConfirm()

const languageSelect = ref<SelectExpose|null>(null)
const languageLevelSelect = ref<SelectExpose|null>(null)
const salarySpan = ref<boolean>(false)
const language = ref<string|null>(null)
const languageLevel = ref<string|null>(null)
const languageRequirements = ref<{language: SelectOption, level: SelectOption}[]>([])
const existingFiles = ref<FileResource[]>([])

const contactModalOpened = ref<boolean>(false)
const approveModalApproval = ref<PositionApproval|null>(null)
const rejectModalApproval = ref<PositionApproval|null>(null)

const hiringManagersSelect=ref<SearchMultiSelectExpose|null>(null)
const approversSelect=ref<SearchMultiSelectExpose|null>(null)
const externalApproversSelect=ref<SearchMultiSelectExpose|null>(null)

const hiringManagersDefaultOptions = ref<SelectOption[]>([])
const approversDefaultOptions = ref<SelectOption[]>([])
const externalApproversDefaultOptions = ref<SelectOption[]>([])

const data = ref<{
  name: string | null
  department: string | null
  field: string | null
  workloads: string[]
  employmentRelationships: string[]
  employmentForms: string[]
  jobSeatsNum: number | null
  description: string | null
  isTechnical: boolean
  address: string | null
  salaryFrom: number | null
  salaryTo: number | null
  salary: number | null
  salaryType: string | null
  salaryFrequency: string | null
  salaryCurrency: string | null
  salaryVar: string | null
  benefits: string[]
  minEducationLevel: string | null
  seniority: string | null
  experience: number | null
  drivingLicences: string[],
  organisationSkills: number
  teamSkills: number
  timeManagement: number
  communicationSkills: number
  leadership: number
  note: string | null
  files: File[]
  hiringManagers: number[]
  approvers: number[]
  externalApprovers: number[]
  approveUntil: string | null
}>({
  name: null,
  department: null,
  field: null,
  workloads: [],
  employmentRelationships: [],
  employmentForms: [],
  jobSeatsNum: 1,
  description: null,
  isTechnical: false,
  address: null,
  salaryFrom: null,
  salaryTo: null,
  salary: null,
  salaryType: 'gross',
  salaryFrequency: 'monthly',
  salaryCurrency: 'CZK',
  salaryVar: null,
  benefits: [],
  minEducationLevel: null,
  seniority: null,
  experience: null,
  drivingLicences: [],
  organisationSkills: 0,
  teamSkills: 0,
  timeManagement: 0,
  communicationSkills: 0,
  leadership: 0,
  note: null,
  files: [],
  hiringManagers: [],
  approvers: [],
  externalApprovers: [],
  approveUntil: null,
})

const formButtons = computed<FormButton[]>(() => getFormButtons(props.position ?? null, user.value))

const isFormDisabled = computed<boolean>(() => {
  const {position} = props

  if (!position) {
    return false
  }

  return position.userId !== user.value.id || position.approvalState === POSITION_APPROVAL_STATE.PENDING
})

const isApproveUntilRequired = computed(() => {
  return data.value.hiringManagers.length > 0 ||
      data.value.approvers.length > 0 ||
      data.value.externalApprovers.length > 0
})

const shouldShowAddress = computed<boolean>(() => {
  return data.value.employmentForms.includes('on_site') || data.value.employmentForms.includes('hybrid')
})

const shouldShowSendForApprovalButton = computed<boolean>(() => {
  return data.value.hiringManagers.length > 0 ||
      data.value.approvers.length > 0 ||
      data.value.externalApprovers.length > 0
})

async function confirmExternalApprovers(): Promise<boolean> {
  const externalApprovers = externalApproversSelect.value!.getValue()

  if (externalApprovers.length === 0) {
    return true
  }

  const confirmed = await modalConfirm.showConfirmModalPromise({
    title: t('modal.position.externalApprovers.title'),
    text: h('div', {
      class: 'space-y-2'
    }, [
      h('p', t('modal.position.externalApprovers.text')),
      h('ul', {
        class: 'list-disc pl-4'
      }, externalApprovers.map(approver => h('li', translateOption(approver))))
    ]),
    html: true,
  })

  return !!confirmed
}

const handler: FormHandler = {
  async onSubmit(form, event): Promise<void> {
    // get form operation by clicked
    // form button
    const operation = (event.submitter as HTMLButtonElement).value as FormOperation

    // is user wants to send position for approval,
    // check if there are any external approvers,
    // user needs to confirm them
    if (operation === 'sendForApproval' && ! await confirmExternalApprovers()) {
      return
    }

    const formData = collectData(operation)

    const response = props.position
        ? await api.position.update(props.position!.id, formData)
        : await api.position.store(formData)

    await toaster.success({
      title: `toast.position.${operation}.success`
    })

    if (['save', 'sendForApproval'].includes(operation)) {
      // navigate to position list
      await navigateTo('/positions')

      return
    }

    const { position } = response._data?.data!

    // navigate to position detail
    await navigateTo(`/positions/${position.id}`)
  },
}

function collectData(operation: FormOperation): FormData {
  const formData = new FormData()

  formData.set('operation', operation)
  formData.set('name', _.toString(data.value.name))
  formData.set('department', _.toString(data.value.department))
  formData.set('field', _.toString(data.value.field))
  formData.set('jobSeatsNum', _.toString(data.value.jobSeatsNum))
  formData.set('description', _.toString(data.value.description))
  formData.set('isTechnical', data.value.isTechnical ? '1' : '0')
  formData.set('address', _.toString(data.value.address))
  formData.set('salaryFrom', _.toString(data.value.salaryFrom))
  formData.set('salaryTo', _.toString(data.value.salaryTo))
  formData.set('salary', _.toString(data.value.salary))
  formData.set('salaryType', _.toString(data.value.salaryType))
  formData.set('salaryFrequency', _.toString(data.value.salaryFrequency))
  formData.set('salaryCurrency', _.toString(data.value.salaryCurrency))
  formData.set('salaryVar', _.toString(data.value.salaryVar))
  formData.set('minEducationLevel', _.toString(data.value.minEducationLevel))
  formData.set('seniority', _.toString(data.value.seniority))
  formData.set('experience', _.toString(data.value.experience))
  formData.set('organisationSkills', _.toString(data.value.organisationSkills))
  formData.set('teamSkills', _.toString(data.value.teamSkills))
  formData.set('timeManagement', _.toString(data.value.timeManagement))
  formData.set('communicationSkills', _.toString(data.value.communicationSkills))
  formData.set('leadership', _.toString(data.value.leadership))
  formData.set('note', _.toString(data.value.note))
  formData.set('approveUntil', _.toString(data.value.approveUntil))

  for (const [index, hm] of data.value.hiringManagers.entries()) {
    formData.set(`hiringManagers[${index}]`, _.toString(hm))
  }

  for (const [index, approver] of data.value.approvers.entries()) {
    formData.set(`approvers[${index}]`, _.toString(approver))
  }

  for (const [index, externalApprover] of data.value.externalApprovers.entries()) {
    formData.set(`externalApprovers[${index}]`, _.toString(externalApprover))
  }

  for (const [index, drivingLicence] of data.value.drivingLicences.entries()) {
    formData.set(`drivingLicences[${index}]`, _.toString(drivingLicence))
  }

  for (const [index, workload] of data.value.workloads.entries()) {
    formData.set(`workloads[${index}]`, _.toString(workload))
  }

  for (const [index, employmentRelationship] of data.value.employmentRelationships.entries()) {
    formData.set(`employmentRelationships[${index}]`, _.toString(employmentRelationship))
  }

  for (const [index, employmentForm] of data.value.employmentForms.entries()) {
    formData.set(`employmentForms[${index}]`, _.toString(employmentForm))
  }

  for (const [index, benefit] of data.value.benefits.entries()) {
    formData.set(`benefits[${index}]`, _.toString(benefit))
  }

  for (const [index, file] of data.value.files.entries()) {
    formData.set(`files[${index}]`, file)
  }

  for (const [index, requirement] of languageRequirements.value.entries()) {
    formData.set(`languageRequirements[${index}][language]`, _.toString(requirement.language.value))
    formData.set(`languageRequirements[${index}][level]`, _.toString(requirement.level.value))
  }

  return formData
}

function addLanguageRequirement(): void {
  if (! language.value || !languageLevel.value) {
    return
  }

  const languageOption = languageSelect.value!.getOption(language.value)!
  const languageLevelOption = languageLevelSelect.value!.getOption(languageLevel.value)!

  // remove already existing language
  // if any
  removeLanguageRequirement(languageOption)

  languageRequirements.value.push({
    language: languageOption,
    level: languageLevelOption
  })

  language.value = null
  languageLevel.value = null
}

function removeLanguageRequirement(language: SelectOption): void {
  const existsIndex = languageRequirements.value.findIndex((item) => item.language.value === language.value)

  if (existsIndex !== -1) {
    languageRequirements.value.splice(existsIndex, 1)
  }
}

function onSalarySpanChange(value: boolean): void {
  if (value) {
    data.value.salaryFrom = data.value.salary
    data.value.salaryTo = data.value.salary
    data.value.salary = null
  } else {
    data.value.salary = data.value.salaryFrom
    data.value.salaryFrom = null
    data.value.salaryTo = null
  }
}

function onIsTechnicalChange(value: boolean): void {
  if (!value) {
    data.value.seniority = null
  }
}

function approvePosition(): void {
  const approval = props.position!.approvals.find((item) => {
    return item.role !== POSITION_ROLE.EXTERNAL_APPROVER &&
        item.state === POSITION_APPROVAL_STATE.PENDING &&
        item.model.id === user.value.id
  })

  if (!approval) {
    return
  }

  approveModalApproval.value = approval
}

async function onApprove(): Promise<void> {
  approveModalApproval.value = null // close modal
  emit('update')
  await navigateTo('/positions')
}

function rejectPosition(): void {
  const approval = props.position!.approvals.find((item) => {
    return item.role !== POSITION_ROLE.EXTERNAL_APPROVER &&
        item.state === POSITION_APPROVAL_STATE.PENDING &&
        item.model.id === user.value.id
  })

  if (!approval) {
    return
  }

  rejectModalApproval.value = approval
}

async function onReject(): Promise<void> {
  rejectModalApproval.value = null // close modal
  emit('update')
  await navigateTo('/positions')
}

async function cancelApproval(): Promise<void> {
  const confirmResult = await modalConfirm.showConfirmModalPromise({
    title: t('modal.position.cancelApproval.title'),
    text: t('modal.position.cancelApproval.text'),
  })

  if (!confirmResult) {
    return
  }

  const requestResult = await handle(async () => {
    await api.positionApproval.cancel(props.position!.id)
  })

  if (!requestResult.success) {
    return
  }

  await toaster.success({
    title: 'toast.position.approvalCanceled.success'
  })

  emit('update')
}

async function deleteFile(file: FileResource): Promise<void> {
  const result = await handle(async () => {
    await api.positionFile.destroy(props.position!.id, file.id)
  })

  if (!result.success) {
    return
  }

  const index = existingFiles.value.findIndex(item => item.id === file.id)

  // remove file from existing files array
  if (index > -1) {
    existingFiles.value.splice(index, 1)
  }

  await toaster.success({
    title: 'toast.position.file.delete.success'
  })
}

function init(): void {
  if (!props.position) {
    return
  }

  if (props.position.state !== POSITION_STATE.DRAFT) {
    throw new Error('Position form is only for draft positions.')
  }

  data.value.name = props.position.name
  data.value.department = props.position.department
  data.value.field = props.position.field?.value ?? null
  data.value.workloads = _.map(props.position.workloads, 'value')
  data.value.employmentRelationships = _.map(props.position.employmentRelationships, 'value')
  data.value.employmentForms = _.map(props.position.employmentForms, 'value')
  data.value.jobSeatsNum = props.position.jobSeatsNum
  data.value.description = props.position.description
  data.value.isTechnical = props.position.isTechnical
  data.value.address = props.position.address

  if (props.position.salaryFrom && props.position.salaryTo) {
    salarySpan.value = true
    data.value.salaryFrom = props.position.salaryFrom
    data.value.salaryTo = props.position.salaryTo
  } else {
    salarySpan.value = false
    data.value.salary = props.position.salaryFrom
  }

  data.value.salaryType = props.position.salaryType.value
  data.value.salaryFrequency = props.position.salaryFrequency.value
  data.value.salaryCurrency = props.position.salaryCurrency.value
  data.value.salaryVar = props.position.salaryVar
  data.value.benefits = _.map(props.position.benefits, 'value')
  data.value.minEducationLevel = props.position.minEducationLevel?.value ?? null
  data.value.seniority = props.position.seniority?.value ?? null
  data.value.experience = props.position.experience
  data.value.drivingLicences = _.map(props.position.drivingLicences, 'value')
  data.value.organisationSkills = props.position.organisationSkills
  data.value.teamSkills = props.position.teamSkills
  data.value.timeManagement = props.position.timeManagement
  data.value.communicationSkills = props.position.communicationSkills
  data.value.leadership = props.position.leadership
  data.value.note = props.position.note
  data.value.approveUntil = props.position.approveUntil ? useMoment()(props.position.approveUntil).format('YYYY-MM-DD') : null

  languageRequirements.value = props.position.languageRequirements

  existingFiles.value = props.position.files

  hiringManagersDefaultOptions.value = props.position.hiringManagers.map(item => ({
    value: item.id,
    label: item.fullName
  }))
  hiringManagersSelect.value!.setValue(hiringManagersDefaultOptions.value)

  approversDefaultOptions.value = props.position.approvers.map(item => ({
    value: item.id,
    label: item.fullName
  }))
  approversSelect.value!.setValue(approversDefaultOptions.value)

  externalApproversDefaultOptions.value = props.position.externalApprovers.map(item => ({
    value: item.id,
    label: item.companyName ? `${item.fullName} (${item.companyName})` : item.fullName
  }))
  externalApproversSelect.value!.setValue(externalApproversDefaultOptions.value)
}

watch(isApproveUntilRequired, (value) => {
  if (!value) {
    data.value.approveUntil = null
  }
})

watch(shouldShowAddress, (value) => {
  if (!value) {
    data.value.address = null
  }
})

onMounted(init)
</script>
