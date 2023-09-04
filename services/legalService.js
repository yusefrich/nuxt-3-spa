const config = useRuntimeConfig()

const legalService = {
  async rules () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/rules')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async deposits () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/deposits')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async responsible () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/responsible')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async suport () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/support')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async terms () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/terms')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async privacy () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/privacy')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async aml () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/aml')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async cookies () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/cookies')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async faq () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/faq')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async about () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/about')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async affiliates () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/affiliates')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async autoExclusion () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/auto_exclusion')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async disputsResolution () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/disputs_resolution')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async methodImpartiality () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/method_impartiality')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async kycPolitcs () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/kyc_politcs')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async accountsPaymentsBonus () {
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/accounts_payments_bonus')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}
export default legalService
