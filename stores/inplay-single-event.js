import inplayService from '@/services/inplayService'
import { useTicketsPreCashInStore } from '@/stores/tickets-pre-cash-in'
import { defineStore } from 'pinia'

export const useInplaySingleEventStore = defineStore('inplaySingleEvent', {
  state: () => ({
    event: null,
    errors: null,
    loading: false
  }),
  actions: {
    replaceInplayMarketOdd (payload) {
      if (!payload.message) {
        return
      }

      this.event.all_odds.forEach((e) => {
        const index = e.odds.findIndex(obj => +obj.market_id === +payload.message.market_id)

        if (index > -1) {
          const mergedObj = Object.assign({}, payload.message)
          e.odds[index].odds.forEach((el) => {
            const oddIndex = mergedObj.odds.findIndex(obj => obj.type === el.type)
            if (oddIndex <= -1) {
              mergedObj.odds.push(el)
            }
          })
          e.odds.splice(index, 1, mergedObj)
        }
      })
    },
    finishCurrentGame () {
      this.event.gameFinished = true
    },
    addInplayEventOdd (payload) {
      // commit('ADD_EVENT_ODD', payload)
      if (!this.event || !this.event.all_odds) {
        return
      }
      this.event.all_odds.forEach((group) => {
        payload.message.forEach((e) => {
          if (group.market_id === e.market_id) {
            group.odds.push(e)
          }
        })
      })
    },
    updateInplayEventOdd (payload) {
      // commit('UPDATE_EVENT_ODD', payload)
      if (!this.event || !this.event.all_odds) {
        return
      }
      this.event.all_odds.forEach((group) => {
        group.odds.forEach((wrapper) => {
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
                odds.blocked = false
              }
            })
          })
        })
      })
    },
    closeInplayEventOdd (payload) {
      // commit('CLOSE_EVENT_ODD', payload)
      if (!this.event || !this.event.all_odds) {
        return
      }

      this.event.all_odds.forEach((group) => {
        group.odds.forEach((wrapper) => {
          wrapper.odds.forEach((odds) => {
            payload.message.forEach((el) => {
              if (odds.type === el.odd_id) {
                odds.leverage = 'normal'
                odds.odds = el.price
                odds.blocked = true
              }
            })
          })
        })
      })
    },
    finishInplayEventOdd (payload) {
      // commit('FINISH_EVENT_ODD', payload)
      if (!this.event || !this.event.all_odds) {
        return
      }

      const allOdds = this.event.all_odds

      allOdds.forEach((group) => {
        group.odds.forEach((wrapper) => {
          wrapper.odds.forEach((odds) => {
            payload.forEach((e) => {
              if (odds.type === e.odd_id) {
                odds.leverage = 'normal'
                odds.odds = null
                odds.blocked = true
                odds.finished = true
              }
            })
          })
        })
      })

      this.event.all_odds = allOdds
    },
    updateInplayEventMetadata (payload) {
      // commit('UPDATE_EVENT_METADATA', payload)
      if (!this.event) {
        return
      }
      this.event.time = payload.message.time
      this.event.away_result = payload.message.away_score
      this.event.home_result = payload.message.home_score
      if (this.event.result[0]) {
        this.event.result[0].away = payload.message.away_score
        this.event.result[0].home = payload.message.home_score
      }
    },
    fetchInplaySingleEvent (id) {
      return new Promise(async (resolve, reject) => {
        this.event = null
        this.loading = true

        const [data, err] = await inplayService.show(id)

        this.loading = false

        if (err) {
          this.errors = err.errors
          reject(err)
          return
        }

        this.errors = null
        this.event = data

        const oddsGroup = []

        if (data && data.all_odds) {
          data.all_odds.forEach((e) => {
            e.odds.forEach((el) => {
              if (el.odds && el.odds.length > 0) {
                el.odds.forEach((ele) => {
                  oddsGroup.push(ele)
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
    updateInplaySingleEvent (id) {
      return new Promise(async (resolve, reject) => {
        this.loading = true

        const [data, err] = await inplayService.show(id)

        this.loading = false

        if (err) {
          this.errors = err.errors
          reject(err)
          return
        }

        this.errors = null
        this.event = data

        const oddsGroup = []

        data.all_odds.forEach((e) => {
          e.odds.forEach((el) => {
            if (el.odds && el.odds.length > 0) {
              el.odds.forEach((ele) => {
                oddsGroup.push(ele)
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
    getInplaySingleEvent (state) {
      return state.event
    },
    getInplaySingleEventLoading (state) {
      return state.loading
    },
    getInplaySingleEventErrors (state) {
      return state.errors
    }
  }
})
