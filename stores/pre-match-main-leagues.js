import betsService from '@/services/betsService'
import { defineStore } from 'pinia'

export const usePreMatchMainLeagues = defineStore('preMatchMainLeagues', {
  state: () => ({
    loading: true,
    leagues: null,
    errors: null
  }),
  actions: {
    fetchPreMatchMainLeagues (payload) {
      this.loading = true
  
      return new Promise(async (resolve, reject) => {
        this.leagues = null
  
        const [data, err] = await betsService.mainEvents(payload)
  
        if (err) {
          this.errors = err.errors
          this.loading = false
          reject(err)
        }
  
        this.errors = null
        this.leagues = data
        this.loading = false

        resolve(data)
      })
    }
  },
  getters: {
    getPreMatchMainLeaguesLoading: state => state.loading,
    getPreMatchMainLeagues: state => state.leagues,
    getPreMatchMainLeaguesErrors: state => state.errors
  }
})