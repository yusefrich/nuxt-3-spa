// import createCache from 'vuex-cache'
import authService from '@/services/authService'
import betsService from '@/services/betsService'
import { defineStore } from 'pinia'

export const useBaseStore = defineStore('base', {
  state: () => ({
    auth: {
      user: null
    },
    user_bets: null,
    page: null,
    hasMoreBets: true,
    user_bets_loading: false,
    loading: false
  }),
  actions: {
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
          // commit('errors/setErrors', err.errors, { root: true })
          reject(err)
          return
        }

        // commit('errors/clearErrors', { root: true })
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
          // commit('errors/setErrors', err.errors, { root: true })
          reject(err)
          return
        }

        // commit('errors/clearErrors', { root: true })
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
          // commit('errors/setErrors', err.errors, { root: true })
          reject(err)
          return
        }

        // commit('errors/clearErrors', { root: true })

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
          // commit('errors/setErrors', err.errors, { root: true })
          reject(err)
        }

        // commit('errors/clearErrors', {}, { root: true })
        resolve(data)
      })
    },
    async updatePassword (payload) {
      /* eslint-disable-next-line */
      const [dataUp, errUp] = await authService.passwordUpdate(payload)

      if (errUp) {
        const errorMessage = errUp.response && errUp.response.data.message ? errUp.response.data.message : 'Falha ao alterar senha'

        // this._vm.$toast.open({ message: errorMessage, type: 'error' })
        // commit('errors/setErrors', errUp.errors, { root: true })
        return
      }

      // commit('errors/clearErrors', {}, { root: true })
      // this._vm.$toast.open({ message: 'Senha atualizados com sucesso', type: 'success' })
    },
    async login (payload) {
      const [data, err] = await authService.login(payload)

      if (err) {
        const errorMessage = err.response && err.response.data.message ? err.response.data.message : 'Usuário ou senha incorretos!'

        // this._vm.$toast.open({ message: errorMessage, type: 'error' })
        // commit('errors/setErrors', err.errors, { root: true })
        return
      }

      // dispatch('onboarding-auth/saveAffiliateToken', null)

      // commit('errors/clearErrors', {}, { root: true })

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', 'bearer ' + data.token)
      }

      // this._vm.$toast.open({ message: 'Login realizado com sucesso', type: 'success' })
    },
    authUser () {
      this.loading = true

      return new Promise(async (resolve, reject) => {
        const [data, err] = await authService.auth()

        this.loading = false

        if (err) {
          const errorMessage = err.response && err.response.data.message ? err.response.data.message : 'Erro durante a autenticação do usuário!'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          // commit('errors/setErrors', err.errors, { root: true })
          reject(err)
          return
        }

        // commit('errors/clearErrors', { root: true })
        this.auth.user = data
        resolve(data)
      })
    },
    logout () {
      // localStorage.setItem('token', '')
      localStorage.removeItem('token')
      this.auth.user = null
      this.setUserBets([])
    }
  },
  getters: {
    loggedInUser (state) {
      return state.auth.user
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
    }
  }
})
