const config = useRuntimeConfig()

const authService = {
  async auth () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/auth/me')

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async bonusCancelation (payload) {
    try {
      const data = await $fetch(config.public.BASE_URL + '/bonusCancel', payload)
      return [data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async search (payload) {
    try {
      const data = await $fetch(config.public.BASE_URL + '/search', payload)

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async login (payload) {
    try {
      const data = await $fetch(config.public.BASE_URL + '/auth/login', payload)

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async register (payload) {
    try {
      const data = await $fetch(config.public.BASE_URL + '/register', payload)

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async update (payload) {
    try {
      const data = await $fetch(config.public.BASE_URL + '/auth/update', payload)

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async passwordUpdate (payload) {
    try {
      const data = await $fetch(config.public.BASE_URL + '/auth/password', payload)

      return [data.data, null]
    } catch (error) {
      return [null, error.response.data]
    }
  },
  async forgot (payload) {
    try {
      const data = await $fetch(config.public.BASE_URL + '/forgot-password', payload)

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async reset (payload) {
    try {
      const data = await $fetch(config.public.BASE_URL + '/reset-password', payload)

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  logOut () {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', '')
    }
  }
}

export default authService
