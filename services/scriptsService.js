
const scriptsService = {
  async getHead () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + process.env.BASE_URL_DEV + '/settings/scripts_head')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getBody () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + process.env.BASE_URL_DEV + '/settings/scripts_body')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}
export default scriptsService
