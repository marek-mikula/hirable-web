import type {Ref} from "vue/dist/vue";

export type ConfirmModalData = {
    title: string
    text: string
    confirmButtonText?: string
    cancelButtonText?: string
    onClose?: () => void
    onConfirmed?: () => void
    onCanceled?: () => void
    onShown?: () => void
    onHidden?: () => void
}

export type UseModalConfirm = {
    modalConfirmData: Ref<ConfirmModalData | null>
    showConfirmModal: (data: ConfirmModalData) => void
    showConfirmModalPromise: (data: ConfirmModalData) => Promise<boolean|null>
    hideConfirmModal: () => void
}