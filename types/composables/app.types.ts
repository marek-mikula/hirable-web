import type {ComputedRef} from "vue";

export type AppState = {
    loading: boolean
}

export type UseApp = {
    isLoading: ComputedRef<boolean>,
    setLoading: (value: boolean) => void
}