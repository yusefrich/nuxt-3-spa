export default {
  methods: {
    srtmRegistrationStart () {
      if (!window.srtmCommands) {
        return
      }
      window.srtmCommands.push({
        event: 'track.user.registration',
        payload: {
          action: 'start'
        }
      })
    },
    srtmRegistrationFinished (userId) {
      if (!window.srtmCommands) {
        return
      }
      window.srtmCommands.push({
        event: 'track.user.registration',
        payload: {
          action: 'complete',
          userId
        }
      })
    },
    srtmLogin (userId) {
      if (!window.srtmCommands) {
        return
      }
      window.srtmCommands.push({
        event: 'track.user.login',
        payload: {
          action: 'complete',
          userId
        }
      })
    },
    srtmFirstDeposit (userId, transactionId, amount, currency) {
      if (!window.srtmCommands) {
        return
      }
      window.srtmCommands.push({
        event: 'track.user.deposit',
        payload: {
          action: 'created',
          label: 'first_deposit',
          userId,
          transactionId,
          amount,
          currency
        }
      })
    },
    srtmRecurringDeposit (userId, transactionId, amount, currency) {
      if (!window.srtmCommands) {
        return
      }
      window.srtmCommands.push({
        event: 'track.user.deposit',
        payload: {
          action: 'created',
          userId,
          transactionId,
          amount,
          currency
        }
      })
    },
    /* eslint-disable */
    /**
     * @param {string} match_id - "21690068"
     * @param {string} sr_match_id - "sr:match:25407104"
     * @param {string} team_home_name - "FC Bayern München"
     * @param {string} team_home_name_short - "FCB"
     * @param {string} team_home_logo - "https://ls.sportradar.com/ls/crest/medium/2672.png"
     * @param {string} team_away_name - "FC Schalke 04"
     * @param {string} team_away_name_short - "S04"
     * @param {string} team_away_logo - "https://ls.sportradar.com/ls/crest/medium/2530.png"
     * @param {string} scheduled - "2020-09-18T18:30:00+00:00"
     * @param {string} status - "not_started"
     * @param {string} tournament_name - "Bundesliga (Germany)"
     * @param {string} sport - "soccer"
     * @param {string} odds_home - "5.750"
     * @param {string} odds_draw - "4.750"
     * @param {string} odds_away - "1.450"
     */
    srtmRetargeting (match_id, sr_match_id, team_home_name, team_home_name_short, team_home_logo, team_away_name, team_away_name_short, team_away_logo, scheduled, status, tournament_name, sport, odds_home, odds_draw, odds_away) {
      if (!window.srtmCommands) {
        return
      }
      window.srtmCommands.push({
        event: 'srt.retargeting',
        payload: {
          sportsEvent: { match_id, sr_match_id, team_home_name, team_home_name_short, team_home_logo, team_away_name, team_away_name_short, team_away_logo, scheduled, status, tournament_name, sport, odds_home, odds_draw, odds_away }
        }
      })
    }
  }
}
