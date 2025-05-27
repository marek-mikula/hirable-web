import type {LANGUAGE} from "~/types/enums";
import type {Component} from "vue";

export type AnyComponent = string | Component

export type Promisable<T> = T | Promise<T>

export type StringMap<V> = Record<string, V>
export type NumberMap<V> = Record<number, V>

export type Locale = {
    code: LANGUAGE
    label: string
    file: {
        path: string
        cache: boolean
    }
}

export type SelectOption<V = string | number> = { value: V, label: Translation, translate: true } | { value: string | number, label: string, translate?: false }
export type SelectOptionLoader = () => Promisable<SelectOption[]>
export type SelectSearcher = (q: string | null) => Promisable<SelectOption[]>

export type Translation = string | { key: string, values?: any[] | StringMap<any> }

export type HandleResult<T> = { success: true, result: T } | { success: false, error: unknown }