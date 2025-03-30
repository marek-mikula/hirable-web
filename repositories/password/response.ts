import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";

export type RequestResetResponse = JsonResponse<RESPONSE_CODE.SUCCESS>

export type ResetResponse = JsonResponse<RESPONSE_CODE.SUCCESS>