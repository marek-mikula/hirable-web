<template>
  <CommonModal
      v-if="modalConfirmData"
      :open="isOpened"
      :title="modalConfirmData.title"
      @hidden="onHidden"
      @shown="onShown"
      @close="close"
  >
    <template #body>
      <p>{{ modalConfirmData.text }}</p>
    </template>
    <template #foot>
      <div class="flex items-center justify-between">
        <CommonButton
            type="button"
            color="secondary"
            :label="modalConfirmData.cancelButtonText ?? $t('common.action.cancel')"
            @click="cancel"
        />
        <CommonButton
            type="button"
            color="primary"
            :label="modalConfirmData.confirmButtonText ?? $t('common.action.confirm')"
            @click="confirm"
        />
      </div>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
const {
  modalConfirmData,
  hideConfirmModal
} = useModalConfirm()

const isOpened = ref<boolean>(false)

function onShown(): void {
  // call onShown callback
  if (modalConfirmData.value!.onShown) {
    modalConfirmData.value!.onShown()
  }
}

function onHidden(): void {
  // call onHidden callback
  if (modalConfirmData.value!.onHidden) {
    modalConfirmData.value!.onHidden()
  }

  // remove data from the ref
  hideConfirmModal()
}

function confirm(): void {
  // call onConfirm callback
  if (modalConfirmData.value!.onConfirmed) {
    modalConfirmData.value!.onConfirmed()
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