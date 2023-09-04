const config = useRuntimeConfig()
const settingsService = {
  async getPlanData () {
    console.log('return of config', config)
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings')/* ${url}/settings */
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getSlides () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/slides')/* ${url}/settings */
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getAds () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/ads')/* ${url}/settings */
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}

export default settingsService
