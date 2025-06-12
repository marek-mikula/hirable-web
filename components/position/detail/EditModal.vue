<template>
  <CommonModal width="xl" :open="section !== null" :title="$t('modal.position.edit.title')" :title-icon="PencilIcon" @close="emit('close')" @hidden="onHidden">
    <template #content>
      <CommonForm id="position-edit-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div v-if="loading" class="p-4 flex justify-center">
          <CommonSpinner variant="primary" size="size-8"/>
        </div>

        <div v-else class="p-4 space-y-4">

          <template v-if="internalSection === POSITION_SECTION.INFO">

            <FormInput
                v-model="data.name"
                name="name"
                :label="$t('model.position.name')"
                :maxlength="255"
                :error="firstError('name')"
                required
            />

            <FormSuggestInput
                v-model="data.department"
                name="department"
                :suggester="createPositionDepartmentsSuggester()"
                :label="$t('model.position.department')"
                :hint="$t('form.hint.common.suggest')"
                :error="firstError('department')"
                :maxlength="255"
            />

            <FormSelect
                v-model="data.field"
                name="field"
                :options="classifiers[CLASSIFIER_TYPE.FIELD] ?? []"
                :label="$t('model.position.field')"
                :error="firstError('field')"
            />

            <FormMultiSelect
                v-model="data.workloads"
                name="workloads"
                :label="$t('model.position.workload')"
                :options="classifiers[CLASSIFIER_TYPE.WORKLOAD] ?? []"
                :error="firstError('workloads', true)"
                required
                hide-search
            />

            <FormMultiSelect
                v-model="data.employmentRelationships"
                name="employmentRelationships"
                :label="$t('model.position.employmentRelationship')"
                :options="classifiers[CLASSIFIER_TYPE.EMPLOYMENT_RELATIONSHIP] ?? []"
                :error="firstError('employmentRelationships', true)"
                required
                hide-search
            />

            <FormMultiSelect
                v-model="data.employmentForms"
                name="employmentForms"
                :label="$t('model.position.employmentForm')"
                :options="classifiers[CLASSIFIER_TYPE.EMPLOYMENT_FORM] ?? []"
                :error="firstError('employmentForms', true)"
                required
                hide-search
            />

            <FormInput
                v-model="data.address"
                name="address"
                :label="$t('model.position.address')"
                :error="firstError('address')"
                :maxlength="255"
            />

            <FormInput
                v-model="data.jobSeatsNum"
                name="jobSeatsNum"
                type="number"
                :label="$t('model.position.jobSeatsNum')"
                :error="firstError('jobSeatsNum')"
                :max="1000"
                :min="1"
                required
            />

            <FormInput
                v-model="data.startDate"
                type="date"
                name="startDate"
                :label="$t('model.position.startDate')"
                :error="firstError('startDate')"
                :min="$moment().format('YYYY-MM-DD')"
            />

            <FormTextarea
                v-model="data.description"
                name="description"
                :label="$t('model.position.description')"
                :placeholder="$t('page.positions.create.placeholder.description')"
                :hint="$t('form.hint.position.description')"
                :error="firstError('description')"
                :maxlength="2000"
                required
            />

            <FormCheckbox
                v-model="data.isTechnical"
                name="isTechnical"
                :label="$t('model.position.isTechnical')"
                :hint="$t('form.hint.position.isTechnical')"
                :error="firstError('isTechnical')"
            />

          </template>

          <template v-else-if="internalSection === POSITION_SECTION.ROLES">

            <FormSearchMultiSelect
                v-model="data.hiringManagers"
                name="hiringManagers"
                ref="hiringManagersSelect"
                :options="hiringManagersDefaultOptions"
                :label="$t('model.position.hiringManagers')"
                :error="firstError('hiringManagers', true)"
                :searcher="createCompanyUsersSearcher(true)"
            />

          </template>

          <template v-else-if="internalSection === POSITION_SECTION.OFFER">

            <FormCheckbox
                v-model="salarySpan"
                name="salarySpan"
                :label="$t('model.position.salarySpan')"
                @change="onSalarySpanChange"
            />

            <FormInput
                v-if="salarySpan"
                v-model="data.salaryFrom"
                type="number"
                name="salaryFrom"
                :label="$t('model.position.salaryFrom')"
                :error="firstError('salaryFrom')"
                :min="0"
                :step="1"
                required
            />

            <FormInput
                v-if="salarySpan"
                v-model="data.salaryTo"
                type="number"
                name="salaryTo"
                :label="$t('model.position.salaryTo')"
                :min="data.salaryFrom"
                :step="1"
                :error="firstError('salaryTo')"
                required
            />

            <FormInput
                v-if="!salarySpan"
                v-model="data.salary"
                type="number"
                name="salary"
                :label="$t('model.position.salary')"
                :min="0"
                :step="1"
                :error="firstError('salary')"
                required
            />

            <FormSelect
                v-model="data.salaryType"
                name="salaryType"
                :label="$t('model.position.salaryType')"
                :options="classifiers[CLASSIFIER_TYPE.SALARY_TYPE] ?? []"
                :error="firstError('salaryType')"
                required
                hide-search
                disable-empty
            />

            <FormSelect
                v-model="data.salaryFrequency"
                name="salaryFrequency"
                :label="$t('model.position.salaryFrequency')"
                :options="classifiers[CLASSIFIER_TYPE.SALARY_FREQUENCY] ?? []"
                :error="firstError('salaryFrequency')"
                required
                hide-search
                disable-empty
            />

            <FormSelect
                v-model="data.salaryCurrency"
                name="salaryCurrency"
                :label="$t('model.position.salaryCurrency')"
                :options="classifiers[CLASSIFIER_TYPE.CURRENCY] ?? []"
                :error="firstError('salaryCurrency')"
                required
                hide-search
                disable-empty
            />

            <FormInput
                v-model="data.salaryVar"
                type="text"
                name="salaryVar"
                :label="$t('model.position.salaryVar')"
                :error="firstError('salaryVar')"
                :maxlength="255"
            />

            <FormMultiSelect
                v-model="data.benefits"
                name="benefits"
                :label="$t('model.position.benefits')"
                :options="classifiers[CLASSIFIER_TYPE.BENEFIT] ?? []"
                :error="firstError('benefits', true)"
            />

          </template>

          <template v-else-if="internalSection === POSITION_SECTION.HARD_SKILLS">

            <FormSelect
                v-model="data.minEducationLevel"
                name="minEducationLevel"
                :label="$t('model.position.minEducationLevel')"
                :options="classifiers[CLASSIFIER_TYPE.EDUCATION_LEVEL] ?? []"
                :error="firstError('minEducationLevel')"
            />

            <FormSelect
                v-model="data.seniority"
                name="seniority"
                :label="$t('model.position.seniority')"
                :options="classifiers[CLASSIFIER_TYPE.SENIORITY] ?? []"
                :error="firstError('seniority')"
            />

            <FormInput
                v-model="data.experience"
                type="number"
                name="experience"
                :min="0"
                :step="1"
                :label="$t('model.position.experience')"
                :error="firstError('experience')"
            />

            <FormTextarea
                v-model="data.hardSkills"
                name="hardSkills"
                :maxlength="2000"
                :label="$t('model.position.hardSkills')"
                :placeholder="$t('page.positions.create.placeholder.hardSkills')"
                :error="firstError('hardSkills')"
            />

          </template>

          <template v-else-if="internalSection === POSITION_SECTION.SOFT_SKILLS">

            <FormSlider
                v-model="data.organisationSkills"
                class="col-span-6"
                name="organisationSkills"
                :label="$t('model.position.organisationSkills')"
                :step="1"
                :max="10"
                :error="firstError('organisationSkills')"
            />

            <FormSlider
                v-model="data.teamSkills"
                class="col-span-6"
                name="teamSkills"
                :label="$t('model.position.teamSkills')"
                :step="1"
                :max="10"
                :error="firstError('teamSkills')"
            />

            <FormSlider
                v-model="data.timeManagement"
                class="col-span-6"
                name="timeManagement"
                :label="$t('model.position.timeManagement')"
                :step="1"
                :max="10"
                :error="firstError('timeManagement')"
            />

            <FormSlider
                v-model="data.communicationSkills"
                class="col-span-6"
                name="communicationSkills"
                :label="$t('model.position.communicationSkills')"
                :step="1"
                :max="10"
                :error="firstError('communicationSkills')"
            />

            <FormSlider
                v-model="data.leadership"
                class="col-span-6"
                name="leadership"
                :label="$t('model.position.leadership')"
                :step="1"
                :max="10"
                :error="firstError('leadership')"
            />

          </template>

          <template v-else-if="internalSection === POSITION_SECTION.LANGUAGE_SKILLS">

            <FormSelect
                v-model="language"
                ref="languageSelect"
                name="language"
                :label="$t('model.common.language')"
                :options="classifiers[CLASSIFIER_TYPE.LANGUAGE] ?? []"
            />

            <FormSelect
                v-model="languageLevel"
                ref="languageLevelSelect"
                name="languageLevel"
                :label="$t('model.common.languageLevel')"
                :disabled="!language"
                :options="classifiers[CLASSIFIER_TYPE.LANGUAGE_LEVEL] ?? []"
                hide-search
            >
              <template #after>
                <CommonButton
                    class="shrink-0"
                    :label="$t('common.action.add')"
                    variant="secondary"
                    :disabled="!language || !languageLevel"
                    @click="addLanguageRequirement"
                />
              </template>
            </FormSelect>

            <!-- list of language requirements as tabs -->
            <div v-if="languageRequirements.length > 0" class="-ml-1 -mb-1">
              <CommonBadge
                  v-for="(requirement, index) in languageRequirements"
                  :key="index"
                  :label="`${ translateOption(requirement.language) } - ${ translateOption(requirement.level) }`"
                  removable
                  variant="info"
                  class="ml-1 mb-1"
                  @click="removeLanguageRequirement(requirement.language)"
              />
            </div>

          </template>

          <template v-else-if="internalSection === POSITION_SECTION.RECRUITMENT">

            <FormSlider
                v-model="data.hardSkillsWeight"
                class="col-span-6"
                name="hardSkillsWeight"
                :label="$t('model.position.hardSkillsWeight')"
                :step="1"
                :max="10"
                :error="firstError('hardSkillsWeight')"
            />

            <FormSlider
                v-model="data.softSkillsWeight"
                class="col-span-6"
                name="softSkillsWeight"
                :label="$t('model.position.softSkillsWeight')"
                :step="1"
                :max="10"
                :error="firstError('softSkillsWeight')"
            />

            <FormSlider
                v-model="data.languageSkillsWeight"
                class="col-span-6"
                name="languageSkillsWeight"
                :label="$t('model.position.languageSkillsWeight')"
                :step="1"
                :max="10"
                :error="firstError('languageSkillsWeight')"
            />

          </template>

          <template v-else-if="internalSection === POSITION_SECTION.OTHER">

            <FormTextarea
                v-model="data.note"
                name="note"
                :label="$t('model.position.note')"
                :maxlength="2000"
                :error="firstError('note')"
            />

            <FormMultiFileUpload
                v-model="data.files"
                name="files"
                :label="$t('model.position.files')"
                :formats="['pdf', 'docx', 'xlsx']"
                :max-size="10 * 1024 * 1024"
                :error="firstError('files', true)"
            />

          </template>

        </div>

        <div class="p-4 flex items-center justify-between">
          <CommonButton
              variant="secondary"
              :label="$t('common.action.cancel')"
              @click="emit('close')"
          />
          <CommonButton
              type="submit"
              variant="primary"
              :label="$t('common.action.confirm')"
              :loading="isLoading"
              :disabled="isLoading"
          />
        </div>

      </CommonForm>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import _ from 'lodash'
