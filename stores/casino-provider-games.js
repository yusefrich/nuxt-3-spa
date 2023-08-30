import casinoService from '@/services/casinoService'
import { defineStore } from 'pinia'

export const useCasinoProviderGamesStore = defineStore('casinoProviderGames', {
  state: () => ({
    loading: false,
    providerGames: null
  }),
  action: {
    fetchCasinoGamesByProvider (slug) {
      return new Promise(async (resolve, reject) => {
        this.providerGames = null
        this.loading = true

        const [data, err] = await casinoService.showProviderGames(slug)

        this.loading = false

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          reject(err)
          return
        }

        this.providerGames = [{
          name: slug,
          slug,
          games: data
        }]
        resolve(data)
      })
    },
    concatCasinoGamesByProvider (payload) {
      return new Promise(async (resolve, reject) => {
        this.loading = true

        const [data, err] = await casinoService.showProviderGames(payload.providerSlug, { page: payload.page })

        this.loading = false

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          reject(err)
          return
        }

        const children = this.providerGames[0].games.concat(data)
        this.providerGames[0].games = children

        resolve(data)
      })
    }
  },
  getters: {
    getCasinoLoading (state) {
      return state.loading
    },
    getCasinoProviderGames (state) {
      return state.providerGames
    }
  }
})
