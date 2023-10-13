import { defineStore } from 'pinia'

export const useOnboardingUserConfigStore = defineStore('onboardingUserConfig', {
  state: () => ({
    tab: 'History'
  }),
  actions: {
    changeTab (payload) {
      this.tab = payload
    }
  },
  getters: {
    getTab: state => state.tab
  }
})
