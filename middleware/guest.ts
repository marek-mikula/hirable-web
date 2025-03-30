export default defineNuxtRouteMiddleware((to) => {
    const { isLoggedIn } = useAuth()
    const afterLogout = to.query.afterLogout

    if (! afterLogout && isLoggedIn.value) {
        return navigateTo('/')
    }
})