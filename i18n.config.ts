import en from './locales/en.json'
import pt from './locales/pt.json' 
import es from './locales/es.json' 

export default defineI18nConfig(() => ({
    legacy: true,
    fallbackLocale: 'en-us',
    locale: 'pt-br',
    messages: { pt, en, es }
}))
