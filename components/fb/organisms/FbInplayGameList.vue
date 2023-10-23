<template>
  <div class="parent">
    <table class="w-100">
      <client-only>
        <div v-for="(betGroup) in inplayGames" :key="betGroup.name">
          <thead class="header-title">
            <tr>
              <td class="bg-head text-group container" colspan="5">
                <span class="bg-head-name fut-color-dynamic">
                  {{ betGroup.location }} - {{ betGroup.name }}
                </span>
              </td>
              <td v-if="getOddTitleHeading(betGroup.games).length <= 0" class="bg-head text-group container" colspan="5" />
              <td v-for="(oddTitle, oddTitleIndex) in getOddTitleHeading(betGroup.games)" :key="'heading_' + oddTitleIndex" class="bg-head text-games-list event-sel-odd text-center fut-color-dynamic" :colspan="oddTitle.colspan">
                <small :style="'max-width:' + (oddTitle.oddheading ? oddTitle.oddheading.length * 43 : 43) + 'px; white-space: nowrap;'">{{ oddTitle.title }}</small>
              </td>
            </tr>
            <tr class="text-center">
              <td class="bg-head text-group container" style="height: 20px" colspan="5" />
              <td v-if="getOddTitleHeading(betGroup.games).length <= 0" class="bg-head text-group container" colspan="5" />
              <template v-for="(oddTitle, oddTitleIndex) in getOddTitleHeading(betGroup.games)">
                <td v-for="(heads, hIndex) in oddTitle.oddheading" :key="'heading_' + oddTitleIndex + '_' + hIndex" class="bg-head text-white event-sel-odd text-center fut-color-dynamic" colspan="1">
                  <span class="bg-head-title">{{ heads }}</span>
                </td>
              </template>
            </tr>
          </thead>
          <tbody v-for="game in betGroup.games" :key="game.id" :class="['stripped', 'header', 'select']">
            <tr class="table-values" :class="{ 'bg-dark-font': font === 'dark' }">
              <td class="text-white event-names text-start py-1" colspan="5">
                <div class="hover-link container">
                  <div class="game-point-timer mb-1 mb-md-0">
                    <div v-if="game.result" class="me-md-2 d-flex">
                      <div class="border-dynamic">
                        <span v-for="(result, index) in game.result" :key="'home_home_results_' + index + '_' + result.home" class="me-md-3 fw-bold fw-md-normal " :class="[game.home_goal ? 'text-success' : '']">{{ result.home ? result.home : '-' }}</span>
                      </div>
                      <span class="d-md-none mx-1 fw-bold fw-md-normal ">-</span>
                      <div>
                        <span v-for="(result, index) in game.result" :key="'home_away_results_' + index + '_' + result.away" class="ms-md-3 fw-bold fw-md-normal " :class="[game.away_goal ? 'text-success' : '']">{{ result.away ? result.away : '-' }}</span>
                      </div>
                    </div>
                    <div class="ms-0 ms-md-2 me-3 me-md-2">
                      <div class="mb-0 d-flex">
                        <div class="game-time">
                          <span class="mobile-text-secondary">{{ game.time }}'</span>
                        </div>
                        <font-awesome-icon :icon="['far', 'clock']" class="d-none d-md-table-cell" />
                      </div>
                    </div>
                  </div>
                  <fb-fut-button class="team-name" :to="`/sport/${game.sport_id}/aovivo/${game.id}`">
                    <div class="d-flex justify-content-between">
                      <span>
                        {{ game.home_team }}
                      </span>
                      <span v-if="(currentTime() - game.home_goal_real_time < 2000) && game.home_goal && (game.sport_id === 6046 || game.sport_id === 35709)" class="text-goal goal-flash px-2">GOL!!!</span>
                      <!-- <span v-if="(currentTime() - game.home_goal_real_time < 2000) && game.home_goal && (game.sport_id !== 6046 && game.sport_id !== 35709)" class="text-goal goal-flash px-2">
                        {{ $t('i18n_ponto') }} !!!
                      </span> -->
                    </div>
                    <span class="mx-2 d-none d-md-table-cell">-</span>
                    <div class="d-flex justify-content-between">
                      <span>
                        {{ game.away_team }}
                      </span>
                      <!-- <span v-if="game.away_goal" class="text-goal flash">GOL!!!</span> -->
                      <span v-if="(currentTime() - game.away_goal_real_time < 2000) && game.away_goal && (game.sport_id === 6046 || game.sport_id === 35709)" class="text-goal goal-flash-2 px-2 ">GOL!!!</span>
                      <!-- <span v-if="(currentTime() - game.away_goal_real_time < 2000) && game.away_goal && (game.sport_id !== 6046 && game.sport_id !== 35709)" class="text-goal goal-flash px-2">
                        {{ $t('i18n_ponto') }} !!!
                      </span> -->
                    </div>
                  </fb-fut-button>
                </div>
              </td>
              <template v-for="(oddsMarket, j) in game.odds">
                <template v-if="oddsMarket">
                  <td
                    v-for="(odd, k) in oddsMarket.odds"
                    :key="'odd_key_' + j + '_' + k"
                    class="event-sel-odd"
                    colspan="1"
                  >
                    <fb-fut-button
                      class="event-sel-odd-btn me-1 position-relative"
                      :class="[hasSelected(odd.type)?'bet-selected':'', getLevarage(odd.leverage), font === 'dark' ? 'bg-primary' : '']"
                      @click="()=>odd.odds<=0||invalidMultiple(game.id, odd.type, tickets)?{}:$emit('selectBet', { gameId: game.id, odd: odd, market: oddsMarket.name, event: `${game.home_team} x ${game.away_team}`, validate: game.datetime, live: live })"
                    >
                      <span v-if="odd.leverage && odd.leverage === 'up'" class="leverage-up-arrow" style="vertical-align: middle">
                        <font-awesome-icon class="text-white flash" style="font-size: 17px" :icon="['fas', 'caret-up']" />
                      </span>
                      <span v-if="odd.leverage && odd.leverage === 'down'" class="leverage-down-arrow" style="vertical-align: middle">
                        <font-awesome-icon class="text-white flash-2" style="font-size: 17px" :icon="['fas', 'caret-down']" />
                      </span>
                      <span>
                        {{ odd.odds && odd.odds != 0 && odd.odds != 1 ? odd.odds : '-' }}
                      </span>
                    </fb-fut-button>
                  </td>
                </template>
              </template>
            </tr>
          </tbody>
        </div>
      </client-only>
    </table>
    <div v-if="adding" class="w-100 p-4">
      <spinner />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Spinner from '@/components/default/atoms/Spinner'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  components: {
    Spinner,
    FbFutButton
  },
  props: {
    inplayGames: {
      type: Array,
      default: () => ([])
    },
    font: {
      type: String,
      default: null
    },
    breadcrumb: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    tickets: {
      type: Array,
      default: () => ([])
    },
    live: {
      type: Boolean,
      default: true
    },
    nav: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      search: '',
      adding: false,
      pageLimit: false,
      league: null,
      sport: null,
      filters: {
        date: null,
        hour: null,
        team: null,
        page: null
      },
      searching: false,
      bets: []
    }
  },
  created () {
    this.filters.date = dayjs().format('YYYY-MM-DD')
    this.sport = this.$route.params.sportId
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
    getOddTitleHeading (games) {
      const title = []
      games.forEach((e) => {
        if (e.odds) {
          e.odds.forEach((f) => {
            if (f && f.name && title.findIndex(obj => (obj.title === f.name) || (f.name === 'Resultado Final' && obj.title === '1 X 2')) === -1) {
              const data = { title: f.name === 'Resultado Final' ? '1 X 2' : f.name, colspan: f.odds.length, oddheading: [] }
              f.odds.forEach((g) => {
                if (g.header && g.header !== '') {
                  switch (g.header) {
                    case e.home_team:
                      data.oddheading.push('1')
                      break
                    case e.away_team:
                      data.oddheading.push('2')
                      break
                    case this.$t('i18n_empate'):
                      data.oddheading.push('X')
                      break
                    default:
                      data.oddheading.push(g.header)
                      break
                  }
                } else if (g.desc && g.desc !== '') {
                  switch (g.desc) {
                    case e.home_team:
                      data.oddheading.push('1')
                      break
                    case e.away_team:
                      data.oddheading.push('2')
                      break
                    case this.$t('i18n_empate'):
                      data.oddheading.push('x')
                      break
                    default:
                      data.oddheading.push(g.desc)
                      break
                  }
                } else if (g.name && g.name !== '') {
                  switch (g.name) {
                    case e.home_team:
                      data.oddheading.push('1')
                      break
                    case e.away_team:
                      data.oddheading.push('2')
                      break
                    case this.$t('i18n_empate'):
                      data.oddheading.push('x')
                      break
                    default:
                      data.oddheading.push(g.desc)
                      break
                  }
                } else {
                  data.oddheading.push('-')
                }
              })
              title.push(data)
            }
          })
        }
      })
      return title
    },
    navigate (link) {
      this.$router.push(this.localePath(link))
    },
    invalidMultiple (gameId, type, tickets) {
      if (tickets.find(e => e.gameId === gameId && e.odd.type !== type)) {
        this.$emit('invalidMultiple', true)
      } else {
        this.$emit('invalidMultiple', false)
      }
      return tickets.find(e => e.gameId === gameId && e.odd.type !== type)
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
.bg-dark-font {
  * {
    color: #333333 !important;
  }
  background-color: var(--fut-background-darker);
}
.bg-primary.bet-selected {
  background: var(--fut-secondary) !important;
  color: white !important;
}
// .parent {
//   // background-color: var(--fut-background-darker);
//   background-color: var(--fut-background-games-list);
// }
.bg-head {
  background-color: var(--fut-background-lighter);
  font-size: 12px;
}
.info-bets {
  font-size: 11px;
  border-spacing: 2px;
  padding: 1px 0;
  white-space: nowrap;
  width: 149px;
}
.tables-odds {
  border-spacing: 0;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  .club-name {
    width: 600px;
  }
  .widht-10 {
    width: 30vw;
  }
}
.table-values {
  border-bottom: 1px solid var(--fut-background-lightest-2);
  &:hover {
    background-color: var(--fut-background);
  }
}
.game-time {
  color: var(--fut-primary);
  @include md {
    min-width: 20px;
    color: white;
  }
}
.event-sel-odd-btn {
  font-weight: bold;
  font-size: 11px;
  line-height: 33px;
  overflow: hidden;
  display: block;
  min-width: 20px;
  min-height: 22px;
  width: 45px;
  border: none;
  border-radius: 5px;
  background-color: var(--fut-background-2-lightest-2);
  @include md {
    background-color: var(--fut-background-2-white);
  }
  color: white;
    &:hover {
      color: black;
      background-image: linear-gradient(
        to right,
        var(--fut-primary),
        var(--fut-secondary)
      );
    }
}
.bet-selected {
  color: black;
  background-image: linear-gradient(
    to right,
    var(--fut-primary),
    var(--fut-secondary)
  );
}
.td-spacing {
  width: 45px;
}
.event-sel-odd {
  text-align: center;
  font-size: 11px;
  line-height: 12px;
  padding: 3px 2px;
  height: 1px;
  width: 1px;
}
.event-names {
  text-align: center;
  font-size: 12px;
  line-height: 12px;
}
.border-dynamic {
  @include md {
    border-right: 1px solid var(--fut-background-lightest);
  }
}
.league-title {
  background-color: var(--fut-background-lightest);
}
.game-point-timer {
  display: flex;
  flex-direction: row-reverse;
  justify-content: left;
  @include md {
    flex-direction: row;
  }
}
.hover-link {
  display: flex;
  flex-direction: column;
  min-height: 31px;
  align-items: left;
  @include md {
    align-items: center;
    flex-direction: row;
  }
}
.text-group {
  color: white;
  @include md {
    color: var(--fut-primary);
  }
}
.team-name {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: white;
  @include md {
    flex-direction: row;
  }
}
.bg-head-title{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 49px;
  display: inline-block;
}
.bg-head-name{
  display: inline-block;
  transform: translateY(6px);
}
.background-lev-danger:before{
  // background: #ff595fb4 !important;
  content: "";
  width: 0;
  height: 0;
  border-bottom: 15px solid #c62828;
  border-left: 15px solid transparent;
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
  border-top: 15px solid #558b2f;
  border-left: 15px solid transparent;
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
  left: calc(50% - 17px);
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
  left: calc(50% - 17px);
  transform: translate(-50%);
  width: 10px;
  height: 10px;
  // border-radius: 50%;
  // background: greenyellow;
  display: inline-block;
}
.mobile-text-secondary{
  @include _md {
    color: var(--fut-background-games-list-lightest) !important;
    font-weight: bold;
  }
}
.text-games-list{
  color: white;
  @include md {
    color: var(--fut-background-games-list);
  }
}
</style>
