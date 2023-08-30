<template>
  <div>
    <div v-if="loading" class="bg-leagues-row text-center" style="padding-top: 5px; padding-bottom: 5px">
      <font-awesome-icon class="icon-loading spin spinner-class" :icon="['fas', 'circle-notch']" />
    </div>
    <table v-if="!loading" style="padding-right: 1px" class="table-responsive table-height w-100">
      <thead class="nsx-header">
        <tr class="text-center">
          <th class="text-start">
            {{ $t('i18n_resultado_final') }}
          </th>
          <th>{{ $t('i18n_casa') }}</th>
          <th v-if="sport === 1 || sport === 6046 || sport === '1' || sport === '6046'">
            {{ $t('i18n_empate') }}
          </th>
          <th>
            {{ $t('i18n_fora') }}
          </th>
        </tr>
      </thead>
      <template v-for="(betGroup, index) in currentBets" :key="'games_list_inplay__'+index">
        <tbody :key="'games_list_inplay_'+index">
          <tr>
            <th colspan="4" class="league-title fut-color-dynamic">
              {{ betGroup.name }}
            </th>
          </tr>
        </tbody>
        <tbody :key="'games_list_inplay_body_'+index">
          <tr v-for="(game, j) in betGroup.games" :key="'events_list_inplay_'+j" class="games-list">
            <td class="bg-lighter">
              <nsx-fut-button :to="`/sport/${sport}/aovivo/${game.id}`" class="team-players d-flex py-1 px-2">
                <div class="d-none d-md-inline">
                  <span class="fut-color-dynamic">{{ game.time }} <font-awesome-icon class="icon me-1" :icon="['fas', 'clock']" /></span>
                </div>
                <div class="w-100 px-md-2">
                  <div class="players fut-color-dynamic mb-0 d-flex justify-content-between">
                    <span>{{ game.home_team }}</span>
                    <div v-if="game.result" class="d-flex">
                      <span
                        v-for="(result, idx1) in game.result"
                        :key="'home_home_results_' + idx1"
                        class="result-list text-score fut-color-dynamic"
                      >
                        {{ result.home }}
                      </span>
                    </div>
                  </div>
                  <div class="players fut-color-dynamic mb-0 d-flex justify-content-between">
                    <span>{{ game.away_team }}</span>
                    <div v-if="game.result" class="d-flex">
                      <span
                        v-for="(result, idx2) in game.result"
                        :key="'home_away_results_' + idx2"
                        class="result-list text-score fut-color-dynamic"
                      >
                        {{ result.away }}
                      </span>
                    </div>
                  </div>
                  <span class="d-block d-md-none text-start fut-color-dynamic">{{ game.time }} <font-awesome-icon class="icon me-1" :icon="['fas', 'clock']" /></span>
                </div>
              </nsx-fut-button>
            </td>
            <template v-for="(oddsMarket, marketIndex) in game.odds" :key="'nsx_game_odd_inplay_full_' + marketIndex">
              <template v-if="marketIndex === 0">
                <td v-for="(odd, oddIndex) in oddsMarket.odds" :key="'nsx_game_odd_inplay_full_' + marketIndex + '_' + oddIndex">
                  <nsx-fut-button
                    block
                    class="p-1 btn-odds"
                    :class="[hasSelected(odd.type)?'active':'', getLevarage(odd.leverage)]"
                    gray
                    @click="()=>odd.odds<=0||odd.odds==1?{}:$emit('selectBet', { gameId: game.id, odd: odd, market: oddsMarket.name, event: `${game.home_team} x ${game.away_team}`, validate: game.datetime, live: live })"
                  >
                    <!-- <p v-if="odd.header" class="mb-0 text-white games-title">
                      <span>{{ odd.header }}</span>
                    </p> -->
                    <span>
                      <span class="text-score cotation fut-color-dynamic">
                        {{ odd.odds && odd.odds != 0 && odd.odds != 1 ? odd.odds : '-' }}
                      </span>
                    </span>
                  </nsx-fut-button>
                </td>
              </template>
            </template>
            <!-- <td>
              <nsx-fut-button
                block
                class="p-1 btn-odds"
                :class="[hasSelected(game.id, 'full_time_result_home', 'resultado-final')?'active':'']"
                gray
                @click="()=>game.odd_home<=0||game.odd_home==1?{}:$root.$emit('selectBet', { item: 'resultado-final', id: 'full_time_result_home', betId: game.id, column: 'main', header: 'main', type: 'full_time_result_home', odd: game.odd_home, game: game, value: '', live: 1 })"
              >
                <span>
                  <span class="text-score cotation">{{ game.odd_home != 0 && game.odd_home != 1 ? game.odd_home : '-' }}</span>
                </span>
              </nsx-fut-button>
            </td>
            <td v-if="sport === 1 || sport === 6046 || sport === '1' || sport === '6046'">
              <nsx-fut-button
                block
                class="p-1 btn-odds"
                :class="[hasSelected(game.id, 'full_time_result_draw', 'resultado-final')?'active':'']"
                gray
                @click="()=>game.odd_draw<=0||game.odd_draw==1?{}:$root.$emit('selectBet', { item: 'resultado-final', id: 'full_time_result_draw', betId: game.id, column: 'main', header: 'main', type: 'full_time_result_draw', odd: game.odd_draw, game: game, value: '', live: 1 })"
              >
                <span>
                  <span class="text-score cotation">{{ game.odd_draw != 0 && game.odd_draw != 1 ? game.odd_draw : '-' }}</span>
                </span>
              </nsx-fut-button>
            </td>
            <td>
              <nsx-fut-button
                block
                class="p-1 btn-odds"
                :class="[hasSelected(game.id, 'full_time_result_away', 'resultado-final')?'active':'']"
                gray
                @click="()=>game.odd_away<=0||game.odd_away==1?{}:$root.$emit('selectBet', { item: 'resultado-final', id: 'full_time_result_away', betId: game.id, column: 'main', header: 'main', type: 'full_time_result_away', odd: game.odd_away, game: game, value: '', live: 1 })"
              >
                <span>
                  <span class="text-score cotation">{{ game.odd_away != 0 && game.odd_away != 1 ? game.odd_away : '-' }}</span>
                </span>
              </nsx-fut-button>
            </td> -->
          </tr>
        </tbody>
      </template>
    </table>
  </div>
