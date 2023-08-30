import axios from 'axios'
const thirdPartyApis = {
  async getAddress (cep) {
    try {
      const data = await axios.get(`${process.env.BRASIL_API}/${cep}/json`)
      // console.log('return of json data', data.data)
      return [data.data, null]
    } catch (error) {
      console.error(error)
      return [null, error]
    }
  },
  async getRedirectPlatformLink () {
    try {
      const data = await axios.get(`${process.env.BASE_URL_DEV}/auction/session`)
      // console.log('return of json data', data.data)
      return [data, null]
    } catch (error) {
      console.error(error)
      return [null, error]
    }
  },
  async logUserInThirdPartyPlatform (payload) {
    try {
      const data = await axios.post(`${process.env.BASE_URL_DEV}/auction/login`, payload)
      // console.log('return of json data', data.data)
      return [data, null]
    } catch (error) {
      console.error(error)
      return [null, error]
    }
  },
  async validateCpf (cpf) {
    try {
      const data = await axios.get(`https://api.exato.digital/receita-federal/cpf-sem-nascimento?token=${process.env.CPF_VALIDATOR}&cpf=${cpf}&format=json`)
      // console.log('return of json data', data.data)
      return [data.data, null]
    } catch (error) {
      console.error(error)
      return [null, error]
    }
  }
}
export default thirdPartyApis
