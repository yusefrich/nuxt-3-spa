// import createCache from 'vuex-cache'
import authService from '@/services/authService'
import betsService from '@/services/betsService'
import { useOnboardingAuthStore } from './onboarding-auth'
import { defineStore } from 'pinia'

export const useBaseStore = defineStore('base', {
  state: () => ({
    auth: {
      token: null,
      user: null
    },
    errors: null,
    user_bets: null,
    page: null,
    hasMoreBets: true,
    user_bets_loading: false,
    loading: false
  }),
  actions: {
    cleanErrors () {
      this.errors = null
    },
    showToastNotificationError (message) {
      const { $toast } = useNuxtApp()
      console.log('error not being called')
      $toast.error(message)
    },
    showToastNotificationSuccess (message) {
      const { $toast } = useNuxtApp()
      $toast.success(message)
    },
    setUserBets (userBets) {
      const pending = []
      const done = []
      const live = []

      userBets.forEach((e) => {
        if (e.result !== 'waiting') {
          done.push(e)
        } else if (e.result === 'waiting') {
          pending.push(e)
          let added = false
          e.games.forEach((f) => {
            if (f.event && Date.parse(f.event.start_date) < Date.parse(new Date()) && !added) {
              live.push(e)
              added = true
            }
          })
        }
      })

      this.user_bets = {
        all: null,
        pending: null,
        done: null,
        live: null
      }
      this.user_bets.all = userBets
      this.user_bets.pending = pending
      this.user_bets.done = done
      this.user_bets.live = live
    },
    concatUserBets (userBets) {
      const pending = []
      const done = []
      const live = []

      userBets.forEach((e) => {
        if (e.result !== 'waiting') {
          done.push(e)
        } else if (e.result === 'waiting') {
          pending.push(e)
          let added = false
          e.games.forEach((f) => {
            if (f.event && Date.parse(f.event.start_date) < Date.parse(new Date()) && !added) {
              live.push(e)
              added = true
            }
          })
        }
      })

      this.user_bets.all = [...this.user_bets.all, ...userBets]
      this.user_bets.pending = [...this.user_bets.pending, ...pending]
      this.user_bets.done = [...this.user_bets.done, ...done]
      this.user_bets.live = [...this.user_bets.live, ...live]
    },
    fetchUserBets (payload) {
      return new Promise(async (resolve, reject) => {
        this.hasMoreBets = true
        this.page = 1

        if (!this.auth.user) {
          resolve('user not logged')
          return
        }

        const formattedPayload = { ...payload }
        formattedPayload.page = this.page

        const [data, err] = await betsService.userBets(formattedPayload)

        if (err) {
          this.errors = err.errors
          reject(err)
          return
        }

        this.errors = null
        this.setUserBets(data)
        resolve(data)
      })
    },
    addUserBets (payload) {
      return new Promise(async (resolve, reject) => {
        this.page = this.page + 1

        if (!this.auth.user) {
          resolve('user not logged')
          return
        }

        const formattedPayload = { ...payload }
        formattedPayload.page = this.page

        const [data, err] = await betsService.userBets(formattedPayload)

        if (err) {
          this.errors = err.errors
          reject(err)
          return
        }

        this.errors = null
        this.concatUserBets(data)

        if (data.length === 0) {
          this.hasMoreBets = false
        }

        resolve(data)
      })
    },
    nextUserBets (payload) {
      return new Promise(async (resolve, reject) => {
        this.page = this.page + 1

        if (!this.auth.user) {
          resolve('user not logged')
          return
        }

        const formattedPayload = { ...payload }
        formattedPayload.page = this.page

        const [data, err] = await betsService.userBets(formattedPayload)

        if (err) {
          this.errors = err.errors
          reject(err)
          return
        }

        this.errors = null

        if (data.length === 0) {
          this.hasMoreBets = false
        } else {
          this.setUserBets(data)
        }

        resolve(data)
      })
    },
    updateUser (payload) {
      this.loading = true

      return new Promise(async (resolve, reject) => {
        const [data, err] = await authService.update(payload)

        this.loading = false

        if (err) {
          this.errors = err.errors
          reject(err)
        }

        this.errors = null
        resolve(data)
      })
    },
    async updatePassword (payload) {
      const { $toast } = useNuxtApp()
      /* eslint-disable-next-line */
      const [dataUp, errUp] = await authService.passwordUpdate(payload)

      if (errUp) {
        this.errors = errUp.errors
        return
      }

      this.errors = null
      $toast.success('Senha atualizada com sucesso')
    },
    async login (payload) {
      const { $toast } = useNuxtApp()
      const [data, err] = await authService.login(payload)

      if (err) {
        $toast.error('Usuário ou senha inválidos')
        this.errors = err.errors
        return
      }

      // const onAuth = useOnboardingAuthStore()
      // onAuth.saveAffiliateToken(null)
      this.auth.token = data.token
      this.errors = null

      // if (typeof window !== 'undefined') {
        // localStorage.setItem('token', 'bearer ' + data.token)
      // }

      // this._vm.$toast.open({ message: 'Login realizado com sucesso', type: 'success' })
    },
    authUser () {
      const { $toast } = useNuxtApp()
      this.loading = true

      return new Promise(async (resolve, reject) => {
        const [data, err] = await authService.auth()

        this.loading = false

        if (err) {
          this.errors = err.errors
          reject(err)
          return
        }

        $toast.error('Login realizado com sucesso')
        this.errors = null
        this.auth.user = data
        resolve(data)
      })
    },
    logout () {
      // localStorage.setItem('token', '')
      // localStorage.removeItem('token')
      this.auth.user = null
      this.auth.token = null

      this.setUserBets([])
    }
  },
  getters: {
    loggedInUser (state) {
      return state.auth.user
    },
    authToken (state) {
      return state.auth.token
    },
    getHasMoreBets (state) {
      return state.hasMoreBets
    },
    getUserBetsLoading (state) {
      return state.user_bets_loading
    },
    userBets (state) {
      return state.user_bets
    },
    load (state) {
      return state.loading
    },
    getPage (state) {
      return state.page
    },
    getErrors (state) {
      return state.errors
    }
  }
})
