import settingsService from '@/services/settingsService'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    overlay: false,
    slides: null,
    popup: false,
    options: {
      filter: true,
      footer: true,
      field: false,
      inplaySidebar: false,
      sports: true, // used only for sp sidebar
      fullpageFilter: false,
      sidebar: true,
      casino: false,
      ticket: true,
      raw: false // used only for nsx info pages
    },
    theme: 'dark'
  }),
  actions: {
    updatePopupStatus (value) {
      this.popup = value
    },
    fetchCurrentSlides () {
      return new Promise(async (resolve, reject) => {
        this.slides = null

        const [data, err] = await settingsService.getSlides()

        if (err) {
          reject(err)
        }

        this.slides = data
        resolve(data)
      })
    },
    /**
     * @param {boolean} status - The string
     */
    updateOverlay ( status) {
      this.overlay = status
    },
    updateOptions (options) {
      const newOptions = {
        filter: Object.prototype.hasOwnProperty.call(options, 'filter') ? options.filter : true,
        footer: Object.prototype.hasOwnProperty.call(options, 'footer') ? options.footer : true,
        field: Object.prototype.hasOwnProperty.call(options, 'field') ? options.field : false,
        inplaySidebar: Object.prototype.hasOwnProperty.call(options, 'inplaySidebar') ? options.inplaySidebar : false, // used only for sp sidebar
        sports: Object.prototype.hasOwnProperty.call(options, 'sports') ? options.sports : true, // used only for sp sidebar
        fullpageFilter: Object.prototype.hasOwnProperty.call(options, 'fullpageFilter') ? options.fullpageFilter : false,
        sidebar: Object.prototype.hasOwnProperty.call(options, 'sidebar') ? options.sidebar : true,
        casino: Object.prototype.hasOwnProperty.call(options, 'casino') ? options.casino : false,
        ticket: Object.prototype.hasOwnProperty.call(options, 'ticket') ? options.ticket : true,
        raw: Object.prototype.hasOwnProperty.call(options, 'raw') ? options.raw : false // used only for nsx info pages
      }
      state.options = newOptions
    },
    changeTheme (payload) {
      this.theme = payload
    }
  },
  getters: {
    getPopupStatus (state) {
      return state.popup
    },
    getSlides (state) {
      return state.slides
    },
    getOverlay (state) {
      return state.overlay
    },
    getOptions (state) {
      return state.options
    },
    // sem chamada
    validatingCpfOnRegister () {
      return process.env.CPF_VALIDATOR
    },
    getCurrentLayoutComponent () {
      switch (process.env.LAYOUT) {
        case 'oldBet365':
          return 'nsx'
        case 'SquarePlus':
          return 'sp'
        case 'FB':
          return 'fb'
        case 'Fb':
          return 'fb'
        case 'FB2':
          return 'fb'
        case 'Fb2':
          return 'fb'
        case 'XBet':
          return 'xb'
        case 'nsx':
          return 'nsx'
        case 'sp':
          return 'sp'
        case 'Xb':
          return 'xb'
        case 'SG':
          return 'sg'
        case 'MD':
          return 'md'
        case 'MODERN':
          return 'md'
        case 'SK':
          return 'sk'
        default:
          return 'default'
      }
    },
    getCurrentCasinoLayoutComponent () {
      switch (process.env.LAYOUT_CASINO) {
        case 'oldBet365':
          return 'nsx'
        case 'SquarePlus':
          return 'sp'
        case 'FB':
          return 'fb'
        case 'Fb':
          return 'fb'
        case 'FB2':
          return 'fb'
        case 'Fb2':
          return 'fb'
        case 'XBet':
          return 'xb'
        case 'nsx':
          return 'nsx'
        case 'sp':
          return 'sp'
        case 'Xb':
          return 'xb'
        case 'SG':
          return 'sg'
        case 'MD':
          return 'md'
        case 'MODERN':
          return 'md'
        case 'SK':
          return 'sk'
        default:
          return null
      }
    },
    getCurrentSportsLayoutComponent () {
      switch (process.env.LAYOUT_SPORTS) {
        case 'oldBet365':
          return 'nsx'
        case 'SquarePlus':
          return 'sp'
        case 'FB':
          return 'fb'
        case 'Fb':
          return 'fb'
        case 'FB2':
          return 'fb'
        case 'Fb2':
          return 'fb'
        case 'XBet':
          return 'xb'
        case 'nsx':
          return 'nsx'
        case 'sp':
          return 'sp'
        case 'Xb':
          return 'xb'
        case 'SG':
          return 'sg'
        case 'MD':
          return 'md'
        case 'MODERN':
          return 'md'
        case 'SK':
          return 'sk'
        default:
          return null
      }
    },
    getCurrentLandingStyle () {
      return process.env.LANDING_STYLE ? process.env.LANDING_STYLE : 'default'
    },
    getCurrentSportsProvider () {
      return process.env.SPORTS_PROVIDER ? process.env.SPORTS_PROVIDER : null
    },
    getCurrentApplicationType () {
      return process.env.PRODUCT_CONFIG ? process.env.PRODUCT_CONFIG + '' : 'all'
    },
    // sem chamada
    getCurrentProductConfigPromoUrl () {
      return process.env.PRODUCT_CONFIG_PROMO_URL ? process.env.PRODUCT_CONFIG_PROMO_URL + '' : '/promo'
    },
    getCurrentLayoutStyle () {
      return process.env.LAYOUT ? process.env.LAYOUT : 'default'
    },
    getCurrentCasinoLayoutStyle () {
      return process.env.LAYOUT_CASINO
    },
    getCurrentSportsLayoutStyle () {
      return process.env.LAYOUT_SPORTS
    },
    getCuracaoToken () {
      return process.env.CURACAO
    },
    getCuracaoTokenFunction () {
      return process.env.CURACAO ? 'apg_' + process.env.CURACAO.replace(/-/g, '_') : null
    },
    getCurrentThemeStyle () {
      return process.env.THEME ? process.env.THEME : false
    },
    getStatscoreConfig () {
      return process.env.STASCORE_CONFIG
    },
    // sem chamada
    showInplayOdds () {
      return process.env.INPLAY_ODDS ? process.env.INPLAY_ODDS : false
    },
    getTheme (state) {
      return state.theme
    }
  }
})
