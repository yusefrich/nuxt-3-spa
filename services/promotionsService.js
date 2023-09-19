const promotionsService = {
  async get () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/promotions')
      // console.log('Auth being calleds')
      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}
export default promotionsService
