const sportsService = {
  async getDynamic () {
    const config = useRuntimeConfig()

    try {
      const { data } = await $fetch(`${config.public.BASE_URL}/sports`)

      return [data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getNewDynamic (filters) {
    const config = useRuntimeConfig()

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
      const { data } = await $fetch(`${config.public.BASE_URL}/all/data${filtersString}`)
      const sportsArray = data.map(item => item.sport)

      return [sportsArray, null]
    } catch (error) {
      return [null, error]
    }
  }
}

export default sportsService
