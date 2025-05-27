import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";

export type SuggestResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    values: string[]
}>
