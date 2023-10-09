// https://nuxt.com/docs/api/configuration/nuxt-config
import en from './locales/en.json'
import pt from './locales/pt.json' 
import es from './locales/es.json' 

export default defineNuxtConfig({
    modules: [
        'dayjs-nuxt',
        '@nuxtjs/i18n',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt'
    ],
    i18n: {
        locales: ['pt', 'en', 'es'],
        defaultLocale: 'pt',
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
            BASE_URL: process.env.BASE_URL || 'http://localhost:8000'
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
