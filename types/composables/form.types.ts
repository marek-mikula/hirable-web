import type {Ref} from "vue";
import type {InvalidDataResponse} from "~/repositories/responses";

export type UseForm = {
    isLoading: Ref<boolean>
    setIsLoading: (value: boolean) => void
    errors: Ref<Record<string, string[]>>
    clearErrors: () => void
    parseErrors: (response: InvalidDataResponse) => void
    firstError: (field: string, startsWith: boolean) => string | null
    setError: (field: string, error: string | string[]) => void
}