import type {AuthUser} from "~/repositories/resources";
import type {ComputedRef, Ref} from "vue";

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

// pass true as generic if user is logged in
export type UseAuth<LoggedIn = false> = {
    user: Ref<LoggedIn extends true ? AuthUser : (AuthUser | null)>
    shouldFetchUser: ComputedRef<boolean>
    isLoggedIn: ComputedRef<boolean>
    logoutUser: () => void
    loginUser: (user: AuthUser) => void
    setUser: (user: AuthUser | null) => void
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

    const logoutUser = (): void => {
        setUser(null)
        useAuthState().value = false
        useAuthStateCookie().value = false
    }

    return {
        user: useUserState<LoggedIn>(),
        shouldFetchUser,
        isLoggedIn,
        logoutUser,
        loginUser,
        setUser,
    }
}