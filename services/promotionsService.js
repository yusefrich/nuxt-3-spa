import axios from 'axios'
const promotionsService = {
  async get () {
    try {
      const data = await axios.get('/promotions')
      // console.log('Auth being calleds')
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}
export default promotionsService
