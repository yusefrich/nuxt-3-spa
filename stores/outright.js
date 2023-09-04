import sportsService from '@/services/sportsService'

state: () => ({
  events: null,
  loading: false
})
export const mutations = {
  setEvents (state, events) {
    state.events = events
  },
  updateLoading (state, status) {
    state.loading = status
  }
}
actions: {
  fetchOutrightEvents () {
    commit('updateLoading', true)

    return new Promise(async (resolve, reject) => {
      commit('setEvents', [])

      const [data, err] = await sportsService.getOutrightSports()

      if (err) {
        // commit('errors/setErrors', err.errors, { root: true })
        commit('updateLoading', false)
        reject(err)
      }

      // commit('errors/clearErrors', {}, { root: true })
      commit('setEvents', data)
      commit('updateLoading', false)
      resolve(data)
    })
  }
}
getters: {
  getOutrightEvents (state) {
    return state.events
  },
  getOutrightLoading (state) {
    return state.loading
  }
}
