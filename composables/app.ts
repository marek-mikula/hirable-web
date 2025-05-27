import type { Ref } from "vue";
import type { AppState, AppTitle, UseApp } from "~/types/composables/app.types";

const useAppState = (): Ref<AppState> => {
    return useState<AppState>('app', () => ({
        title: null,
        loading: false,
    }))
}

export const useApp = (): UseApp => {
    const title = computed<AppTitle | null>(() => useAppState().value.title)
    const isLoading = computed<boolean>(() => useAppState().value.loading)

    function setTitle(value: Partial<AppTitle> | null): void {
        useAppState().value = {...useAppState().value, title: value}
    }

    function setLoading(value: boolean): void {
        useAppState().value = {...useAppState().value, loading: value}
    }

    return {
        title,
        isLoading,
        setTitle,
        setLoading
    }
}