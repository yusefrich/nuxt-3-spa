import betsService from '@/services/betsService'
import { defineStore } from 'pinia'

export const usePreMatchSingleEvent = defineStore('preMatchSingleEvent', {
  state: () => ({
    event: null,
    errors: null,
    loading: false
  }),
  actions: {
    fetchPreMatchSingleEvent (slug) {
      this.loading = true
  
      return new Promise(async (resolve, reject) => {
        this.event = null
  
        const [data, err] = await betsService.event(slug)
  
        if (err) {
          this.errors = err.errors
          this.loading = false

          reject(err)
        }
  
        this.errors = null
        this.event = data
        this.loading = false

        resolve(data)
      })
    }
  },
  getters: {
    getPreMatchSingleEvent: state => state.event,
    getPreMatchEventErrors: state => state.errors,
    getPreMatchEventLoading: state => state.loading
  }
})
