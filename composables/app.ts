import type {ComputedRef, Ref} from "vue";
import type {AnyComponent, Promisable, Translation} from "~/types/common";

type AppTitle = {
    title?: Translation | null
    icon?: AnyComponent | null
    actions?: AppTitleAction[]
}

type AppTitleAction = {
    handler: () => Promisable<void>
    label?: Translation
    icon?: AnyComponent
    color?: 'primary' | 'secondary' | 'danger'
    tooltip?: Translation
}

type AppState = {
    title: AppTitle | null
    loading: boolean
}

const useAppState = (): Ref<AppState> => {
    return useState<AppState>('app', () => ({
        title: null,
        loading: false,
    }))
}

export type UseApp = {
    title: ComputedRef<AppTitle | null>,
    isLoading: ComputedRef<boolean>,
    setTitle: (value: Partial<AppTitle> | null) => void
    setLoading: (value: boolean) => void
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