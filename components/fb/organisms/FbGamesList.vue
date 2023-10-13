<template>
  <div class="games-list-container-spacing mt-md-3 mt-2 overflow-auto">
    <div class="last-minutes-content">
      <div class="container-fluid text-white">
        <slot name="title" />
      </div>
    </div>
    <slot name="options" />
    <table class="odds-table py-1">
      <template v-for="(betGroup, indexNb) in events">
        <thead v-if="indexNb === 0" :key="betGroup.name" class="header">
          <tr class="text-center d-none d-md-table-row">
            <td />
            <td class="d-none d-md-table-cell" />
            <template v-for="(oddTitle, oddTitleIndex) in getOddTitleHeading(betGroup.games)">
              <td :key="'heading_' + oddTitleIndex" :class="{'d-none d-md-table-cell': oddTitleIndex > 0}" class="text-center" :colspan="oddTitle.colspan">
                <small class="market-title fut-color-dynamic" :style="'max-width:' + (oddTitle.oddheading ? oddTitle.oddheading.length * 43 : 43) + 'px;'">{{ oddTitle.title }}</small>
              </td>
            </template>
          </tr>
          <tr class="text-center">
            <td />
            <td class="d-none d-md-table-cell" />
            <template v-for="(oddTitle, oddTitleIndex) in getOddTitleHeading(betGroup.games)">
              <td v-for="(heads, hIndex) in oddTitle.oddheading" :key="'heading_' + oddTitleIndex + '_' + hIndex" :class="{'d-none d-md-table-cell': oddTitleIndex > 0}" class="text-center pt-2 pt-md-0">
                <small class="market-title fut-color-dynamic">{{ heads }}</small>
              </td>
            </template>
            <td class="d-none d-md-table-cell" />
          </tr>
        </thead>
        <template v-for="(game, gameIndex) in betGroup.games">
          <tbody :key="game.id">
            <tr class="tr-odds" :class="{ 'bg-dark-font': font === 'dark' }">
              <td class="td-date d-none d-md-table-cell" colspan="1">
                <div class="date-content">
                  <span v-if="game.datetime" class="text-date">{{ formattedDate(game.datetime) }}</span>
                  <span v-else class="text-date">{{ formattedDate(game.date) }}</span>
                  <span v-if="game.datetime" class="text-date">{{ formattedHour(game.datetime) }}</span>
                  <span v-else class="text-date">{{ formattedHour(game.date) }}</span>
                </div>
              </td>
              <td class="event-name">
                <fb-fut-button
                  v-if="game.event"
                  :to="game.sport_id ? '/sport/'+game.sport_id+'/evento/'+game.slug : eventsSport !== 18 && eventsSport !== 9 && eventsSport !== 14 ? '/sport/'+eventsSport+'/evento/'+game.slug : '#'"
                  class="game-title text-decoration-none"
                >
                  <span class="ms-3 text-white">{{ game.event }}</span>
                </fb-fut-button>
                <fb-fut-button
                  v-else
                  :to="game.sport_id ? '/sport/'+game.sport_id+'/evento/'+game.slug : eventsSport !== 18 && eventsSport !== 9 && eventsSport !== 14 ? '/sport/'+eventsSport+'/evento/'+game.slug : '#'"
                  class="game-title text-decoration-none w-fb-custom pt-1 pt-md-0"
                >
                  <span class="ms-2 text-white d-none d-md-inline">{{ game.home_team }} - {{ game.away_team }}</span>
                  <div class="d-md-none text-start">
                    <span class="ms-3 text-white">{{ game.home_team }}</span>
                  </div>
                  <div class="d-md-none text-start">
                    <span class="ms-3 text-white">{{ game.away_team }}</span>
                  </div>
                  <div class="d-flex d-md-none justify-content-between mt-1 w-fb-custom">
                    <div>
                      <span class="ms-3 text-white fw-bold mobile-text-secondary" style="opacity: .9">{{ formattedDate(game.datetime) }}</span>
                      <span style="opacity: .3" class="text-white">|</span>
                      <span class="text-white fw-bold mobile-text-secondary" style="opacity: .9">{{ formattedHour(game.datetime) }}</span>
                    </div>
                    <span class="text-white me-1">+{{ game.odds_total }} <fa class="text-primary" :icon="['fas', 'caret-right']" /></span>
                  </div>
                </fb-fut-button>
              </td>
              <template v-for="(oddsGroup, index) in gameOdds(game.odds, betGroup.games, gameIndex - 1).list">
                <template v-if="(settings && settings.both_score === 0 && index === 0) || (settings && settings.both_score === 1)">
                  <td
                    v-for="(odd, j) in oddsGroup.odds"
                    :key="'odd_slug_j_'+j+'_'+index"
                    :class="['table-odd', 'position-relative', 'text-white', 'fut-color-dynamic', index > 0 ? 'd-none d-md-table-cell' : '', hasSelected(odd.type)?'bet-selected':'', 'click-bet', !odd.odds||odd.odds<=0||odd.odds==1?'click-bet-disabled':'']"
                    class="event-sel-odd"
                    colspan="1"
                    @click="()=>!gameOdds(game.odds, betGroup.games, gameIndex - 1).valid||!odd.odds||odd.odds<=0||odd.odds==1||invalidMultiple(game.id, odd.type, tickets)?{}:$emit('selectBet', { gameId: game.id, odd: trueValueOdd(odd), market: oddsGroup.name, event: `${game.home_team} x ${game.away_team}`, validate: game.datetime, live: false })"
                  >
                    <template v-if="gameOdds(game.odds, betGroup.games, gameIndex - 1).valid">
                      <fb-fut-button v-if="odd.super_odd" class="event-sel-odd-btn text-center" :class="{'bg-primary': font === 'dark'}">
                        <span v-if="odd.super_odd && odd.super_odd.normal_odd" class="normalOdd">{{ odd.super_odd.normal_odd }}</span>
                        <span class="fw-bolder">
                          {{ odd.super_odd && odd.super_odd.normal_odd ? odd.super_odd.odd : '-' }}
                        </span>
                      </fb-fut-button>
                      <fb-fut-button v-else class="event-sel-odd-btn" :class="{'bg-primary': font === 'dark'}">
                        {{ odd.odds && odd.odds != 0 && odd.odds != 1 ? odd.odds : '-' }}
                      </fb-fut-button>
                    </template>
                  </td>
                </template>
              </template>
              <!-- <td
                v-if="(!game.odds && !game.odds.length) || game.odds.length === 0"
                :class="['table-odd', 'position-relative', 'text-white', 'fut-color-dynamic']"
                class="event-sel-odd w-100"
                colspan="1"
              >
              </td> -->
              <td
                :class="['text-white', 'click-bet']"
                class="m-odds d-none d-md-table-cell"
                colspan="1"
                @click="navigate(eventsSport !== 18 && eventsSport !== 9 && eventsSport !== 14 ? '/sport/'+eventsSport+'/evento/'+game.slug : '#')"
              >
                <span style="cursor: pointer" class="text-games-list-stronger">+{{ game.odds_total }}</span>
              </td>
            </tr>
          </tbody>
        </template>
      </template>
    </table>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  name: 'FbGamesList',
  components: {
    FbFutButton
  },
  props: {
    noFilter: {
      type: Boolean,
      default: false
    },
    settings: {
      type: Object,
      default: () => {}
    },
    font: {
      type: String,
      default: null
    },
    eventsSport: {
      type: Number,
      default: null
    },
    events: {
      type: Array,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      default: false
    },
    stripped: {
      type: String,
      default: ''
    },
    tickets: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      pageLimit: false,
      league: null,
      searching: false,
      searchTerm: null,
      bets: []
    }
  },
  methods: {
    gameOdds (odds, total, index) {
      if (odds && odds.length) {
        return { list: odds, valid: true }
      }
      if (total[index]) {
        return { list: total[index].odds, valid: false }
      }
      return { list: odds, valid: false }
    },
    trueValueOdd (odd) {
      // console.log('trueValueOdd', odd)
      const newOdd = { ...odd }
      if (newOdd.super_odd) {
        newOdd.odds = odd.super_odd.odd
      }
      return newOdd
    },
    invalidMultiple (gameId, type, tickets) {
      if (tickets.find(e => e.gameId === gameId && e.odd.type !== type)) {
        this.$emit('invalidMultiple', true)
      } else {
        this.$emit('invalidMultiple', false)
      }
      return tickets.find(e => e.gameId === gameId && e.odd.type !== type)
    },
    getOddTitleHeading (games) {
      const title = []
      games.forEach((e) => {
        if (e.odds) {
          e.odds.forEach((f) => {
            if (title.findIndex(obj => (obj.title === f.name) || (f.name === 'Resultado Final' && obj.title === '1 X 2')) === -1) {
              const data = { title: f.name === 'Resultado Final' ? '1 X 2' : f.name, colspan: f.odds.length, oddheading: [] }
              if (Array.isArray(f.odds)) {
                f.odds.forEach((g) => {
                  if (g.header && g.header !== '') {
                    switch (g.header.toLowerCase()) {
                      case e.home_team.toLowerCase():
                        data.oddheading.push('1')
                        break
                      case e.away_team.toLowerCase():
                        data.oddheading.push('2')
                        break
                      case this.$t('i18n_empate').toLowerCase():
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
                  }
                })
              }
              title.push(data)
            }
          })
        }
      })
      title.push({ title: '', colspan: 1 })
      let modTitle = []
      if (this.settings && this.settings.both_score === 0) {
        modTitle.push(title[0])
        modTitle.push(title[title.length - 1])
      } else {
        modTitle = title
      }
      return modTitle
    },
    sameGame (oddsGroup) {
      let isSameGame = false
      oddsGroup.forEach((e, i) => {
        oddsGroup.forEach((f, j) => {
          if (e.betId === f.betId && i !== j) {
            isSameGame = true
          }
        })
      })
      return isSameGame
    },
    getTotlaOddTitleHeading (currentHeading) {
      let colspan = 0
      currentHeading.forEach((e) => {
        colspan += e.colspan
      })
      return colspan
    },
    hasSelected (type) {
      const currentTicketIndex = this.tickets.findIndex(obj => obj.odd.type === type)
      if (currentTicketIndex !== -1) {
        return true
      }
      return false
    },
    navigate (link) {
      this.$router.push(this.localePath(link))
    },
    formattedDate (date) {
      return dayjs(date).format('DD/MM')
    },
    formattedHour (date) {
      return dayjs(date).format('HH:mm')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.bet-selected {
  .bg-primary {
    background: var(--fut-secondary) !important;
    color: white !important;
  }
}
.tr-odds {
  border-spacing: 0;
  background-color: var(--fut-background-2);
  border-bottom: 1px solid var(--fut-background-2-lighter);
  &:hover {
    background-color: var(--fut-background-darkest);
  }
}
.bg-dark-font {
  * {
    color: #333333 !important;
  }
  // background-color: var(--fut-background-darker);
}
.game-title {
  font-size: 12px;
}
.text-date {
  color: var(--fut-background-games-list-lighter) !important;
  font-size: 11px;
  filter: contrast(1.75);
}
.td-date {
  width: 50px;
  padding-left: 4px;
}
.event-name {
  font-size: 12px;
  min-width: 170px;
  // width: 100%;
  border-right: 1px solid var(--fut-background-lightest);
  @include md {
    border: none;
  }
}
.event-name-wrp {
  position: relative;
  padding-right: 20px;
    a {
      color: white;
      text-decoration: none;
    }
    span {
      white-space: nowrap;
    }
}
.event-sel-odd {
  text-transform: uppercase;
  text-align: center;
  font-size: 11px;
  line-height: 12px;
  padding: 3px 2px;
  height: 1px;
  width: 1px;
}
.event-sel-odd-r {
  width: 0;
  display: none;
  @include md {
    text-transform: uppercase;
    display: table-cell;
    text-align: center;
    font-size: 11px;
    line-height: 12px;
    padding: 3px 2px;
    height: 1px;
    width: 1px;
  }
}
.event-sel-odd-btn {
  font-weight: bold;
  line-height: 33px;
  overflow: hidden;
  display: block;
  min-width: 20px;
  min-height: 22px;
  width: 45px;
  font-size: 11px;
  border: none;
  border-radius: 5px;
  background-color: var(--fut-background-2-white);
  color: white;
  @include md {
    &:hover {
      color: black;
      background-image: linear-gradient(to right, var(--fut-background-games-list), var(--fut-background-games-list-lightest));
    }
  }
}
.bet-selected {
  .event-sel-odd-btn {
    background-image: linear-gradient(to right, var(--fut-background-games-list), var(--fut-background-games-list-lightest));
    color: black;
  }
}
.event-empty  {
  font-weight: bold;
  line-height: 31px;
  overflow: hidden;
  display: block;
  min-width: 20px;
  min-height: 22px;
  width: 45px;
  //width: 45px;
  border: none;
  border-radius: 5px;
  background-color: transparent;
}
.m-odds {
  @include md {
  font-size: 12px;
  text-align: right;
  width: 40px;
  padding: 3px 4px;
    a {
      color: var(--fut-background-games-list-lighter);
      text-decoration: none;
    }
  }
}
.line-table-h {
  width: 0;
  @include md {
    width: 1px;
  }
}
.last-minutes-content {
  background-image: linear-gradient(to right, var(--fut-background-games-list-darker), var(--fut-background-games-list));
  // background-color: var(--fut-background-games-list);
  width: 100%;
  .container-fluid {
    padding-left: 5px;
    padding-right: 5px;
  }
}
.title-head {
  font-size: 12px;
  text-transform: uppercase;
  font-family: Arial, sans-serif;
}
.header {
  background-color: var(--fut-background-2-lightest);
  @include md {
    background-color: var(--fut-background-2-lighter);
  }
  border-bottom: 1px solid var(--fut-background-2-lightest);
  color: white;
  width: 100%;
  font-size: 12px;
}
.odds-table {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  border-spacing: 0;
}
.set-sel-r {
  width: 0;
  @include md {
    text-transform: uppercase;
    text-align: center;
    font-size: 11px;
    border-spacing: 2px;
    padding: 2px 3px;
    width: 45px;
  }
}
.set-sel {
  text-transform: uppercase;
  text-align: center;
  font-size: 11px;
  border-spacing: 2px;
  padding: 2px 3px;
  width: 45px;
}
.set-holder-w1 {
  width: 1px;
}
.set-holder-w2 {
  width: 10px;
}
.market-title {
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  white-space: nowrap;
  max-width: 43px;
}
.date-content{
  line-height: 11px;
}
.normalOdd{
  font-weight: 200;
  text-decoration: line-through;
  font-size: 10px;
  position: absolute;
  bottom: -6px;
  text-align: center;
  padding-left: 3px;
}
.mobile-text-secondary{
  @include _md {
    color: var(--fut-background-games-list-lighter) !important;
    font-weight: bold;
  }
}
.games-list-container-spacing{
  margin-left: 5px;
  margin-right: 5px;
}
</style>
