export default defineEventHandler(async (event: any) => {
    const routes = [
        '/components'
    ]

    const path = getRequestPath(event)

    // do not use this middleware on other routes than the components page
    if (! routes.some(route => path.startsWith(route))) {
        return
    }

    const config = useRuntimeConfig(event) as { env: string }

    // do not allow this page to be visited
    // on production environment
    if (config.env !== 'production') {
        return
    }

    throw createError({ statusCode: 404, statusMessage: 'Page not found.' })
})