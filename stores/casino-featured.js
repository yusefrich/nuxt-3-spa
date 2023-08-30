import casinoService from '@/services/casinoService'
import { defineStore } from 'pinia'

export const useCasinoFeaturedStore = defineStore('casinoFeatured', {
  state: () => ({
    loading: false,
    mostPlayed: null,
    newGames: null
  }),
  action: {
    fetchCasinoMostPlayedGames () {
      return new Promise(async (resolve, reject) => {
        this.mostPlayed = null
        this.loading = true

        const [data, err] = await casinoService.mostPlayed()

        this.loading = false

        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar jogo!'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }
        this.mostPlayed = [{
          name: 'Mais Jogados',
          slug: 'mocked-most',
          games: data
        }]
        resolve(data)
      })
    },
    concatCasinoMostPlayedGames (page) {
      return new Promise(async (resolve, reject) => {
        this.loading = true

        const [data, err] = await casinoService.mostPlayed({ page })

        this.loading = false

        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar jogo!'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }
        
        const children = this.mostPlayed[0].games.concat(data)
        this.mostPlayed[0].games = children
        resolve(data)
      })
    },
    fetchCasinoNewGames () {
      return new Promise(async (resolve, reject) => {
        this.newGames = null
        this.loading = true

        const [data, err] = await casinoService.new()

        this.loading = false

        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar jogo!'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }

        this.newGames = [{
          name: 'Lançamentos',
          slug: 'mocked-new',
          games: data
        }]
        resolve(data)
      })
    },
    concatCasinoNewGames (page) {
      return new Promise(async (resolve, reject) => {
        this.loading = true

        const [data, err] = await casinoService.new({ page })

        this.loading = false

        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar jogo!'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }

        const children = this.newGames[0].games.concat(data)
        this.newGames[0].games = children

        resolve(data)
      })
    }

  },
  getters: {
    getCasinoFeaturedLoading (state) {
      return state.loading
    },
    getCasinoMostPlayedGames (state) {
      return state.mostPlayed
    },
    getCasinoNew (state) {
      return state.newGames
    }
  }
})
