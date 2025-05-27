import type {FetchResponse, MappedResponseType, ResponseType} from "ofetch";
import type {RESPONSE_CODE} from "~/types/enums";
import type {StringMap} from "~/types/common";

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type BaseRequestOptions = {
    headers?: StringMap<string>
    query?: StringMap<any>
    data?: StringMap<any> | FormData
    signal?: AbortSignal
}

export type RequestOptions = (BaseRequestOptions & {
    uri: string,
    method: RequestMethod
})

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