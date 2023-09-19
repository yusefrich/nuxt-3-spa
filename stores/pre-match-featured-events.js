import betsService from '@/services/betsService'
import { defineStore } from 'pinia'

export const usePreMatchFeaturedEventsStore = defineStore('preMatchFeaturedEvents', {
  state: () => ({
    events: null,
    errors: {},
    loading: false
  }),
  actions: {
    fetchPreMatchFeaturedEvents (sportId) {
      this.loading = true

      return new Promise(async (resolve, reject) => {
        this.events = null

        const [data, err] = await betsService.featuredBets(sportId)

        if (err) {
          this.errors = err.errors
          this.loading = false
          reject(err)
          return
        }

        this.errors = {}

        if (data && data.length > 0) {
          this.events = [{
            games: data,
            name: 'Em destaque'
          }]
        }
        this.loading = false
        resolve(data)
      })
    }
  },
  getters: {
    getPreMatchFeaturedEvents (state) {
      return state.events
    },
    getPreMatchFeaturedEventsLoading (state) {
      return state.loading
    }
  }
})
