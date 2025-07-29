import _ from 'lodash'
import type {HandleResult, Translation, Promisable, SelectOption} from "~/types/common";
import type {VueI18n} from "vue-i18n";
import type {RouteLocationNormalized} from "vue-router";
import {errorHandler} from "~/error/ErrorHandler";
import {FetchError} from "ofetch";
import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";

export const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const filterNull = <T>(items: (T | null)[]): T[] => {
    return items.filter((item): item is T => item !== null)
}

export const isRoute = (name: string, options?: {
    startsWith?: boolean
    route?: RouteLocationNormalized
}): boolean => {
    const routeName = (options?.route?.name || useRoute().name || '') as string
    return options?.startsWith ? routeName.startsWith(name) : routeName === name
}

export const getI18n = (): VueI18n => {
    // we need to get i18n instance like this
    // instead of useI18n() composable, otherwise
    // it does not work, because that composable
    // must be called only in setup
    return useNuxtApp().$i18n as VueI18n
}

export const searchInString = (haystack: string, needle: string): boolean => {
    haystack = haystack
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

    const needles = needle
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .split(' ')
        .filter(item => item.length > 0)

    return needles.some(n => haystack.includes(n))
}

export const goBack = async () => {
    await useRouter().back()
}

export const translate = (translation: Translation): string => {
    if (_.isString(translation)) {
        return getI18n().t(translation)
    }

    return getI18n().t(translation.key, translation.values || {})
}

export const translateOption = (option: SelectOption): string => {
    return option.translate ? translate(option.label) : option.label
}

export const initials = (text: string, n: number = 2): string => {
    if (n === 1) {
        return text.slice(0, 1).toUpperCase()
    }

    return text.split(' ').slice(0, n).map(word => word.slice(0, 1)).join('').toUpperCase()
}

// taken from https://gist.github.com/zentala/1e6f72438796d74531803cc3833c039c
export const formatBytes = (bytes: number, decimals: number = 2) => {
    if (bytes === 0) {
        return 'OB'
    }

    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

export const beforeLast = (value: string, delimiter: string) => {
    if (delimiter === '') {
        return value
    }

    const substrings = value.split(delimiter)

    return substrings.length === 1
        ? value
        : substrings.slice(0, -1).join(delimiter)
}

export const deepCopy = <T>(object: T): T => {
    return JSON.parse(JSON.stringify(object)) as T
}

export const getYear = (): number => new Date().getFullYear()

export const isJsonResponseError = <T = JsonResponse>(e: any, code?: RESPONSE_CODE): e is FetchError<T> => {
    return e instanceof FetchError && (!code || (e as FetchError<JsonResponse>).response!._data!.code === code)
}

export const handle = async <T>(
    callback: () => Promise<T>,
    onError?: (e: any) => Promisable<boolean>
): Promise<HandleResult<T>> => {
    try {
        return { success: true, result: await callback() }
    } catch (e: any) {
        // error has been handled in a
        // custom handler
        if (onError && await onError(e)) {
            return { success: false, error: e }
        }

        // handle the error in
        // common error handler
        await errorHandler.handle(e)

        return { success: false, error: e }
    }
}

export const generateUid = (prefix?: string, postfix?: string): string => {
    return (prefix ?? '') + Date.now().toString(36) + Math.random().toString(36).substring(2) + (postfix ?? '')
}