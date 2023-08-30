import axios from 'axios'

const withdrawService = {
  async post (payload) {
    try {
      const data = await axios.post('/withdrawals', payload)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async get (filters) {
    let filtersString = ''
    let counter = 0

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value && counter === 0) {
          filtersString = `${filtersString}?${key}=${value}`
          counter++
        } else if (value) {
          filtersString = `${filtersString}&${key}=${value}`
        }
      }
    }

    try {
      const data = await axios.get(`/withdrawals${filtersString}`)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async exclude (id) {
    try {
      const data = await axios.delete(`/withdrawals/${id}`)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}

export default withdrawService
