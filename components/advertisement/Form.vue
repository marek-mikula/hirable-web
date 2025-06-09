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
          :error="firstError('dateFrom')"
          :min="useMoment()().format('YYYY-MM-DD')"
          @change="onDateFromChange"
      />

      <FormInput
          v-model="data.dateTo"
          class="col-span-6 md:col-span-3"
          type="date"
          name="dateTo"
          :label="$t('model.advertisement.dateTo')"
          :error="firstError('dateTo')"
          :min="data.dateFrom"
      />

      <FormSelect
          v-model="data.format"
          class="col-span-6 md:col-span-3"
          name="format"
          :options="formatOptions"
          :label="$t('model.advertisement.format')"
          :error="firstError('format')"
          hide-search
      />

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 lg:gap-4 gap-3">

      <h2 class="col-span-6 text-base font-semibold">
        {{ $t('model.advertisement.sections.content') }}
      </h2>

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 lg:gap-4 gap-3">

      <h2 class="col-span-6 text-base font-semibold">
        {{ $t('model.advertisement.sections.settings') }}
      </h2>

    </div>

    <hr class="h-0.5 bg-gray-200 rounded-full border-0">

    <div class="grid grid-cols-6 lg:gap-4 gap-3">

      <h2 class="col-span-6 text-base font-semibold">
        {{ $t('model.advertisement.sections.places') }}
      </h2>

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

  </CommonForm>
</template>

<script setup lang="ts">
import type {FormHandler} from "~/types/components/common/form.types";
import type {Position} from "~/repositories/resources";
import type {SelectOption} from "~/types/common";
import {ADVERTISEMENT_FORMAT} from "~/types/enums";
import {createAdvertisementPositionsSearcher} from "~/functions/search";
import type {SearchSelectExpose} from "~/types/components/form/searchSelect.types";

const props = defineProps<{
  position?: Position
}>()

const emit = defineEmits<{
  (e: 'update'): void,
}>()

const { t } = useI18n()
const toaster = useToaster()
const api = useApi()

const data = ref<{
  name: string | null
  position: number | null
  dateFrom: string | null
  dateTo: string | null
  title: string | null
  body: string | null
  format: ADVERTISEMENT_FORMAT
  shareSalary: boolean
  shareContact: boolean
  places: {}[]
}>({
  name: null,
  position: null,
  dateFrom: null,
  dateTo: null,
  title: null,
  body: null,
  format: ADVERTISEMENT_FORMAT.HTML,
  shareSalary: false,
  shareContact: true,
  places: []
})

const formatOptions = Object.values(ADVERTISEMENT_FORMAT).map(format => ({
  value: format,
  label: format,
}))

const positionsDefaultOptions = ref<SelectOption[]>([])
const positionsSelect=ref<SearchSelectExpose|null>(null)

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

function init(): void {
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
