
const legalService = {
  async rules () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/rules')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async deposits () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/deposits')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async responsible () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/responsible')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async suport () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/support')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async terms () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/terms')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async privacy () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/privacy')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async aml () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/aml')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async cookies () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/cookies')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async faq () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/faq')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async about () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/about')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async affiliates () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/affiliates')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async autoExclusion () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/auto_exclusion')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async disputsResolution () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/disputs_resolution')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async methodImpartiality () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/method_impartiality')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async kycPolitcs () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/kyc_politcs')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  async accountsPaymentsBonus () {
    const config = useRuntimeConfig()
    try {
      const data = await $fetch(config.public.BASE_URL + '/settings/accounts_payments_bonus')
      return [data.data.data, null]
    } catch (error) {
      return [null, error]
    }
  }
}
export default legalService