import {PencilIcon} from "@heroicons/vue/24/outline";
import type {FormHandler} from "~/types/components/common/form.types";
import type {Position} from "~/repositories/resources";
import type {Operation, UpdateData} from "~/repositories/position/inputs";
import type {ClassifiersMap} from "~/repositories/classifier/responses";
import type {SelectOption} from "~/types/common";
import type {SearchMultiSelectExpose} from "~/types/components/form/searchMultiSelect.types";
import type {SelectExpose} from "~/types/components/form/select.types";
import {CLASSIFIER_TYPE, POSITION_SECTION} from "~/types/enums";
import {createPositionDepartmentsSuggester} from "~/functions/suggest";
import {createCompanyUsersSearcher} from "~/functions/search";

const props = defineProps<{
  position: Position
  section: POSITION_SECTION | null
}>()

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'update', position: Position): void,
}>()

const moment = useMoment()
const api = useApi()
const toaster = useToaster()

const internalSection = ref<POSITION_SECTION|null>(null)
const loading = ref<boolean>(false)
const classifiers = ref<ClassifiersMap>({})
const salarySpan = ref<boolean>(false)

const hiringManagersSelect=ref<SearchMultiSelectExpose|null>(null)
const hiringManagersDefaultOptions = ref<SelectOption[]>([])

