
const authService = {
  async auth () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/auth/me', { method: 'POST', body: {} })
      
      return [data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async getAuthFiles () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/auth/files')

      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async submitAuthFiles (payload) {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(
        config.public.BASE_URL + '/auth/files',
        { method: 'POST', body: payload }
      )

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async bonusList () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/bonus')

      return [data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async bonusCancelation (payload) {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(
        config.public.BASE_URL + '/bonusCancel',
        { method: 'POST', body: payload }
      )

      return [data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async search (payload) {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(
        config.public.BASE_URL + '/search',
        { method: 'POST', body: payload }
      )

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async login (payload) {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(
        config.public.BASE_URL + '/auth/login',
        { method: 'POST', body: payload }
      )

      return [data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async register (payload) {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(
        config.public.BASE_URL + '/register',
        { method: 'POST', body: payload }
      )

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async update (payload) {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(
        config.public.BASE_URL + '/auth/update',
        { method: 'PUT', body: payload }
      )

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async passwordUpdate (payload) {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(
        config.public.BASE_URL + '/auth/password',
        { method: 'PUT', body: payload }
      )

      return [data.data, null]
    } catch (error) {
      return [null, error.response.data]
    }
  },
  async forgot (payload) {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(
        config.public.BASE_URL + '/forgot-password',
        { method: 'POST', body: payload }
      )

      return [data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async reset (payload) {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(
        config.public.BASE_URL + '/reset-password',
        { method: 'POST', body: payload }
      )

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
