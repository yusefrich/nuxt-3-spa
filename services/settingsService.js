const settingsService = {
  async getPlanData () {
    const config = useRuntimeConfig()

    // console.log('return of config', config)
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings')/* ${url}/settings */
      
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getSlides () {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/slides')/* ${url}/settings */
      
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getAds () {
    const config = useRuntimeConfig()

    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/ads')/* ${url}/settings */
      
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}

export default settingsService
