import type {FetchResponse, MappedResponseType, ResponseType} from "ofetch";
import type {RESPONSE_CODE} from "~/types/enums";

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface BaseRequestOptions {
    headers?: Record<string, string>
    query?: Record<string, any>
    data?: Record<string, any> | FormData
    signal?: AbortSignal
}

export interface RequestOptions extends BaseRequestOptions {
    uri: string,
    method: RequestMethod
}

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
    R extends ResponseType,
    J extends JsonResponse
> = FetchResponse<MappedResponseType<R, J>>