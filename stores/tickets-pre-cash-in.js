import betsService from '@/services/betsService'
import { defineStore } from 'pinia'
import { useSettingsStore } from '@/stores/settings'

export const useTicketsPreCashInStore = defineStore('ticketsPreCashIn', {
  state: () => ({
    /**
     * Pre cashin tickets of game odds.
     * @name preCashInTickets
     * @type {object}
     * @property {string} gameId - ticket game id.
     * @property {object} odd - Object containing odd details.
     * @property {string} odd.header - odd detail header.
     * @property {string} odd.name - odd detail name.
     * @property {string} odd.odds - odd detail value (odds).
     * @property {string} odd.ticket - odd detail description.
     * @property {string} odd.type - odd unique id.
     * @property {string} odd.free_bet - odd detail that says if the bet is of type free_bet.
     * @property {string} market - ticket market.
     * @property {string} event - ticket event name (home x away).
     * @property {date} validate - ticket validade, time the game starts and the bet gets invalid.
     * @property {boolean} live - ticket boolean determining if the odd is from a live game or a prematch game.
     * @property {boolean} odds_change - ticket boolean determining the odd.odds has change or not.
     * @property {number} value - value of the bet in question.
     */
    preCashInTickets: [],
    multipleTicket: {
      value: null,
      free_bet: false
    },
    errors: null,
    invalidMultiple: false,
    loading: false,
    skOpenTicket: false
  }),
  actions: {
    editPreCashInTicket (payload) {
      const tickets = [...this.preCashInTickets]
      tickets.splice(payload.index, 1, payload.ticket)
      this.preCashInTickets = tickets
    },
    setInvalidMultiple (invalid) {
      this.invalidMultiple = invalid
    },
    clearAll () {
      this.preCashInTickets = []
      this.multipleTicket = {
        value: null,
        free_bet: false
      }
    },
    finishGameTickets (payload) {
      const tickets = [...this.preCashInTickets]
      const index = tickets.findIndex(obj => obj.gameId === payload.game_id)
      if (index > -1) {
        tickets.splice(index, 1)
      }
      this.preCashInTickets = tickets
    },
    commitCashIn () {
      return new Promise(async (resolve, reject) => {
        if (this.loading) {
          reject(new Error('bet already being made'))
          return
        }

        this.loading = true

        const payload = {
          events: [],
          free_bet: this.multipleTicket.free_bet,
          value: this.multipleTicket.value && this.multipleTicket.value !== 0 ? this.multipleTicket.value : 0,
          return: +this.multipleTicket.value * this.getPreCashInTicketsTotalOdds - (this.multipleTicket.free_bet ? +this.multipleTicket.value : 0),
          value_total: this.getPreCashInTotalValue
        }

        this.preCashInTickets.forEach((e) => {
          payload.events.push({
            free_bet: payload.free_bet ? undefined : e.free_bet,
            id: e.gameId,
            type: e.odd.type,
            ticket: e.odd.ticket,
            odd: e.odd.odds,
            live: e.live,
            value: e.value !== 0 ? e.value : 0
          })
        })

        await new Promise(resolve => setTimeout(resolve, this.preCashInTickets.find(e => e.live) ? 4000 : 0))

        // todo check if odds change
        let oddsChanged = false

        this.preCashInTickets.forEach((e) => {
          if (e.odds_change) {
            oddsChanged = true
          }
        })

        if (oddsChanged) {
          // this._vm.$toast.open({ message: 'Uma ou mais apostas mudaram de cotações', type: 'warning' })
          reject(new Error('odds change'))
          this.loading = false
          return
        }

        const [data, err] = await betsService.postBet(payload)

        this.loading = false

        if (err) {
          console.log('LOG ERROR', err.response)
          let errorMessage = err.response.data.errors && Object.keys(err.response.data.errors).length ? Object.values(err.response.data.errors) : 'Erro ao realizar uma aposta!'

          let type = 'error'

          if (err.response.status === 401) {
            errorMessage = 'Realize o login primeiro!'
            type = 'warning'
          }
          if (Array.isArray(errorMessage)) {
            errorMessage.forEach((item) => {
              // item.forEach(error => this._vm.$toast.open({ message: error, type }))
            })
          }

          // // this._vm.$toast.open({ message: errorMessage, type })
          this.errors = err.response.data
          reject(err)
          return
        }

        this.errors = null
        this.preCashInTickets = []
        this.multipleTicket = {
          value: null,
          free_bet: false
        }
        // this._vm.$toast.open({ message: 'Aposta criada com sucesso!', type: 'success' })
        // dispatch('authUser', {}, { root: true })
        // dispatch('fetchUserBets', {}, { root: true })
        resolve(data)
      })
    },
    commitCashInMD () {
      return new Promise(async (resolve, reject) => {
        if (this.loading) {
          reject(new Error('bet already being made'))
          return
        }

        this.loading = true

        const freebetIdx = this.preCashInTickets.findIndex(item => item.free_bet)

        const payload = {
          events: [],
          free_bet: freebetIdx !== -1 ? this.preCashInTickets[freebetIdx].free_bet : this.multipleTicket.free_bet,
          value: this.multipleTicket.value && this.multipleTicket.value !== 0 ? this.multipleTicket.value : 0,
          return: +this.multipleTicket.value * this.getPreCashInTicketsTotalOdds - (this.multipleTicket.free_bet ? +this.multipleTicket.value : 0),
          value_total: this.getPreCashInTotalValue
        }

        this.preCashInTickets.forEach((e) => {
          payload.events.push({
            free_bet: payload.free_bet ? undefined : e.free_bet,
            id: e.gameId,
            type: e.odd.type,
            ticket: e.odd.ticket,
            odd: e.odd.odds,
            live: e.live,
            value: e.value !== 0 ? e.value : null
          })
        })

        await new Promise(resolve => setTimeout(resolve, this.preCashInTickets.find(e => e.live) ? 4000 : 0))

        // todo check if odds change
        let oddsChanged = false

        this.preCashInTickets.forEach((e) => {
          if (e.odds_change) {
            oddsChanged = true
          }
        })

        if (oddsChanged) {
          // this._vm.$toast.open({ message: 'Uma ou mais apostas mudaram de cotações', type: 'warning' })
          reject(new Error('odds change'))
          this.loading = false
          return
        }

        const [data, err] = await betsService.postBet(payload)

        this.loading = false

        if (err) {
          let errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao realizar uma aposta!'
          let type = 'error'

          if (err.response.status === 401) {
            errorMessage = 'Realize o login primeiro!'
            type = 'warning'
          }

          // this._vm.$toast.open({ message: errorMessage, type })
          this.errors = err.response.data
          reject(err)
          return
        }

        this.errors = null
        this.preCashInTickets = []
        this.multipleTicket = {
          value: null,
          free_bet: false
        }

        // this._vm.$toast.open({ message: 'Aposta criada com sucesso!', type: 'success' })
        // dispatch('authUser', {}, { root: true })
        // dispatch('fetchUserBets', {}, { root: true })
        resolve(data)
      })
    },
    toggleTicket (ticket) {
      if (this.loading) {
        return
      }

      const currentTicketIndex = this.preCashInTickets.findIndex(obj => obj.odd.type === ticket.odd.type)

      if (currentTicketIndex !== -1) {
        if (this.preCashInTickets.length <= 2) {
          this.multipleTicket = {
            value: null,
            free_bet: false
          }
        }

        const tickets = [...this.preCashInTickets]
        tickets.splice(index, currentTicketIndex)
        this.preCashInTickets = tickets
        return
      }

      if (!('free_bet' in ticket.odd)) {
        ticket.odd.free_bet = false
      }

      if (!('value' in ticket)) {
        ticket.value = null
      }

      if (!('odds_change' in ticket)) {
        ticket.odds_change = false
      }

      this.preCashInTickets.push(ticket)
    },
    acceptTicketChanges () {
      this.preCashInTickets.forEach((e) => {
        e.odds_change = false
      })
    },
    updateTicket (ticket) {
      if (this.loading || !ticket.odd) {
        return
      }

      const currentTicketIndex = this.preCashInTickets.findIndex(obj => obj.odd.type === ticket.odd.type)

      if (currentTicketIndex !== -1) {
        const ticketValue = { ...this.preCashInTickets[currentTicketIndex] }

        Object.assign(ticketValue, ticket)

        if (ticketValue.odd.odds !== this.preCashInTickets[currentTicketIndex].odd.odds) {
          ticketValue.odds_change = true
        }
        const settings = useSettingsStore()

        if (settings.currentSettings && ticketValue.value > settings.currentSettings.bet_limit_max) {
          ticketValue.value = settings.currentSettings.bet_limit_max
        }

        this.editPreCashInTicket({ index: currentTicketIndex, ticket: ticketValue })
      }
    },
    updateTicketOdds (odds) {
      odds.forEach((e) => {
        const currentTicketIndex = this.preCashInTickets.findIndex(obj => obj.odd.type === e.odd_id)

        if (currentTicketIndex !== -1 && +this.preCashInTickets[currentTicketIndex].odd.odds !== +e.price) {
          const ticketValue = {
            odds_change: true,
            gameId: this.preCashInTickets[currentTicketIndex].gameId,
            odd: {
              odds: e.price,
              header: this.preCashInTickets[currentTicketIndex].odd.header,
              name: this.preCashInTickets[currentTicketIndex].odd.name,
              ticket: this.preCashInTickets[currentTicketIndex].odd.ticket,
              type: this.preCashInTickets[currentTicketIndex].odd.type,
              free_bet: this.preCashInTickets[currentTicketIndex].odd.free_bet
            },
            market: this.preCashInTickets[currentTicketIndex].market,
            event: this.preCashInTickets[currentTicketIndex].event,
            validate: this.preCashInTickets[currentTicketIndex].validate,
            live: this.preCashInTickets[currentTicketIndex].live,
            value: this.preCashInTickets[currentTicketIndex].value
          }

          this.editPreCashInTicket({ index: currentTicketIndex, ticket: ticketValue })
        }
      })
    },
    updateOddChangeTicket (odds) {
      odds.forEach((e) => {
        const currentTicketIndex = this.preCashInTickets.findIndex(obj => obj.odd.type === e.type)

        if (currentTicketIndex !== -1 && +this.preCashInTickets[currentTicketIndex].odd.odds !== +e.odds) {
          const ticketValue = {
            odds_change: true,
            gameId: this.preCashInTickets[currentTicketIndex].gameId,
            odd: {
              odds: e.odds,
              header: e.header,
              name: e.name,
              ticket: e.ticket,
              type: e.type,
              free_bet: this.preCashInTickets[currentTicketIndex].odd.free_bet
            },
            market: this.preCashInTickets[currentTicketIndex].market,
            event: this.preCashInTickets[currentTicketIndex].event,
            validate: this.preCashInTickets[currentTicketIndex].validate,
            live: this.preCashInTickets[currentTicketIndex].live,
            value: this.preCashInTickets[currentTicketIndex].value
          }

          this.editPreCashInTicket({ index: currentTicketIndex, ticket: ticketValue })
        }
      })
    },
    clearAllFreeBet () {
      if (this.loading) {
        return
      }

      const ticketGroup = [...this.preCashInTickets]

      ticketGroup.forEach((e) => {
        e.free_bet = false
      })

      this.preCashInTickets = ticketGroup
      this.multipleTicket = {
        value: null,
        free_bet: false
      }
    },
    resetAllBets () {
      if (this.loading) {
        return
      }

      const ticketGroup = [...this.preCashInTickets]

      ticketGroup.forEach((e) => {
        e.value = null
      })

      this.preCashInTickets = ticketGroup
      this.multipleTicket = {
        value: null,
        free_bet: false
      }
    },
    clearMultipleTicket () {
      if (this.loading) {
        return
      }

      this.multipleTicket = {
        value: null,
        free_bet: false
      }
    },
    updateMultipleTicket (payload) {
      if (this.loading) {
        return
      }

      const commitPayload = {
        value: this.multipleTicket.value,
        free_bet: this.multipleTicket.free_bet
      }

      if ('value' in payload) {
        commitPayload.value = payload.value
      }

      if ('free_bet' in payload) {
        commitPayload.free_bet = payload.free_bet
      }

      const settings = useSettingsStore()

      if (settings.currentSettings && ticketValue.value > settings.currentSettings.bet_limit_max) {
        ticketValue.value = settings.currentSettings.bet_limit_max
      }

      this.multipleTicket.value = commitPayload.value
      this.multipleTicket.free_bet = commitPayload.free_bet
    },
    changeSkOpenTicket (payload) {
      this.skOpenTicket = payload
    }
  },
  getters: {
    getInvalidMultiple (state) {
      return state.invalidMultiple
    },
    getTicketGamesId (state) {
      // TODO returns a array of ids, containing the ids from every game in the ticket
      // [4142423, 5145266, 8684663, 6927733]
      const ids = []
      state.preCashInTickets.forEach((el) => {
        if (el.live) {
          ids.push(el.gameId)
        }
      })
      return ids
    },
    getPreCashInTicketsErrors (state) {
      return state.errors
    },
    getPreCashInTicketsLoading (state) {
      return state.loading
    },
    getPreCashInMultipleBetValidation (state) {
      const uniqTickets = []
      const dupeTickets = []

      state.preCashInTickets.forEach(obj => [uniqTickets, dupeTickets][+(state.preCashInTickets.map(obj => obj.gameId).filter(gameId => gameId === obj.gameId).length > 1)].push(obj))

      return dupeTickets.length === 0
    },
    getPreCashInTicketsValidation (state) {
      return state.preCashInTickets.find(e => !e.live && Date.parse(e.validate) < Date.parse(new Date())) && !state.loading
    },
    getPreCashInTickets (state) {
      return state.preCashInTickets
    },
    getMultipleTicket (state) {
      return state.multipleTicket
    },
    getPreCashInTicketsTotalOdds (state) {
      return state.preCashInTickets.reduce((partialSum, a) => partialSum + +a.odd.odds, 0)
    },
    getMultipleTicketReturn (state) {
      return (state.preCashInTickets.reduce((partialSum, a) => partialSum + +a.odd.odds, 0) * state.multipleTicket.value) - (state.multipleTicket.free_bet ? state.multipleTicket.value : 0)
    },
    getPreCashInTotalReturn (state) {
      const simpleTotalReturn = state.preCashInTickets.reduce((partialSum, a) => partialSum + (+a.odd.odds * +a.value) - (a.free_bet ? +a.value : 0), 0)
      return simpleTotalReturn + (state.preCashInTickets.reduce((partialSum, a) => partialSum + +a.odd.odds, 0) * state.multipleTicket.value) - (state.multipleTicket.free_bet ? state.multipleTicket.value : 0)
    },
    getPreCashInTotalValue (state) {
      const simpleTotalValue = state.preCashInTickets.reduce((partialSum, a) => partialSum + +a.value, 0)
      return simpleTotalValue + state.multipleTicket.value
    },
    getSkOpenTicket (state) {
      return state.skOpenTicket
    }
  }
})
