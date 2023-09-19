
const uploadService = {
  async submitAuthFiles (payload) {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/auth/files', payload)

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}

export default uploadService
