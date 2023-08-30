<template>
  <div>
    <div v-if="loading" class="bg-leagues-row text-center" style="padding-top: 90px; padding-bottom: 90px">
      <font-awesome-icon class="icon-loading spin spinner-class" :icon="['fas', 'circle-notch']" />
    </div>
    <div v-else style="padding-right: 1px" class="table-height table-responsive overflow-hidden overflow-md-auto">
      <table id="events-table" class="table mb-0">
        <thead v-if="heading">
          <tr style="background: var(--nsx-gray-0);">
            <th colspan="2" class="fut-color-dynamic">
              {{ tableHeading.title }} 123
            </th>
            <th
              v-for="(head, index) in tableHeading.subtitle"
              :key="'head_nsx_'+index"
              class="text-center fut-color-dynamic"
              colspan="1"
            >
              {{ head }}
            </th>
          </tr>
        </thead>
        <tbody class="header">
          <template v-for="(betGroup, index) in treatedEvents" :key="'old-bet365-group_'+index">
            <tr>
              <td colspan="5" class="fut-odd-header fut-color-dynamic py-0">
                <small>
                  {{ betGroup.name }}
                </small>
              </td>
            </tr>
            <template v-for="(date, dateTime, j) in betGroup.gamesByDate" :key="'old-bet365-group_date_header'+index+'_'+j">
              <tr>
                <td colspan="5" class="fut-odd-header-time py-0 fut-color-dynamic">
                  <small>
                    {{ formattedDateDay(dateTime + ' 01:00') }}
                  </small>
                </td>
              </tr>
              <template v-for="game in date" :key="'desktop_heading'+game.id">
                <tr>
                  <td class="text-white fut-odd-title d-none d-md-table-cell" @click="navigate('/sport/'+currentSport+'/evento/'+game.slug)">
                    <span class="me-2 text-gray fut-color-dynamic">{{ formattedDate(game.datetime) }}</span>
                    <span v-if="game.home_team && game.away_team" class="fut-color-dynamic">{{ game.home_team }} x {{ game.away_team }}</span>
                    <span v-if="game.home_team && !game.away_team" class="fut-color-dynamic">{{ game.home_team }}</span>
                    <span v-if="!game.home_team && game.away_team" class="fut-color-dynamic">{{ game.away_team }}</span>
                  </td>
                  <td colspan="2" class="text-white fut-odd-title d-md-none" @click="navigate('/sport/'+currentSport+'/evento/'+game.slug)">
                    <span class="d-block">{{ game.home_team }}</span>
                    <span class="d-block">{{ game.away_team }}</span>
                    <span class="d-block text-gray">{{ formattedDate(game.datetime) }}</span>
                  </td>
                  <td
                    class="text-white fut-odd-title text-center bg-graph d-none d-md-table-cell"
                    @click="$emit('selectCurrentGame', game.slug)"
                  >
                    <font-awesome-icon class="icon text-white me-0 fut-color-dynamic" :icon="['far', 'chart-bar']" />
                  </td>
                  <template v-for="(oddsMarket, k) in game.odds" :key="'odd_key_' + index + '_' + k">
                    <template v-if="oddsMarket && k === 0">
                      <td
                        v-for="(odd, l) in oddsMarket.odds"
                        :key="'odd_key_' + index + '_' + l + '_' + k"
                        class="p-0"
                      >
                        <nsx-fut-button
                          class="fut-odds w-100"
                          :class="[hasSelected(odd.type)?'active':'', getLevarage(odd.leverage)]"
                          @click="()=>odd.odds<=0||odd.odds==1?{}:$emit('selectBet', { gameId: game.id, odd: odd, market: oddsMarket.name, event: `${game.home_team} x ${game.away_team}`, validate: game.datetime, live: live })"
                        >
                          <span v-if="odd.super_odd" class="super-odd-container">
                            <span class="normal-odd fut-color-dynamic">
                              {{ odd.super_odd && odd.super_odd.normal_odd ? odd.super_odd.normal_odd : '-' }}
                            </span>
                            <br>
                            <span class="text-primary super-odd-icon fut-color-dynamic" />
                            <span class="super-odd fut-color-dynamic">
                              {{ odd.super_odd && odd.super_odd.odd != 0 && odd.super_odd.odd != 1 ? odd.super_odd.odd : '-' }}
                            </span>
                          </span>
                          <span v-else class="fut-color-dynamic">
                            {{ odd.odds && odd.odds != 0 && odd.odds != 1 ? odd.odds : '-' }}
                          </span>
                        </nsx-fut-button>
                      </td>
                    </template>
                  </template>
                </tr>
              </template>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'
const isToday = require('dayjs/plugin/isToday')
const isTomorrow = require('dayjs/plugin/isTomorrow')
dayjs.extend(isToday)
dayjs.extend(isTomorrow)

