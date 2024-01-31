import betsService from '@/services/betsService'
import { defineStore } from 'pinia'

export const usePreMatchLeagueEvents = defineStore('preMatchLeagueEvents', {
  state: () => ({
    loading: false,
    events: null,
    errors: null
  }),
  actions: {
    fetchPreMatchLeagueEvents (payload) {
      this.loading = true
  
      return new Promise(async (resolve, reject) => {
        this.events = null
  
        const [data, err] = await betsService.league(payload)
  
        if (err) {
          this.errors = err.errors
          this.loading = false

          reject(err)
        }
  
        data.sportId = payload.sport
  
        this.errors = null
        this.events = data
        this.loading = false
        
        resolve(data)
      })
    }
  },
  getters: {
    getPreMatchLeagueEventsLoading: state => state.loading,
    getPreMatchLeagueEvents: state => state.events,
    getPreMatchLeagueEventsErrors: state => state.errors
  }
})