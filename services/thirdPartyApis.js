const thirdPartyApis = {
  async getAddress (cep) {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(config.public.BASE_URL + `${process.env.BRASIL_API}/${cep}/json`)

      // console.log('return of json data', data.data)
      return [data.data, null]
    } catch (error) {
      console.error(error)
      return [null, error]
    }
  },
  async getRedirectPlatformLink () {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(config.public.BASE_URL + `${process.env.BASE_URL_DEV}/auction/session`)

      // console.log('return of json data', data.data)
      return [data, null]
    } catch (error) {
      console.error(error)
      return [null, error]
    }
  },
  async logUserInThirdPartyPlatform (payload) {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(
        config.public.BASE_URL + `${process.env.BASE_URL_DEV}/auction/login`,
        { methods: 'POST', body: payload }
      )

      // console.log('return of json data', data.data)
      return [data, null]
    } catch (error) {
      console.error(error)
      return [null, error]
    }
  },
  async validateCpf (cpf) {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(config.public.BASE_URL + `https://api.exato.digital/receita-federal/cpf-sem-nascimento?token=${process.env.CPF_VALIDATOR}&cpf=${cpf}&format=json`)
      
      // console.log('return of json data', data.data)
      return [data.data, null]
    } catch (error) {
      console.error(error)
      return [null, error]
    }
  }
}
export default thirdPartyApis
