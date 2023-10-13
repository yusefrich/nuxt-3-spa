// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    app: {
        head: {
            script: [
                {
                    src: 'https://unpkg.com/feather-icons',
                    type: 'text/javascript'
                }
            ]
        }
    },
    modules: [
        'dayjs-nuxt',
        '@nuxtjs/i18n',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        'nuxt-lazy-load'
    ],
    i18n: {
        locales: ['PT', 'EN', 'ES'],
        defaultLocale: 'PT',
        legacy: true,
        vueI18n: './i18n.config.ts',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            alwaysRedirect: true
        }
        // locale: 'pt',
    },
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            BASE_URL: process.env.BASE_URL || 'http://localhost:8000',
            LAYOUT: process.env.LAYOUT || 'default',
            CURACAO: process.env.CURACAO || '',
            PRODUCT_CONFIG_AFILIATES_URL: process.env.PRODUCT_CONFIG_AFILIATES_URL || ''
        }
    },
    // plugins: [
    //     { src: '~/plugins/fontawesome.js' },
    //     { src: '~/plugins/ofetch.ts' },
    //     { src: '~/plugins/useBootstrap.client.ts', mode: 'client' }
    // ],
    css: [
        'vue-toast-notification/dist/theme-default.css',
        '@fortawesome/fontawesome-svg-core/styles.css',
        '@/assets/layout/styles.scss',
        '@/assets/icons/css/style.css'
    ]
})
