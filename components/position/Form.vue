<template>
  <CommonForm id="position-form" v-slot="{ isLoading, firstError }" class="divide-y divide-gray-200 border border-gray-200 rounded-md bg-white shadow-xs overflow-hidden" :handler="handler">

    <div class="px-4 py-3 bg-gray-100">
      <h2 class="text-base font-semibold text-gray-900">
        {{ $t('model.position.sections.basicInfo') }}
      </h2>
    </div>

    <div class="px-4 py-3 grid grid-cols-6 lg:gap-4 gap-3">

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
          v-if="shouldShowAddress"
          v-model="data.address"
          class="col-span-6 md:col-span-3"
          name="address"
          :label="$t('model.position.address')"
          :error="firstError('address')"
          :disabled="isFormDisabled"
          :maxlength="255"
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
          :placeholder="$t('page.position.create.placeholder.description')"
          :hint="$t('form.hint.position.description')"
          :error="firstError('description')"
          :disabled="isFormDisabled"
          :maxlength="2000"
          required
      />

    </div>

    <div class="px-4 py-3 bg-gray-100">
      <h2 class="text-base font-semibold text-gray-900">
        {{ $t('model.position.sections.roles') }}
      </h2>
    </div>

    <div class="px-4 py-3 grid grid-cols-6 lg:gap-4 gap-3">

      <FormSearchMultiSelect
          v-model="data.hiringManagers"
          class="col-span-6 md:col-span-3"
          name="hiringManagers"
          ref="hiringManagersSelect"
          :options="hiringManagersDefaultOptions"
          :label="$t('model.position.hiringManagers')"
          :error="firstError('hiringManagers', true)"
          :disabled="isFormDisabled"
          :searcher="createCompanyUsersSearcher(true, positionConfig.roles[POSITION_ROLE.HIRING_MANAGER])"
      />

      <FormSearchMultiSelect
          v-model="data.recruiters"
          class="col-span-6 md:col-span-3"
          name="recruiters"
          ref="recruitersSelect"
          :options="recruitersDefaultOptions"
          :label="$t('model.position.recruiters')"
          :error="firstError('recruiters', true)"
          :disabled="isFormDisabled"
          :searcher="createCompanyUsersSearcher(true, positionConfig.roles[POSITION_ROLE.RECRUITER])"
      />

    </div>

    <div class="px-4 py-3 bg-gray-100">
      <h2 class="text-base font-semibold text-gray-900">
        {{ $t('model.position.sections.approval') }}
      </h2>
    </div>

    <div class="px-4 py-3 grid grid-cols-6 lg:gap-4 gap-3">

      <FormSearchMultiSelect
          v-model="data.approvers"
          class="col-span-6 md:col-span-3"
          name="approvers"
          ref="approversSelect"
          :options="approversDefaultOptions"
          :label="$t('model.position.approvers')"
          :error="firstError('approvers', true)"
          :disabled="isFormDisabled"
          :searcher="createCompanyUsersSearcher(true, positionConfig.roles[POSITION_ROLE.APPROVER])"
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
              class="shrink-0"
              variant="secondary"
              :label="$t('modal.company.storeContact.title')"
              :disabled="isFormDisabled"
              @click="contactModalOpened = true"
          />
        </template>
      </FormSearchMultiSelect>

      <FormTextarea
        v-model="data.approveMessage"
        class="col-span-6"
        name="approveMessage"
        :maxlength="500"
        :disabled="isFormDisabled"
        :label="$t('model.position.approveMessage')"
        :hint="$t('form.hint.position.approveMessage')"
      />

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
          :min="$moment().add(1, 'd').format('YYYY-MM-DD')"
      />

      <PositionApprovalTable
          v-if="position && position.approvals.length > 0"
          :approvals="position.approvals"
          class="col-span-6"
      />

    </div>

    <div class="px-4 py-3 bg-gray-100">
      <h2 class="text-base font-semibold text-gray-900">
        {{ $t('model.position.sections.offer') }}
      </h2>
    </div>

    <div class="px-4 py-3 grid grid-cols-6 lg:gap-4 gap-3">

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

    <div class="px-4 py-3 bg-gray-100">
      <h2 class="text-base font-semibold text-gray-900">
        {{ $t('model.position.sections.hardSkills') }}
      </h2>
    </div>

    <div class="px-4 py-3 grid grid-cols-6 lg:gap-4 gap-3">

      <FormSelect
          v-model="data.minEducationLevel"
          class="col-span-6 md:col-span-3"
          name="minEducationLevel"
          :label="$t('model.position.minEducationLevel')"
          :options="classifiers[CLASSIFIER_TYPE.EDUCATION_LEVEL] ?? []"
          :error="firstError('minEducationLevel')"
          :disabled="isFormDisabled"
      />

      <FormInput
          v-model="data.educationField"
          type="text"
          class="col-span-6 md:col-span-3"
          name="educationField"
          :label="$t('model.position.educationField')"
          :error="firstError('educationField')"
          :disabled="isFormDisabled"
          :maxlength="255"
      />

      <FormMultiSelect
          v-model="data.seniority"
          class="col-span-6 md:col-span-3"
          name="seniority"
          :label="$t('model.position.seniority')"
          :options="classifiers[CLASSIFIER_TYPE.SENIORITY] ?? []"
          :error="firstError('seniority', true)"
          :disabled="isFormDisabled"
          hide-search
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

      <FormTextarea
          v-model="data.hardSkills"
          class="col-span-6"
          name="hardSkills"
          :maxlength="2000"
          :label="$t('model.position.hardSkills')"
          :placeholder="$t('page.position.create.placeholder.hardSkills')"
          :error="firstError('hardSkills')"
          :disabled="isFormDisabled"
      />

    </div>

    <div class="px-4 py-3 bg-gray-100">
      <h2 class="text-base font-semibold text-gray-900">
        {{ $t('model.position.sections.softSkills.title') }}
      </h2>
      <p class="mt-1 text-sm text-gray-500">
        {{ $t('model.position.sections.softSkills.subtitle') }}
      </p>
    </div>

    <div class="px-4 py-3 grid grid-cols-6 lg:gap-4 gap-3">

      <FormSlider
          v-model="data.organisationSkills"
          class="col-span-6"
          name="organisationSkills"
          :label="$t('model.position.organisationSkills')"
          :step="1"
          :max="100"
          :error="firstError('organisationSkills')"
          :disabled="isFormDisabled"
      />

      <FormSlider
          v-model="data.teamSkills"
          class="col-span-6"
          name="teamSkills"
          :label="$t('model.position.teamSkills')"
          :step="1"
          :max="100"
          :error="firstError('teamSkills')"
          :disabled="isFormDisabled"
      />

      <FormSlider
          v-model="data.timeManagement"
          class="col-span-6"
          name="timeManagement"
          :label="$t('model.position.timeManagement')"
          :step="1"
          :max="100"
          :error="firstError('timeManagement')"
          :disabled="isFormDisabled"
      />

      <FormSlider
          v-model="data.communicationSkills"
          class="col-span-6"
          name="communicationSkills"
          :label="$t('model.position.communicationSkills')"
          :step="1"
          :max="100"
          :error="firstError('communicationSkills')"
          :disabled="isFormDisabled"
      />

      <FormSlider
          v-model="data.leadership"
          class="col-span-6"
          name="leadership"
          :label="$t('model.position.leadership')"
          :step="1"
          :max="100"
          :error="firstError('leadership')"
          :disabled="isFormDisabled"
      />

    </div>

    <div class="px-4 py-3 bg-gray-100">
      <h2 class="text-base font-semibold text-gray-900">
        {{ $t('model.position.sections.languageSkills.title') }}
      </h2>
      <p class="mt-1 text-sm text-gray-500">
        {{ $t('model.position.sections.languageSkills.subtitle') }}
      </p>
    </div>

    <div class="px-4 py-3 grid grid-cols-6 lg:gap-4 gap-3">

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
      >
        <template #after>
          <CommonButton
              class="shrink-0"
              variant="secondary"
              :label="$t('common.action.add')"
              :disabled="!language || !languageLevel || isFormDisabled"
              @click="addLanguageRequirement"
          />
        </template>
      </FormSelect>

      <!-- list of language requirements as tabs -->
      <div v-if="languageRequirements.length > 0" class="col-span-6 -ml-1 -mb-1">
        <CommonBadge
            v-for="(requirement, index) in languageRequirements"
            :key="index"
            :label="`${ translateOption(requirement.language) } - ${ translateOption(requirement.level) }`"
            :removable="!isFormDisabled"
            variant="info"
            class="ml-1 mb-1"
            @click="removeLanguageRequirement(requirement.language)"
        />
      </div>

    </div>

    <div class="px-4 py-3 bg-gray-100">
      <h2 class="text-base font-semibold text-gray-900">
        {{ $t('model.position.sections.recruitment.title') }}
      </h2>
      <p class="mt-1 text-sm text-gray-500">
        {{ $t('model.position.sections.recruitment.subtitle') }}
      </p>
    </div>

    <div class="px-4 py-3 grid grid-cols-6 lg:gap-4 gap-3">

      <FormSlider
          v-model="data.hardSkillsWeight"
          class="col-span-6"
          name="hardSkillsWeight"
          :step="1"
          :max="100"
          :label="$t('model.position.hardSkillsWeight')"
          :error="firstError('hardSkillsWeight')"
          :help="{ content: $t('form.help.position.hardSkillsWeight') }"
          :disabled="isFormDisabled"
      />

      <FormSlider
          v-model="data.softSkillsWeight"
          class="col-span-6"
          name="softSkillsWeight"
          :step="1"
          :max="100"
          :label="$t('model.position.softSkillsWeight')"
          :error="firstError('softSkillsWeight')"
          :help="{ content: $t('form.help.position.softSkillsWeight') }"
          :disabled="isFormDisabled"
      />

      <FormSlider
          v-model="data.languageSkillsWeight"
          class="col-span-6"
          name="languageSkillsWeight"
          :step="1"
          :max="100"
          :label="$t('model.position.languageSkillsWeight')"
          :error="firstError('languageSkillsWeight')"
          :help="{ content: $t('form.help.position.languageSkillsWeight') }"
          :disabled="isFormDisabled"
      />

      <FormSlider
          v-model="data.experienceWeight"
          class="col-span-6"
          name="experienceWeight"
          :step="1"
          :max="100"
          :label="$t('model.position.experienceWeight')"
          :error="firstError('experienceWeight')"
          :help="{ content: $t('form.help.position.experienceWeight') }"
          :disabled="isFormDisabled"
      />

      <FormSlider
          v-model="data.educationWeight"
          class="col-span-6"
          name="educationWeight"
          :step="1"
          :max="100"
          :label="$t('model.position.educationWeight')"
          :error="firstError('educationWeight')"
          :help="{ content: $t('form.help.position.educationWeight') }"
          :disabled="isFormDisabled"
      />

    </div>

    <div class="px-4 py-3 bg-gray-100">
      <h2 class="text-base font-semibold text-gray-900">
        {{ $t('model.position.sections.share.title') }}
      </h2>
      <p class="mt-1 text-sm text-gray-500">
        {{ $t('model.position.sections.share.subtitle') }}
      </p>
    </div>

    <div class="px-4 py-3 grid grid-cols-6 lg:gap-4 gap-3">

      <FormInput
          v-model="data.externName"
          class="col-span-6"
          name="externName"
          :label="$t('model.position.externName')"
          :hint="$t('form.hint.position.externName')"
          :maxlength="255"
          :error="firstError('externName')"
          :disabled="isFormDisabled"
          required
      >
        <template #after>
          <CommonButton
              variant="secondary"
              :label="$t('page.position.create.usePositionName')"
              :disabled="isFormDisabled"
              @click="usePositionName"
          />
        </template>
      </FormInput>

      <FormCheckbox
          v-model="data.shareSalary"
          class="col-span-6"
          name="shareSalary"
          :label="$t('model.position.shareSalary')"
          :hint="$t('form.hint.position.shareSalary')"
          :disabled="isFormDisabled"
      />

      <FormCheckbox
          v-model="data.shareContact"
          class="col-span-6"
          name="shareContact"
          :label="$t('model.position.shareContact')"
          :hint="$t('form.hint.position.shareContact')"
          :disabled="isFormDisabled"
      />

    </div>

    <div class="px-4 py-3 bg-gray-100">
      <h2 class="text-base font-semibold text-gray-900">
        {{ $t('model.position.sections.other') }}
      </h2>
    </div>

    <div class="px-4 py-3 grid grid-cols-6 lg:gap-4 gap-3">

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
          :formats="positionConfig.files.extensions"
          :max-size="positionConfig.files.maxSize"
          :max-files="positionConfig.files.maxFiles"
          :error="firstError('files', true)"
          :disabled="isFormDisabled"
      />

      <!-- already uploaded files -->
      <div v-if="position && position.files.length > 0" class="col-span-6 space-y-2">
        <CommonFile
            v-for="file in position.files"
            :key="file.id"
            :file="file"
            :disable-edit="isFormDisabled"
            @delete="onDeleteFile"
        />
      </div>

    </div>

    <!-- form buttons -->
    <div class="px-4 py-3 flex items-center justify-end space-x-2">

      <!-- save button -->
      <CommonButton
          v-if="formButtons.includes('save')"
          value="save"
          type="submit"
          variant="secondary"
          :label="position ? $t('common.action.save') : $t('common.action.create')"
          :loading="isLoading"
          v-tooltip="{ content: position ? $t('tooltip.position.save') : $t('tooltip.position.create'), placement: 'top' }"
      />

      <!-- send for approval button -->
      <CommonButton
          v-if="formButtons.includes('sendForApproval') && shouldShowSendForApprovalButton"
          value="sendForApproval"
          type="submit"
          :label="$t('page.position.create.sendForApproval')"
          :loading="isLoading"
          v-tooltip="{ content: $t('tooltip.position.sendForApproval'), placement: 'top' }"
      />

      <!-- open button -->
      <CommonButton
          v-if="formButtons.includes('open') && shouldShowOpenButton"
          value="open"
          type="submit"
          :label="$t('common.action.open')"
          :loading="isLoading"
          v-tooltip="{ content: $t('tooltip.position.open'), placement: 'top' }"
      />

      <!-- cancel approval button -->
      <CommonButton
          v-if="formButtons.includes('cancelApproval')"
          variant="secondary"
          :label="$t('page.position.create.cancelApproval')"
          :loading="isLoading"
          v-tooltip="{ content: $t('tooltip.position.cancelApproval'), placement: 'top' }"
          @click="cancelApproval"
      />

    </div>

    <CompanyContactStoreModal
        :open="contactModalOpened"
        @store="contactModalOpened = false"
        @close="contactModalOpened = false"
    />

  </CommonForm>
