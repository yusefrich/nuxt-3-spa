import countriesService from '@/services/countriesService'

state: () => ({
  orderedCountries: null,
  loading: false,
  countries: null
})
export const mutations = {
  SET_ORDERED_COUNTRIES (state, orderedCountries) {
    state.orderedCountries = orderedCountries
  },
  UPDATE_LOADING (state, loading) {
    state.loading = loading
  },
  SET_COUNTRIES (state, countries) {
    state.countries = countries
  }
}
action: {
  fetchMetadataOrderedCountries (payload) {
    return new Promise(async (resolve, reject) => {
      commit('SET_ORDERED_COUNTRIES', [])

      const [data, err] = await countriesService.get(payload)

      if (err) {
        const errorMessage = err.response.data.message ? err.response.data.message : 'Falha ao buscar ligas'

        // this._vm.$toast.open({ message: errorMessage, type: 'error' })
        // commit('errors/setErrors', err.errors, { root: true })
        reject(err)
        return
      }

      const groupSorted = []
      let order = ['Brasil', 'Alemanha', 'Espanha', 'França', 'Inglaterra', 'Itália', 'Portugal', 'Estados Unidos da América']

      if (payload === 48242) {
        order = ['Estados Unidos da América', 'Brasil']
      }

      order.forEach((e) => {
        const index = data.findIndex((f) => { return f.name === e })

        if (data[index]) {
          groupSorted.push(data[index])
          data.splice(index, 1)
        }
      })

      data.forEach((e) => {
        groupSorted.push(e)
      })

      // commit('errors/clearErrors', { root: true })
      commit('SET_ORDERED_COUNTRIES', groupSorted)
      resolve(groupSorted)
    })
  },
  fetchMetadataCountries (payload) {
    commit('UPDATE_LOADING', true)

    return new Promise(async (resolve, reject) => {
      commit('SET_COUNTRIES', [])

      const [data, err] = await countriesService.get(payload)

      if (err) {
        // commit('errors/setErrors', err.errors, { root: true })
        commit('UPDATE_LOADING', false)
        reject(err)
      }

      // commit('errors/clearErrors', {}, { root: true })
      commit('SET_COUNTRIES', data)
      commit('UPDATE_LOADING', false)
      resolve(data)
    })
  }
}
getters: {
  getMetadataOrderedCountries (state) {
    return state.orderedCountries
  },
  getMetadataCountriesLoading (state) {
    return state.loading
  },
  getMetadataCountries (state) {
    return state.countries
  }
}
