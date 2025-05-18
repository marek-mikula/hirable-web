import _ from 'lodash'
import type {HandleResult, Translation, Promisable} from "~/types/common";
import type {VueI18n} from "vue-i18n";
import type {RouteLocationNormalized} from "vue-router";
import {errorHandler} from "~/error/ErrorHandler";

export const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const isRoute = (name: string, options?: {
    startsWith?: boolean
    route?: RouteLocationNormalized
}): boolean => {
    const routeName = (options?.route?.name || useRoute().name || '') as string
    return options?.startsWith ? routeName.startsWith(name) : routeName === name
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

    return needles.some(n => haystack.includes(n))
}

export const goBack = async () => {
    await useRouter().back()
}

export const translate = (translation: Translation): string => {
    // we need to get i18n instance like this
    // instead of useI18n() composable, otherwise
    // it does not work, because that composable
    // must be called only in setup
    const { t } = useNuxtApp().$i18n as VueI18n

    if (_.isString(translation)) {
        return t(translation)
    }

    return t(translation.key, translation.values || {})
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

export const handle = async <T = void>(
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