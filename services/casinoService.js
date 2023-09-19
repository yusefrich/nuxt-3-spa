
const casinoService = {
  async get () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/casino')
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async fetchIframeUrl (payload) {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/casino/softgaming/auth', payload)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async fetchBananaLiveIframeUrl (payload) {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/casino/banana-live/auth', payload)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async fetchBananaIframeUrl (payload) {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/casino/banana/auth', payload)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async fetchFdsIframeUrl (payload) {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/casino/fds/auth', payload)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async only (id) {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + `/casino/only/${id}`)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getSliders () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/casino/slides')
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getHeaderGames () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/casino/header/games')
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getHeaderCategories () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/casino/header')
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async new (filters) {
    const config = useRuntimeConfig()
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
      const data = await $fetch(config.public.BASE_URL + `/casino/new${filtersString}`)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async mostPlayed (filters) {
    const config = useRuntimeConfig()
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
      const data = await $fetch(config.public.BASE_URL + `/casino/most_played${filtersString}`)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async search (term) {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + `/casino/search/${term}`)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getCategories () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/casino/categories')
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getProviders () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/casino/providers')
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async showProviderGames (slug, filters) {
    const config = useRuntimeConfig()
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
      const data = await $fetch(config.public.BASE_URL + `/casino/provider/${slug}${filtersString}`)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async show (slug, filters) {
    const config = useRuntimeConfig()
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
      const data = await $fetch(config.public.BASE_URL + `/casino/games/${slug}${filtersString}`)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}
export default casinoService
