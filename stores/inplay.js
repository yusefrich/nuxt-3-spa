import inplayService from '@/services/inplayService'
import { useTicketsPreCashInStore } from '@/stores/tickets-pre-cash-in'
import { defineStore } from 'pinia'

export const useInplayStore = defineStore('inplay', {
  state: () => ({
    events: [],
    loading: false
  }),
  actions: {
    finishGame (payload) {
      // commit('FINISH_EVENT', payload)
      const events = [...this.events]
      events.forEach((event) => {
        const index = event.games.findIndex(obj => obj.id === payload.game_id)
        if (index > -1) {
          event.games.splice(index, 1)
        }
      })
      const eIndex = events.findIndex(obj => !obj.games || obj.games.length <= 0)
      events.splice(eIndex, 1)
      this.events = events
    },
    updateInplayEventsOdds (payload) {
      // commit('UPDATE_EVENT_ODD', payload)
      let event = null
      const events = [...this.events]

      for (let i = 0; i < events.length; i++) {
        const e = events[i]
        event = e.games.find(el => +el.id === payload.game_id)

        // continue the loop if the event is not found
        if (!event) {
          continue
        }

        event.odds.forEach((wrapper) => {
          wrapper.odds.forEach((odds) => {
            payload.message.forEach((el) => {
              if (odds.type === el.odd_id) {
                if (+odds.odds > +el.price) {
                  odds.leverage = 'down'
                } else if (+odds.odds < +el.price) {
                  odds.leverage = 'up'
                } else {
                  odds.leverage = 'normal'
                }
                odds.odds = el.price
              }
            })
          })
        })
      }
      this.events = events
    },
    updateInplayEventsMetadata (payload) {
      // commit('UPDATE_EVENTS_METADATA', payload)
      const events = [...this.events]
      let event = null

      for (let i = 0; i < events.length; i++) {
        const e = events[i]
        event = e.games.find(el => +el.id === payload.game_id)

        // continue the loop if the event is not found
        if (!event) {
          continue
        }

        if (event.away_result && (+event.away_result < +payload.message.away_score) && (event.time < payload.message.time)) {
          event.away_goal = true
          event.away_result = payload.message.away_score
          event.away_goal_time = payload.message.time
          event.away_goal_real_time = Date.now()
        }

        if (event.away_goal && (payload.message.time - event.away_goal_time) > 1) {
          event.away_goal = false
        }

        if (event.home_result && (+event.home_result < +payload.message.home_score) && (event.time < payload.message.time)) {
          event.home_goal = true
          event.home_result = payload.message.home_score
          event.home_goal_time = payload.message.time
          event.home_goal_real_time = Date.now()
        }

        if (event.home_goal && (payload.message.time - event.home_goal_time) > 1) {
          event.home_goal = false
        }

        event.time = payload.message.time

        if (event.result[0]) {
          event.result[0].away = payload.message.away_score
          event.result[0].home = payload.message.home_score
        }
      }

      this.events = events

    },
    fetchInplayEvents (payload) {
      return new Promise(async (resolve, reject) => {
        const [data, err] = await inplayService.get(payload)

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          reject(err)
          return
        }

        // commit('errors/clearErrors', {}, { root: true })
        this.events = data

        if (data) {
          const oddsGroup = []

          data.forEach((e) => {
            e.games.forEach((el) => {
              if (el.odds && el.odds.length > 0) {
                el.odds.forEach((ele) => {
                  if (ele) {
                    ele.odds.forEach((element) => {
                      oddsGroup.push(element)
                    })
                  }
                })
              }
            })
          })
          const ticketsPreCashInStore = useTicketsPreCashInStore()
          ticketsPreCashInStore.updateOddChangeTicket(oddsGroup)

          // dispatch('tickets-pre-cash-in/updateOddChangeTicket', oddsGroup, { root: true })
        }

        resolve(data)
      })
    },
    fetchAndAddInplayEvents (payload) {
      return new Promise(async (resolve, reject) => {
        const [data, err] = await inplayService.get(payload)

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          reject(err)
          return
        }

        // commit('errors/clearErrors', {}, { root: true })
        // commit('ADD_EVENTS', data)
        data.forEach((toAddEvent) => {
          toAddEvent.games.forEach((toAddGame) => {
            this.events.forEach((currentEvent) => {
              const index = currentEvent.games.findIndex(obj => obj.id === toAddGame.id)
              if (index <= -1 && currentEvent.id === toAddEvent.id) {
                currentEvent.games.push(toAddGame)
              }
            })
          })
          const leagueIndex = this.events.findIndex(obj => obj.id === toAddEvent.id)
          if (leagueIndex <= -1) {
            this.events.push(toAddEvent)
          }
        })

        resolve(data)
      })
    },
    clearAndFetchInplayEvents (payload) {
      this.loading = true
      this.events = []

      return new Promise(async (resolve, reject) => {
        const [data, err] = await inplayService.get(payload)

        if (err) {
          // commit('errors/setErrors', err.errors, { root: true })
          this.loading = false
          reject(err)
        }

        // commit('errors/clearErrors', {}, { root: true })
        this.events = data
        this.loading = false
        // todo update odds change
        const oddsGroup = []

        data.forEach((e) => {
          e.games.forEach((el) => {
            if (el.odds && el.odds.length > 0) {
              el.odds.forEach((ele) => {
                ele.odds.forEach((element) => {
                  oddsGroup.push(element)
                })
              })
            }
          })
        })
        const ticketsPreCashInStore = useTicketsPreCashInStore()
        ticketsPreCashInStore.updateOddChangeTicket(oddsGroup)

        // dispatch('tickets-pre-cash-in/updateOddChangeTicket', oddsGroup, { root: true })
        resolve(data)
      })
    }
  },
  getters: {
    getInplayEvents (state) {
      return state.events
    },
    getInplayEventsGroupedBySportAndCountry (state) {
      let eventsGroupBySports = []
      const events = []

      if (!state.events) {
        return []
      }

      state.events.forEach((e) => {
        e.games.forEach((el) => {
          events.push(el)
        })
      })

      // * group by sport_name
      eventsGroupBySports = events.reduce((hash, obj) => {
        if (obj.sport_name === undefined) {
          return hash
        }
        return Object.assign(hash, { [obj.sport_name]: (hash[obj.sport_name] || []).concat(obj) })
      }, {})
      // debugger

      // * group by location_name
      for (const key in eventsGroupBySports) {
        if (Object.hasOwnProperty.call(eventsGroupBySports, key)) {
          eventsGroupBySports[key] = eventsGroupBySports[key].reduce((hash, obj) => {
            if (obj.location_name === undefined) {
              return hash
            }
            return Object.assign(hash, { [obj.location_name]: (hash[obj.location_name] || []).concat(obj) })
          }, {})

          // * group by league_name
          for (const bkey in eventsGroupBySports[key]) {
            if (Object.hasOwnProperty.call(eventsGroupBySports[key], bkey)) {
              eventsGroupBySports[key][bkey] = eventsGroupBySports[key][bkey].reduce((hash, obj) => {
                if (obj.league_name === undefined) {
                  return hash
                }
                return Object.assign(hash, { [obj.league_name]: (hash[obj.league_name] || []).concat(obj) })
              }, {})
            }
          }
        }
      }

      const sportsGroup = []

      for (const key in eventsGroupBySports) {
        if (Object.hasOwnProperty.call(eventsGroupBySports, key)) {
          const sports = eventsGroupBySports[key]
          const locationGroup = []

          for (const akey in sports) {
            if (Object.hasOwnProperty.call(sports, akey)) {
              const locations = sports[akey]
              const eventsGroup = []

              for (const bkey in locations) {
                if (Object.hasOwnProperty.call(locations, bkey)) {
                  const events = locations[bkey]
                  eventsGroup.push({
                    name: bkey,
                    location: akey,
                    games: events,
                    totalGames: locations[bkey].length
                  })
                }
              }

              locationGroup.push({
                location_name: akey,
                events: eventsGroup,
                totalEvents: eventsGroup
                  .map(event => event.totalGames)
                  .reduce((a, b) => a + b)
              })
            }
          }

          sportsGroup.push({
            sport_name: key,
            sport_id: locationGroup[0].events[0].games[0].sport_id,
            locations: locationGroup,
            total: locationGroup
              .map(location => location.totalEvents)
              .reduce((a, b) => a + b)
          })
        }
      }

      return sportsGroup
    },
    getInplayLoading (state) {
      return state.loading
    }
  }
})
