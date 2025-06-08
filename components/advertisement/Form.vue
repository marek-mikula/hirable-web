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
        class="col-span-6 md:col-span-3"
        name="position"
        :label="$t('model.advertisement.position')"
        :error="firstError('position')"
        :searcher="createAdvertisementPositionsSearcher()"
        required
      />

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
import {ADVERTISEMENT_TYPE} from "~/types/enums";
import {createAdvertisementPositionsSearcher} from "~/functions/search";

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
  type: ADVERTISEMENT_TYPE
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
  type: ADVERTISEMENT_TYPE.HTML,
  shareSalary: false,
  shareContact: true,
  places: []
})

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    console.log(data.value)
  },
}

function init(): void {

}

onMounted(init)
</script>
