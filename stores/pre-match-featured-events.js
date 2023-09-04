import betsService from '@/services/betsService'

state: () => ({
  events: null,
  errors: {},
  loading: false
})
export const mutations = {
  SET_EVENTS (state, events) {
    state.events = events
  },
  SET_ERRORS (state, errors) {
    state.errors = errors
  },
  UPDATE_LOADING (state, status) {
    state.loading = status
  }
}
actions: {
  fetchPreMatchFeaturedEvents (sportId) {
    commit('UPDATE_LOADING', true)

    return new Promise(async (resolve, reject) => {
      commit('SET_EVENTS', null)

      const [data, err] = await betsService.featuredBets(sportId)

      if (err) {
        this.errors = err.errors
        commit('UPDATE_LOADING', false)
        reject(err)
        return
      }

      commit('SET_ERRORS', {})

      if (data && data.length > 0) {
        commit('SET_EVENTS', [{
          games: data,
          name: 'Em destaque'
        }])
      }

      commit('UPDATE_LOADING', false)
      resolve(data)
    })
  }
}
getters: {
  getPreMatchFeaturedEvents (state) {
    return state.events
  },
  getPreMatchFeaturedEventsLoading (state) {
    return state.loading
  }
}
