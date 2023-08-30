import casinoService from '@/services/casinoService'
import { defineStore } from 'pinia'

export const useCasinoCategoryGamesStore = defineStore('casinoCategoryGames', {
  state: () => ({
    loading: false,
    categoryGames: null
  }),
  actions: {
    fetchCasinoGamesByCategory (categorySlug) {
      return new Promise(async (resolve, reject) => {
        this.categoryGames = null
        this.loading = true

        const [data, err] = await casinoService.show(categorySlug)

        this.loading = false

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          reject(err)
          return
        }

        this.categoryGames = [{
          name: categorySlug,
          slug: categorySlug,
          games: data
        }]

        resolve(data)
      })
    },
    concatCasinoGamesByCategory (payload) {
      return new Promise(async (resolve, reject) => {
        this.loading = true

        const [data, err] = await casinoService.show(payload.categorySlug, { page: payload.page })

        this.loading = false

        if (err) {
          // // commit('errors/setErrors', err.errors, { root: true })
          reject(err)
          return
        }

        const children = this.categoryGames[0].games.concat(data)
        this.categoryGames[0].games = children

        resolve(data)
      })
    }
  },
  getters: {
    getCasinoLoading (state) {
      return state.loading
    },
    getCasinoCategoryGames (state) {
      return state.categoryGames
    }
  }
})
