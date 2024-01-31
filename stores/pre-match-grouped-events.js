import betsService from '@/services/betsService'
import { defineStore } from 'pinia'

export const usePreMatchGroupedEventsStore = defineStore('preMatchGroupedEvents', {
  state: () => ({
    events: [],
    group: [],
    loading: false,
    errors: null
  }),
  actions: {
    fetchPreMatchGroupedEvents (payload) {
      this.loading = true
  
      return new Promise(async (resolve, reject) => {
        let counter = 0
  
        if (!Array.isArray(payload)) {
          resolve([])
          return
        }
  
        while (counter < payload.length) {
          if (!this.group.includes(payload[counter])) {
            const [data, err] = await betsService.league(payload[counter].split('+')[0])
  
            if (err) {
              this.errors = err.errors
              this.loading = false

              reject(err)
            }
  
            this.errors = null

            if (!this.events) {
              this.events = []
            }

            this.events.push(data[0])

            this.group.push(payload[counter])
          }
  
          counter++
        }
  
        this.group.forEach((item, index) => {
          if (!payload.includes(item)) {
            const groupIndex = this.group.findIndex(obj => obj === item)
            this.group.splice(groupIndex, 1)

            const eventIndex = this.events.findIndex(obj => obj === this.events.filter(ev => ev === this.events[index])[0])
            this.events.splice(eventIndex, 1)
          }
        })
  
        this.loading = false
        resolve(this.events)
      })
    }
  },
  getters: {
    getPreMatchGroupedEvents (state) {
      if (!state.events) {
        return state.events
      }
  
      if (Array.isArray(state.events) && state.events.length === 0) {
        return null
      }
  
      const reEvents = [...state.events]
  
      return reEvents.reverse()
    },
    getPreMatchGroupedEventsNormalized (state) {
      if (!state.events) {
        return state.events
      }
  
      if (Array.isArray(state.events) && state.events.length === 0) {
        return null
      }
  
      const reEvents = [...state.events]
  
      return reEvents
    },
    getPreMatchGroupedIds (state) {
      return state.group
    },
    getPreMatchGroupedIdsReverse (state) {
      const groups = [...state.group]
      return groups.reverse()
    },
    getPreMatchGroupedLoading (state) {
      return state.loading
    },
    getPreMatchGroupedErrors (state) {
      return state.errors
    }
  }
})
