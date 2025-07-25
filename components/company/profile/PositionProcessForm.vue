<template>
  <div class="divide-y divide-gray-200 border border-gray-200 rounded-md bg-white shadow-xs">
    <div class="px-4 py-3">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        {{ $t('page.company.settings.positionProcess.title') }}
      </h2>
    </div>
    <div class="px-4 py-3 grid grid-cols-1 sm:grid-cols-6 gap-4">

      <div class="sm:col-span-6 space-y-2">

        <FormLabel
            :label="$t('page.company.settings.positionProcess.steps')"
            :help="{ content: $t('form.help.processSteps') }"
            class="block"
        />

        <CommonTable
            :columns="[
                {key: 'step', label: $t('model.processStep.step')},
                {key: 'actions', label: $t('common.table.actions')},
            ]"
            :items="steps"
            :key-attribute="'id'"
        >

          <template #stepSlot="{item}">
            {{ item.step }}
          </template>

          <template #actionsSlot="{item}">
            <CommonButton
                variant="danger"
                :size="3"
                v-tooltip="{ content: $t('common.action.delete') }"
                symmetrical
            >
              <TrashIcon class="size-4"/>
            </CommonButton>
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

const toaster = useToaster()
const api = useApi()
const { user } = useAuth<true>()

const steps = ref<ProcessStep[]>([])
const storeModalOpened = ref<boolean>(false)

function onProcessStepStore(step: ProcessStep): void {
  storeModalOpened.value = false
  steps.value.push(step)
}
</script>