</template>

<script setup lang="ts">
import _ from 'lodash'
import type {SelectOption} from "~/types/common";
import type {FormHandler} from "~/types/components/common/form.types";
import type {ClassifiersMap} from "~/repositories/classifier/responses";
import type {SelectExpose} from "~/types/components/form/select.types";
import type {File as FileResource, Position} from "~/repositories/resources";
import type {FormButton, PositionFormExpose} from "~/types/components/position/form.types";
import type {SearchMultiSelectExpose} from "~/types/components/form/searchMultiSelect.types";
import type {Operation, StoreData, UpdateData} from "~/repositories/position/inputs";
import {CLASSIFIER_TYPE, POSITION_ROLE, POSITION_STATE} from "~/types/enums";
import {createPositionDepartmentsSuggester} from "~/functions/suggest";
import {createCompanyContactsSearcher, createCompanyUsersSearcher} from "~/functions/search";
import {getFormButtons} from "~/functions/position";
import {positionConfig} from "~/config/position";

const props = defineProps<{
  classifiers: ClassifiersMap
  position?: Position
}>()

const emit = defineEmits<{
  (e: 'update'): void,
}>()

const dataCollector = useDataCollector()
const moment = useMoment()
const { user } = useAuth<true>()
const { t } = useI18n()
const toaster = useToaster()
const api = useApi()
const modalConfirm = useModalConfirm()

