import type {FetchResponse} from "ofetch";
import type {JsonResponse} from "~/types/request";
import type {UseForm} from "~/composables/form";
import type {LANGUAGE} from "~/types/enums";
import type {Component} from "vue";

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
    onFail?: (response: FetchResponse<JsonResponse>, form: UseForm, event: SubmitEvent) => Promisable<boolean>

    // callback which is triggered when response returns 422
    onError?: (errors: StringMap<string[]>) => Promisable<void>

    // callback which is triggered when errors in the form are cleared
    onErrorClear?: () => Promisable<void>
}

export type SelectOption<V = string | number> = { value: V, label: Translation, translate: true } | { value: string | number, label: string, translate?: false }
export type SelectSearcher = (q: string | null) => Promisable<SelectOption[]>

export type Translation = string | { key: string, values?: any[] | StringMap<any> }