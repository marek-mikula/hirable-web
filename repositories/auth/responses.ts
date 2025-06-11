import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {AuthUser} from "~/repositories/resources";

export type LoginResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    user: AuthUser
}>

export type LogoutResponse = JsonResponse<RESPONSE_CODE.SUCCESS>

export type MeResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    user: AuthUser
}>