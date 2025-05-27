import type {Ref} from "vue";
import type {ConfirmModalData, UseModalConfirm} from "~/types/composables/modalConfirm.types";

const useModalConfirmState = (): Ref<ConfirmModalData | null> => {
    return useState<ConfirmModalData | null>('modalConfirmData', () => null)
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