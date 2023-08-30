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
  fetchPreMatchLeagueEvents (payload) {
    commit('UPDATE_LOADING', true)

    return new Promise(async (resolve, reject) => {
      commit('SET_EVENTS', null)

      const [data, err] = await betsService.league(payload)

      if (err) {
        // commit('errors/setErrors', err.errors, { root: true })
        commit('UPDATE_LOADING', false)
        reject(err)
      }

      data.sportId = payload.sport

      // commit('errors/clearErrors', {}, { root: true })
      commit('SET_EVENTS', data)
      commit('UPDATE_LOADING', false)
      resolve(data)
    })
  }
}
getters: {
  getPreMatchLeagueEventsLoading (state) {
    return state.loading
  },
  getPreMatchLeagueEvents (state) {
    return state.events
  }
}
