export default defineNuxtPlugin({
    name: 'locale',
    dependsOn: ['auth'],
    async setup() {
        const {user} = useAuth()

        // user is not logged in => ignore this plugin
        if (!user.value) {
            return
        }

        const expires = new Date()
        expires.setFullYear(expires.getFullYear() + 1)

        const cookie = useCookie<string | null>('_locale', {
            default: () => process.env.APP_LOCALE || 'en',
            httpOnly: false,
            secure: process.env.APP_ENV !== 'local',
            expires,
            sameSite: 'lax',
            path: '/',
            domain: process.env.APP_DOMAIN || 'localhost'
        })

        if (cookie.value === user.value!.language) {
            return
        }

        // update cookie value if changed
        // to set the correct locale
        cookie.value = user.value!.language
    }
})