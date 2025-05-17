import type {
    FetchResponse,
    MappedResponseType,
    ResponseType
} from "ofetch";
import type {RESPONSE_CODE} from "~/types/enums";
import type {AuthUser} from "~/repositories/resources";
import type {StringMap} from "~/types/common";

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type BaseRequestOptions = {
    headers?: StringMap<string>
    query?: StringMap<any>
    data?: StringMap<any> | FormData
    signal?: AbortSignal
}

export type RequestOptions = (BaseRequestOptions & { uri: string, method: RequestMethod })

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

export type JsonResponse<
    C extends RESPONSE_CODE = RESPONSE_CODE,
    D extends object | undefined = undefined,
> = D extends undefined ? {
    code: C
    message?: string
} : {
    code: C
    message?: string
    data: D
}

export type Response<
    R extends JsonResponse,
    T extends ResponseType,
> = Promise<FetchResponse<MappedResponseType<T, R>>>