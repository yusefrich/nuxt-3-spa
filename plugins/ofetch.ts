import { ofetch } from 'ofetch'
// import { useAuthStore } from '~/store/auth'

export default defineNuxtPlugin((_nuxtApp) => {
  globalThis.$fetch = ofetch.create({
    /* eslint-disable */
    onRequest () {
    //   const authStore = useAuthStore()
    //   if (authStore.isAuthenticated) {
    //     // options.headers = { Authorization: `Bearer ${authStore.token}` }
    //     console.log(options)
    //   } else {
    // }
    console.log('workiiiiing')
    },
    onRequestError ({ error }) {
      console.error(error)
    }
  })
})
