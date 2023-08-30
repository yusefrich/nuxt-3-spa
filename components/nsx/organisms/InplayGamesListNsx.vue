<template>
  <div>
    <div v-if="loading" class="bg-leagues-row text-center" style="padding-top: 5px; padding-bottom: 5px">
      <font-awesome-icon class="icon-loading spin spinner-class" :icon="['fas', 'circle-notch']" />
    </div>
    <div v-if="!loading" style="padding-right: 1px" class="table-responsive table-height">
      <div v-for="(betGroup, index) in currentBets" :key="'games_list_inplay_'+index">
        <div class="league-title">
          <span class="mb-0">{{ betGroup.name }}</span>
        </div>
        <div v-for="(game, j) in betGroup.games" :key="'events_list_inplay_'+j" class="games-list">
          <nsx-fut-button :to="`/sport/${sport}/aovivo/${game.id}`" class="team-players d-flex justify-content-between py-1">
            <span class="players fut-color-dynamic mb-0 pt-1 ps-1">{{ game.home_team }} x {{ game.away_team }}
              <!-- <span v-if="game.home_goal || game.away_goal" class="text-goal flash">GOL!!!</span> -->
              <span v-if="((currentTime() - game.home_goal_real_time < 2000) || (currentTime() - game.away_goal_real_time < 2000)) && (game.home_goal || game.away_goal) && (+sport === 6046 || +sport === 35709)" class="text-goal goal-flash">GOL!!!</span>
              <!-- <span v-if="(game.home_goal || game.away_goal) && (+sport !== 6046 && +sport !== 35709)" class="text-goal flash">
                {{ $t('i18n_ponto') }} !!!
              </span> -->
            </span>
            <div>
              <template v-if="game.result">
                <span v-for="(result, idx) in game.result" :key="'home_results_' + idx" class="result-list text-score fut-color-dynamic">
                  <span :class="[game.home_goal ? 'text-success' : '']">{{ result.home }}</span>
                  -
                  <span :class="[game.away_goal ? 'text-success' : '']">{{ result.away }}</span>
                </span>
              </template>
              <span v-if="game.time" style="color: var(--nsx-gray-1)">{{ game.time }} <font-awesome-icon class="icon me-1" :icon="['fas', 'clock']" /></span>
            </div>
          </nsx-fut-button>
          <template v-for="(oddsMarket, marketIndex) in game.odds" :key="'nsx_game_odd_inplay_' + marketIndex">
            <div v-if="marketIndex === 0" :key="'nsx_game_market_inplay_' + marketIndex" class="odds-holder row m-0">
              <nsx-fut-button
                v-for="(odd, oddIndex) in oddsMarket.odds"
                :key="'nsx_game_odd_inplay_' + marketIndex + '_' + oddIndex"
                block
                :style="'width:' + (100 / oddsMarket.odds.length).toFixed(2) + '% !important'"
                class="p-1 btn-odds d-flex col position-relative"
                :class="[hasSelected(odd.type)?'active':'', getLevarage(odd.leverage)]"
                gray
                @click="()=>odd.odds<=0||odd.odds==1?{}:$emit('selectBet', { gameId: game.id, odd: odd, market: oddsMarket.name, event: `${game.home_team} x ${game.away_team}`, validate: game.datetime, live: live })"
              >
                <p v-if="odd.header" class="mb-0 fut-color-dynamic games-title">
                  <span>{{ odd.header }}</span>
                </p>
                <p class="mb-0">
                  <span class="text-score fut-color-dynamic">
                    {{ odd.odds && odd.odds != 0 && odd.odds != 1 ? odd.odds : '-' }}
                  </span>
                </p>
              </nsx-fut-button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils/utils'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'

export default {
  name: 'InplayGamesListNsx',
  components: {
    NsxFutButton
  },
  props: {
    currentBets: {
      type: Array,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      default: false
    },
    live: {
      type: Boolean,
      default: true
    },
    currentSport: {
      type: Number,
      default: null
    },
    tickets: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      sport: null
    }
  },
  mounted () {
    if (this.currentSport) {
      this.sport = this.currentSport
    } else {
      this.sport = this.$route.params.sportId ? this.$route.params.sportId : 6046
    }
  },
  methods: {
    currentTime () {
      return Date.now()
    },
    getLevarage (levarage) {
      if (levarage === 'up') {
        return 'background-lev-success'
      }
      if (levarage === 'down') {
        return 'background-lev-danger'
      }
      return levarage
    },
    navigate (link) {
      this.$router.push(this.localePath(link))
    },
    formattedDate (date) {
      return utils.formattedDate(date)
    },
    hasSelected (type) {
      const currentTicketIndex = this.tickets.findIndex(obj => obj.odd.type === type)
      if (currentTicketIndex !== -1) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
  .team-players{
    background: transparent;
    width: 100%;
    text-decoration: none;
  }
  .league-title{
    padding: 0.15rem 0.15rem 0.15rem 0.3rem;
    background: var(--fut-background-games-list);
    border-bottom: 1px solid #8d8d8d;
  }
  td{
    color: #ebebeb;
    background-color: var(--nsx-dark-5);
    border: 1px solid var(--nsx-dark-6) !important;
    padding: 4px !important;
  }
  .fut-odd-header{
    background: var(--nsx-gray-1);
    border-bottom: 1px solid #8d8d8d;
    color: var(--nsx-dark-2);
  }
  .fut-odds{
    background: var(--nsx-dark-3);
    color: #ffdf1b !important;
    cursor: pointer;
  }
  .fut-odds:hover{
    background: #777777;
  }
  .active{
    color: var(--nsx-dark-3) !important;
    background: #ebebeb !important;
  }
  .games-list{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    .players{
      color: #ffffff;
    }
  }
  .games-list:hover{
    cursor: pointer;
    .players{
      color: #f8a240 !important;
    }
  }
  .text-score{
    color: #ffdf1b;
  }
  .odds-holder{
    background-color: var(--nsx-dark-3);
  }
  .btn-odds{
    width: 33.3%;
  }
  .btn-odds.active{
    *{
      color: #000000 !important;
    }
  }
  .games-title{
    // width: 100%;
    padding-right: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span{
    font-size: 12px;
  }
  .bg-leagues-row{
    background: var(--nsx-dark-5);
  }
  .icon-loading{
    font-size: 40px;
    color: #ffa500;
  }
  .spinner-class{
    animation-name: spin;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  @keyframes spin {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(360deg);
    }
  }
  .result-list{
    width: 24px !important;
    margin-right: 5px;
    display: inline-block;
  }
.background-lev-danger:before{
  // background: #ff595fb4 !important;
  content: "";
  width: 0;
  height: 0;
  border-bottom: 10px solid #c62828;
  border-left: 10px solid transparent;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 0;
  animation: fade 1s 5;
}
.background-lev-success:before{
  // background: #8ac926a4 !important;
  content: "";
  width: 0;
  height: 0;
  border-top: 10px solid #558b2f;
  border-left: 10px solid transparent;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  animation: fade 1s 5;
}
.text-goal{
  color: greenyellow !important;
  opacity: 1 !important;
}
.leverage-down-arrow{
  vertical-align: middle;
  position: absolute;
  left: calc(50% - 25px);
  transform: translate(-50%);
  width: 10px;
  height: 10px;
  // border-radius: 50%;
  // background: #ff595fb4;
  display: inline-block;
}
.leverage-up-arrow{
  vertical-align: middle;
  position: absolute;
  left: calc(50% - 25px);
  transform: translate(-50%);
  width: 10px;
  height: 10px;
  // border-radius: 50%;
  // background: greenyellow;
  display: inline-block;
}
</style>
