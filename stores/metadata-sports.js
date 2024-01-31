import sportsService from '@/services/sportsService'
import { defineStore } from 'pinia'

export const useMetadataSportsStore = defineStore('metadataSports', {
  state: () => ({
    loading: false,
    sports: null,
    allSportsData: null,
    errors: null
  }),
  actions: {
    fetchMetadataSports () {
      this.loading = true

      return new Promise(async (resolve, reject) => {
        this.sports = []

        const [data, err] = await sportsService.getDynamic()

        if (err) {
          this.loading = false
          this.errors = err.errors

          reject(err)
        }

        this.sports = data
        this.errors = null
        this.loading = false

        resolve(data)
      })
    },
    fetchAllMetadataSports (payload) {
      this.loading = true

      return new Promise(async (resolve, reject) => {
        this.allSportsData = []

        const [data, err] = await sportsService.getNewDynamic(payload)

        if (err) {
          this.loading = false
          this.errors = err.errors

          reject(err)
        }

        this.errors = null
        this.loading = false
        this.allSportsData = data

        resolve(data)
      })
    }
  },
  getters: {
    getMetadataSportsLoading: state => state.loading,
    getMetadataSports: state => state.sports,
    getAllMetadataSports: state => state.allSportsData,
    getErrors: state => state.errors
  }
})