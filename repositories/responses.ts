import type {RESPONSE_CODE} from "~/types/enums";
import type {AuthUser} from "~/repositories/resources";
import type {StringMap} from "~/types/common";
import type {JsonResponse} from "~/types/request";

export type ThrottleResponse = JsonResponse<RESPONSE_CODE.TOO_MANY_ATTEMPTS>

export type UnauthenticatedResponse = JsonResponse<RESPONSE_CODE.UNAUTHENTICATED>

export type UnauthorizedResponse = JsonResponse<RESPONSE_CODE.UNAUTHORIZED>

export type GuestOnlyResponse = JsonResponse<RESPONSE_CODE.GUEST_ONLY, {
    user: AuthUser
}>

export type InvalidDataResponse = JsonResponse<RESPONSE_CODE.INVALID_CONTENT, {
    // key is field name and value
    // is array of error messages
    errors: StringMap<string[]>
}>