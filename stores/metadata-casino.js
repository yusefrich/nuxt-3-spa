import casinoService from '@/services/casinoService'
import { defineStore } from 'pinia'

export const useMetadataCasinoStore = defineStore('metadataCasino', {
  state: () => ({
    loading: false,
    errors: null,
    categories: null,
    header_games: null,
    header_categories: null,
    sliders: null,
    providers: null
  }),
  actions: {
    fetchCasinoSliders () {
      return new Promise(async (resolve, reject) => {
        this.sliders = null
        this.loading = true

        const [data, err] = await casinoService.getSliders()

        this.loading = false

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          reject(err)
          return
        }

        this.sliders = data
        resolve(data)
      })
    },
    fetchCasinoHeaderGames () {
      return new Promise(async (resolve, reject) => {
        this.header_games = null
        this.loading = true

        const [data, err] = await casinoService.getHeaderGames()

        this.loading = false

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          reject(err)
          return
        }

        this.header_games = data
        resolve(data)
      })
    },
    fetchCasinoHeaderCategories () {
      return new Promise(async (resolve, reject) => {
        this.header_categories = null
        this.loading = true

        const [data, err] = await casinoService.getHeaderCategories()

        this.loading = false

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          reject(err)
          return
        }

        this.header_categories = data
        resolve(data)
      })
    },
    fetchCasinoCategories () {
      return new Promise(async (resolve, reject) => {
        this.categories = null
        this.loading = true

        const [data, err] = await casinoService.getCategories()

        this.loading = false

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          reject(err)
          return
        }

        this.categories = data
        resolve(data)
      })
    },
    fetchCasinoProviders () {
      return new Promise(async (resolve, reject) => {
        this.providers = null
        this.loading = true

        const [data, err] = await casinoService.getProviders()

        this.loading = false

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          reject(err)
          return
        }

        this.providers = data
        resolve(data)
      })
    }
  },
  getters: {
    getCasinoSliders (state) {
      return state.sliders
    },
    getCasinoLoading (state) {
      return state.loading
    },
    getCasinoHeaderGames (state) {
      return state.header_games
    },
    getCasinoHeaderCategories (state) {
      return state.header_categories
    },
    getCasinoCategories (state) {
      return state.categories
    },
    getCasinoProviders (state) {
      return state.providers
    }
  }
})
