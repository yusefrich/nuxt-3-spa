import sportsService from '@/services/sportsService'
import { defineStore } from 'pinia'

export const useMetadataSportsStore = defineStore('metadataSports', {
  state: () => ({
    loading: false,
    sports: null,
    allSportsData: null,
    inplaySports: null
  }),
  action: {
    fetchMetadataSports (id) {
      this.loading = true

      return new Promise(async (resolve, reject) => {
        this.sports = []

        const [data, err] = await sportsService.getDynamic()

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          this.loading = false
          reject(err)
        }

        data.sort(function (x, y) { return x.id === +id ? -1 : y.id === +id ? 1 : 0 })

        // commit('errors/clearErrors', {}, { root: true })
        this.sports = data
        this.loading = false
        resolve(data)
      })
    },
    async fetchAllMetadataSports () {
      this.loading = true

      const [data, err] = await sportsService.getNewDynamic()

      if (err) {
        // commit('errors/setErrors', err.errors, { root: true })
        this.loading = false
      }

      // commit('errors/clearErrors', {}, { root: true })
      this.allSportsData = data
      this.loading = false
    },
    fetchMetadataInplaySports (id) {
      this.loading = true

      return new Promise(async (resolve, reject) => {
        this.inplaySports = []

        const [data, err] = await sportsService.getDynamicInplay()

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          this.loading = false
          reject(err)
        }

        data.sort(function (x, y) { return x.id === +id ? -1 : y.id === +id ? 1 : 0 })

        // commit('errors/clearErrors', {}, { root: true })
        this.inplaySports = data
        this.loading = false
        resolve(data)
      })
    }
  },
  getters: {
    getMetadataSportsLoading (state) {
      return state.loading
    },
    getMetadataSports (state) {
      return state.sports
    },
    getAllMetadataSports (state) {
      return state.allSportsData
    },
    getMetadataInplaySports (state) {
      return state.inplaySports
    },
    getCurrentProvider () {
      return process.env.ODDS_PROVIDER ? process.env.ODDS_PROVIDER : 'default'
    }
  }
})
