import { ofetch } from 'ofetch'
import { useBaseStore } from '../stores/base'

export default defineNuxtPlugin((_nuxtApp) => {
  const test = useNuxtApp()
  globalThis.$fetch = ofetch.create({
    /* eslint-disable */
    onRequest ({ options }) {
      const baseStore = useBaseStore()
      // console.log('testing -> ', baseStore.loggedInUser)
      if (baseStore.authToken) {
        options.headers = { Authorization: `Bearer ${baseStore.authToken}` }
      } else {
    }
  },
  onRequestError ({ error }) {
      test.$toast.error(`Falha na requisição: ${error}`)
      console.error('log error', { error })
    }
  })
})
