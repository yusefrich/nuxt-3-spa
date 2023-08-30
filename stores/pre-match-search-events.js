import betsService from '@/services/betsService'

state: () => ({
  loading: false,
  events: null
})
export const mutations = {
  UPDATE_LOADING (state, loading) {
    state.loading = loading
  },
  SET_EVENTS (state, events) {
    state.events = events
  }
}
action: {
  fetchPreMatchSearchEvents (payload) {
    commit('UPDATE_LOADING', true)

    return new Promise(async (resolve, reject) => {
      commit('SET_EVENTS', null)

      const [data, err] = await betsService.eventsSearchUnprotected(payload)

      if (err) {
        // commit('errors/setErrors', err.errors, { root: true })
        commit('UPDATE_LOADING', false)
        reject(err)
      }

      commit('SET_EVENTS', data)
      commit('UPDATE_LOADING', false)
      resolve(data)
    })
  }
}
getters: {
  getPreMatchSearchEventsLoading (state) {
    return state.loading
  },
  getPreMatchSeachEvents (state) {
    return state.events
  }
}
