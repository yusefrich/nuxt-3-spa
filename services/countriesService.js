const config = useRuntimeConfig()

const countriesService = {
  async get (sport) {
    try {
      const data = await $fetch(config.public.BASE_URL + `/countries${sport ? '?sport=' + sport : ''}`)
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getLeagues (country, sport) {
    try {
      const data = await $fetch(config.public.BASE_URL + `/countries/${country}${sport ? '?sport=' + sport : ''}`)
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}
export default countriesService
