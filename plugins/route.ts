export default defineNuxtPlugin({
    name: 'route',
    async setup(nuxtApp) {
        nuxtApp.hook('app:mounted', () => {
            const router = useRouter()
            const app = useApp()

            // reset title after every route change, so
            // it won't stay the same
            router.afterEach((to, from) => {
                if (from.path === to.path) {
                    return
                }

                app.setTitle(null)
            })
        })
    }
})