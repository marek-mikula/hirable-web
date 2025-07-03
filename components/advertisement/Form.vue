<template>
  <CommonForm id="advertisement-form" v-slot="{ isLoading, firstError }" class="space-y-8" :handler="handler">

    <div class="grid grid-cols-6 lg:gap-4 gap-3">

      <h2 class="col-span-6 text-base font-semibold">
        {{ $t('model.advertisement.sections.basicInfo') }}
      </h2>

      <FormInput
          v-model="data.name"
          class="col-span-6 md:col-span-3"
          name="name"
          :label="$t('model.advertisement.name')"
          :hint="$t('form.hint.advertisement.name')"
          :maxlength="255"
          :error="firstError('name')"
          required
      />

      <FormSearchSelect
        v-model="data.position"
        ref="positionsSelect"
        class="col-span-6 md:col-span-3"
        name="position"
        :options="positionsDefaultOptions"
        :label="$t('model.advertisement.position')"
        :error="firstError('position')"
        :searcher="createAdvertisementPositionsSearcher()"
        :disabled="!!position"
        required
      />

      <FormInput
          v-model="data.dateFrom"
          class="col-span-6 md:col-span-3"
          type="date"
          name="dateFrom"
          :label="$t('model.advertisement.dateFrom')"
          :hint="$t('form.hint.advertisement.dateFrom')"
          :error="firstError('dateFrom')"
          @change="onDateFromChange"
      />

      <FormInput
          v-model="data.dateTo"
          class="col-span-6 md:col-span-3"
          type="date"
          name="dateTo"
          :label="$t('model.advertisement.dateTo')"
          :hint="$t('form.hint.advertisement.dateTo')"
          :error="firstError('dateTo')"
          :min="data.dateFrom"
      />

      <FormSelect
          v-model="data.format"
          class="col-span-6 md:col-span-3"
          name="format"
          :options="formatOptions"
          :label="$t('model.advertisement.format')"
          :hint="$t('form.hint.advertisement.format')"
          :error="firstError('format')"
          hide-search
          disable-empty
          @change="onFormatChange"
      />

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 lg:gap-4 gap-3">

      <div class="col-span-6 flex items-center space x-2">
        <h2 class="flex-1 min-w-0 text-base font-semibold">
          {{ $t('model.advertisement.sections.content') }}
        </h2>

        <CommonButton
            variant="secondary"
            symmetrical
        >
          <SparklesIcon class="size-4"/>
        </CommonButton>
      </div>

      <FormInput
          v-model="data.title"
          class="col-span-6"
          name="title"
          :label="$t('model.advertisement.title')"
          :maxlength="255"
          :error="firstError('title')"
          required
      />

      <FormTextarea
          v-if="data.format === ADVERTISEMENT_FORMAT.TEXT"
          v-model="data.body"
          class="col-span-6"
          name="body"
          :label="$t('model.advertisement.body')"
          :error="firstError('body')"
          required
      />

      <FormWysiwyg
          v-else
          v-model="data.body"
          :config="createAdvertisementWysiwygConfig()"
          :label="$t('model.advertisement.body')"
          :error="firstError('body')"
          name="body"
          class="col-span-6"
          required
      />

      <FormFileUpload
          v-model="data.image"
          :label="$t('model.common.image')"
          :error="firstError('image')"
          :accept="'image/jpeg,image/png'"
          name="image"
          class="col-span-6"
      />

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 lg:gap-4 gap-3">

      <h2 class="col-span-6 text-base font-semibold">
        {{ $t('model.advertisement.sections.settings') }}
      </h2>

      <FormCheckbox
          v-model="data.shareSalary"
          class="col-span-6"
          name="shareSalary"
          :label="$t('model.advertisement.shareSalary')"
          :hint="$t('form.hint.advertisement.shareSalary')"
          :error="firstError('shareSalary')"
      />

      <FormCheckbox
          v-model="data.shareContact"
          class="col-span-6"
          name="shareContact"
          :label="$t('model.advertisement.shareContact')"
          :hint="$t('form.hint.advertisement.shareContact')"
          :error="firstError('shareContact')"
      />

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 lg:gap-4 gap-3">

      <h2 class="col-span-6 text-base font-semibold">
        {{ $t('model.advertisement.sections.places') }}
      </h2>

      <div class="col-span-6">
        <CommonButton
            variant="secondary"
            :label="$t('common.action.add')"
            @click="newPlaceModalOpened = true"
        />
      </div>

      <div v-if="data.places.length > 0" class="col-span-6 flex items-center space-x-2">
        <CommonBadge v-for="(place, index) in data.places" :key="index" variant="info" :label="place.isCustom ? place.custom : translateOption(place.place)" removable/>
      </div>

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 lg:gap-4 gap-3">

      <h2 class="col-span-6 text-base font-semibold">
        {{ $t('model.advertisement.sections.other') }}
      </h2>

      <FormTextarea
          v-model="data.note"
          class="col-span-6"
          name="note"
          :label="$t('model.common.note')"
          :maxlength="2000"
          :error="firstError('note')"
      />

    </div>

    <div class="text-right space-x-2">

      <!-- save button -->
      <CommonButton
          value="save"
          type="submit"
          variant="secondary"
          :label="false ? $t('common.action.save') : $t('common.action.create')"
          :loading="isLoading"
          :disabled="isLoading"
      />

    </div>

    <AdvertisementNewPlaceModal
        :open="newPlaceModalOpened"
        :date-from="data.dateFrom"
        :date-to="data.dateTo"
        @close="newPlaceModalOpened = false"
        @create="addPublicationPlace"
    />

  </CommonForm>
