import casinoService from '@/services/casinoService'
import { defineStore } from 'pinia'

export const useLiveCasinoFeaturedStore = defineStore('liveCasinoFeatured', {
  state: () => ({
    loading: false,
    mostPlayed: null,
    newGames: null,
    errors: null
  }),
  actions: {
    fetchLiveCasinoMostPlayedGames () {
      return new Promise(async (resolve, reject) => {
        this.mostPlayed = null
        this.loading = true
  
        const [data, err] = await casinoService.mostPlayedLive()
  
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
    concatLiveCasinoMostPlayedGames ({ commit }, page) {
      return new Promise(async (resolve, reject) => {
        this.loading = true
  
        const [data, err] = await casinoService.mostPlayedLive({ page })
  
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar jogo!'
  
          this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }

        const children = this.mostPlayed[0].games.concat(mostPlayed)
        this.mostPlayed[0].games = children

        resolve(data)
      })
    },
    fetchLiveCasinoNewGames ({ commit }) {
      return new Promise(async (resolve, reject) => {
        this.newGames = null
        this.loading = true
  
        const [data, err] = await casinoService.newLive()
  
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
    concatLiveCasinoNewGames ({ commit }, page) {
      return new Promise(async (resolve, reject) => {
        this.loading = true
  
        const [data, err] = await casinoService.newLive({ page })
  
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar jogo!'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }

        const children = this.newGames[0].games.concat(newGames)
        this.newGames[0].games = children

        resolve(data)
      })
    }
  },
  getters: {
    getLiveCasinoFeaturedLoading: state => state.loading,
    getLiveCasinoMostPlayedGames: state => state.mostPlayed,
    getLiveCasinoNew: state => state.newGames
  }
})
