<template>
  <CommonModal
      :open="open"
      :title="$t('modal.candidate.store.title')"
      :title-icon="UsersIcon"
      @close="close"
      @hidden="onModalHidden"
  >
    <template #content>
      <CommonForm id="candidate-store-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="p-4 space-y-3">

          <CommonAlert :title="$t('modal.candidate.store.message')" static/>

          <FormMultiFileUpload
              v-model="data.cvs"
              name="cvs"
              :label="$t('modal.candidate.store.cvs')"
              :error="firstError('cvs', true)"
              :formats="candidateConfig.files.cv.extensions"
              :max-size="candidateConfig.files.cv.maxSize"
              :max-files="5"
          />

          <FormSearchSelect
              v-model="data.positionId"
              name="positionId"
              :label="$t('modal.candidate.store.position')"
              :error="firstError('positionId', true)"
              :searcher="createEditablePositionsSearcher([POSITION_STATE.OPENED])"
          />

        </div>

        <div class="p-4 flex items-center justify-between">
          <CommonButton
              variant="secondary"
              :label="$t('common.action.close')"
              @click="close"
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
import {UsersIcon} from "@heroicons/vue/24/outline";
import type {FormHandler} from "~/types/components/common/form.types";
import {candidateConfig} from "~/config/candidate.ts";
import {createEditablePositionsSearcher} from "~/functions/search.ts";
import {POSITION_STATE} from "~/types/enums.ts";
import type {StoreData} from "~/repositories/candidate/inputs.ts";

defineProps<{
  open: boolean
}>()

const dataCollector = useDataCollector()
const api = useApi()
const toaster = useToaster()

const data = ref<StoreData>({
  cvs: [],
  positionId: null,
})

const emit = defineEmits<{
  (e: 'close' | 'store'): void,
}>()

function close(): void {
  emit('close')
}

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    await api.candidate.store(dataCollector.collect(data.value))

    await toaster.success({
      title: 'toast.company.contact.store'
    })

    emit('store')
  }
}

function onModalHidden(): void {
  data.value.cvs = []
  data.value.positionId = null
}
</script>
