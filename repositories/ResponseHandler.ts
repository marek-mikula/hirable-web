import type {
    GuestOnlyResponse,
    JsonResponse,
    ServerErrorResponse,
    ThrottleResponse,
    UnauthenticatedResponse,
    UnauthorizedResponse
} from "~/types/request";
import {HandledRequestError} from "~/exceptions/HandledRequestError";
import type {FetchError, FetchResponse} from "ofetch";
import {RESPONSE_CODE} from "~/types/enums";

class ResponseHandler {
    public async tryHandle(e: FetchError<JsonResponse>): Promise<void> {
        if (e.response!._data!.code === RESPONSE_CODE.SERVER_ERROR) {
            await this.handleServerError(e.response! as FetchResponse<ServerErrorResponse>)
        }

        if (e.response!._data!.code === RESPONSE_CODE.TOO_MANY_ATTEMPTS) {
            await this.handleTooManyAttempts(e.response as FetchResponse<ThrottleResponse>)
        }

        if (e.response!._data!.code === RESPONSE_CODE.GUEST_ONLY) {
            await this.handleGuestOnly(e.response as FetchResponse<GuestOnlyResponse>)
        }

        if (e.response!._data!.code === RESPONSE_CODE.UNAUTHORIZED) {
            await this.handleUnauthorized(e.response as FetchResponse<UnauthorizedResponse>)
        }

        if (e.response!._data!.code === RESPONSE_CODE.UNAUTHENTICATED) {
            await this.handleUnauthenticated(e.response as FetchResponse<UnauthenticatedResponse>)
        }
    }

    private async handleUnauthenticated(response: FetchResponse<UnauthenticatedResponse>): Promise<void> {
        const { logoutUser } = useAuth()

        await useToaster().error({
            title: 'toast.common.unauthenticated',
        })

        await navigateTo({
            path: '/login',
            query: {
                afterLogout: 1
            }
        })

        // logout user after the redirect to
        // login, because otherwise some things
        // like watchers and computed refs
        // can behave weird, because we unset
        // the user from the state
        //
        // also some watchers can still trigger
        // some requests with useAsyncData, so
        // we wait 200 ms
        window.setInterval(logoutUser, 200)

        throw new HandledRequestError(response)
    }

    private async handleUnauthorized(response: FetchResponse<UnauthorizedResponse>): Promise<void> {
        await useToaster().error({
            title: 'toast.common.unauthorized',
        })

        throw new HandledRequestError(response)
    }

    private async handleGuestOnly(response: FetchResponse<GuestOnlyResponse>): Promise<void> {
        useAuth().loginUser(response._data!.data.user)

        await navigateTo('/')

        await useToaster().warning({
            title: 'toast.common.guest',
        })

        throw new HandledRequestError(response)
    }

    private async handleServerError(response: FetchResponse<ServerErrorResponse>): Promise<void> {
        await useToaster().serverError()

        throw new HandledRequestError(response)
    }

    private async handleTooManyAttempts(response: FetchResponse<ThrottleResponse>): Promise<void> {
        await useToaster().error({
            title: 'toast.common.tooManyRequests',
        })

        throw new HandledRequestError(response)
    }
}

export const responseHandler = new ResponseHandler()