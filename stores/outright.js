import sportsService from '@/services/sportsService'
import { defineStore } from 'pinia'

export const useOutrightStore = defineStore('outrightStore', {
  state: () => ({
    events: null,
    loading: false
  }),
  actions: {
    fetchOutrightEvents () {
      this.loading = true

      return new Promise(async (resolve, reject) => {
        this.events = []

        const [data, err] = await sportsService.getOutrightSports()

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          this.loading = false
          reject(err)
          return
        }

        // commit('errors/clearErrors', {}, { root: true })

        const sportsArray = data.map(item => item.sport)
        this.events = sportsArray
        this.loading = false
        resolve(sportsArray)
      })
    }
  },
  getters: {
    getOutrightEvents (state) {
      return state.events
    },
    getOutrightLoading (state) {
      return state.loading
    }
  }
})
