<template>
  <CommonModal
      v-if="action"
      width="2xl"
      :open="opened"
      :title="$t('modal.position.candidate.action.title', {action: $t(`model.positionCandidateAction.types.${action}`)})"
      @close="close"
      @hidden="onModalHidden"
  >
    <template #content>
      <CommonForm id="position-candidate-action-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

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
import type {FormHandler} from "~/types/components/common/form.types";
import type {ActionModalExpose} from "~/types/components/position/candidate/actionModal.types";
import {ACTION_TYPE} from "~/types/enums";

const opened = ref<boolean>(false)
const action = ref<ACTION_TYPE|null>(null)

const handler: FormHandler = {
  async onSubmit(): Promise<void> {

  }
}

function open(actionType: ACTION_TYPE): void {
  action.value = actionType
  opened.value = true
}

function close(): void {
  opened.value = false
}

function onModalHidden(): void {
  action.value = null
}

defineExpose<ActionModalExpose>({
  open,
  close,
})
</script>