import settingsService from '@/services/settingsService'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      settings: null,
      ads: null,
      slides: null,
      loading: false,
      errors: null,
      scripts: {
        head: null,
        body: null
      }
    }
  },
  actions: {
    testFetch () {
      console.log('being called correctly')
    },
    fetchSettings () {
      return new Promise(async (resolve, reject) => {
        this.loading = true

        const [data, err] = await settingsService.getPlanData()
        console.log('data', data)
        console.log('err', err)

        this.loading = false

        if (err) {
          const errorMessage = err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Erro ao buscar de configuração da plataforma!'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          this.errors = err.response.data
          reject(err)
          return
        }

        this.settings = data
        
        resolve(data)
      })
    },
    fetchSliders () {
      return new Promise(async (resolve, reject) => {
        this.loading = true

        const [data, err] = await settingsService.getSlides()

        this.loading = false

        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar baners da plataforma!'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          this.errors = err.response.data
          reject(err)
          return
        }

        this.slides = data
        resolve(data)
      })
    },
    fetchAds () {
      return new Promise(async (resolve, reject) => {
        this.loading = true

        const [data, err] = await settingsService.getAds()

        this.loading = false

        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar imagens promocionais!'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          this.errors = err.response.data
          reject(err)
          return
        }

        this.ads = data
        resolve(data)
      })
    },
    commitSettings (settings) {
      this.settings = settings
    },
    commitAds (ads) {
      this.ads = ads
    },
    commitSlides (slides) {
      this.slides = slides
    },
    setScriptsHead (script) {
      this.scripts.head = script
    },
    setScriptsHead (script) {
      this.scripts.body = script
    }
  },
  getters: {
    getSettingsLoading (state) {
      return state.loading
    },
    currentSettings (state) {
      return state.settings
    },
    currentAds (state) {
      return state.ads
    },
    currentSlides (state) {
      return state.slides
    }
  }
})
