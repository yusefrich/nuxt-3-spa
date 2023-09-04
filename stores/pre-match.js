import betsService from '@/services/betsService'
import { defineStore } from 'pinia'

export const usePreMatchStore = defineStore('preMatch', {
  state: () => ({
    events: null,
    loading: false,
    filters: {
      date: null,
      hour: null,
      team: null,
      page: null,
      country: null,
      paginate: null,
      sport: 6046
    }
  }),
  actions: {
    changeFilter (payload) {
      Object.entries(payload).forEach((item) => {
        const [key, value] = item
        this.filters[key] = value
      })
    },
    fetchPreMatchEvents () {
      this.loading = true

      return new Promise(async (resolve, reject) => {
        this.events = []

        const [data, err] = await betsService.events(this.filters)

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          // commit('updateLoading', false)
          this.loading = false
          reject(err)
        }

        // commit('errors/clearErrors', {}, { root: true })
        // commit('setEvents', data)
        // commit('updateLoading', false)
        this.loading = false
        this.events = data
        resolve(data)
      })
    },
    concatPreMatchEvents () {
      if (this.filters.page && this.filters.page > 1) {
        // dispatch('changeFilter', { page: state.filters.page + 1 })
        this.filters.page = this.filters.page + 1
      } else {
        // dispatch('changeFilter', { page: 2 })
        this.filters.page = 2
      }

      this.loading = true

      return new Promise(async (resolve, reject) => {
        const [data, err] = await betsService.events(this.filters)

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          this.loading = false
          reject(err)
        }

        const currentEvents = this.events.concat(data)

        // commit('errors/clearErrors', {}, { root: true })
        this.loading = false
        this.events = currentEvents
        resolve(currentEvents)
      })
    }
  },
  getters: {
    getPreMatchEvents (state) {
      return state.events
    },
    getPreMatchLoading (state) {
      return state.loading
    },
    getFilters (state) {
      return state.filters
    }
  }
})
