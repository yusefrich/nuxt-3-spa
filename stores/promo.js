import { defineStore } from 'pinia'

import promotionsService from '@/services/promotionsService'

export const usePromoStore = defineStore('promo', {
  state: () => ({
    loading: false,
    promos: null,
    errors: null
  }),
  actions: {
    fetchPromos () {
      this.loading = true
  
      return new Promise(async (resolve, reject) => {
        this.promos = null
        const [data, err] = await promotionsService.get()
  
        if (err) {
          this.errors = err.errors
          this.loading = false
          reject(err)
        }
  
        this.errors = null
        this.promos = data
        this.loading = false

        resolve(data)
      })
    }
  },
  getters: {
    getLoading: state => state.loading,
    getPromos: state => state.promos,
    getErrors: state => state.errors
  }
})
