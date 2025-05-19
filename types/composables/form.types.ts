import type {Ref} from "vue";
import type {StringMap} from "~/types/common";
import type {InvalidDataResponse} from "~/repositories/responses";

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