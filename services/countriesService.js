import axios from 'axios'

const countriesService = {
  async get (sport) {
    try {
      const data = await axios.get(`/countries${sport ? '?sport=' + sport : ''}`)
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getLeagues (country, sport) {
    try {
      const data = await axios.get(`/countries/${country}${sport ? '?sport=' + sport : ''}`)
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}
export default countriesService
