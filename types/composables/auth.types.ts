import type {ComputedRef, Ref} from "vue/dist/vue";
import type {AuthUser} from "~/repositories/resources";
import type {ROLE} from "~/types/enums";

export type UseAuth<LoggedIn = false> = {
    user: Ref<LoggedIn extends true ? AuthUser : (AuthUser | null)>
    shouldFetchUser: ComputedRef<boolean>
    isLoggedIn: ComputedRef<boolean>
    logoutUser: (setAuthState: boolean) => void
    loginUser: (user: AuthUser) => void
    setUser: (user: AuthUser | null) => void
    hasRole: (role: ROLE) => boolean
}