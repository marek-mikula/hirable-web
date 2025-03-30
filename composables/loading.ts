import type {Ref} from "vue";

const useLoadingState = (): Ref<boolean> => {
    return useState<boolean>('loading', () => false)
}

export type UseLoading = {
    isLoading: Ref<boolean>
    setIsLoading: (state: boolean) => void
}

export const useLoading = (): UseLoading => {
    const setIsLoading = (state: boolean) => {
        useLoadingState().value = state
    }

    return {
        isLoading: useLoadingState(),
        setIsLoading,
    }
}