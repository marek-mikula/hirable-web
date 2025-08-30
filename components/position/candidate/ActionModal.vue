<template>
  <CommonModal
      v-if="action && candidate"
      :open="opened"
      :title="$t('modal.position.candidate.createAction.title') + ' ' + $t(`model.positionCandidateAction.types.${action}`)"
      :title-icon="BoltIcon"
      width="2xl"
      @close="close"
      @hidden="onModalHidden"
  >
    <template #content>
      <CommonForm id="position-candidate-action-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="p-4">
          <div class="col-span-1 flex rounded-md shadow-xs">
            <div class="flex w-16 shrink-0 items-center justify-center rounded-l-md bg-gray-200 text-sm font-medium text-gray-900">
              {{ initials(candidate.fullName) }}
            </div>
            <div class="flex-1 truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
              <div class="flex-1 truncate px-4 py-2 text-sm">
                <NuxtLink :to="`/candidates/${candidate.id}`" target="_blank" class="font-medium text-gray-900 hover:text-gray-600">
                  {{ candidate.fullName }}
                </NuxtLink>
                <p class="text-gray-500">
                  <CommonClipboard :value="candidate.email"/> • <CommonClipboard :value="candidate.phone"/>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 space-y-3">

          todo form

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
              :label="$t('common.action.confirm')"
              :loading="isLoading"
          />
        </div>

      </CommonForm>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import { BoltIcon } from "@heroicons/vue/24/outline";
import type {FormHandler} from "~/types/components/common/form.types";
import type {ActionModalExpose} from "~/types/components/position/candidate/actionModal.types";
import type {Candidate} from "~/repositories/resources";
import {ACTION_TYPE} from "~/types/enums";

const opened = ref<boolean>(false)
const action = ref<ACTION_TYPE|null>(null)
const candidate = ref<Candidate|null>(null)
const nextCandidates = ref<Candidate[]>([])

const handler: FormHandler = {
  async onSubmit(): Promise<void> {

  }
}

function open(actionType: ACTION_TYPE, candidates: Candidate[]): void {
  if (candidates.length === 0) {
    throw new Error('Cannot open Action model with no candidates.')
  }

  candidate.value = candidates[0]
  nextCandidates.value = candidates.slice(1)
  action.value = actionType
  opened.value = true
}

function close(): void {
  opened.value = false
}

function onModalHidden(): void {
  action.value = null
  nextCandidates.value = []
  candidate.value = null
}

defineExpose<ActionModalExpose>({
  open,
  close,
})
</script>