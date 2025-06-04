import type { Ref } from "vue";
import type { AppState, UseApp } from "~/types/composables/app.types";

const useAppState = (): Ref<AppState> => {
    return useState<AppState>('app', () => ({
        loading: false,
    }))
}

export const useApp = (): UseApp => {
    const isLoading = computed<boolean>(() => useAppState().value.loading)

    function setLoading(value: boolean): void {
        useAppState().value = {...useAppState().value, loading: value}
    }

    return {
        isLoading,
        setLoading
    }
}