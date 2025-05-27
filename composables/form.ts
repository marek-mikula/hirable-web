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

    const firstError = (field: string, startsWith: boolean): string | null => {
        if (startsWith) {
            for (const key in errors.value) {
                if (_.startsWith(key, field)) {
                    return errors.value[key][0]
                }
            }
        } else {
            return _.get(errors.value, field, [])[0] || null
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
        setError,
    }
}