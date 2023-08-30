import betsService from '@/services/betsService'

state: () => ({
  events: [],
  group: [],
  loading: false
})
export const mutations = {
  setEvents (state, events) {
    state.events = events
  },
  addEvent (state, event) {
    if (!state.events) {
      state.events = []
    }
    state.events.push(event[0])
  },
  deleteEvent (state, event) {
    const eventIndex = state.events.findIndex(obj => obj === event)
    state.events.splice(eventIndex, 1)
  },
  updateLoading (state, status) {
    state.loading = status
  },
  setGroup (state, group) {
    state.group = group
  },
  addGroup (state, groupItem) {
    state.group.push(groupItem)
  },
  deleteGroup (state, groupItem) {
    const groupIndex = state.group.findIndex(obj => obj === groupItem)
    state.group.splice(groupIndex, 1)
  }
}
action: {
  fetchPreMatchGroupedEvents ({ commit, state }, payload) {
    commit('updateLoading', true)

    return new Promise(async (resolve, reject) => {
      let counter = 0

      if (!Array.isArray(payload)) {
        resolve([])
        return
      }

      while (counter < payload.length) {
        if (!state.group.includes(payload[counter])) {
          const [data, err] = await betsService.league(payload[counter].split('+')[0])

          if (err) {
            // commit('errors/setErrors', err.errors, { root: true })
            reject(err)
          }

          // commit('errors/clearErrors', {}, { root: true })
          commit('addEvent', data)
          commit('addGroup', payload[counter])
        }

        counter++
      }

      state.group.forEach((item, index) => {
        if (!payload.includes(item)) {
          commit('deleteGroup', item)
          commit('deleteEvent', state.events.filter(ev => ev === state.events[index])[0])
        }
      })

      commit('updateLoading', false)
      resolve(state.events)
    })
  }
}
getters: {
  getPreMatchGroupedEvents (state) {
    if (!state.events) {
      return state.events
    }

    if (Array.isArray(state.events) && state.events.length === 0) {
      return null
    }

    const reEvents = [...state.events]

    return reEvents.reverse()
  },
  getPreMatchGroupedEventsNormalized (state) {
    if (!state.events) {
      return state.events
    }

    if (Array.isArray(state.events) && state.events.length === 0) {
      return null
    }

    const reEvents = [...state.events]

    return reEvents
  },
  getPreMatchGroupedIds (state) {
    return state.group
  },
  getPreMatchGroupedIdsReverse (state) {
    const groups = [...state.group]
    return groups.reverse()
  },
  getPreMatchGroupedLoading (state) {
    return state.loading
  }
}
