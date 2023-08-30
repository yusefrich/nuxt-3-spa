import betsService from '@/services/betsService'
import inplayService from '@/services/inplayService'

export const useEvensStore = defineStore('events', {
  state: () => ({
    events: null,
    event: null,
    leagues: null,
    livescoreId: null // sem chamada
  }),
action: {
  // sem chamada
  fetchCurrentEvent (payload) {
    return new Promise(async (resolve, reject) => {
      commit('setEvent', null)

      const [data, err] = await inplayService.show(payload)

      if (err) {
        // commit('errors/setErrors', err.errors, { root: true })
        reject(err)
        return
      }

      commit('setEvent', data)
      commit('setLivescoreId', data.livescore_id)
      resolve(data)
    })
  },
  fetchEvents (payload) {
    return new Promise(async (resolve, reject) => {
      commit('setEvents', [])

      const [data, err] = await betsService.events(payload)

      if (err) {
        // commit('errors/setErrors', err.errors, { root: true })
        reject(err)
      }

      // commit('errors/clearErrors', { root: true })
      commit('setEvents', data)
      resolve(data)
    })
  },
  fetchEventsFromLeague (payload) {
    return new Promise(async (resolve, reject) => {
      commit('setEvents', [])

      const [data, err] = await betsService.league(payload)

      if (err) {
        const errorMessage = err.response.data.message ? err.response.data.message : 'Falha ao buscar ligas'

        // this._vm.$toast.open({ message: errorMessage, type: 'error' })
        // commit('errors/setErrors', err.errors, { root: true })
        reject(err)
      }

      // commit('errors/clearErrors', { root: true })
      commit('setEvents', data)
      resolve(data)
    })
  },
  fetchAllLeagues () {
    return new Promise(async (resolve, reject) => {
      commit('setLeagues', [])

      const [data, err] = await betsService.allLeagues()

      if (err) {
        const errorMessage = err.response.data.message ? err.response.data.message : 'Falha ao buscar ligas'

        // this._vm.$toast.open({ message: errorMessage, type: 'error' })
        // commit('errors/setErrors', err.errors, { root: true })
        reject(err)
      }

      // commit('errors/clearErrors', { root: true })
      commit('setLeagues', data)
      resolve(data)
    })
  },
  fetchAllMainLeagues () {
    return new Promise(async (resolve, reject) => {
      commit('setLeagues', [])

      const [data, err] = await betsService.allMainLeagues()

      if (err) {
        const errorMessage = err.response.data.message ? err.response.data.message : 'Falha ao buscar ligas'

        // this._vm.$toast.open({ message: errorMessage, type: 'error' })
        // commit('errors/setErrors', err.errors, { root: true })
        reject(err)
        return
      }

      // commit('errors/clearErrors', { root: true })
      commit('setLeagues', data)
      resolve(data)
    })
  }
},
getters: {
  events (state) {
    return state.events
  },
  event (state) {
    return state.event
  },
  leagues (state) {
    return state.leagues
  },
  // sem chamada
  livescoreId (state) {
    return state.livescoreId
  }
}

})
export const mutations = {
  setEvents (state, events) {
    state.events = events
  },
  setLeagues (state, leagues) {
    state.leagues = leagues
  },
  setEvent (state, event) {
    state.event = event
  },
  // sem chamada
  setLivescoreId (state, id) {
    state.livescoreId = id
  }
}
