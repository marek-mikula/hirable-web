import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {Company} from "~/repositories/resources";

export type ShowResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    company: Company
}>

export type UpdateResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    company: Company
}>