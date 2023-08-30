import axios from 'axios'

const casinoService = {
  async get () {
    try {
      const data = await axios.get('/casino')
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async fetchIframeUrl (payload) {
    try {
      const data = await axios.post('/casino/softgaming/auth', payload)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async fetchBananaLiveIframeUrl (payload) {
    try {
      const data = await axios.post('/casino/banana-live/auth', payload)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async fetchBananaIframeUrl (payload) {
    try {
      const data = await axios.post('/casino/banana/auth', payload)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async fetchFdsIframeUrl (payload) {
    try {
      const data = await axios.post('/casino/fds/auth', payload)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async only (id) {
    try {
      const data = await axios.get(`/casino/only/${id}`)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getSliders () {
    try {
      const data = await axios.get('/casino/slides')
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getHeaderGames () {
    try {
      const data = await axios.get('/casino/header/games')
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getHeaderCategories () {
    try {
      const data = await axios.get('/casino/header')
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async new (filters) {
    // search filter string concatenation
    let filtersString = ''
    let counter = 0
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value && counter === 0) {
          filtersString = filtersString + '?' + key + '=' + value
          counter++
        } else if (value) {
          filtersString = filtersString + '&' + key + '=' + value
        }
      }
    }
    try {
      const data = await axios.get(`/casino/new${filtersString}`)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async mostPlayed (filters) {
    // search filter string concatenation
    let filtersString = ''
    let counter = 0
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value && counter === 0) {
          filtersString = filtersString + '?' + key + '=' + value
          counter++
        } else if (value) {
          filtersString = filtersString + '&' + key + '=' + value
        }
      }
    }
    try {
      const data = await axios.get(`/casino/most_played${filtersString}`)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async search (term) {
    try {
      const data = await axios.get(`/casino/search/${term}`)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getCategories () {
    try {
      const data = await axios.get('/casino/categories')
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getProviders () {
    try {
      const data = await axios.get('/casino/providers')
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async showProviderGames (slug, filters) {
    // search filter string concatenation
    let filtersString = ''
    let counter = 0
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value && counter === 0) {
          filtersString = filtersString + '?' + key + '=' + value
          counter++
        } else if (value) {
          filtersString = filtersString + '&' + key + '=' + value
        }
      }
    }
    try {
      const data = await axios.get(`/casino/provider/${slug}${filtersString}`)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async show (slug, filters) {
    // search filter string concatenation
    let filtersString = ''
    let counter = 0
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value && counter === 0) {
          filtersString = filtersString + '?' + key + '=' + value
          counter++
        } else if (value) {
          filtersString = filtersString + '&' + key + '=' + value
        }
      }
    }
    try {
      const data = await axios.get(`/casino/games/${slug}${filtersString}`)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}
export default casinoService
