import type {LANGUAGE} from "~/types/enums";
import type {Component} from "vue";

export type AnyComponent = string | Component

export type Promisable<T> = T | Promise<T>

export type CallbackFn = () => void

export type Locale = {
    code: LANGUAGE
    label: string
    file: {
        path: string
        cache: boolean
    }
}

export type SelectOption<V extends (string | number) = string | number> = { value: V, label: Translation, translate: true } | { value: V, label: string, translate?: false }
export type SelectOptionLoader = () => Promisable<SelectOption[]>
export type SelectSearcher = (q: string | null) => Promisable<SelectOption[]>

export type Translation = string | { key: string, values?: any[] | Record<string, any> }

export type HandleResult<T> = { success: true, result: T } | { success: false, error: unknown }

export type FormValue = string | number | boolean | null | undefined | { [key in string]: FormValue } | File | FormValue[]
export type FormObject = Record<string, FormValue>