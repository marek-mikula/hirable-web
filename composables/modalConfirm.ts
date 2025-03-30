import type {Ref} from "vue";

const useModalConfirmState = (): Ref<ConfirmModalData | null> => {
    return useState<ConfirmModalData | null>('modalConfirmData', () => null)
}

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

export const useModalConfirm = (): UseModalConfirm => {
    const showConfirmModal = (data: ConfirmModalData): void => {
        useModalConfirmState().value = data
    }

    const showConfirmModalPromise = (data: Omit<ConfirmModalData, 'onConfirmed' | 'onCanceled' | 'onClose'>): Promise<boolean|null> => {
        return new Promise((resolve) => {
            useModalConfirmState().value = {
                ...data,
                onConfirmed: () => {
                    resolve(true)
                },
                onCanceled: () => {
                    resolve(false)
                },
                onClose: () => {
                    resolve(null)
                }
            }
        })
    }

    const hideConfirmModal = (): void => {
        useModalConfirmState().value = null
    }

    return {
        modalConfirmData: useModalConfirmState(),
        showConfirmModal,
        showConfirmModalPromise,
        hideConfirmModal,
    }
}