import axios from 'axios'

const thirdPartySportsProviders = {
  // async upgamingAuth () {
  //   try {
  //     const data = await axios.post('https://gateway.upgator.io/api/Authentication/Authenticate', { Username: process.env.CRED_USERNAME, SecretKey: process.env.CRED_SECRETKEY })
  //     return [data.data, null]
  //   } catch (error) {
  //     return [null, error]
  //   }
  // },
  async upgamingLaunchGame (payload) {
    // const [token] = await this.upgamingAuth()
    const cred = {
      BrandId: '108',
      currency: 'BRL',
      Ismobile: payload.Ismobile,
      Language: 'br',
      Gameid: '2025',
      Token: payload.Token
    }
    // Token: payload.Token
    let filtersString = ''
    let counter = 0
    if (cred) {
      for (const [key, value] of Object.entries(cred)) {
        if (value && counter === 0) {
          filtersString = filtersString + '?' + key + '=' + value
          counter++
        } else if (value) {
          filtersString = filtersString + '&' + key + '=' + value
        }
      }
    }
    try {
      /* eslint-disable */
      // const ttoken = typeof window !== 'undefined' ? localStorage.getItem('token') : ''
      // const data = await axios.get(`https://gateway.upgator.io/api/gameservice/Game/LaunchGame${filtersString}`, { headers: { Authorization: token && token.token ? token.token : '' } })
      const data = await axios.get(`/gameservice/Game/LaunchGame${filtersString}`)
      // const data2 = await axios.get('/settings', { headers: { Authorization: ttoken } })
      console.log('testing NEW auth token', data)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}
export default thirdPartySportsProviders
