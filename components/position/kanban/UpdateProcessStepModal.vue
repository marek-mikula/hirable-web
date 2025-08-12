<template>
  <CommonModal :open="kanbanStep !== null" :title="$t('modal.position.kanban.updateProcessStep.title')" :title-icon="PencilIcon" @close="emit('close')" @hidden="clearForm">
    <template #content>
      <CommonForm id="position-update-process-step-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="p-4 space-y-3">

          <FormInput
              v-model="data.label"
              name="label"
              :error="firstError('label')"
              :label="$t('model.common.title')"
              :hint="$t('form.hint.positionProcessStep.label')"
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
              :disabled="isLoading"
          />
        </div>

      </CommonForm>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import {PencilIcon} from "@heroicons/vue/24/outline";
import type {FormHandler} from "~/types/components/common/form.types";
import type {KanbanStep, Position, PositionProcessStep} from "~/repositories/resources";
import type {UpdateData} from "~/repositories/positionProcessStep/inputs";

const props = defineProps<{
  position: Position
  kanbanStep: KanbanStep | null
}>()

const api = useApi()
const toaster = useToaster()

const data = ref<UpdateData>({
  label: null
})

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'update', positionProcessStep: PositionProcessStep): void,
}>()

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const response = await api.positionProcessStep.update(props.position.id, props.kanbanStep!.step.id, data.value)

    await toaster.success({
      title: 'toast.position.kanban.updateProcessStep'
    })

    emit('update', response._data!.data.positionProcessStep)
  }
}

function initForm(kanbanStep: KanbanStep): void {
  data.value.label = kanbanStep.step.label
}

function clearForm(): void {
  data.value.label = null
}

watch(() => props.kanbanStep, (value) => {
  if (value) {
    initForm(value)
  }
})
</script>
