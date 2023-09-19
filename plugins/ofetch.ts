import { ofetch } from 'ofetch'
import { useBaseStore } from '../stores/base'

export default defineNuxtPlugin((_nuxtApp) => {
  const test = useNuxtApp()
  globalThis.$fetch = ofetch.create({
    /* eslint-disable */
    onRequest () {
      const authStore = useBaseStore()
      console.log('testing -> ', authStore.loggedInUser)
      if (authStore.loggedInUser) {
        // options.headers = { Authorization: `Bearer ${authStore.token}` }
      } else {
    }
  },
  onRequestError ({ error }) {
      test.$toast.error(`Falha na requisição: ${error}`)
      console.error(error)
    }
  })
})
