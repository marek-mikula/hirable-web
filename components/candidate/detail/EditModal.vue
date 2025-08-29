<template>
  <CommonModal :open="section !== null" width="xl" :title="$t('modal.candidate.edit.title')" @close="emit('close')" @hidden="onHidden">
    <template #content>
      <CommonForm id="candidate-edit-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div v-if="loading" class="p-4 flex justify-center">
          <CommonSpinner variant="primary" size="size-8"/>
        </div>

        <div v-else class="p-4 space-y-3">

          <template v-if="internalSection === CANDIDATE_SECTION.INFO">

            <FormInput
              v-model="data.firstname"
              name="firstname"
              :label="$t('model.common.firstname')"
              :maxlength="255"
              :error="firstError('firstname')"
              required
            />

            <FormInput
                v-model="data.lastname"
                name="lastname"
                :label="$t('model.common.lastname')"
                :maxlength="255"
                :error="firstError('lastname')"
                required
            />

            <FormInput
                v-model="data.email"
                type="email"
                name="email"
                :label="$t('model.common.email')"
                :maxlength="255"
                :error="firstError('email')"
                required
            />

            <div class="flex flex-col sm:flex-row sm:items-start gap-3 lg:gap-4">

              <FormSelect
                  v-model="data.phonePrefix"
                  name="phonePrefix"
                  class="col-span-2 md:col-span-1 sm:w-30"
                  :label="$t('model.common.phonePrefix')"
                  :error="firstError('phonePrefix')"
                  :options="classifiers[CLASSIFIER_TYPE.PHONE_PREFIX] ?? []"
                  required
                  disable-empty
              />

              <FormInput
                  v-model="data.phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  class="flex-1 min-w-0 col-span-2 md:col-span-1"
                  autocomplete="tel-national"
                  :label="$t('model.common.phoneNumber')"
                  :error="firstError('phoneNumber')"
                  :hint="$t('form.hint.common.phoneNumber')"
                  :maxlength="20"
                  required
              />

            </div>

            <FormSelect
              v-model="data.language"
              name="language"
              :label="$t('model.common.language')"
              :options="getLanguageOptions()"
              :error="firstError('language')"
              required
              hide-search
            />

            <FormSelect
                v-model="data.gender"
                name="gender"
                :label="$t('model.common.gender')"
                :options="getGenderOptions()"
                :error="firstError('gender')"
                hide-search
            />

            <FormInput
                v-model="data.birthDate"
                type="date"
                name="birthDate"
                :label="$t('model.common.birthDate')"
                :error="firstError('birthDate')"
            />

          </template>

          <template v-else-if="internalSection === CANDIDATE_SECTION.LINKS">

            <FormInput
              v-model="data.linkedin"
              type="url"
              name="linkedin"
              :label="$t('model.common.linkedin')"
              :hint="$t('form.hint.common.url')"
              :error="firstError('linkedin')"
            />

            <FormInput
              v-model="data.instagram"
              type="url"
              name="instagram"
              :label="$t('model.common.instagram')"
              :hint="$t('form.hint.common.url')"
              :error="firstError('instagram')"
            />

            <FormInput
              v-model="data.github"
              type="url"
              name="github"
              :label="$t('model.common.github')"
              :hint="$t('form.hint.common.url')"
              :error="firstError('github')"
            />

            <FormInput
              v-model="data.portfolio"
              type="url"
              name="portfolio"
              :label="$t('model.common.portfolio')"
              :hint="$t('form.hint.common.url')"
              :error="firstError('portfolio')"
            />


          </template>

          <template v-else-if="internalSection === CANDIDATE_SECTION.OTHER">

            <FormTags
                v-model="data.tags"
                name="tags[]"
                :label="$t('model.common.tags')"
                :minlength="2"
                :maxlength="30"
                :max="candidateConfig.maxTags"
                :error="firstError('tags', true)"
            />

            <FormFileUpload
                v-model="data.cv"
                name="cv"
                :label="$t('model.candidate.cv')"
                :hint="'Pokud nahrajete nový životopis, starý se přesune do ostatních souborů.'"
                :error="firstError('cv')"
                :formats="candidateConfig.files.cv.extensions"
                :max-size="candidateConfig.files.cv.maxSize"
            />

            <FormMultiFileUpload
                v-model="data.otherFiles"
                name="otherFiles"
                :label="$t('model.candidate.otherFiles')"
                :error="firstError('otherFiles', true)"
                :formats="candidateConfig.files.other.extensions"
                :max-size="candidateConfig.files.other.maxSize"
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
          />
        </div>

      </CommonForm>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import type {FormHandler} from "~/types/components/common/form.types";
