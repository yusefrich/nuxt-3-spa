import { defineStore } from 'pinia'

import legalService from '@/services/legalService'

export const useLegalStore = defineStore('legal', {
  state: () => ({
    loading: false,
    rules: null,
    deposits: null,
    responsible: null,
    suport: null,
    terms: null,
    privacy: null,
    aml: null,
    cookies: null,
    faq: null,
    about: null,
    affiliates: null,
    auto_exclusion: null,
    disputs_resolution: null,
    method_impartiality: null,
    kyc_politcs: null,
    accounts_payments_bonus: null
  }),
  actions: {
    fetchLegalRules () {
      return new Promise(async (resolve, reject) => {
        this.loading = true
  
        const [data, err] = await legalService.rules()
  
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar dados legais!'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          reject(err)
          return
        }

        this.rules = data

        resolve(data)
      })
    },
    fetchLegalDeposits () {
      return new Promise(async (resolve, reject) => {
        this.loading = true
  
        const [data, err] = await legalService.deposits()
  
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar dados legais!'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          reject(err)
          return
        }

        this.deposits = data

        resolve(data)
      })
    },
    fetchLegalResponsible () {
      return new Promise(async (resolve, reject) => {
        this.loading = true
  
        const [data, err] = await legalService.responsible()
  
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar dados legais!'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          reject(err)
          return
        }

        this.responsible = data

        resolve(data)
      })
    },
    fetchLegalSuport () {
      return new Promise(async (resolve, reject) => {
        this.loading = true
  
        const [data, err] = await legalService.suport()
  
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar dados legais!'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          reject(err)
          return
        }

        this.suport = data

        resolve(data)
      })
    },
    fetchLegalTerms () {
      return new Promise(async (resolve, reject) => {
        this.loading = true
  
        const [data, err] = await legalService.terms()
  
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar dados legais!'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          reject(err)
          return
        }

        this.terms = data

        resolve(data)
      })
    },
    fetchLegalPrivacy () {
      return new Promise(async (resolve, reject) => {
        this.loading = true
  
        const [data, err] = await legalService.privacy()
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar dados legais!'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          reject(err)
          return
        }

        this.privacy = data

        resolve(data)
      })
    },
    fetchLegalAml () {
      return new Promise(async (resolve, reject) => {
        this.loading = true
  
        const [data, err] = await legalService.aml()
  
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar dados legais!'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          reject(err)
          return
        }

        this.aml = data

        resolve(data)
      })
    },
    fetchLegalCookies () {
      return new Promise(async (resolve, reject) => {
        this.loading = true
  
        const [data, err] = await legalService.cookies()
  
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar dados legais!'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          reject(err)
          return
        }
  
        this.cookies = data

        resolve(data)
      })
    },
    fetchLegalFaq () {
      return new Promise(async (resolve, reject) => {
        this.loading = true
  
        const [data, err] = await legalService.faq()
  
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar dados legais!'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          reject(err)
          return
        }

        this.faq = data

        resolve(data)
      })
    },
    fetchLegalAbout () {
      return new Promise(async (resolve, reject) => {
        this.loading = true
  
        const [data, err] = await legalService.about()
  
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar dados legais!'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          reject(err)
          return
        }

        this.about = data

        resolve(data)
      })
    },
    fetchLegalAffiliates () {
      return new Promise(async (resolve, reject) => {
        this.loading = true
        this.affiliates = 'Carregando...'
  
        const [data, err] = await legalService.affiliates()
  
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar dados legais!'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          reject(err)
          return
        }

        this.affiliates = data

        resolve(data)
      })
    },
    fetchLegalAutoExclusion () {
      return new Promise(async (resolve, reject) => {
        this.loading = true
  
        const [data, err] = await legalService.autoExclusion()
  
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar dados legais!'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          reject(err)
          return
        }

        this.auto_exclusion = data

        resolve(data)
      })
    },
    fetchLegalDisputsResolution () {
      return new Promise(async (resolve, reject) => {
        this.loading = true
  
        const [data, err] = await legalService.disputsResolution()
  
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar dados legais!'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          reject(err)
          return
        }

        this.disputs_resolution = data

        resolve(data)
      })
    },
    fetchLegalMethodImpartiality () {
      return new Promise(async (resolve, reject) => {
        this.loading = true
  
        const [data, err] = await legalService.methodImpartiality()
  
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar dados legais!'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          reject(err)
          return
        }

        this.method_impartiality = data

        resolve(data)
      })
    },
    fetchLegalKycPolitcs () {
      return new Promise(async (resolve, reject) => {
        this.loading = true
  
        const [data, err] = await legalService.kycPolitcs()
  
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar dados legais!'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          reject(err)
          return
        }

        this.kyc_politcs = data

        resolve(data)
      })
    },
    fetchLegalAccountsPaymentsBonus () {
      return new Promise(async (resolve, reject) => {
        this.loading = true
  
        const [data, err] = await legalService.accountsPaymentsBonus()
  
        this.loading = false
  
        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar dados legais!'
  
          // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
          reject(err)
          return
        }

        this.accounts_payments_bonus = data

        resolve(data)
      })
    }
  },
  getters: {
    getLegalLoading: state => state.loading,
    getLegalRules: state => state.rules,
    getLegalDeposits: state => state.deposits,
    getLegalResponsible: state => state.responsible,
    getLegalSuport: state => state.suport,
    getLegalTerms: state => state.terms,
    getLegalPrivacy: state => state.privacy,
    getLegalAml: state => state.aml,
    getLegalCookies: state => state.cookies,
    getLegalFaq: state => state.faq,
    getLegalAbout: state => state.about,
    getLegalAffiliates: state => state.affiliates,
    getLegalAutoExclusion: state => state.auto_exclusion,
    getLegalDisputsResolution: state => state.disputs_resolution,
    getLegalMethodImpartiality: state => state.method_impartiality,
    getLegalKycPolitcs: state => state.kyc_politcs,
    getLegalAccountsPaymentsBonus: state => state.accounts_payments_bonus
  }
})
