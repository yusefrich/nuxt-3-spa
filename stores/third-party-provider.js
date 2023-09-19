import thirdPartySportsProviders from '@/services/thirdPartySportsProviders'
import { defineStore } from 'pinia'
// const { $toast } = useNuxtApp();

export const useThirdPartyProviderStore = defineStore('thirdPartyProvider', {
  actions: {
    fetchThirdPartyUrl (payload) {
      return new Promise(async (resolve, reject) => {
        const [data, err] = await thirdPartySportsProviders.upgamingLaunchGame(payload)
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar jogo!'
          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }
        resolve(data)
      })
    }
  }
})

