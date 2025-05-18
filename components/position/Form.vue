<template>
  <CommonForm id="position-form" v-slot="{ isLoading, firstError }" class="space-y-8" :handler="handler">

    <div class="grid grid-cols-6 lg:gap-4 gap-3">

      <h2 class="col-span-6 text-base font-semibold">
        Základní informace
      </h2>

      <FormInput
          v-model="data.name"
          class="col-span-6"
          name="name"
          label="Název pozice"
          required
      />

      <FormInput
          v-model="data.department"
          class="col-span-6 md:col-span-3"
          name="department"
          label="Oddělení"
      />

      <FormSelect
          v-model="data.field"
          class="col-span-6 md:col-span-3"
          name="field"
          label="Obor"
          :option-loader="createClassifierSelectLoader(CLASSIFIER_TYPE.FIELD)"
      />

      <FormMultiSelect
          v-model="data.employmentType"
          class="col-span-6 md:col-span-3"
          name="employmentType"
          label="Pracovní poměr"
          :option-loader="createClassifierSelectLoader(CLASSIFIER_TYPE.EMPLOYMENT_TYPE)"
          required
      />

      <FormMultiSelect
          v-model="data.employmentForm"
          class="col-span-6 md:col-span-3"
          name="employmentForm"
          label="Forma spolupráce"
          :option-loader="createClassifierSelectLoader(CLASSIFIER_TYPE.EMPLOYMENT_FORM)"
          required
      />

      <FormCheckbox
          v-model="data.technical"
          class="col-span-6 md:col-span-3"
          name="technical"
          label="Technická pozice"
          @change="onTechnicalChange"
      />

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 gap-4">

      <h2 class="col-span-6 text-base font-semibold">
        Místo výkonu práce
      </h2>

      <FormInput
          class="col-span-6"
          name="address"
          label="Adresa pracoviště"
      />

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 gap-4">

      <h2 class="col-span-6 text-base font-semibold">
        Nabídka
      </h2>

      <FormCheckbox
          v-model="salarySpan"
          class="col-span-6"
          name="salarySpan"
          label="Rozpětí mzdy"
      />

      <FormInput
          v-if="salarySpan"
          v-model="data.salaryFrom"
          type="number"
          class="col-span-6 md:col-span-3"
          name="salaryFrom"
          label="Mzda od"
          required
      />

      <FormInput
          v-if="salarySpan"
          v-model="data.salaryTo"
          type="number"
          class="col-span-6 md:col-span-3"
          name="salaryTo"
          label="Mzda do"
          required
      />

      <FormInput
          v-if="!salarySpan"
          v-model="data.salary"
          type="number"
          class="col-span-6"
          name="salary"
          label="Mzda"
          required
      />

      <FormSelect
          v-model="data.salaryType"
          class="col-span-6 md:col-span-3"
          name="salaryType"
          label="Typ mzdy"
          :option-loader="createClassifierSelectLoader(CLASSIFIER_TYPE.SALARY_TYPE)"
          required
          disable-empty
      />

      <FormSelect
          v-model="data.salaryCurrency"
          class="col-span-6 md:col-span-3"
          name="salaryCurrency"
          label="Měna"
          :option-loader="createClassifierSelectLoader(CLASSIFIER_TYPE.CURRENCY)"
          required
          disable-empty
      />

      <FormInput
          v-model="data.salaryVar"
          type="text"
          class="col-span-6 md:col-span-3"
          name="salaryVar"
          label="Variabilní složka"
      />

      <FormMultiSelect
          v-model="data.benefits"
          class="col-span-6 md:col-span-3"
          name="benefits"
          label="Benefity"
          :option-loader="createClassifierSelectLoader(CLASSIFIER_TYPE.BENEFIT)"
      />

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 gap-4">

      <h2 class="col-span-6 text-base font-semibold">
        Hard skills požadavky
      </h2>

      <FormSelect
          class="col-span-6 md:col-span-3"
          name="minEducationLevel"
          label="Minimální dosažené vzdělání"
          :option-loader="createClassifierSelectLoader(CLASSIFIER_TYPE.EDUCATION_LEVEL)"
      />

      <FormSelect
          v-if="data.technical"
          class="col-span-6 md:col-span-3"
          name="seniority"
          label="Seniorita"
          :option-loader="createClassifierSelectLoader(CLASSIFIER_TYPE.SENIORITY)"
      />

      <FormInput
          type="number"
          class="col-span-6 md:col-span-3"
          name="experience"
          label="Min. počet odpracovaných roků"
      />

      <FormInput
          class="col-span-6 md:col-span-3"
          name="technologies"
          label="Technologie"
      />

      <FormInput
          class="col-span-6 md:col-span-3"
          name="certificates"
          label="Certifikace"
      />

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 gap-4">

      <h2 class="col-span-6 text-base font-semibold">
        Jazykové požadvky
      </h2>

      <FormSelect
          class="col-span-6 md:col-span-3"
          name="language"
          label="Jazyk"
          :option-loader="createClassifierSelectLoader(CLASSIFIER_TYPE.LANGUAGE)"
      />

      <FormSelect
          class="col-span-6 md:col-span-3"
          name="languageLevel"
          label="Úroveň jazyka"
          :option-loader="createClassifierSelectLoader(CLASSIFIER_TYPE.LANGUAGE_LEVEL)"
      />

      <div class="col-span-6">
        <CommonButton
            :label="$t('common.action.add')"
        />
      </div>

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 gap-4">

      <h2 class="col-span-6 text-base font-semibold">
        Soft skills požadavky
      </h2>

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 gap-4">

      <h2 class="col-span-6 text-base font-semibold">
        Nábor
      </h2>

      <FormMultiSelect
          class="col-span-6 md:col-span-3"
          name="requiredDocuments"
          label="Požadované soubory pro nábor"
          :option-loader="createClassifierSelectLoader(CLASSIFIER_TYPE.DOCUMENT_TYPE)"
      />

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 gap-4">

      <h2 class="col-span-6 text-base font-semibold">
        Ostatní
      </h2>

      <FormTextarea
          v-model="data.note"
          class="col-span-6"
          name="note"
          label="Poznámka"
          :maxlength="2000"
      />

      <FormMultiFileUpload
          class="col-span-6"
          name="files"
          label="Přílohy"
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
import type {FormHandler} from "~/types/common";
import {createClassifierSelectLoader} from "~/functions/classifier";
import {CLASSIFIER_TYPE} from "~/types/enums";

const api = useApi()

const salarySpan = ref<boolean>(true)
const data = ref({
  name: null,
  department: null,
  field: null,
  employmentType: [],
  employmentForm: [],
  technical: false,
  address: null,
  salaryFrom: null,
  salaryTo: null,
  salary: null,
  salaryType: null,
  salaryCurrency: null,
  salaryVar: null,
  benefits: [],
  note: null,
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    // todo
  },
}

function onTechnicalChange(value: boolean): void {
  if (!value) {
    // todo
  }
}
</script>
