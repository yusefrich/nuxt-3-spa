// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    app: {
        head: {
            script: [
                {
                    src: 'https://unpkg.com/feather-icons',
                    type: 'text/javascript'
                },
                {
                    src: process.env.JIVOCHAT ? `//code.jivosite.com/widget/${process.env.JIVOCHAT}` : '',
                    async: true
                }
            ]
        }
    },
    modules: [
        'dayjs-nuxt',
        '@nuxtjs/i18n',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        'nuxt-lazy-load',
        '@zadigetvoltaire/nuxt-gtm',
        'nuxt3-meta-pixel'
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
    gtm: {
        id: process.env.GTM_KEY ? process.env.GTM_KEY : 'GTM-XXX',
        enabled: !!process.env.GTM_KEY
    },
    facebook: {
        /* module options */
        pixelId: process.env.FB_PIXEL_ID,
        autoPageView: true,
        disabled: !!!process.env.FB_PIXEL_ID
    },
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            BASE_URL: process.env.BASE_URL || 'http://localhost:8000',
            LAYOUT: process.env.LAYOUT || 'default',
            CURACAO: process.env.CURACAO || '',
            PRODUCT_CONFIG_AFILIATES_URL: process.env.PRODUCT_CONFIG_AFILIATES_URL || '',
            INTERCOMCHAT: process.env.INTERCOMCHAT,
            LIVECHAT: process.env.LIVECHAT || '',
            TIKTOK_PIXEL_ID: process.env.TIKTOK_PIXEL_ID
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
