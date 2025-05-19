import type {StringMap} from "~/types/common";
import type {InvalidDataResponse} from "~/repositories/responses";
import type {UseForm} from "~/types/composables/form.types";
import _ from 'lodash'

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