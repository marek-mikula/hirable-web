<template>
  <CommonModal width="xl" :open="open" :title="$t('page.position.create.fillFromPrompt')" :title-icon="PencilIcon" @close="emit('close')" @hidden="clearForm">
    <template #content>
      <CommonForm id="position-fill-from-prompt-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="p-4 space-y-3">

          <FormTextarea
              v-model="data.prompt"
              name="prompt"
              height="h-52"
              :error="firstError('prompt')"
              :label="$t('common.ai.prompt')"
              :maxlength="2000"
              required
          />

        </div>

        <div class="p-4 flex items-center justify-between space-x-2">
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
import {PencilIcon} from "@heroicons/vue/24/outline";
import type {FormHandler} from "~/types/components/common/form.types";
import type {Position} from "~/repositories/resources";

const props = defineProps<{
  open: boolean
}>()

const api = useApi()
const toaster = useToaster()

const data = ref({
  prompt: null
})

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'fill', position: Position): void,
}>()

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    // todo
  }
}

function clearForm(): void {
  data.value.prompt = null
}
</script>
