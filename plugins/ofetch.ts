import { ofetch } from 'ofetch'
import { useBaseStore } from '../stores/base'

export default defineNuxtPlugin((_nuxtApp) => {
  // const napp = useNuxtApp()
  const baseStore = useBaseStore()
  // console.log('testing token -> ', baseStore.authToken)

  globalThis.$fetch = ofetch.create({
    /* eslint-disable */
    onRequest ({ options }) {
      // console.log('testing token 2 -> ', baseStore.authToken)
      if (baseStore.authToken) {
        options.headers = { 'Authorization': `Bearer ${baseStore.authToken}` }
      }
    },
    onRequestError ({ error }) {
      console.error(`Falha no envio da requisição: `, error)
    },
    onResponseError({ response }) {
      // const napp = useNuxtApp()
      let responseError = response && response._data && response._data.error ? response._data.error : ''
      if (response && response._data && response._data.message) {
        responseError = response._data.message
      }
      // todo check if error is 401, if it is, logout user
      if (response.status === 401) {
        console.error('Usuário não autenticado, realize o login novamente')
      }
      console.error(`Falha na requisição ${response._data.url}: ${responseError}`, response)
    }
  })
})
