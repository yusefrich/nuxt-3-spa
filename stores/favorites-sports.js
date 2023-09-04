state: () => ({
  favorites: {}
})

export const mutations = {
  setFavorites (state, payload) {
    state.favorites[payload.id] = payload
  }
}

actions: {
  changeFavorites (payload) {
    commit('setFavorites', payload)
  }
}

getters: {
  getFavorites: state => state.favorites
}
