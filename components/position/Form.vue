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
          required
      />

      <FormSuggestInput
          v-model="data.department"
          class="col-span-6 md:col-span-3"
          name="department"
          :suggester="createPositionDepartmentsSuggester()"
          :label="$t('model.position.department')"
          :hint="$t('form.hint.position.department')"
          :maxlength="255"
      />

      <FormSelect
          v-model="data.field"
          class="col-span-6 md:col-span-3"
          name="field"
          :options="classifiers[CLASSIFIER_TYPE.FIELD] ?? []"
          :label="$t('model.position.field')"
      />

      <FormMultiSelect
          v-model="data.workloads"
          class="col-span-6 md:col-span-3"
          name="workloads"
          :label="$t('model.position.workload')"
          :options="classifiers[CLASSIFIER_TYPE.WORKLOAD] ?? []"
          required
          hide-search
      />

      <FormMultiSelect
          v-model="data.employmentRelationships"
          class="col-span-6 md:col-span-3"
          name="employmentRelationships"
          :label="$t('model.position.employmentRelationship')"
          :options="classifiers[CLASSIFIER_TYPE.EMPLOYMENT_RELATIONSHIP] ?? []"
          required
          hide-search
      />

      <FormMultiSelect
          v-model="data.employmentForms"
          class="col-span-6 md:col-span-3"
          name="employmentForms"
          :label="$t('model.position.employmentForm')"
          :options="classifiers[CLASSIFIER_TYPE.EMPLOYMENT_FORM] ?? []"
          required
          hide-search
          @change="onEmploymentFormChange"
      />

      <FormInput
          v-model="data.jobSeatsNum"
          class="col-span-6 md:col-span-3"
          name="jobSeatsNum"
          type="number"
          :label="$t('model.position.jobSeatsNum')"
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
          :maxlength="2000"
          required
      />

      <FormCheckbox
          v-model="data.isTechnical"
          class="col-span-6 md:col-span-3"
          name="isTechnical"
          :label="$t('model.position.isTechnical')"
          :hint="$t('form.hint.position.isTechnical')"
          @change="onIsTechnicalChange"
      />

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
          @change="onSalarySpanChange"
      />

      <FormInput
          v-if="salarySpan"
          v-model="data.salaryFrom"
          type="number"
          class="col-span-6 md:col-span-3"
          name="salaryFrom"
          :label="$t('model.position.salaryFrom')"
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
          required
      />

      <FormSelect
          v-model="data.salaryType"
          class="col-span-6 md:col-span-3"
          name="salaryType"
          :label="$t('model.position.salaryType')"
          :options="classifiers[CLASSIFIER_TYPE.SALARY_TYPE] ?? []"
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
      />

      <FormMultiSelect
          v-model="data.benefits"
          class="col-span-6 md:col-span-3"
          name="benefits"
          :label="$t('model.position.benefits')"
          :options="classifiers[CLASSIFIER_TYPE.BENEFIT] ?? []"
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
      />

      <FormSelect
          v-if="data.isTechnical"
          v-model="data.seniority"
          class="col-span-6 md:col-span-3"
          name="seniority"
          :label="$t('model.position.seniority')"
          :options="classifiers[CLASSIFIER_TYPE.SENIORITY] ?? []"
      />

      <FormInput
          v-model="data.experience"
          type="number"
          class="col-span-6 md:col-span-3"
          name="experience"
          :min="0"
          :step="1"
          :label="$t('model.position.experience')"
      />

      <FormMultiSelect
          v-model="data.drivingLicence"
          class="col-span-6 md:col-span-3"
          name="drivingLicence"
          :label="$t('model.position.drivingLicence')"
          :options="classifiers[CLASSIFIER_TYPE.DRIVING_LICENCE] ?? []"
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
      />

      <FormSelect
          v-model="languageLevel"
          ref="languageLevelSelect"
          class="col-span-6 md:col-span-3"
          name="languageLevel"
          :label="$t('model.common.languageLevel')"
          :disabled="!language"
          :options="classifiers[CLASSIFIER_TYPE.LANGUAGE_LEVEL] ?? []"
          hide-search
      />

      <div class="col-span-6">
        <CommonButton
            :label="$t('common.action.add')"
            :disabled="!language || !languageLevel"
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
      />

      <FormSlider
          v-model="data.teamSkills"
          class="col-span-6"
          name="teamSkills"
          :label="$t('model.position.teamSkills')"
          :step="1"
          :max="10"
      />

      <FormSlider
          v-model="data.timeManagement"
          class="col-span-6"
          name="timeManagement"
          :label="$t('model.position.timeManagement')"
          :step="1"
          :max="10"
      />

      <FormSlider
          v-model="data.communicationSkills"
          class="col-span-6"
          name="communicationSkills"
          :label="$t('model.position.communicationSkills')"
          :step="1"
          :max="10"
      />

      <FormSlider
          v-model="data.leadership"
          class="col-span-6"
          name="leadership"
          :label="$t('model.position.leadership')"
          :step="1"
          :max="10"
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
      />

      <FormMultiFileUpload
          v-model="data.files"
          class="col-span-6"
          name="files"
          :label="$t('model.position.files')"
          :max-size="10 * 1024 * 1024"
      />

    </div>

    <div>
      <CommonButton
          type="submit"
          :label="$t('common.action.save')"
          :loading="isLoading"
          :disabled="isLoading"
      />
    </div>

  </CommonForm>