export default {
  name: 'GamesListNsx',
  components: {
    NsxFutButton
  },
  props: {
    notGroupped: {
      type: Boolean,
      default: false
    },
    tickets: {
      type: Array,
      default: () => ([])
    },
    events: {
      type: Array,
      default: () => [
        {
          name: 'Mocked Clubes',
          games: [
            {
              away_team: 'Bjarg',
              datetime: '2022-02-23 15:00:00',
              home_team: 'Os',
              hour: '15:00',
              id: 8258243,
              league: 'Mocked Clubes',
              odds_total: 76,
              odds: [],
              slug: 'os-bjarg-2022-02-23-150000'
            },
            {
              away_team: 'Skövde AIK',
              datetime: '2022-02-23 15:00:00',
              home_team: 'IF Elfsborg',
              hour: '15:00',
              id: 8259984,
              league: 'Mocked Clubes',
              odds_total: 125,
              odds: [],
              slug: 'if-elfsborg-skovde-aik-2022-02-23-150000'
            }
          ]
        }
      ]
    },
    tableHeading: {
      type: Object,
      default: () => ({})
    },
    currentSport: {
      type: Number,
      default: 1
    },
    heading: {
      type: Boolean,
      default: false
    },
    live: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    odds: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      treatedEvents: []
    }
  },
  mounted () {
    if (this.notGroupped) {
      const mainEventRaw = []
      mainEventRaw.push({ games: this.events })
      mainEventRaw.forEach((e) => {
        const currentObject = Object.assign({}, e)
        currentObject.gamesByDate = this.groupedByDate(currentObject.games)
        this.treatedEvents.push(currentObject)
      })
    } else {
      this.events.forEach((e) => {
        const currentObject = Object.assign({}, e)
        currentObject.gamesByDate = this.groupedByDate(currentObject.games)
        this.treatedEvents.push(currentObject)
      })
    }
  },
  methods: {
    getLevarage (levarage) {
      if (levarage === 'up') {
        return 'background-lev-success'
      }
      if (levarage === 'down') {
        return 'background-lev-danger'
      }
      return levarage
    },
    formattedDateDay (day) {
      const semana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']
      const mes = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      let dateReturn = ''
      if (dayjs(day).isToday()) {
        dateReturn = this.$t('i18n_hoje')
      } else if (dayjs(day).isTomorrow()) {
        dateReturn = this.$t('i18n_amanha')
      } else {
        dateReturn = semana[dayjs(day).day()] + ', ' + dayjs(day).format('DD [de] ') + mes[dayjs(day).month()]
      }
      return dateReturn
    },
    groupedByDate (events) {
      const array = events.reduce((group, event) => {
        const { date } = event
        group[date.split(' ')[0]] = group[date.split(' ')[0]] ?? []
        group[date.split(' ')[0]].push(event)
        return group
      }, {})
      return array
    },
    navigate (link) {
      this.$router.push(this.localePath(link))
    },
    formattedDate (date) {
      return dayjs(date).format('HH:mm')
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
  td{
    color: #ebebeb;
    background-color: var(--nsx-dark-5);
    border: 1px solid var(--nsx-dark-6) !important;
    // padding: 7px !important;
    font-size: 14px;
  }
  .bg-graph{
    background: var(--nsx-dark-4);
  }
  .fut-odd-header{
    background: var(--fut-background-games-list);
    border-bottom: 1px solid #8d8d8d;
    color: var(--nsx-dark-2);
  }
  .fut-odd-header-time{
    background-color: var(--nsx-dark-4);
    color: #c5c5c5;
    border-bottom: 1px solid var(--nsx-dark-5);
  }
  .fut-odds{
    background: var(--nsx-dark-3);
    color: #ffdf1b !important;
    margin: 0 !important;
    cursor: pointer;
  }
  .fut-odds:hover{
    background: var(--nsx-dark-4);
  }
  .active{
    color: var(--nsx-dark-3) !important;
    *{
      color: var(--nsx-dark-3) !important;
    }
    background: #ebebeb !important;
  }
  .fut-odd-title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }
  .fut-odd-title:hover{
    cursor: pointer;
    color: #ff8800 !important;
    *{
      color: #ff8800 !important;
    }
  }
  .text-gray{
    color: #C5C5C5;
  }
  th{
    font-size: 13.3px;
    color: var(--nsx-dark-1);
  }
  .bg-leagues-row{
    background: var(--nsx-dark-5);
  }
  .icon-loading{
    font-size: 140px;
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
  .overflow-auto-nsx{
    overflow-x: auto;
    width: 100vw;
  }
  .mobile-game-card{
    min-width: 210px;
    border-right: 1px solid #797979;
    color: #ebebeb;
  }
  .content-odds-header{
    position: relative;
    p{
      padding-bottom: 4px;
      margin-bottom: 0;
      font-size: 12px;
    }
  }
  .graph-btn{
    position: absolute;
    right: 0;
    bottom: 0;
    .icon{
      font-size: 20px;
    }
  }
  .date-desc{
    line-height: 10px;
  }
  .mobile-btn-odds{
    font-size: 13px;
    color: var(--nsx-gray-0);
    background: var(--nsx-dark-6);
    padding-top: 12px;
    padding-bottom: 12px;
    border-right: 1px solid #797979;
    .odd-text{
      color: #ffdf1b;
    }
  }
  .py-0{
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }
  @include md {
    .overflow-md-auto{
      overflow-x: auto !important;
    }
  }
  span{
    font-size: 12px;
  }
  .v-middle{
    vertical-align: middle;
  }
  .super-odd-container{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    .normal-odd{
      text-decoration: line-through;
      opacity: .5;
      font-size: 10px !important;
      line-height: 5px;
    }
    .super-odd-icon{
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%) rotate(45deg);
      border-right: 7px solid transparent;
      border-left: 7px solid transparent;
      border-top: 7px solid transparent;
      border-bottom: 7px solid var(--fut-primary);
    }
    .super-odd{
      font-weight: 800;
    }
  }
</style>
