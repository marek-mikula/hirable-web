export default defineNuxtConfig({

    // @ts-expect-error some weird bug with Nuxt typings
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            link: [
                {
                    rel: 'icon',
                    href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🪑</text></svg>'
                },
                // {
                //     rel: 'apple-touch-icon',
                //     sizes: '180x180',
                //     href: '/favicon/apple-touch-icon.png'
                // },
                // {
                //     rel: 'icon',
                //     type: 'image/png',
                //     sizes: '32x32',
                //     href: '/favicon/favicon-32x32.png'
                // },
                // {
                //     rel: 'icon',
                //     type: 'image/png',
                //     sizes: '16x16',
                //     href: '/favicon/favicon-16x16.png'
                // },
                // {
                //     rel: 'manifest',
                //     href: '/favicon/site.webmanifest'
                // },
            ]
        },
    },

    modules: [
        ['@cssninja/nuxt-toaster', {
            installPlugin: false, // disable the default plugin
        }],
        ['@nuxtjs/i18n', {
            restructureDir: 'i18n',
            langDir: 'locales',
            locales: [
                {
                    code: 'en',
                    language: 'en-US',
                    label: 'English',
                    file: {
                        path: 'en.ts',
                        cache: true
                    }
                },
                {
                    code: 'cs',
                    language: 'cs-CZ',
                    label: 'Čeština',
                    file: {
                        path: 'cs.ts',
                        cache: true
                    }
                }
            ],
            strategy: 'no_prefix',
            lazy: true,
            defaultLocale: process.env.APP_LOCALE || 'en',
            detectBrowserLanguage: {
                fallbackLocale: process.env.APP_LOCALE || 'en',
                // redirectOn: 'root', // not using prefix strategy
                useCookie: true,
                cookieKey: '_locale',
                cookieSecure: process.env.APP_ENV !== 'local'
            },
            // routesNameSeparator: '___', // not using prefix strategy
            debug: false,
        }],
        ['@nuxt/eslint', {}]
    ],

    telemetry: false, // disable telemetry data collecting

    devtools: {
        enabled: process.env.APP_ENV === 'local' // enable dev tools only on local environment
    },

    devServer: {
        host: process.env.HOST || 'localhost',
        port: parseInt(process.env.PORT || '3000'),
    },

    css: [
        '~/assets/css/main.css',
    ],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.API_BASE_URL || 'http://localhost',
            contactEmail: process.env.APP_CONTACT_EMAIL || 'info@hirable.cz'
        },
        env: process.env.APP_ENV,
        url: process.env.APP_URL || 'http://localhost:3000',
        apiServerBaseUrl: process.env.API_SERVER_BASE_URL || 'http://host.docker.internal',
        sessionCookie: process.env.SESSION_COOKIE || 'session'
    }

})