const languageSelect = ref<SelectExpose|null>(null)
const languageLevelSelect = ref<SelectExpose|null>(null)
const language = ref<string|null>(null)
const languageLevel = ref<string|null>(null)
const languageRequirements = ref<{language: SelectOption, level: SelectOption}[]>([])

const data = ref<UpdateData>({
  keys: [],
  name: null,
  department: null,
  field: null,
  workloads: [],
  employmentRelationships: [],
  employmentForms: [],
  jobSeatsNum: 1,
  startDate: null,
  description: null,
  isTechnical: false,
  address: null,
  salaryFrom: null,
  salaryTo: null,
  salary: null,
  salaryType: null,
  salaryFrequency: null,
  salaryCurrency: null,
  salaryVar: null,
  benefits: [],
  minEducationLevel: null,
  seniority: null,
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
  approvers: [],
  externalApprovers: [],
  approveUntil: null,
  hardSkillsWeight: 0,
  softSkillsWeight: 0,
  languageSkillsWeight: 0,
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.position.update(props.position.id, collectData(props.section!))

    await toaster.success({
      title: 'toast.position.edit'
    })

    const { position } = response._data!.data

    emit('update', position)
  }
}

function clearForm(): void {
  data.value.keys = []
  data.value.name = null
  data.value.department = null
  data.value.field = null
  data.value.workloads = []
  data.value.employmentRelationships = []
  data.value.employmentForms = []
  data.value.jobSeatsNum = 1
  data.value.startDate = null
  data.value.description = null
  data.value.isTechnical = false
  data.value.address = null
  data.value.salaryFrom = null
  data.value.salaryTo = null
  data.value.salary = null
  data.value.salaryType = null
  data.value.salaryFrequency = null
  data.value.salaryCurrency = null
  data.value.salaryVar = null
  data.value.benefits = []
  data.value.minEducationLevel = null
  data.value.seniority = null
  data.value.experience = null
  data.value.hardSkills = null
  data.value.organisationSkills = 0
  data.value.teamSkills = 0
  data.value.timeManagement = 0
  data.value.communicationSkills = 0
  data.value.leadership = 0
  data.value.note = null
  data.value.files = []
  data.value.hiringManagers = []
  data.value.approvers = []
  data.value.externalApprovers = []
  data.value.approveUntil = null
  data.value.hardSkillsWeight = 0
  data.value.softSkillsWeight = 0
  data.value.languageSkillsWeight = 0

  // clear other values
  salarySpan.value = false
  language.value = null
  languageLevel.value = null
  languageRequirements.value = []
}

