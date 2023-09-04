import countriesService from '@/services/countriesService'

state: () => ({
  loading: false,
  leagues: null,
  mainLeagues: null
})
export const mutations = {
  UPDATE_LOADING (state, loading) {
    state.loading = loading
  },
  SET_LEAGUES (state, leagues) {
    state.leagues = leagues
  }
}
actions: {
  fetchPreMatchLeaguesByCountry (payload) {
    commit('UPDATE_LOADING', true)

    return new Promise(async (resolve, reject) => {
      commit('SET_LEAGUES', null)

      const [data, err] = await countriesService.getLeagues(payload.country, payload.sportId)

      if (err) {
        // commit('errors/setErrors', err.errors, { root: true })
        commit('UPDATE_LOADING', false)
        reject(err)
      }

      data.sportId = payload.sportId

      // commit('errors/clearErrors', {}, { root: true })
      commit('SET_LEAGUES', data)
      commit('UPDATE_LOADING', false)
      resolve(data)
    })
  }
}
getters: {
  getPreMatchLeaguesLoading (state) {
    return state.loading
  },
  getPreMatchLeagues (state) {
    return state.leagues
  }
}
