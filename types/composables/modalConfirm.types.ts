import type {Ref} from "vue/dist/vue";
import type {VNode} from "vue";

export type ConfirmModalData = {
    title: string
    text: string | VNode // if VNode, html attribute must be true, so it renders correctly
    confirmButtonText?: string
    cancelButtonText?: string
    html?: boolean
    manual?: boolean
    loading?: boolean
    onClose?: () => void
    onConfirmed?: () => void
    onCanceled?: () => void
}

export type UseModalConfirm = {
    modalConfirmData: Ref<ConfirmModalData | null>
    showConfirmModal: (data: ConfirmModalData) => void
    showConfirmModalPromise: (data: ConfirmModalData) => Promise<boolean|null>
    hideConfirmModal: () => void
    setLoading: (value: boolean) => void
}