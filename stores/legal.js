/* eslint-disable camelcase */
import legalService from '@/services/legalService'

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
})
export const mutations = {
  SET_LOADING (state, loading) {
    state.loading = loading
  },
  SET_RULES (state, rules) {
    state.rules = rules
  },
  SET_DEPOSITS (state, deposits) {
    state.deposits = deposits
  },
  SET_RESPONSIBLE (state, responsible) {
    state.responsible = responsible
  },
  SET_SUPORT (state, suport) {
    state.suport = suport
  },
  SET_TERMS (state, terms) {
    state.terms = terms
  },
  SET_PRIVACY (state, privacy) {
    state.privacy = privacy
  },
  SET_AML (state, aml) {
    state.aml = aml
  },
  SET_COOKIES (state, cookies) {
    state.cookies = cookies
  },
  SET_FAQ (state, faq) {
    state.faq = faq
  },
  SET_ABOUT (state, about) {
    state.about = about
  },
  SET_AFFILIATES (state, affiliates) {
    state.affiliates = affiliates
  },
  SET_AUTO_EXCLUSION (state, auto_exclusion) {
    state.auto_exclusion = auto_exclusion
  },
  SET_DISPUTS_RESOLUTION (state, disputs_resolution) {
    state.disputs_resolution = disputs_resolution
  },
  SET_METHOD_IMPARTIALITY (state, method_impartiality) {
    state.method_impartiality = method_impartiality
  },
  SET_KYC_POLITCS (state, kyc_politcs) {
    state.kyc_politcs = kyc_politcs
  },
  SET_ACCOUNTS_PAYMENTS_BONUS (state, accounts_payments_bonus) {
    state.accounts_payments_bonus = accounts_payments_bonus
  }
}
action: {
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

      commit('SET_RULES', data)
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

      commit('SET_DEPOSITS', data)
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

      commit('SET_RESPONSIBLE', data)
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

      commit('SET_SUPORT', data)
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

      commit('SET_TERMS', data)
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

      commit('SET_PRIVACY', data)
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

      commit('SET_AML', data)
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

      commit('SET_COOKIES', data)
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

      commit('SET_FAQ', data)
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

      commit('SET_ABOUT', data)
      resolve(data)
    })
  },
  fetchLegalAffiliates () {
    return new Promise(async (resolve, reject) => {
      this.loading = true
      commit('SET_AFFILIATES', 'Carregando...')

      const [data, err] = await legalService.affiliates()

      this.loading = false

      if (err) {
        const errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao buscar dados legais!'

        // this._vm.$toast.open({ message: errorMessage, type: 'warning' })
        reject(err)
        return
      }

      commit('SET_AFFILIATES', data)
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

      commit('SET_AUTO_EXCLUSION', data)
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

      commit('SET_DISPUTS_RESOLUTION', data)
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

      commit('SET_METHOD_IMPARTIALITY', data)
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

      commit('SET_KYC_POLITCS', data)
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

      commit('SET_ACCOUNTS_PAYMENTS_BONUS', data)
      resolve(data)
    })
  }
}
getters: {
  getLegalLoading (state) {
    return state.loading
  },
  getLegalRules (state) {
    return state.rules
  },
  getLegalDeposits (state) {
    return state.deposits
  },
  getLegalResponsible (state) {
    return state.responsible
  },
  getLegalSuport (state) {
    return state.suport
  },
  getLegalTerms (state) {
    return state.terms
  },
  getLegalPrivacy (state) {
    return state.privacy
  },
  getLegalAml (state) {
    return state.aml
  },
  getLegalCookies (state) {
    return state.cookies
  },
  getLegalFaq (state) {
    return state.faq
  },
  getLegalAbout (state) {
    return state.about
  },
  getLegalAffiliates (state) {
    return state.affiliates
  },
  getLegalAutoExclusion (state) {
    return state.auto_exclusion
  },
  getLegalDisputsResolution (state) {
    return state.disputs_resolution
  },
  getLegalMethodImpartiality (state) {
    return state.method_impartiality
  },
  getLegalKycPolitcs (state) {
    return state.kyc_politcs
  },
  getLegalAccountsPaymentsBonus (state) {
    return state.accounts_payments_bonus
  }
}
