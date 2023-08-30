// https://nuxt.com/docs/api/configuration/nuxt-config
import en from './locales/en.json'
import pt from './locales/pt.json' 
import es from './locales/es.json' 

export default defineNuxtConfig({
    modules: [
        'dayjs-nuxt',
        ['@nuxtjs/i18n', {
            locales: ['pt', 'en', 'es'],
            defaultLocale: 'pt',
            locale: 'pt',
            messages: { pt, en, es },
            detectBrowserLanguage: {
                useCookie: true,
                cookieKey: 'i18n_redirected',
                alwaysRedirect: true
            }
        }],
        '@pinia/nuxt'
    ],
    plugins: [
        { src: '~/plugins/fontawesome.js' },
        { src: '~/plugins/useBootstrap.client.ts', mode: 'client' }
    ],
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css',
        '@/assets/layout/styles.scss',
        '@/assets/icons/css/style.css'
    ]
})
