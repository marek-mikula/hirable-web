import {FetchError} from "ofetch";

// this plugin loads currently logged-in user
// when he hard-refreshes the whole page
export default defineNuxtPlugin({
    name: 'auth',
    dependsOn: ['api'],
    async setup() {
        const {
            shouldFetchUser,
            isLoggedIn,
            logoutUser,
            loginUser
        } = useAuth()

        // user is not logged in
        // => there is no need to
        // fetch user
        if (! shouldFetchUser.value) {
            return
        }

        // just to be sure, u never know ¯\_(ツ)_/¯
        if (isLoggedIn.value) {
            return
        }

        const api = useApi()

        try {
            const response = await api.auth.me()

            // login user
            loginUser(response._data!.data.user)
        } catch (e) {
            if (! (e instanceof FetchError)) {
                logoutUser(false)

                throw e
            }

            // user is not logged in, just return
            if (e.statusCode === 401) {
                logoutUser(true)

                return
            }

            logoutUser(false)

            throw e
        }
    }
})