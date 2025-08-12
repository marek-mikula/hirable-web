import type {AuthUser} from "~/repositories/resources";
import type {UseAuth} from "~/types/composables/auth.types";
import type {ROLE} from "~/types/enums";

const useUserState = <LoggedIn = false>() => {
    // @ts-expect-error complicated Typescript typing
    return useState<LoggedIn extends true ? AuthUser : (AuthUser | null)>('user', () => null)
}

const useAuthState = () => {
    return useState<boolean | null>('auth', () => useAuthStateCookie().value)
}

const useAuthStateCookie = () => {
    const expires = new Date()
    expires.setFullYear(expires.getFullYear() + 1)

    return useCookie<boolean | null>('_auth', {
        default: () => null,
        expires,
        path: '/',
        httpOnly: false,
        sameSite: 'lax'
    })
}

export const useAuth = <LoggedIn = false>(): UseAuth<LoggedIn> => {
    const shouldFetchUser = computed(() => useAuthState().value ?? true)
    const isLoggedIn = computed(() => useUserState().value !== null)

    const setUser = (user: AuthUser | null): void => {
        useUserState().value = user
    }

    const loginUser = (user: AuthUser): void => {
        setUser(user)
        useAuthState().value = true
        useAuthStateCookie().value = true
    }

    const logoutUser = (setAuthState: boolean): void => {
        setUser(null)

        if (setAuthState) {
            useAuthState().value = false
            useAuthStateCookie().value = false
        }
    }

    const hasRole = (role: ROLE): boolean => {
        return useUserState().value?.companyRole === role
    }

    return {
        user: useUserState<LoggedIn>(),
        shouldFetchUser,
        isLoggedIn,
        logoutUser,
        loginUser,
        setUser,
        hasRole,
    }
}