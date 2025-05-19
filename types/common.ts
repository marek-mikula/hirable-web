import type {FetchResponse} from "ofetch";
import type {JsonResponse} from "~/types/request";
import type {LANGUAGE} from "~/types/enums";
import type {Component} from "vue";
import type {UseForm} from "~/types/composables/form.types";

export type AnyComponent = string | Component

export type Promisable<T> = T | Promise<T>

export type VoidHandler = () => void

export type NonEmptyArray<T> = [T, ...T[]]

export type StringMap<V> = Record<string, V>
export type NumberMap<V> = Record<number, V>

export type Color = 'success' | 'info' | 'warning' | 'danger' | 'secondary'

export type Locale = {
    code: LANGUAGE
    label: string
    file: {
        path: string
        cache: boolean
    }
}

export type FormHandler = {
    onSubmit: (form: UseForm, event: SubmitEvent) => Promisable<void>

    // if true is returned, the error has been handled, if false, then otherwise
    onError?: (response: FetchResponse<JsonResponse>, form: UseForm, event: SubmitEvent) => Promisable<boolean>
}

export type SelectValue = null | number | string
export type MultiSelectValue = (number | string)[]
export type SelectOption<V = string | number> = { value: V, label: Translation, translate: true } | { value: string | number, label: string, translate?: false }
export type SelectOptionLoader = () => Promisable<SelectOption[]>
export type SelectSearcher = (q: string | null) => Promisable<SelectOption[]>
export type InputSuggester = (q: string | null) => Promisable<string[]>

export type Translation = string | { key: string, values?: any[] | StringMap<any> }

export type HandleResult<T> = { success: true, result: T } | { success: false, error: unknown }