function collectData(section: POSITION_SECTION): FormData {
  const formData = new FormData()

  formData.set('operation', ('save' as Operation))

  if (section === POSITION_SECTION.INFO) {
    formData.set('name', _.toString(data.value.name))
    formData.set('department', _.toString(data.value.department))
    formData.set('field', _.toString(data.value.field))
    formData.set('address', _.toString(data.value.address))
    formData.set('jobSeatsNum', _.toString(data.value.jobSeatsNum))
    formData.set('startDate', _.toString(data.value.startDate))
    formData.set('isTechnical', data.value.isTechnical ? '1' : '0')
    formData.set('description', _.toString(data.value.description))

    for (const [index, workload] of data.value.workloads.entries()) {
      formData.set(`workloads[${index}]`, _.toString(workload))
    }

    for (const [index, employmentRelationship] of data.value.employmentRelationships.entries()) {
      formData.set(`employmentRelationships[${index}]`, _.toString(employmentRelationship))
    }

    for (const [index, employmentForm] of data.value.employmentForms.entries()) {
      formData.set(`employmentForms[${index}]`, _.toString(employmentForm))
    }
  } else if (section === POSITION_SECTION.ROLES) {
    for (const [index, hm] of data.value.hiringManagers.entries()) {
      formData.set(`hiringManagers[${index}]`, _.toString(hm))
    }
  } else if (section === POSITION_SECTION.OFFER) {
    formData.set('salaryFrom', _.toString(data.value.salaryFrom))
    formData.set('salaryTo', _.toString(data.value.salaryTo))
    formData.set('salary', _.toString(data.value.salary))
    formData.set('salaryType', _.toString(data.value.salaryType))
    formData.set('salaryFrequency', _.toString(data.value.salaryFrequency))
    formData.set('salaryCurrency', _.toString(data.value.salaryCurrency))
    formData.set('salaryVar', _.toString(data.value.salaryVar))

    for (const [index, benefit] of data.value.benefits.entries()) {
      formData.set(`benefits[${index}]`, _.toString(benefit))
    }
  } else if (section === POSITION_SECTION.HARD_SKILLS) {
    formData.set('minEducationLevel', _.toString(data.value.minEducationLevel))
    formData.set('seniority', _.toString(data.value.seniority))
    formData.set('experience', _.toString(data.value.experience))
    formData.set('hardSkills', _.toString(data.value.hardSkills))
  } else if (section === POSITION_SECTION.SOFT_SKILLS) {
    formData.set('organisationSkills', _.toString(data.value.organisationSkills))
    formData.set('teamSkills', _.toString(data.value.teamSkills))
    formData.set('timeManagement', _.toString(data.value.timeManagement))
    formData.set('communicationSkills', _.toString(data.value.communicationSkills))
    formData.set('leadership', _.toString(data.value.leadership))
  } else if (section === POSITION_SECTION.LANGUAGE_SKILLS) {
    for (const [index, requirement] of languageRequirements.value.entries()) {
      formData.set(`languageRequirements[${index}][language]`, _.toString(requirement.language.value))
      formData.set(`languageRequirements[${index}][level]`, _.toString(requirement.level.value))
    }
  } else if (section === POSITION_SECTION.RECRUITMENT) {
    formData.set('hardSkillsWeight', _.toString(data.value.hardSkillsWeight))
    formData.set('softSkillsWeight', _.toString(data.value.softSkillsWeight))
    formData.set('languageSkillsWeight', _.toString(data.value.languageSkillsWeight))
  } else if (section === POSITION_SECTION.OTHER) {
    formData.set('note', _.toString(data.value.note))
    for (const [index, file] of data.value.files.entries()) {
      formData.set(`files[${index}]`, file)
    }
  }

  // append update keys
  for (const [index, key] of data.value.keys.entries()) {
    formData.set(`keys[${index}]`, key)
  }

  return formData
}

