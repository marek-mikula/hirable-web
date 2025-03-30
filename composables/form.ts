import type {StringMap} from "~/types/common";
import type {InvalidDataResponse} from "~/types/request";
import _ from 'lodash'
import type {Ref} from "vue";

export type UseForm = {
    isLoading: Ref<boolean>
    setIsLoading: (value: boolean) => void
    errors: Ref<StringMap<string[]>>
    clearErrors: () => void
    parseErrors: (response: InvalidDataResponse) => void
    firstError: (field: string) => string | null
    firstArrayError: (field: string) => string | null
    setError: (field: string, error: string | string[]) => void
}

export const useForm = (): UseForm => {
    const isLoading = ref<boolean>(false)

    const setIsLoading = (value: boolean): void => {
        isLoading.value = value
    }

    const errors = ref<StringMap<string[]>>({})

    const clearErrors = (): void => {
        errors.value = {}
    }

    const parseErrors = (response: InvalidDataResponse): void => {
        errors.value = response.data.errors
    }

    const firstError = (field: string): string | null => {
        return _.get(errors.value, field, [])[0] || null
    }

    const firstArrayError = (field: string): string | null => {
        for (const [key, value] of Object.entries(errors.value)) {
            if (_.startsWith(key, field)) {
                return value[0]
            }
        }

        return null
    }

    const setError = (field: string, error: string | string[]): void => {
        errors.value[field] = _.isArray(error) ? error : [error]
    }

    return {
        isLoading,
        setIsLoading,
        errors,
        clearErrors,
        parseErrors,
        firstError,
        firstArrayError,
        setError,
    }
}