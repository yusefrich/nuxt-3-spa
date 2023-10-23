import casinoService from '@/services/casinoService'
import { defineStore } from 'pinia'

export const useLiveCasinoStore = defineStore('liveCasino', {
  state: () => ({
    loading: false,
    liveGames: null,
    page: 1,
    errors: null
  }),
  actions: {
    fetchLiveCasinoGames () {
      return new Promise(async (resolve, reject) => {
        this.liveGames = null
        this.page = 1
        this.loading = true
  
        const [data, err] = await casinoService.getLive()
  
        this.loading = false
  
        if (err) {
          this.errors = err.errors

          reject(err)
          return
        }
  
        this.liveGames = data

        resolve(data)
      })
    }
  },
  getters: {
    getLiveCasinoGames: state => state.liveGames,
    getLiveCasinoLoading: state => state.loading,
    getLiveCasinoErrors: state => state.errors
  }
})
