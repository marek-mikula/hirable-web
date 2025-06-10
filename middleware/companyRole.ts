import type {ROLE} from "~/types/enums";

export default (role: ROLE) => defineNuxtRouteMiddleware((to) => {
    const { user } = useAuth()

    if (user.value?.companyRole !== role) {
        return abortNavigation({ statusCode: 403 })
    }
})