import depositService from '@/services/depositService'
import withdrawService from '@/services/withdrawService'
import { defineStore } from 'pinia'

export const useOnboardingBankStore = defineStore('onboardingBank', {
  state: () => ({
    loading: false,
    deposits: null,
    depositsPage: 1,
    casinoTransactions: null,
    withdraws: null,
    withdrawsPage: 1,
    errors: null
  }),
  action: {
    clearBankErrors () {
      this.errors = null
      this.loading = false
    },
    postBankDeposit (payload) {
      this.errors = null

      return new Promise(async (resolve, reject) => {
        if (payload.amount <= 0) {
          // this._vm.$toast.open({ message: 'Insira um valor válido para o depósito!', type: 'error' })
          reject(new Error('Insira um valor válido para o depósito!'))
          return
        }

        if (payload.method === 'boleto' && payload.value < 30) {
          // this._vm.$toast.open({ message: 'Insira um valor válido para o depósito!', type: 'error' })
          reject(new Error('Insira um valor válido para o depósito!'))
          return
        }

        const threatedPaylaod = {
          method: payload.method,
          amount: payload.amount
        }

        if (payload.bank) {
          threatedPaylaod.bank = payload.bank
        }

        if (payload.code) {
          threatedPaylaod.code = payload.code
        }

        this.loading = true

        const [data, err] = await depositService.post(threatedPaylaod)

        this.loading = false

        if (err) {
          this.errors = err.response.data.errors

          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao realizar deposito!'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }

        resolve(data)
      })
    },
    postBankWithdraw (payload) {
      this.errors = null

      return new Promise(async (resolve, reject) => {
        if (payload.value <= 0) {
          // this._vm.$toast.open({ message: 'Insira um valor válido para o saque!', type: 'error' })
          reject(new Error('Insira um valor válido para o saque!'))
          return
        }

        this.loading = true

        const [data, err] = await withdrawService.post(payload)

        this.loading = false

        if (err) {
          this.errors = err.response.data.errors

          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao realizar saque!'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }

        resolve(data)
      })
    },
    fetchBankCasinoTransactions (payload) {
      return new Promise(async (resolve, reject) => {
        this.casinoTransactions = null
        this.loading = true

        const [data, err] = await depositService.getCasinoTransactions(payload)

        this.loading = false

        if (err) {
          this.errors = err.errors
          reject(err)
          return
        }

        this.casinoTransactions = data
        resolve(data)
      })
    },
    concatBankCasinoTransactions (payload) {
      return new Promise(async (resolve, reject) => {
        this.loading = true

        const [data, err] = await depositService.getCasinoTransactions(payload)

        this.loading = false

        if (err) {
          this.errors = err.errors
          reject(err)
          return
        }

        this.casinoTransactions = [...this.casinoTransactions, ...data]
        resolve(data)
      })
    },
    fetchBankDeposits () {
      return new Promise(async (resolve, reject) => {
        this.deposits = null
        this.depositsPage = 1
        this.loading = true

        const [data, err] = await depositService.get()

        this.loading = false

        if (err) {
          this.errors = err.errors
          reject(err)
          return
        }

        this.deposits = data
        resolve(data)
      })
    },
    concatBankDeposits () {
      return new Promise(async (resolve, reject) => {
        this.depositsPage = this.depositsPage + 1
        this.loading = true

        const [data, err] = await depositService.get({ page: this.depositsPage })

        this.loading = false

        if (err) {
          this.errors = err.errors
          reject(err)
          return
        }

        this.deposits = { data: [...this.deposits.data, ...data.data] }
        resolve(data)
      })
    },
    fetchBankWithdraws () {
      return new Promise(async (resolve, reject) => {
        this.withdraws = null
        this.withdrawsPage = 1
        this.loading = true

        const [data, err] = await withdrawService.get()

        this.loading = false

        if (err) {
          this.errors = err.errors
          reject(err)
          return
        }

        this.withdraws = data
        resolve(data)
      })
    },
    concatBankWithdraws () {
      return new Promise(async (resolve, reject) => {
        this.withdrawsPage = this.withdrawsPage + 1
        this.loading = true

        const [data, err] = await withdrawService.get({ page: this.withdrawsPage })

        this.loading = false

        if (err) {
          this.errors = err.errors
          reject(err)
          return
        }

        this.withdraws = { data: [...this.withdraws.data, ...data.data] }
        resolve(data)
      })
    }
  },
  getters: {
    getBankDeposits (state) {
      return state.deposits
    },
    getBankWithdraws (state) {
      return state.withdraws
    },
    getBankCasinoTransactions (state) {
      return state.casinoTransactions
    },
    getBankLoading (state) {
      return state.loading
    },
    getBankErrors (state) {
      return state.errors
    }
  }
})