</template>

<script setup lang="ts">
import {SparklesIcon} from "@heroicons/vue/24/outline";
import type {FormHandler} from "~/types/components/common/form.types";
import type {Position} from "~/repositories/resources";
import type {SelectOption} from "~/types/common";
import type {SearchSelectExpose} from "~/types/components/form/searchSelect.types";
import type {Place} from "~/types/components/advertisement/form.types";
import {ADVERTISEMENT_FORMAT} from "~/types/enums";
import {createAdvertisementPositionsSearcher} from "~/functions/search";
import {createAdvertisementWysiwygConfig} from "~/functions/advertisement";

const props = defineProps<{
  position?: Position
}>()

const emit = defineEmits<{
  (e: 'update'): void,
}>()

const { t } = useI18n()
const toaster = useToaster()
const api = useApi()

const textContent = ref<string|null>(null)
const htmlContent = ref<string|null>(null)

const data = ref<{
  name: string | null
  position: number | null
  dateFrom: string | null
  dateTo: string | null
  image: File | null
  title: string | null
  body: string | null
  format: ADVERTISEMENT_FORMAT
  shareSalary: boolean
  shareContact: boolean
  places: Place[]
}>({
  name: null,
  position: null,
  dateFrom: null,
  dateTo: null,
  image: null,
  title: null,
  body: null,
  format: ADVERTISEMENT_FORMAT.HTML,
  shareSalary: false,
  shareContact: true,
  places: []
})

const formatOptions = Object.values(ADVERTISEMENT_FORMAT).map(format => ({
  value: format,
  label: `model.advertisement.formats.${format}`,
  translate: true
}))

const positionsDefaultOptions = ref<SelectOption[]>([])
const positionsSelect=ref<SearchSelectExpose|null>(null)
const newPlaceModalOpened = ref<boolean>(false)

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    console.log(data.value)
  },
}

function onDateFromChange(value: string | null): void {
  if (!data.value.dateTo || !value) {
    return
  }

  const isAfter = useMoment()(value).isAfter(useMoment()(data.value.dateTo))

  if (!isAfter) {
    return
  }

  data.value.dateTo = null
}

function addPublicationPlace(place: Place): void {
  newPlaceModalOpened.value = false

  const exists = place.isCustom
      ? data.value.places.find(item => item.custom === place.custom)
      : data.value.places.find(item => item.place === place.place)

  if (exists !== undefined) {
    // todo add message

    return
  }

  data.value.places.push(place)
}

function onFormatChange(value: ADVERTISEMENT_FORMAT): void {
  if (value === ADVERTISEMENT_FORMAT.HTML) {
    textContent.value = data.value.body
    data.value.body = htmlContent.value
  } else {
    htmlContent.value = data.value.body
    data.value.body = textContent.value
  }
}

function init(): void {
  // preselect position if any
  if (props.position) {
    const option = {
      value: props.position.id,
      label: props.position.name
    }

    positionsDefaultOptions.value = [option]
    positionsSelect.value!.setValue(option)

    return
  }
}

onMounted(init)
</script>