const salarySpan = ref<boolean>(false)
const languageSelect = ref<SelectExpose|null>(null)
const languageLevelSelect = ref<SelectExpose|null>(null)
const language = ref<string|null>(null)
const languageLevel = ref<string|null>(null)
const languageRequirements = ref<{language: SelectOption, level: SelectOption}[]>([])

const contactModalOpened = ref<boolean>(false)

const hiringManagersSelect=ref<SearchMultiSelectExpose|null>(null)
const recruitersSelect=ref<SearchMultiSelectExpose|null>(null)
const approversSelect=ref<SearchMultiSelectExpose|null>(null)
const externalApproversSelect=ref<SearchMultiSelectExpose|null>(null)

const hiringManagersDefaultOptions = ref<SelectOption[]>([])
const recruitersDefaultOptions = ref<SelectOption[]>([])
const approversDefaultOptions = ref<SelectOption[]>([])
const externalApproversDefaultOptions = ref<SelectOption[]>([])

const data = ref<StoreData|UpdateData>({
  keys: [
      'name',
      'externName',
      'department',
      'field',
      'jobSeatsNum',
      'description',
      'address',
      'salary',
      'salaryType',
      'salaryFrequency',
      'salaryCurrency',
      'salaryVar',
      'minEducationLevel',
      'educationField',
      'seniority',
      'experience',
      'hardSkills',
      'organisationSkills',
      'teamSkills',
      'timeManagement',
      'communicationSkills',
      'leadership',
      'note',
      'workloads',
      'employmentRelationships',
      'employmentForms',
      'benefits',
      'files',
      'languageRequirements',
      'hiringManagers',
      'recruiters',
      'approvers',
      'externalApprovers',
      'approveUntil',
      'approveMessage',
      'hardSkillsWeight',
      'softSkillsWeight',
      'languageSkillsWeight',
      'experienceWeight',
      'educationWeight',
      'shareSalary',
      'shareContact'
  ],
  name: null,
  externName: null,
  department: null,
  field: null,
  workloads: [],
  employmentRelationships: [],
  employmentForms: [],
  jobSeatsNum: 1,
  description: null,
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
  educationField: null,
  seniority: [],
  experience: null,
  hardSkills: null,
  organisationSkills: 0,
  teamSkills: 0,
  timeManagement: 0,
  communicationSkills: 0,
  leadership: 0,
  note: null,
  files: [],
  hiringManagers: [],
  recruiters: [],
  approvers: [],
  externalApprovers: [],
  approveUntil: null,
  approveMessage: null,
  hardSkillsWeight: 0,
  softSkillsWeight: 0,
  languageSkillsWeight: 0,
  experienceWeight: 0,
  educationWeight: 0,
  shareSalary: false,
  shareContact: true,
})

