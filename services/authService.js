import axios from 'axios'

const authService = {
  async auth () {
    try {
      const data = await axios.post('/auth/me')

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async bonusCancelation (payload) {
    try {
      const data = await axios.post('/bonusCancel', payload)
      return [data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async search (payload) {
    try {
      const data = await axios.post('/search', payload)

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async login (payload) {
    try {
      const data = await axios.post('/auth/login', payload)

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async register (payload) {
    try {
      const data = await axios.post('/register', payload)

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async update (payload) {
    try {
      const data = await axios.put('/auth/update', payload)

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async passwordUpdate (payload) {
    try {
      const data = await axios.put('/auth/password', payload)

      return [data.data, null]
    } catch (error) {
      return [null, error.response.data]
    }
  },
  async forgot (payload) {
    try {
      const data = await axios.post('/forgot-password', payload)

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async reset (payload) {
    try {
      const data = await axios.post('/reset-password', payload)

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  logOut () {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', '')
    }
  }
}

export default authService
