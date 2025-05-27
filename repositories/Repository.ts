import type {StringMap} from "~/types/common";
import type {JsonResponse, Response, BaseRequestOptions, RequestOptions} from "~/types/request";
import type {FetchOptions, ResponseType} from "ofetch";
import {$fetch} from "ofetch";

export abstract class Repository {
    protected get<
        R extends JsonResponse,
        T extends ResponseType = 'json'
    >(uri: string, options?: BaseRequestOptions): Response<R, T> {
        return this.request<R, T>({uri, method: 'GET', ...(options || {})})
    }

    protected post<
        R extends JsonResponse,
        T extends ResponseType = 'json'
    >(uri: string, options?: BaseRequestOptions): Response<R, T> {
        return this.request<R, T>({uri, method: 'POST', ...(options || {})})
    }

    protected put<
        R extends JsonResponse,
        T extends ResponseType = 'json'
    >(uri: string, options?: BaseRequestOptions): Response<R, T> {
        return this.request<R, T>({uri, method: 'PUT', ...(options || {})})
    }

    protected patch<
        R extends JsonResponse,
        T extends ResponseType = 'json'
    >(uri: string, options?: BaseRequestOptions): Response<R, T> {
        return this.request<R, T>({uri, method: 'PATCH', ...(options || {})})
    }

    protected delete<
        R extends JsonResponse,
        T extends ResponseType = 'json'
    >(uri: string, options?: BaseRequestOptions): Response<R, T> {
        return this.request<R, T>({uri, method: 'DELETE', ...(options || {})})
    }

    private async request<
        R extends JsonResponse,
        T extends ResponseType,
    >(options: RequestOptions): Response<R, T> {
        const config = useRuntimeConfig()

        // sometimes we need to use different
        // api base url, because request can
        // be made from server side, which can
        // run in docker (in this case, the
        // base url will be different)
        const baseUrl = import.meta.server
            ? config.apiServerBaseUrl as string
            : config.public.apiBaseUrl as string

        const locale = useCookie('_locale')

        let defaultHeaders: StringMap<string> = {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
            'Accept-Language': locale.value || process.env.APP_LOCALE || 'en',
        }

        // specify content type if payload is
        // not in the form of form data
        if (!(options.data instanceof FormData)) {
            defaultHeaders['Content-Type'] = 'application/json'
        }

        // Laravel cannot proceed FormData with PATCH, PUT and DELETE methods,
        // so we replace those methods with POST and set a new query param
        // https://laravel.com/docs/11.x/routing#form-method-spoofing
        if (['PATCH', 'PUT', 'DELETE'].includes(options.method) && options.data instanceof FormData) {
            options.query = {...(options.query || {}), '_method': options.method}
            options.method = 'POST'
        }

        // fetch CSRF token for specific methods
        if (['POST', 'PUT', 'DELETE', 'PATCH'].includes((options.method).toUpperCase())) {
            defaultHeaders['X-XSRF-TOKEN'] = await this.retrieveCsrfToken()
        }

        // add server headers if we are making a
        // request on server side
        if (import.meta.server) {
            defaultHeaders = {...defaultHeaders, ...this.getServerHeaders()}
        }

        const requestOptions: FetchOptions<T> = {
            retry: 0, // do not retry requests
            // timeout: 5_000,
            method: options.method,
            headers: {...defaultHeaders, ...(options.headers || {})},
            query: options.query || {},
            baseURL: baseUrl,
            credentials: 'include',
            mode: 'cors',
            signal: options.signal,
        }

        // include data for specific methods
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method)) {
            requestOptions.body = options.data || {}
        }

        // todo handle case when request._data is undefined

        // do not include any try/catch brackets,
        // the error handling happens outside of
        // repository, repo just sends the HTTP
        // request
        return await $fetch.raw<R, T>(options.uri, requestOptions)
    }

    private getServerHeaders(): StringMap<string> {
        const config = useRuntimeConfig()

        // attach origin header on server side,
        // otherwise Sanctum won't work
        const headers: StringMap<string> = {
            'Origin': config.url as string,
        }

        const sessionCookie = useCookie(config.sessionCookie).value

        // attach session cookie when on server side,
        // otherwise the cookie won't be sent!
        if (sessionCookie) {
            headers['Cookie'] = `${config.sessionCookie}=${sessionCookie}`
        }

        return headers
    }

    private async retrieveCsrfToken(): Promise<string> {
        const cookie = useCookie('XSRF-TOKEN')

        if (cookie.value) {
            return cookie.value
        }

        await this.request({uri: '/api/auth/csrf', method: 'GET'})

        // cannot use refreshCookie, because it
        // does not work :/
        return useCookie('XSRF-TOKEN').value as string
    }
}