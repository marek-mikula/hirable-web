<template>
  <CommonModal width="xl" :open="open" :title="$t('page.position.create.fillFromFile')" :title-icon="DocumentIcon" @close="emit('close')" @hidden="clearForm">
    <template #content>
      <CommonForm id="position-fill-from-file-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="p-4 space-y-3">

          <FormFileUpload
              v-model="file"
              name="file"
              :error="firstError('file')"
              :label="$t('model.common.file')"
              required
          />

        </div>

        <div class="p-4 flex items-center justify-between space-x-2">
          <CommonButton
              variant="secondary"
              :label="$t('common.action.close')"
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
import {DocumentIcon} from "@heroicons/vue/24/outline";
import type {FormHandler} from "~/types/components/common/form.types";
import type {GeneratedPosition} from "~/repositories/resources";

const props = defineProps<{
  open: boolean
}>()

const api = useApi()
const toaster = useToaster()

const file = ref<File|null>(null)

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'fill', position: GeneratedPosition): void,
}>()

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.position.generateFromFile(file.value!)

    await toaster.success({
      title: 'toast.position.fillFromFile'
    })

    emit('fill', response._data!.data.position)
  }
}

function clearForm(): void {
  file.value = null
}
</script>
