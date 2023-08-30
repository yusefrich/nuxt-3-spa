import axios from 'axios'

const legalService = {
  async rules () {
    try {
      const data = await axios.get('/settings/rules')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async deposits () {
    try {
      const data = await axios.get('/settings/deposits')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async responsible () {
    try {
      const data = await axios.get('/settings/responsible')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async suport () {
    try {
      const data = await axios.get('/settings/support')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async terms () {
    try {
      const data = await axios.get('/settings/terms')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async privacy () {
    try {
      const data = await axios.get('/settings/privacy')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async aml () {
    try {
      const data = await axios.get('/settings/aml')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async cookies () {
    try {
      const data = await axios.get('/settings/cookies')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async faq () {
    try {
      const data = await axios.get('/settings/faq')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async about () {
    try {
      const data = await axios.get('/settings/about')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async affiliates () {
    try {
      const data = await axios.get('/settings/affiliates')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async autoExclusion () {
    try {
      const data = await axios.get('/settings/auto_exclusion')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async disputsResolution () {
    try {
      const data = await axios.get('/settings/disputs_resolution')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async methodImpartiality () {
    try {
      const data = await axios.get('/settings/method_impartiality')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async kycPolitcs () {
    try {
      const data = await axios.get('/settings/kyc_politcs')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async accountsPaymentsBonus () {
    try {
      const data = await axios.get('/settings/accounts_payments_bonus')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}
export default legalService
