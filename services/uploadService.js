const config = useRuntimeConfig()

const uploadService = {
  async submitAuthFiles (payload) {
    try {
      const data = await $fetch(config.public.BASE_URL + '/auth/files', payload)

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}

export default uploadService
