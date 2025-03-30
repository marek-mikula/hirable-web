export default defineNuxtRouteMiddleware((to) => {
    const { isLoggedIn } = useAuth()

    if (! isLoggedIn.value) {
        return navigateTo({
            path: '/login',
            query: {
                backlink: to.fullPath
            }
        })
    }
})