import { defineStore } from 'pinia'

export const useErrorsStore = defineStore('errors', {
  state: () => ({
    list: null
  }),
  actions: {
    clear () {
      this.list = null
    },
    set (errors) {
      this.list = errors
    }
  },
  getters: {
    getErrors (state) {
      return state.list
    }
  }
})
