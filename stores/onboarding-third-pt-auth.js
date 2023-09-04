import thirdPartyApis from '@/services/thirdPartyApis'
import { defineStore } from 'pinia'

export const useOnboardingThirdPtAuthStore = defineStore('onboardingThirdPtAuth', {
  state: () => ({
    loading: false,
    errors: null
  }),
  actions: {
    logUserFromThirdParty (payload) {
      return new Promise(async (resolve, reject) => {
        if (process.env.PRODUCT_REDIRECT_URL && '' + process.env.PRODUCT_REDIRECT_URL === 'dynamic') {
          const [data, err] = await thirdPartyApis.logUserInThirdPartyPlatform(payload)

          if (err) {
            // this._vm.$toast.open({ message: 'Erro ao redirecionar usuario, tente novamente.', type: 'error' })
            reject(err)
            return
          }

          if (typeof window !== 'undefined') {
            localStorage.setItem('token', 'bearer ' + data.data.token)
          }

          resolve(data)
        } else {
          resolve(process.env.PRODUCT_REDIRECT_URL)
        }
      })
    },
    fetchProductRedirectUrl () {
      return new Promise(async (resolve, reject) => {
        if (process.env.PRODUCT_REDIRECT_URL && '' + process.env.PRODUCT_REDIRECT_URL === 'dynamic') {
          const [data, err] = await thirdPartyApis.getRedirectPlatformLink()

          if (err) {
            // this._vm.$toast.open({ message: 'Erro ao redirecionar usuario, tente novamente.', type: 'error' })
            reject(err)
            return
          }

          resolve(data)
        } else {
          resolve(process.env.PRODUCT_REDIRECT_URL)
        }
      })
    }
  },
  getters: {
    getOnboardingThirdPtAuthLoading (state) {
      return state.loading
    },
    getOnboardingThirdPtAuthErrors (state) {
      return state.errors
    }
  }
})