</template>

<script>
import utils from '@/utils/utils'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'

export default {
  name: 'FullInplayGamesListNsx',
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
  computed: {
    team () {
      return this.filters.team
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
  @import "@/assets/layout/breakpoints";
  .team-players{
    background: transparent;
    width: 100%;
    text-decoration: none;
  }
  .league-title{
    padding: 0.15rem 0.15rem 0.15rem 0.3rem;
    background: var(--fut-background-games-list);
    border-bottom: 1px solid #8d8d8d;
    font-weight: 500;
    font-size: 13.3px;
    color: var(--nsx-dark-2);
  }
  td{
    color: #ebebeb;
    background-color: var(--nsx-dark-3);
    padding: 4px !important;
  }
  .bg-lighter{
    background-color: var(--nsx-dark-5);
    border-bottom: 1px solid var(--nsx-dark-6);
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
      span{
        max-width: 34vw;
        @include md{
          max-width: initial;
        }
        overflow: hidden;
        text-overflow: ellipsis;
      }
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
    height: 75px;
    @include md {
      height: 51px;
    }
  }
  .btn-odds.active{
    *{
      color: #000000 !important;
    }
  }
  .games-title{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  td{
    padding: 0 !important;
  }
  .nsx-header{
    font-size: 13.3px;
    background: var(--fut-background-games-list);
    th{
      padding: 5px 10px;
      font-weight: 600;
    }
  }
  span{
    font-size: 13.3px;
  }
  .cotation{
    font-size: 13px;
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
  width: 15px;
  margin-right: 5px;
}
</style>
