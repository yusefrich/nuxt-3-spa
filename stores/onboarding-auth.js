import authService from '@/services/authService'
import thirdPartyApis from '@/services/thirdPartyApis'
import { defineStore } from 'pinia'

export const useOnboardingAuthStore = defineStore('onboardingAuth', {
  state: () => ({
    loading: false,
    errors: null,
    affiliateToken: null,
    userData: null,
    address: null
  }),
  actions: {
    clearAuthErrors () {
      this.errors = null
      this.loading = false
    },
    sendCancelUserBonus (payload) {
      return new Promise(async (resolve, reject) => {
        this.loading = true
        const [data, err] = await authService.bonusCancelation(payload)
        this.loading = false
        if (err) {
          const errorMessage = err.response && err.response.data.message ? err.response.data.message : 'Erro ao cancelar bônus'
          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }
        resolve(data)
      })
    },
    sendForgottenPasswordUpdate (payload) {
      return new Promise(async (resolve, reject) => {
        this.errors = null
        this.loading = true

        const [data, err] = await authService.reset(payload)

        this.loading = false

        if (err) {
          const errorMessage = err.response && err.response.data.message ? err.response.data.message : 'Erro ao alterar senha'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          this.errors = err.response.data.errors
          reject(err)
          return
        }

        this.errors = null
        // this._vm.$toast.open({ message: 'Senha alterada com sucesso', type: 'success' })
        resolve(data)
      })
    },
    sendForgottenPasswordEmail (payload) {
      return new Promise(async (resolve, reject) => {
        this.errors = null
        this.loading = true

        const [data, err] = await authService.forgot(payload)

        this.loading = false

        if (err) {
          this.errors = err.response.data.errors
          reject(err)
          return
        }

        this.errors = null
        // this._vm.$toast.open({ message: 'Email enviado com sucesso', type: 'success' })
        resolve(data)
      })
    },
    updateUserPassword (payload) {
      return new Promise(async (resolve, reject) => {
        this.errors = null
        this.loading = true

        const [data, err] = await authService.passwordUpdate(payload)

        this.loading = false

        if (err) {
          const errorMessage = 'Falha ao alterar senha'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          this.errors = err.errors
          reject(err)
          return
        }

        this.errors = null
        // this._vm.$toast.open({ message: 'Senha atualizada com sucesso', type: 'success' })
        resolve(data)
      })
    },
    updateUserData (payload) {
      return new Promise(async (resolve, reject) => {
        this.errors = null
        this.loading = true

        /* eslint-disable-next-line */
        const [data, err] = await authService.update(payload)

        this.loading = false

        if (err) {
          this.errors = err.response.data.errors

          const errorMessage = err.response.data.message ? err.response.data.message : 'Falha ao atualizar dados do cadastro, tente novamente!'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
        }

        // this._vm.$toast.open({ message: 'Dados atualizados com sucesso', type: 'success' })
        resolve(data)
      })
    },
    validateCep (payload) {
      return new Promise(async (resolve, reject) => {
        this.errors = null
        this.loading = true

        /* eslint-disable-next-line */
        const [data, err] = await authService.search({ cpf: payload.replace(/[\.-]/g, '') })

        this.loading = false

        if (err) {
          this.errors = err.response.data.errors

          const errorMessage = err.response.data.message ? err.response.data.message : 'Falha ao validar cpf, tente novamente!'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
        }

        resolve(data)
      })
    },
    validateUserCpf (payload) {
      return new Promise(async (resolve, reject) => {
        this.errors = null
        this.userData = null
        this.loading = true

        /* eslint-disable-next-line */
        const [data, err] = await authService.search({ cpf: payload.replace(/[\.-]/g, '') })

        this.loading = false

        if (err) {
          this.errors = err.response.data.errors

          const errorMessage = err.response.data.message ? err.response.data.message : 'Falha ao validar cpf, tente novamente!'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
        }

        this.userData = data.Result
        resolve(data)
      })
    },
    saveAffiliateToken (payload) {
      this.affiliateToken = payload
    },
    registerUser (payload) {
      const userData = payload

      if (this.affiliateToken) {
        userData.token = this.affiliateToken
      }

      return new Promise(async (resolve, reject) => {
        this.errors = null
        this.loading = true

        const [data, err] = await authService.register(userData)

        this.loading = false

        if (err) {
          this.errors = err.response.data.errors

          const errorMessage = err.response.data.message ? err.response.data.message : 'Falha ao registrar usuario, tente novamente!'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }

        // this._vm.$toast.open({ message: 'Usuário cadastrado com sucesso!', type: 'success' })

        if (typeof window !== 'undefined') {
          localStorage.setItem('token', 'bearer ' + data.data)
        }

        this.affiliateToken = null
        resolve(data)
      })
    },
    clearErrors () {
      this.errors = null
    },
    fetchAddressData (payload) {
      return new Promise(async (resolve, reject) => {
        this.address = null

        const [data, err] = await thirdPartyApis.getAddress(payload)

        if (err) {
          // this._vm.$toast.open({ message: 'Não foi possível buscar dados desse cep, digite seu endereço manualmente abaixo!', type: 'info' })
          reject(err)
          return
        }

        this.address = data
        resolve(data)
      })
    }
  },
  getters: {
    getOnboardingAuthLoading (state) {
      return state.loading
    },
    getOnboardingAuthErrors (state) {
      return state.errors
    },
    getOnboardingAuthUserData (state) {
      return state.userData
    },
    getOnboardingAuthAddress (state) {
      return state.address
    }
  }
})
