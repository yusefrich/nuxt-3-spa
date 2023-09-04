import { defineStore } from 'pinia'

export const useTestingStore = defineStore('testing', {
  state: () => ({
    testing: 'getter working'
  }),
  actions: {
    testFetch () {
      console.log('being called correctly')
    }
  },
  getters: {
    currentTest (state) {
      return state.testing
    }
  }
})
