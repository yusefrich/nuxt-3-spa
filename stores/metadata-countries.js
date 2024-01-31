import countriesService from '@/services/countriesService'
import { defineStore } from 'pinia'

export const useMetadataCountries = defineStore('metadataCountries', {
  state: () => ({
    orderedCountries: null,
    loading: false,
    countries: null,
    errors: null
  }),
  actions: {
    fetchMetadataOrderedCountries ({ commit }, payload) {
      this.orderedCountries = []

      return new Promise(async (resolve, reject) => {  
        const [data, err] = await countriesService.get(payload)
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Falha ao buscar ligas'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          this.errors = err.errors

          reject(err)

          return
        }
  
        const groupSorted = []
        let order = ['Brasil', 'Alemanha', 'Espanha', 'França', 'Inglaterra', 'Itália', 'Portugal', 'Estados Unidos da América']
  
        if (payload === 48242) {
          order = ['Estados Unidos da América', 'Brasil']
        }
  
        order.forEach((e) => {
          const index = data.findIndex((f) => { return f.name === e })
  
          if (data[index]) {
            groupSorted.push(data[index])
            data.splice(index, 1)
          }
        })
  
        data.forEach((e) => {
          groupSorted.push(e)
        })
  
        this.errors = null
        this.orderedCountries = groupSorted

        resolve(groupSorted)
      })
    },
    fetchMetadataCountries ({ commit }, payload) {
      this.loading = true
      this.countries = []
  
      return new Promise(async (resolve, reject) => {  
        const [data, err] = await countriesService.get(payload)
  
        if (err) {
          this.errors = err.errors
          this.loading = false

          reject(err)
        }
  
        this.errors = null
        this.countries = data
        this.loading = false
        
        resolve(data)
      })
    }
  },
  getters: {
    getMetadataOrderedCountries: state => state.orderedCountries,
    getMetadataCountriesLoading: state => state.loading,
    getMetadataCountriesErrors: state => state.errors,
    getMetadataCountries: state => state.countries
  }
})