import type {ComputedRef} from "vue";
import type {AnyComponent, Promisable, Translation} from "~/types/common";

export type AppTitle = {
    title?: Translation
    subtitle?: Translation
    icon?: AnyComponent
    actions?: AppTitleAction[]
}

export type AppTitleAction = {
    handler: () => Promisable<void>
    label?: Translation
    icon?: AnyComponent
    color?: 'primary' | 'secondary' | 'danger'
    tooltip?: Translation
}

export type AppState = {
    title: AppTitle | null
    loading: boolean
}

export type UseApp = {
    title: ComputedRef<AppTitle | null>,
    isLoading: ComputedRef<boolean>,
    setTitle: (value: Partial<AppTitle> | null) => void
    setLoading: (value: boolean) => void
}