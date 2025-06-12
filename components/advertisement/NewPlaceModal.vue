<template>
  <CommonModal :open="open" :title="'Přidat publikační místo'" @close="close" @hidden="clearForm">
    <template #content>
      <CommonForm id="advertisement-new-place-modal" :handler="handler" class="divide-y divide-gray-200">

        <div class="p-4 space-y-4">

          <FormInput
              v-if="data.isCustom"
              v-model="data.custom"
              name="custom"
              :label="'Publikační místo'"
              :maxlength="255"
              required
          />

          <FormSelect
              v-else
              v-model="data.place"
              name="place"
              :option-loader="createClassifierSelectLoader(CLASSIFIER_TYPE.PUBLICATION_PLACE)"
              :label="'Publikační místo'"
              required
          />

          <FormCheckbox
              v-model="data.isCustom"
              name="isCustom"
              :label="'Vlastní'"
          />

        </div>

        <div class="p-4 flex items-center justify-between">
          <CommonButton
              variant="secondary"
              :label="$t('common.action.cancel')"
              @click="close"
          />
          <CommonButton
              type="submit"
              variant="primary"
              :label="$t('common.action.add')"
          />
        </div>

      </CommonForm>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import type {FormHandler} from "~/types/components/common/form.types";
import type {Place} from "~/types/components/advertisement/form.types";
import {createClassifierSelectLoader} from "~/functions/classifier";
import {CLASSIFIER_TYPE} from "~/types/enums";

const props = defineProps<{
  open: boolean
  dateFrom: string | null
  dateTo: string | null
}>()

const data = ref<Place>({
  place: null,
  isCustom: false,
  custom: null,
})

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'create', place: Place): void,
}>()

function close(): void {
  emit('close')
}

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    emit('create', {...data.value})
  }
}

function clearForm(): void {
  data.value.place = null
  data.value.isCustom = false
  data.value.custom = null
}

watch(() => data.value.isCustom, (value) => {
  if (value) {
    data.value.place = null
  } else {
    data.value.custom = null
  }
})
</script>