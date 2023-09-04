import betsService from '@/services/betsService'
import { defineStore } from 'pinia'

export const usePreMatchMainLeaguesStore = defineStore('preMatchMainLeagues', {
  state: () => ({
    loading: false,
    leagues: null
  }),
  actions: {
    fetchPreMatchMainLeagues (payload) {
      this.loading = true

      return new Promise(async (resolve, reject) => {
        this.leagues = null

        const [data, err] = await betsService.mainEvents(payload)

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          this.loading = false
          reject(err)
        }

        // commit('errors/clearErrors', {}, { root: true })
        this.leagues = data
        this.loading = false
        resolve(data)
      })
    }
  },
  getters: {
    getPreMatchMainLeaguesLoading (state) {
      return state.loading
    },
    getPreMatchMainLeagues (state) {
      return state.leagues
    }
  }
})
