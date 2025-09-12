<template>
  <div class="divide-y divide-gray-200 border border-gray-200 rounded-md bg-white shadow-xs overflow-hidden">
    <div class="px-4 py-3 bg-gray-100">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        {{ $t('page.company.settings.positionProcess.title') }}
      </h2>
    </div>
    <div class="px-4 py-3 grid grid-cols-1 sm:grid-cols-6 gap-4">

      <div class="sm:col-span-6 space-y-2">

        <CommonAlert variant="info" :title="$t('page.company.settings.positionProcess.processStepInfo')" static/>

        <FormLabel
            :label="$t('page.company.settings.positionProcess.steps')"
            :help="$t('form.help.processSteps')"
            class="block"
        />

        <CommonTable
            :columns="[
                {key: 'step', label: $t('model.processStep.step')},
                {key: 'triggersAction', label: $t('model.processStep.triggersAction')},
                {key: 'isRepeatable', label: $t('model.processStep.isRepeatable')},
                {key: 'actions', label: $t('common.table.actions')},
            ]"
            :items="processSteps"
            :loading="loading"
            :key-attribute="'id'"
            clickable
            @row-click="(item) => updateModalProcessStep = item"
        >

          <template #stepSlot="{item}">
            {{ item.step }}
          </template>

          <template #triggersActionSlot="{item}">
            {{ item.triggersAction ? $t(`model.positionCandidateAction.types.${item.triggersAction}`) : '-' }}
          </template>

          <template #isRepeatableSlot="{item}">
            {{ item.isRepeatable ? $t('common.boolean.yes') : $t('common.boolean.no') }}
          </template>

          <template #actionsSlot="{item}">
            <CommonButton
                variant="danger"
                :size="3"
                :icon="TrashIcon"
                v-tooltip="$t('common.action.delete')"
                @click="deleteProcessStep(item)"
            />
          </template>

          <template #empty>
            {{ $t('page.company.settings.positionProcess.empty') }}
          </template>

        </CommonTable>

      </div>

    </div>
    <div class="px-4 py-3 text-right">

      <CommonButton
          :label="$t('common.action.add')"
          @click="storeModalOpened = true"
      />

    </div>

    <ProcessStepStoreModal :open="storeModalOpened" @close="storeModalOpened = false" @store="onProcessStepStore"/>
    <ProcessStepUpdateModal :process-step="updateModalProcessStep" @close="updateModalProcessStep = null" @update="onProcessStepUpdate"/>

  </div>
</template>

<script setup lang="ts">
import {TrashIcon} from "@heroicons/vue/24/outline";
import type {Company, ProcessStep} from "~/repositories/resources";

const props = defineProps<{
  company: Company
}>()

const emit = defineEmits<{
  (e: 'update', company: Company): void
}>()

const modalConfirm = useModalConfirm()
const toaster = useToaster()
const api = useApi()
const { user } = useAuth<true>()
const {t} = useI18n()

const loading = ref<boolean>(false)
const processSteps = ref<ProcessStep[]>([])

const storeModalOpened = ref<boolean>(false)
const updateModalProcessStep = ref<ProcessStep|null>(null)

async function loadProcessSteps(): Promise<void> {
  loading.value = true

  const result = await handle<ProcessStep[]>(
      async () => api.processStep.index().then(res => res._data!.data!.processSteps)
  )

  loading.value = false

  if (!result.success) {
    return
  }

  processSteps.value = result.result
}

function onProcessStepStore(step: ProcessStep): void {
  storeModalOpened.value = false
  processSteps.value.push(step)
}

function onProcessStepUpdate(step: ProcessStep): void {
  const index = processSteps.value.findIndex(item => item.id === step.id)

  if (index !== -1) {
    processSteps.value.splice(index, 1, step)
  } else {
    processSteps.value.push(step)
  }

  updateModalProcessStep.value = null
}

async function deleteProcessStep(step: ProcessStep): Promise<void> {
  const confirmed = await modalConfirm.showConfirmModalPromise({
    title: t('modal.processStep.delete.title'),
    text: t('modal.processStep.delete.text'),
    manual: true
  })

  if (!confirmed) {
    return
  }

  modalConfirm.setLoading(true)

  const result = await handle(
      async () => api.processStep.delete(step.id)
  )

  modalConfirm.setLoading(false)
  modalConfirm.hideConfirmModal()

  if (!result.success) {
    return
  }

  await toaster.success({
    title: 'toast.processStep.delete'
  })

  const index = processSteps.value.findIndex(item => item.id === step.id)

  if (index !== -1) {
    processSteps.value.splice(index, 1)
  }
}

onMounted(loadProcessSteps)
</script>