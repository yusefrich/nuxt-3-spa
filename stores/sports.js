getters: {
  getCurrentProvider () {
    return process.env.ODDS_PROVIDER ? process.env.ODDS_PROVIDER : 'default'
  }
}
