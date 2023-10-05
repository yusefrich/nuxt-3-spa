
const withdrawService = {
  async post (payload) {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(
        config.public.BASE_URL + '/withdrawals',
        { methods: 'POST', body: payload }
      )

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async get (filters) {
    const config = useRuntimeConfig()

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
      const data = await $fetch(config.public.BASE_URL + `/withdrawals${filtersString}`)
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async exclude (id) {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(
        config.public.BASE_URL + `/withdrawals/${id}`,
        { methods: 'DELETE' }
      )

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}

export default withdrawService
