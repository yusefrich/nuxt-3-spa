import thirdPartySportsProviders from '@/services/thirdPartySportsProviders'

actions: {
  fetchThirdPartyUrl (payload) {
    console.log('FETCHINGGGGG')
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