function fillForm(section: POSITION_SECTION): void {
  if (section === POSITION_SECTION.INFO) {
    data.value.name = props.position.name
    data.value.department = props.position.department
    data.value.field = props.position.field?.value ?? null
    data.value.workloads = _.map(props.position.workloads, 'value')
    data.value.employmentRelationships = _.map(props.position.employmentRelationships, 'value')
    data.value.employmentForms = _.map(props.position.employmentForms, 'value')
    data.value.address = props.position.address
    data.value.jobSeatsNum = props.position.jobSeatsNum
    data.value.startDate = props.position.startDate ? moment(props.position.startDate).format('YYYY-MM-DD') : null
    data.value.isTechnical = props.position.isTechnical
    data.value.description = props.position.description
    data.value.keys = [
        'name',
        'department',
        'field',
        'workloads',
        'employmentRelationships',
        'employmentForms',
        'address',
        'jobSeatsNum',
        'startDate',
        'isTechnical',
        'description',
    ]
  } else if (section === POSITION_SECTION.ROLES) {
    data.value.hiringManagers = _.map(props.position.hiringManagers, 'id')
    data.value.keys = [
      'hiringManagers',
    ]

    nextTick(() => { // preload hiring managers once the select is rendered
      hiringManagersDefaultOptions.value = props.position.hiringManagers.map(item => ({
        value: item.id,
        label: item.fullName
      }))
      hiringManagersSelect.value!.setValue(hiringManagersDefaultOptions.value)
    })
  } else if (section === POSITION_SECTION.OFFER) {
    if (props.position.salaryFrom && props.position.salaryTo) {
      salarySpan.value = true
      data.value.salaryFrom = props.position.salaryFrom
      data.value.salaryTo = props.position.salaryTo
    } else {
      salarySpan.value = false
      data.value.salary = props.position.salaryFrom
    }
    data.value.salaryType = props.position.salaryType?.value ?? null
    data.value.salaryFrequency = props.position.salaryFrequency?.value ?? null
    data.value.salaryCurrency = props.position.salaryCurrency?.value ?? null
    data.value.salaryVar = props.position.salaryVar
    data.value.benefits = _.map(props.position.benefits, 'value')
    data.value.keys = [
      'salary',
      'salaryType',
      'salaryFrequency',
      'salaryCurrency',
      'salaryVar',
      'benefits',
    ]
  } else if (section === POSITION_SECTION.HARD_SKILLS) {
    data.value.minEducationLevel = props.position.minEducationLevel?.value ?? null
    data.value.seniority = props.position?.seniority?.value ?? null
    data.value.experience = props.position.experience
    data.value.hardSkills = props.position.hardSkills
    data.value.keys = [
      'minEducationLevel',
      'seniority',
      'experience',
      'hardSkills',
    ]
  } else if (section === POSITION_SECTION.SOFT_SKILLS) {
    data.value.organisationSkills = props.position.organisationSkills
    data.value.teamSkills = props.position.teamSkills
    data.value.timeManagement = props.position.timeManagement
    data.value.communicationSkills = props.position.communicationSkills
    data.value.leadership = props.position.leadership
    data.value.keys = [
      'organisationSkills',
      'teamSkills',
      'timeManagement',
      'communicationSkills',
      'leadership',
    ]
  } else if (section === POSITION_SECTION.LANGUAGE_SKILLS) {
    languageRequirements.value = [...props.position.languageRequirements]
    data.value.keys = [
      'languageRequirements',
    ]
  } else if (section === POSITION_SECTION.RECRUITMENT) {
    data.value.hardSkillsWeight = props.position.hardSkillsWeight
    data.value.softSkillsWeight = props.position.softSkillsWeight
    data.value.languageSkillsWeight = props.position.languageSkillsWeight
    data.value.keys = [
      'hardSkillsWeight',
      'softSkillsWeight',
      'languageSkillsWeight',
    ]
  } else if (section === POSITION_SECTION.OTHER) {
    data.value.note = props.position.note
    data.value.keys = [
      'note',
      'files',
    ]
  }
}

