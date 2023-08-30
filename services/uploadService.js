import axios from 'axios'

const uploadService = {
  async submitAuthFiles (payload) {
    try {
      const data = await axios.post('/auth/files', payload)

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}

export default uploadService
