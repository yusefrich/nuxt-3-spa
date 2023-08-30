import axios from 'axios'

const inplayService = {
  async get (id) {
    try {
      const data = await axios.get(process.env.BASE_URL_DEV + `/inplay${id ? '?sport=' + id : ''}`)
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async show (id) {
    try {
      const data = await axios.get(process.env.BASE_URL_DEV + '/inplay/' + id)
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}
export default inplayService