const formButtons = computed<FormButton[]>(() => getFormButtons(props.position ?? null, user.value))

const isFormDisabled = computed<boolean>(() => {
  if (!props.position) {
    return false
  }

  return props.position.state === POSITION_STATE.APPROVAL_PENDING ||
      props.position.state === POSITION_STATE.APPROVAL_APPROVED
})

const isApproveUntilRequired = computed(() => {
  return data.value.approvers.length > 0 ||
      data.value.externalApprovers.length > 0
})

const shouldShowAddress = computed<boolean>(() => {
  return data.value.employmentForms.includes('on_site') || data.value.employmentForms.includes('hybrid')
})

const shouldShowSendForApprovalButton = computed<boolean>(() => {
  return data.value.approvers.length > 0 ||
      data.value.externalApprovers.length > 0
})

const shouldShowOpenButton = computed<boolean>(() => {
  if (props.position?.state === POSITION_STATE.APPROVAL_APPROVED) {
    return true
  }

  return ! shouldShowSendForApprovalButton.value
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
    const operation = (event.submitter as HTMLButtonElement).value as Operation

    // is user wants to send position for approval,
    // check if there are any external approvers,
    // user needs to confirm them
    if (operation === 'sendForApproval' && ! await confirmExternalApprovers()) {
      return
    }

    const formData = dataCollector.collect(data.value, {
      operation: operation
    }, {
      languageRequirements: languageRequirements.value.map(item => ({
        language: item.language.value,
        level: item.level.value,
      }))
    })

    const response = props.position
        ? await api.position.update(props.position!.id, formData)
        : await api.position.store(formData)

    await toaster.success({
      title: `toast.position.${operation}`
    })

    if (['save', 'sendForApproval'].includes(operation)) {
      // navigate to position list
      await navigateTo('/positions')

      return
    }

    const { position } = response._data!.data

    // navigate to position detail
    await navigateTo(`/positions/${position.id}`)
  },
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

function usePositionName(): void {
  data.value.externName = data.value.name
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

async function cancelApproval(): Promise<void> {
  const confirmResult = await modalConfirm.showConfirmModalPromise({
    title: t('modal.position.cancelApproval.title'),
    text: t('modal.position.cancelApproval.text'),
  })

  if (!confirmResult) {
    return
  }

  const requestResult = await handle(async () => {
    await api.position.cancelApproval(props.position!.id)
  })

  if (!requestResult.success) {
    return
  }

  await toaster.success({
    title: 'toast.position.approvalCanceled'
  })

  emit('update')
}

async function onDeleteFile(file: FileResource): Promise<void> {
  if (!props.position) {
    return
  }

  const index = props.position.files.findIndex(item => item.id === file.id)

  // remove file from existing files array
  if (index > -1) {
    props.position.files.splice(index, 1)
  }

  await toaster.success({
    title: 'toast.position.file.delete'
  })
}

function setPosition(position: Position): void {
  data.value.name = position.name
  data.value.externName = position.externName
  data.value.department = position.department
  data.value.field = position.field?.value ?? null
  data.value.workloads = _.map(position.workloads, 'value')
  data.value.employmentRelationships = _.map(position.employmentRelationships, 'value')
  data.value.employmentForms = _.map(position.employmentForms, 'value')
  data.value.jobSeatsNum = position.jobSeatsNum
  data.value.description = position.description
  data.value.address = position.address

  if (position.salary.from && position.salary.to) {
    salarySpan.value = true
    data.value.salaryFrom = position.salary.from
    data.value.salaryTo = position.salary.to
  } else {
    salarySpan.value = false
    data.value.salary = position.salary.from
  }

  data.value.salaryType = position.salary.type.value
  data.value.salaryFrequency = position.salary.frequency.value
  data.value.salaryCurrency = position.salary.currency.value
  data.value.salaryVar = position.salary.var
  data.value.benefits = _.map(position.benefits, 'value')
  data.value.minEducationLevel = position.minEducationLevel?.value ?? null
  data.value.educationField = position.educationField
  data.value.seniority = _.map(position.seniority, 'value')
  data.value.experience = position.experience
  data.value.hardSkills = position.hardSkills
  data.value.organisationSkills = position.organisationSkills
  data.value.teamSkills = position.teamSkills
  data.value.timeManagement = position.timeManagement
  data.value.communicationSkills = position.communicationSkills
  data.value.leadership = position.leadership
  data.value.note = position.note
  data.value.approveUntil = position.approveUntil ? moment(position.approveUntil).format('YYYY-MM-DD') : null
  data.value.approveMessage = position.approveMessage
  data.value.hardSkillsWeight = position.hardSkillsWeight
  data.value.softSkillsWeight = position.softSkillsWeight
  data.value.languageSkillsWeight = position.languageSkillsWeight
  data.value.experienceWeight = position.experienceWeight
  data.value.educationWeight = position.educationWeight
  data.value.shareSalary = position.shareSalary
  data.value.shareContact = position.shareContact

  languageRequirements.value = [...position.languageRequirements]

  hiringManagersDefaultOptions.value = position.hiringManagers.map(item => ({
    value: item.id,
    label: item.label
  }))
  hiringManagersSelect.value!.setValue(hiringManagersDefaultOptions.value)

  recruitersDefaultOptions.value = position.recruiters.map(item => ({
    value: item.id,
    label: item.label
  }))
  recruitersSelect.value!.setValue(recruitersDefaultOptions.value)

  approversDefaultOptions.value = position.approvers.map(item => ({
    value: item.id,
    label: item.label
  }))
  approversSelect.value!.setValue(approversDefaultOptions.value)

  externalApproversDefaultOptions.value = position.externalApprovers.map(item => ({
    value: item.id,
    label: item.label,
  }))
  externalApproversSelect.value!.setValue(externalApproversDefaultOptions.value)
}

function init(): void {
  if (props.position) {
    setPosition(props.position)
  }
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

watch(() => props.position?.id, (position) => {
  if (position) {
    init()
  }
})

onMounted(init)

defineExpose<PositionFormExpose>({
  setPosition
})
</script>
