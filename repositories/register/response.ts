import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {AuthUser} from "~/repositories/resources";

export type RequestResponse = JsonResponse<RESPONSE_CODE.SUCCESS>

export type RegisterResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    user: AuthUser
}>