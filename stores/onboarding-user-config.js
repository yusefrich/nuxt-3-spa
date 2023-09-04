state: () => ({
  tab: 'History'
})

export const mutations = {
  setTab (state, payload) {
    state.tab = payload
  }
}

actions: {
  changeTab (payload) {
    commit('setTab', payload)
  }
}

getters: {
  getTab: ({ tab }) => tab
}
