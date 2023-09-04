const config = useRuntimeConfig()

const inplayService = {
  async get (id) {
    try {
      const data = await $fetch(config.public.BASE_URL + process.env.BASE_URL_DEV + `/inplay${id ? '?sport=' + id : ''}`)
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async show (id) {
    try {
      const data = await $fetch(config.public.BASE_URL + process.env.BASE_URL_DEV + '/inplay/' + id)
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}
export default inplayService
