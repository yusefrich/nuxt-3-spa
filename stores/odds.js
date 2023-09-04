// sem chamada, com excessão do getter...
state: () => ({
  odds: []
})
export const mutations = {
  addOdd (state, odd) {
    let active = false
    state.odds.forEach((e) => {
      if (odd.betId === e.betId && odd.id === e.id && odd.item === e.item) {
        active = true
      }
    })
    if (active) {
      state.odds = state.odds.filter(function (el) { return el.betId + '' + el.id + el.item !== odd.betId + '' + odd.id + odd.item })
    } else {
      odd.accept = true
      state.odds.push(odd)
    }
  },
  updateOdd (state, odd) {
    state.odds.forEach((e) => {
      if (odd.betId + '' + odd.id + odd.item === e.betId + '' + e.id + e.item) {
        if ('value' in odd) {
          e.value = odd.value
        }
        if (odd.odd && e.odd !== odd.odd) {
          e.accept = false
          e.odd = odd.odd
        }
      }
    })
  },
  updateFreeBet (state, odd) {
    state.odds.forEach((e) => {
      if (odd.betId + '' + odd.id + odd.item === e.betId + '' + e.id + e.item) {
        if ('free_bet' in odd) {
          e.free_bet = odd.free_bet
        }
        if (odd.odd && e.odd !== odd.odd) {
          e.accept = false
          e.odd = odd.odd
        }
      }
    })
  },
  acceptOdd (state, odd) {
    state.odds.forEach((e) => {
      e.accept = true
    })
  },
  resetOdds (state) {
    state.odds = []
  }
}
actions: {
  addOdd (odd) {
    commit('addOdd', odd)
  },
  updateOdd (odd) {
    commit('updateOdd', odd)
  },
  updateFreeBet (odd) {
    commit('updateFreeBet', odd)
  },
  acceptOdd (odd) {
    commit('acceptOdd', odd)
  },
  clearOdds () {
    commit('resetOdds')
  }
}
getters: {
  getOdds (state) {
    return state.odds
  }
}