function getClassifiersBySection(section: POSITION_SECTION): CLASSIFIER_TYPE[] {
  if (section === POSITION_SECTION.INFO) {
    return [
      CLASSIFIER_TYPE.FIELD,
      CLASSIFIER_TYPE.WORKLOAD,
      CLASSIFIER_TYPE.EMPLOYMENT_RELATIONSHIP,
      CLASSIFIER_TYPE.EMPLOYMENT_FORM,
    ]
  } else if (section === POSITION_SECTION.OFFER) {
    return [
      CLASSIFIER_TYPE.SALARY_TYPE,
      CLASSIFIER_TYPE.SALARY_FREQUENCY,
      CLASSIFIER_TYPE.CURRENCY,
      CLASSIFIER_TYPE.BENEFIT,
    ]
  } else if (section === POSITION_SECTION.HARD_SKILLS) {
    return [
      CLASSIFIER_TYPE.EDUCATION_LEVEL,
      CLASSIFIER_TYPE.SENIORITY,
    ]
  } else if (section === POSITION_SECTION.LANGUAGE_SKILLS) {
    return [
      CLASSIFIER_TYPE.LANGUAGE,
      CLASSIFIER_TYPE.LANGUAGE_LEVEL,
    ]
  }

  return []
}

async function initSection(section: POSITION_SECTION): Promise<void> {
  // firstly, fill the form data with the right data
  // based on section
  fillForm(section)

  const neededClassifiers = getClassifiersBySection(section)
  const loadedClassifiers = Object.keys(classifiers.value)
  const missingClassifiers = neededClassifiers.filter(classifier => ! loadedClassifiers.includes(classifier))

  // all classifiers are loaded
  if (missingClassifiers.length === 0) {
    return
  }

  loading.value = true

  // load missing classifiers to render the modal
  const result = await handle(() => api.classifier.index(missingClassifiers).then(res => res._data!.data.classifiers))

  loading.value = false

  if (!result.success) {
    return
  }

  // merge in loaded classifiers
  classifiers.value = {...classifiers.value, ...result.result}
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

function onHidden(): void {
  internalSection.value = null
  clearForm()
}

watch(() => props.section, (section) => {
  if (section) {
    initSection(section)
    internalSection.value = section
  }
})
</script>