import type {ComputedRef, Ref} from "vue/dist/vue";
import type {AuthUser} from "~/repositories/resources";

export type UseAuth<LoggedIn = false> = {
    user: Ref<LoggedIn extends true ? AuthUser : (AuthUser | null)>
    shouldFetchUser: ComputedRef<boolean>
    isLoggedIn: ComputedRef<boolean>
    logoutUser: () => void
    loginUser: (user: AuthUser) => void
    setUser: (user: AuthUser | null) => void
}