import type {ComputedRef} from "vue";

export const useRouteQuery = <T>(name: string, parser?: (val: string) => T): ComputedRef<T> => {
    const route = useRoute()

    return computed<T>(() => {
        const value = (route.query[name] || '') as string

        if (value.length === 0) {
            return null as T
        }

        return parser ? parser(value) : value as T
    })
}

export const useRouteParam = <T>(name: string, parser?: (val: string) => T): ComputedRef<T> => {
    const route = useRoute()

    return computed<T>(() => {
        const value = (route.params[name] || '') as string

        if (value.length === 0) {
            return null as T
        }

        return parser ? parser(value) : value as T
    })
}