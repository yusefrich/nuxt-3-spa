import promotionsService from '@/services/promotionsService'

state: () => ({
  loading: false,
  promos: null,
  errors: null
})

export const mutations = {
  updateLoading (state, status) {
    state.loading = status
  },
  setPromos (state, payload) {
    state.promos = payload
  },
  setErrors (state, errors) {
    state.errors = errors
  }
}

action: {
  fetchPromos () {
    commit('updateLoading', true)

    return new Promise(async (resolve, reject) => {
      commit('setPromos', null)
      const [data, err] = await promotionsService.get()

      if (err) {
        commit('setErrors', err.errors)
        commit('updateLoading', false)
        reject(err)
      }

      commit('setErrors', null)
      commit('setPromos', data.data)
      commit('updateLoading', false)
      resolve(data)
    })
  }
}

getters: {
  getLoading: state => state.loading,
  getPromos: state => state.promos,
  getErrors: state => state.errors
}
