import casinoService from '@/services/casinoService'
import { defineStore } from 'pinia'

export const useCasinoStore = defineStore('casino', {
  state: () => ({
    iframeUrl: null,
    loading: false,
    games: null,
    game: null,
    page: 1
  }),
  action: {
    fetchCasinoGameIframeUrl (payload) {
      return new Promise(async (resolve, reject) => {
        this.loading = true

        const [data, err] = await casinoService.fetchIframeUrl(payload)

        this.loading = false
        this.iframeUrl = data

        if (err) {
          // commit('errors/setErrors', err.response.data.errors, { root: true })

          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar jogo! Tente novamente'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }

        resolve(data)
      })
    },
    fetchCasinoBananaLiveIframeUrl (payload) {
      return new Promise(async (resolve, reject) => {
        this.loading = true

        const [data, err] = await casinoService.fetchBananaLiveIframeUrl(payload)

        this.loading = false
        this.iframeUrl = data

        if (err) {
          // commit('errors/setErrors', err.response.data.errors, { root: true })

          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar jogo! Tente novamente'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }

        resolve(data)
      })
    },
    fetchCasinoBananaIframeUrl (payload) {
      return new Promise(async (resolve, reject) => {
        this.loading = true

        const [data, err] = await casinoService.fetchBananaIframeUrl(payload)

        this.loading = false
        this.iframeUrl = data

        if (err) {
          // commit('errors/setErrors', err.response.data.errors, { root: true })

          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar jogo! Tente novamente'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }

        resolve(data)
      })
    },
    fetchCasinoFdsIframeUrl (payload) {
      return new Promise(async (resolve, reject) => {
        this.loading = true

        const [data, err] = await casinoService.fetchFdsIframeUrl(payload)

        this.loading = false
        this.iframeUrl = data

        if (err) {
          // commit('errors/setErrors', err.response.data.errors, { root: true })

          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar jogo! Tente novamente'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }

        resolve(data)
      })
    },
    fetchCasinoSingleGame (payload) {
      return new Promise(async (resolve, reject) => {
        this.loading = true

        const [data, err] = await casinoService.only(payload)

        this.loading = false
        this.game = data

        if (err) {
          // commit('errors/setErrors', err.response.data.errors, { root: true })

          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar jogo!'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }

        resolve(data)
      })
    },
    fetchCasinoGames () {
      return new Promise(async (resolve, reject) => {
        this.games = null
        this.page = 1
        this.loading = true

        const [data, err] = await casinoService.get()

        this.loading = false

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          reject(err)
          return
        }

        this.games = data
        resolve(data)
      })
    }
  },
  getters: {
    getCasinoGame (state) {
      return state.game
    },
    getCasinoGameIframeUrl (state) {
      return state.iframeUrl
    },
    getCasinoGames (state) {
      return state.games
    },
    getCasinoLoading (state) {
      return state.loading
    }
  }
})
