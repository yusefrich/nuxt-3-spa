import casinoService from '@/services/casinoService'
import { defineStore } from 'pinia'

export const useLiveMetadataCasinoStore = defineStore('liveMetadataCasino', {
  state: () => ({
    loading: false,
    categories: null,
    errors: null
  }),
  actions: {
    fetchLiveCasinoCategories () {
      return new Promise(async (resolve, reject) => {
        this.categories = null
        this.loading = true
  
        const [data, err] = await casinoService.getCategoriesLive()
  
        this.loading = false
  
        if (err) {
          this.errors = err.errors

          reject(err)
          return
        }
  
        this.categories = data

        resolve(data)
      })
    }
  },
  getters: {
    getLiveCasinoCategories: state => state.categories,
    getLiveCasinoLoading: state => state.loading,
    getLiveCasinoErrors: state => state.errors
  }
})
