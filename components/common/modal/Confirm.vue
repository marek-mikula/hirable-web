<template>
  <LazyCommonModal
      v-if="modalConfirmData"
      :open="isOpened"
      :title="modalConfirmData.title"
      @close="close"
  >
    <template #body>
      <component v-if="modalConfirmData.html" :is="modalConfirmData.text"/>
      <p v-else>{{ modalConfirmData.text }}</p>
    </template>
    <template #foot>
      <div class="flex items-center justify-between">
        <CommonButton
            type="button"
            variant="secondary"
            :label="modalConfirmData.cancelButtonText ?? $t('common.action.cancel')"
            @click="cancel"
        />
        <CommonButton
            type="button"
            variant="primary"
            :label="modalConfirmData.confirmButtonText ?? $t('common.action.confirm')"
            :loading="modalConfirmData.loading"
            :disabled="modalConfirmData.loading"
            @click="confirm"
        />
      </div>
    </template>
  </LazyCommonModal>
</template>

<script setup lang="ts">
const {modalConfirmData} = useModalConfirm()

const isOpened = ref<boolean>(false)

function confirm(): void {
  // call onConfirm callback
  if (modalConfirmData.value!.onConfirmed) {
    modalConfirmData.value!.onConfirmed()
  }

  // user needs to close the modal manually after confirmation
  if (modalConfirmData.value!.manual) {
    return
  }

  close()
}

function cancel(): void {
  // call onCancel callback
  if (modalConfirmData.value!.onCanceled) {
    modalConfirmData.value!.onCanceled()
  }

  close()
}

function close(): void {
  // call onClose callback
  if (modalConfirmData.value!.onClose) {
    modalConfirmData.value!.onClose()
  }

  isOpened.value = false
}

watch(modalConfirmData, (val) => {
  if (val) {
    isOpened.value = true
  }
})
</script>