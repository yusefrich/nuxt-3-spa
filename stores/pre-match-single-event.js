import betsService from '@/services/betsService'

state: () => ({
  event: null,
  errors: null,
  loading: false
})
export const mutations = {
  SET_EVENT (state, event) {
    state.event = event
  },
  SET_ERRORS (state, errors) {
    state.errors = errors
  },
  UPDATE_LOADING (state, status) {
    state.loading = status
  }
}
actions: {
  fetchPreMatchSingleEvent (slug) {
    commit('UPDATE_LOADING', true)

    return new Promise(async (resolve, reject) => {
      commit('SET_EVENT', null)

      const [data, err] = await betsService.event(slug)

      if (err) {
        this.errors = err.errors
        commit('UPDATE_LOADING', false)
        reject(err)
      }

      commit('SET_ERRORS', null)
      commit('SET_EVENT', data)
      commit('UPDATE_LOADING', false)
      resolve(data)
    })
  }
}
getters: {
  getPreMatchSingleEvent (state) {
    return state.event
  },
  getPreMatchEventErrors (state) {
    return state.errors
  },
  getPreMatchEventLoading (state) {
    return state.loading
  }
}
