import betsService from '@/services/betsService'

state: () => ({
  user_bets: null,
  loading: false,
  errors: null
})
export const mutations = {
  UPDATE_LOADING (state, status) {
    state.loading = status
  },
  SET_ERRORS (state, errors) {
    state.errors = errors
  }
}
action: {
  commitCashOut (payload) {
    return new Promise(async (resolve, reject) => {
      commit('UPDATE_LOADING', true)

      const [data, err] = await betsService.cashout(payload)

      commit('UPDATE_LOADING', false)

      if (err) {
        let errorMessage = err.response.data.message ? err.response.data.message : 'Erro ao realizar checkout!'
        let type = 'error'

        if (err.response.status === 401) {
          errorMessage = 'Realize o login primeiro!'
          type = 'warning'
        }

        // this._vm.$toast.open({ message: errorMessage, type })
        commit('SET_ERRORS', err.response.data)
        reject(err)
        return
      }

      commit('CLEAR_ERRORS')
      // this._vm.$toast.open({ message: 'cashout realizado com sucesso!', type: 'success' })
      resolve(data)
    })
  }
}
getters: {
  getloading (state) {
    return state.loading
  }
}
