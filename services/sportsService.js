const config = useRuntimeConfig()
const sportsService = {
  getInplaySports () {
    return [[
      { id: 6046, active: true, name: 'Futebol', games: 13 },
      { id: 48242, active: true, name: 'Basquete', games: 0, fixed: true },
      { id: 54094, active: true, name: 'Tênis', games: 0, fixed: true },
      { id: 154830, active: true, name: 'Vôlei', games: 0, fixed: true },
      { id: 35709, active: true, name: 'Handebol', games: 0, fixed: true },
      { id: 154914, active: true, name: 'Basebol', games: 0, fixed: true }
      // { id: 687890, games: 0, fixed: true }
    ], null]
  },
  // todo LEGACY CODE
  get () {
    return [[
      { name: 'Futebol', id: 1, active: true },
      { name: 'Basquete', id: 18, active: false },
      { name: 'Tênis', id: 20, active: false },
      { name: 'Tênis de Mesa', id: null, active: false },
      { name: 'Vôlei', id: null, active: false },
      { name: 'Vôlei de Praia', id: null, active: false },
      { name: 'Handebol', id: null, active: false },
      { name: 'Basebol', id: null, active: false },
      { name: 'Fut Amer.', id: null, active: false },
      { name: 'E-games', id: 131506, active: false },
      { name: 'Boxe/MMA', id: 9, active: false }
    ], null]
  },
  // todo LEGACY CODE
  getLs () {
    return [[
      { name: 'Futebol', id: 6046, active: true },
      { name: 'Basquete', id: 48242, active: true },
      { name: 'Tênis', id: 54094, active: true },
      { name: 'Tênis de Mesa', id: 265917, active: true },
      { name: 'Vôlei', id: 154830, active: true },
      { name: 'Vôlei de Praia', id: 621569, active: true },
      { name: 'Handebol', id: 35709, active: true },
      { name: 'Basebol', id: 154914, active: true },
      { name: 'Fut Amer.', id: 131506, active: true },
      { name: 'E-games', id: 687890, active: true },
      { name: 'Boxe/MMA', id: 154919, active: true }
    ], null]
  },
  async getDynamicInplay () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/inplay/sports')
      return [data.data.data, null]
    } catch (error) {
      console.error(error)
      return [null, error]
    }
  },
  async getDynamic () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/sports')/* ${url}/settings */
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getNewDynamic () {
    try {
      const { data: { data } } = await $fetch(config.public.BASE_URL + '/all/data')
      const sportsArray = data.map(item => item.sport)
      return [sportsArray, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getOutrightSports () {
    try {
      const { data: { data } } = await $fetch(config.public.BASE_URL + '/all/outright')
      const sportsArray = data.map(item => item.sport)
      return [sportsArray, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getOutrightGameOdds (id) {
    try {
      const data = await $fetch(config.public.BASE_URL + `/all/outright/${id}`)
      return [data, null]
    } catch (error) {
      return [null, error]
    }
  }

}
export default sportsService
