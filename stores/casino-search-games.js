import casinoService from '@/services/casinoService'
import { defineStore } from 'pinia'

export const useCasinoSearchGamesStore = defineStore('casinoSearchGames', {
  state: () => ({
    loading: false,
    searchGames: null,
    search: ''
  }),
  actions: {
    cleanSearchGames () {
      this.loading = false,
      this.searchGames = null,
      this.search = ''
    },
    searchCasinoGames (term) {
      if (!term) {
        this.search = term
        return
      }

      return new Promise(async (resolve, reject) => {
        this.loading = true
        this.search = term

        const [data, err] = await casinoService.search(term)

        this.loading = false

        if (err) {
          this.search = ''

          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar jogo!'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }

        this.searchGames = [{
          name: term,
          slug: null,
          games: data
        }]
        resolve(data)
      })
    }
  },
  getters: {
    getCasinoSearchLoading (state) {
      return state.loading
    },
    getCasinoSearchGames (state) {
      return state.searchGames
    },
    getSearch (state) {
      return state.search
    }
  }
})