</template>

<script setup lang="ts">
import _ from 'lodash'
import type {SelectOption} from "~/types/common";
import type {FormHandler} from "~/types/components/common/form.types";
import type {SelectExpose} from "~/types/components";
import type {ClassifiersMap} from "~/repositories/classifier/responses";
import {CLASSIFIER_TYPE} from "~/types/enums";
import {createPositionDepartmentsSuggester} from "~/functions/suggest";

const props = defineProps<{
  classifiers: ClassifiersMap
}>()

const api = useApi()

const languageSelect = ref<SelectExpose|null>(null)
const languageLevelSelect = ref<SelectExpose|null>(null)

const salarySpan = ref<boolean>(false)

const language = ref<string|null>(null)
const languageLevel = ref<string|null>(null)
const languageRequirements = ref<{language: SelectOption, level: SelectOption}[]>([])

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
  drivingLicence: string[],
  languageRequirements: { language: string, level: string }[]
  organisationSkills: number
  teamSkills: number
  timeManagement: number
  communicationSkills: number
  leadership: number
  note: string | null
  files: File[]
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
  drivingLicence: [],
  languageRequirements: [],
  organisationSkills: 0,
  teamSkills: 0,
  timeManagement: 0,
  communicationSkills: 0,
  leadership: 0,
  note: null,
  files: []
})

const shouldShowAddress = computed(() => {
  return data.value.employmentForms.includes('on_site') || data.value.employmentForms.includes('hybrid')
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.position.store(collectData())
  },
}

function collectData(): FormData {
  const formData = new FormData()

  formData.set('name', _.toString(data.value.name))
  formData.set('department', _.toString(data.value.department))
  formData.set('field', _.toString(data.value.field))
  formData.set('jobSeatsNum', _.toString(data.value.jobSeatsNum))
  formData.set('description', _.toString(data.value.description))
  formData.set('isTechnical', _.toString(data.value.isTechnical))
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
  formData.set('drivingLicence', _.toString(data.value.drivingLicence))
  formData.set('organisationSkills', _.toString(data.value.organisationSkills))
  formData.set('teamSkills', _.toString(data.value.teamSkills))
  formData.set('timeManagement', _.toString(data.value.timeManagement))
  formData.set('communicationSkills', _.toString(data.value.communicationSkills))
  formData.set('leadership', _.toString(data.value.leadership))
  formData.set('note', _.toString(data.value.note))

  for (const [index, workload] of data.value.workloads.entries()) {
    formData.set(`workloads[${index}]`, _.toString(workload))
  }

  for (const [index, employmentRelationship] of data.value.employmentRelationships.entries()) {
    formData.set(`employmentRelationship[${index}]`, _.toString(employmentRelationship))
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

function onEmploymentFormChange(value: string[]): void {
  if (!value.includes('on_site') && !value.includes('hybrid')) {
    data.value.address = null
  }
}

function onIsTechnicalChange(value: boolean): void {
  if (!value) {
    data.value.seniority = null
  }
}
</script>
