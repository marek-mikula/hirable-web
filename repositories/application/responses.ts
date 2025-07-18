import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {Application, TokenInfo} from "~/repositories/resources";

export type TokenInfoResponse = JsonResponse<RESPONSE_CODE.SUCCESS, TokenInfo>

export type ApplyResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    application: Application
}>
