const config = useRuntimeConfig()

const depositService = {
  async post (payload) {
    try {
      const data = await $fetch(config.public.BASE_URL + '/deposits', payload)
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
      const data = await $fetch(config.public.BASE_URL + `/deposits${filtersString}`)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getCasinoTransactions (filters) {
    try {
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
      const data = await $fetch(config.public.BASE_URL + `/casino/transactions${filtersString}`)
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}
export default depositService
