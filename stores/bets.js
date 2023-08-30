import betsService from '@/services/betsService'
import { defineStore } from 'pinia'

export const useBetsStore = defineStore('bets', {
  state: () => ({
    leagues: null,
    featuredBets: null,
    currentEvent: null
  }),
  actions: {
    commitFeaturedBets (featuredBets) {
      this.featuredBets = featuredBets
    },
    commitCurrentEvent (currentEvent) {
      this.currentEvent = currentEvent
    },
    fetchLeagues (payload) {
      return new Promise(async (resolve, reject) => {
        this.leagues = []

        const [data, err] = await betsService.leagues(payload)

        if (err) {
          const errorMessage = err.response.data.message ? err.response.data.message : 'Falha ao buscar ligas'

          // this._vm.$toast.open({ message: errorMessage, type: 'error' })
          reject(err)
          return
        }

        const group = data.reduce((r, a) => {
          r[a.country] = [...r[a.country] || [], a]
          return r
        }, {})

        const groupSorted = []
        let order = ['Brasil', 'Alemanha', 'Espanha', 'França', 'Inglaterra', 'Itália', 'Portugal', 'Estados Unidos da América']

        if (payload === 48242) {
          order = ['Estados Unidos da América', 'Brasil']
        }

        order.forEach((e) => {
          if (group[e]) {
            groupSorted.push({ country: e, games: group[e] })
            delete group[e]
          }
        })

        Object.entries(group).forEach(([key, value]) => {
          groupSorted.push({ country: key, games: value })
        })

        this.leagues = groupSorted
        resolve(groupSorted)
      })
    },
  },
  getters: {
    currentLeagues (state) {
      return state.leagues
    },
    currentFeaturedBets (state) {
      return state.featuredBets
    },
    currentEvent (state) {
      return state.currentEvent
    }
  },
})
