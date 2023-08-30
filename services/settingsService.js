import axios from 'axios'

const settingsService = {
  async getPlanData () {
    try {
      const data = await axios.get('/settings')/* ${url}/settings */
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getSlides () {
    try {
      const data = await axios.get('/settings/slides')/* ${url}/settings */
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getAds () {
    try {
      const data = await axios.get('/settings/ads')/* ${url}/settings */
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}

export default settingsService
