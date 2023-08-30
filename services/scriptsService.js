import axios from 'axios'

const scriptsService = {
  async getHead () {
    try {
      const data = await axios.get(process.env.BASE_URL_DEV + '/settings/scripts_head')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getBody () {
    try {
      const data = await axios.get(process.env.BASE_URL_DEV + '/settings/scripts_body')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}
export default scriptsService
