import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

export const useCookiesStore = defineStore('cookies', {
  state: () => ({
    acceptedCookies: ''
  }),
  action: {
    confirmCookies (payload) {
      Cookies.set('accepted_cookies', payload, { expires: 7 })
      this.acceptedCookies = payload
    }
  },
  getters: {
    getAcceptedCookies: state => Cookies.get('accepted_cookies') || state.acceptedCookies
  }
})