import type {CandidateShow} from "~/repositories/resources";
import type {UpdateData} from "~/repositories/candidate/inputs";
import type {ClassifiersMap} from "~/repositories/classifier/responses";
import {CANDIDATE_SECTION, CLASSIFIER_TYPE} from "~/types/enums";
import {getGenderOptions, getLanguageOptions} from "~/functions/select";
import {candidateConfig} from "~/config/candidate";

const props = defineProps<{
  candidate: CandidateShow
  section: CANDIDATE_SECTION | null
}>()

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'update', candidate: CandidateShow): void,
}>()

const moment = useMoment()
const dataCollector = useDataCollector()
const api = useApi()
const toaster = useToaster()

const internalSection = ref<CANDIDATE_SECTION|null>(null)
const loading = ref<boolean>(false)
const classifiers = ref<ClassifiersMap>({})

const data = ref<UpdateData>({
  keys: [],
  firstname: null,
  lastname: null,
  gender: null,
  language: null,
  email: null,
  phonePrefix: null,
  phoneNumber: null,
  linkedin: null,
  instagram: null,
  github: null,
  portfolio: null,
  birthDate: null,
  tags: [],
  cv: null,
  otherFiles: []
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.candidate.update(props.candidate.id, dataCollector.collect(data.value))

    await toaster.success({
      title: 'toast.candidate.edit'
    })

    const { candidate } = response._data!.data

    emit('update', candidate)
  }
}

function clearForm(): void {
  data.value.keys = []
  data.value.firstname = null
  data.value.lastname = null
  data.value.gender = null
  data.value.language = null
  data.value.email = null
  data.value.phonePrefix = null
  data.value.phoneNumber = null
  data.value.linkedin = null
  data.value.instagram = null
  data.value.github = null
  data.value.portfolio = null
  data.value.birthDate = null
  data.value.tags = []
}

function prepareForm(section: CANDIDATE_SECTION): void {
  if (section === CANDIDATE_SECTION.INFO) {
    data.value.firstname = props.candidate.firstname
    data.value.lastname = props.candidate.lastname
    data.value.email = props.candidate.email
    data.value.phonePrefix = props.candidate.phonePrefix
    data.value.phoneNumber = props.candidate.phoneNumber
    data.value.language = props.candidate.language
    data.value.gender = props.candidate.gender
    data.value.birthDate = props.candidate.birthDate ? moment(props.candidate.birthDate).format('YYYY-MM-DD') : null
    data.value.keys = [
        'firstname',
        'lastname',
        'email',
        'phone',
        'language',
        'gender',
        'birthDate',
    ]
  } else if (section === CANDIDATE_SECTION.LINKS) {
    data.value.linkedin = props.candidate.linkedin
    data.value.instagram = props.candidate.instagram
    data.value.github = props.candidate.github
    data.value.portfolio = props.candidate.portfolio
    data.value.keys = [
      'linkedin',
      'instagram',
      'github',
      'portfolio',
    ]
  } else if (section === CANDIDATE_SECTION.OTHER) {
    data.value.tags = props.candidate.tags
    data.value.keys = [
      'tags',
      'cv',
      'otherFiles',
    ]
  }
}

function getClassifiersBySection(section: CANDIDATE_SECTION): CLASSIFIER_TYPE[] {
  if (section === CANDIDATE_SECTION.INFO) {
    return [
      CLASSIFIER_TYPE.PHONE_PREFIX
    ]
  }

  return []
}

async function initSection(section: CANDIDATE_SECTION): Promise<void> {
  // firstly, fill the form data with the right data based on section
  prepareForm(section)

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