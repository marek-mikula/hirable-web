import type {
    GuestOnlyResponse,
    JsonResponse,
    ThrottleResponse,
    UnauthenticatedResponse,
    UnauthorizedResponse
} from "~/types/request";
import type {FetchResponse} from "ofetch";
import {FetchError} from "ofetch";
import {RESPONSE_CODE} from "~/types/enums";

class ErrorHandler {

    public async handle(e: any): Promise<void> {
        // always log error into the console
        console.error(e)

        if (e instanceof FetchError) {
            await this.handleFetchError(e)
        } else {
            await this.handleOtherError()
        }
    }

    private async handleFetchError(e: FetchError<JsonResponse>): Promise<void> {
        if (e.response!._data!.code === RESPONSE_CODE.TOO_MANY_ATTEMPTS) {
            await this.handleTooManyAttempts(e.response as FetchResponse<ThrottleResponse>)
        } else if (e.response!._data!.code === RESPONSE_CODE.GUEST_ONLY) {
            await this.handleGuestOnly(e.response as FetchResponse<GuestOnlyResponse>)
        } else if (e.response!._data!.code === RESPONSE_CODE.UNAUTHORIZED) {
            await this.handleUnauthorized(e.response as FetchResponse<UnauthorizedResponse>)
        } else if (e.response!._data!.code === RESPONSE_CODE.UNAUTHENTICATED) {
            await this.handleUnauthenticated(e.response as FetchResponse<UnauthenticatedResponse>)
        } else {
            await this.handleOtherError()
        }
    }

    private async handleUnauthenticated(response: FetchResponse<UnauthenticatedResponse>): Promise<void> {
        const {logoutUser} = useAuth()

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
    }

    private async handleUnauthorized(response: FetchResponse<UnauthorizedResponse>): Promise<void> {
        await useToaster().error({
            title: 'toast.common.unauthorized',
        })
    }

    private async handleGuestOnly(response: FetchResponse<GuestOnlyResponse>): Promise<void> {
        useAuth().loginUser(response._data!.data.user)

        await navigateTo('/')

        await useToaster().warning({
            title: 'toast.common.guest',
        })
    }

    private async handleOtherError(): Promise<void> {
        await useToaster().commonError()
    }

    private async handleTooManyAttempts(response: FetchResponse<ThrottleResponse>): Promise<void> {
        await useToaster().error({
            title: 'toast.common.tooManyRequests',
        })
    }
}

export const errorHandler = new ErrorHandler()