<template>
  <div :class="{'bg-dark-2 mb-01': layout === 'FB' || layout === 'FB2'}">
    <hr v-if="!layout === 'oldBet365'" class="bg-primary mb-1 mt-1">
    <p v-if="layout === 'oldBet365'" class="text-highlight mb-0 header-text py-1 fw-bold fut-color-dynamic">
      {{ rawOdds.name }}
    </p>
    <p v-else-if="layout === 'FB' || layout === 'FB2'" class="text-white mb-0 header-fb-text fut-color-dynamic">
      {{ rawOdds.name }}
    </p>
    <h4 v-else class="text-white mb-2 mt-1 fut-color-dynamic">
      {{ rawOdds.name }}
    </h4>
    <div class="table-responsive" style="padding: 0px 1px">
      <table class="table" :class="{'mb-0': layout === 'oldBet365'}">
        <thead v-if="layout !== 'FB'">
          <tr>
            <th v-if="checkIfNames(getNames(rawOdds.odds))" :class="layout === 'oldBet365' ? 'bet365' : 'default'" style="max-width: 100px" class="text-white fut-color-dynamic d-md-table-cell" />
            <th
              v-for="(item, index) in getHeaders(rawOdds.odds)"
              :key="'header_key_'+rawOdds.name+index"
              :class="layout === 'oldBet365' ? 'bet365' : 'default'"
              class="text-white fut-color-dynamic d-md-table-cell"
            >
              {{ replaceMarketName(reducedNamingStyle, item, event.home_team, event.away_team) }}
            </th>
          </tr>
        </thead>
        <template v-for="(name, index) in getNames(rawOdds.odds)" :key="`group_odds_${rawOdds.name}_${index}`">
          <tbody class="stripped" :class="layout === 'oldBet365' ? 'bet365-table-spacing' : ''">
            <td
              v-if="name"
              style="max-width: 100px"
              :class="{
                'bet365 nsx-bg-name': layout === 'oldBet365',
                'default': layout === 'default',
                'fb-name': layout === 'FB' || layout === 'FB2'
              }"
              class="text-white fut-color-dynamic fw-bold"
            >
              {{ name }}
            </td>
            <td
              v-for="(header, j) in getHeaders(rawOdds.odds)"
              :key="`group_body_odds_${rawOdds.name}_${j}`"
              :class="[
                'position-relative',
                'text-bet',
                'ticket-odd-t',
                'fut-odds-success',
                {'bet365 table-td-old-bet old-bet-click-bet' : layout === 'oldBet365'},
                {'default table-td-dark click-bet' : layout === 'default'},
                {'fb-cell': layout === 'FB' || layout === 'FB2'},
                {'fb-dark-cell': font === 'dark'},
                {'bet-selected-old' : layout === 'oldBet365' && hasSelected(getOddByNameAndHeader(rawOdds.odds, name, header).type)},
                {'bet-selected' : layout === 'default' && hasSelected(getOddByNameAndHeader(rawOdds.odds, name, header).type)},
                {'fb-active' : (layout === 'FB' || layout === 'FB2') && hasSelected(getOddByNameAndHeader(rawOdds.odds, name, header).type)},
                getLevarage(getOddByNameAndHeader(rawOdds.odds, name, header).leverage)
              ]"
              @click="
                ()=>
                  (!getOddByNameAndHeader(rawOdds.odds, name, header).odds||getOddByNameAndHeader(rawOdds.odds, name, header).odds<=0) && (!getOddByNameAndHeader(rawOdds.odds, name, header).super_odd||getOddByNameAndHeader(rawOdds.odds, name, header).super_odd.odds<=0)||invalidMultiple(event.id, trueValueOdd(getOddByNameAndHeader(rawOdds.odds, name, header)).type, tickets)?{}:selectBet({ gameId: event.id, odd: trueValueOdd(getOddByNameAndHeader(rawOdds.odds, name, header)), market: rawOdds.name, event: `${event.home_team} x ${event.away_team}`, validate: getOddByNameAndHeader(rawOdds.odds, name, header).datetime, live: live })"
            >
              <template v-if="!getOddByNameAndHeader(rawOdds.odds, name, header).finished">
                <div class="p-0" :class="{'d-flex m-1 mt-2 m-md-0 odd-flex-container': layout === 'FB' || layout === 'FB2'}">
                  <div v-if="layout === 'FB' || layout === 'FB2'" class="fb-side-width" />
                  <span v-if="layout === 'FB' || layout === 'FB2'" class=" text-start text-bet-header" :class="{'bg-primary-dark': font === 'dark'}">
                    <span v-if="header || getOddByNameAndHeader(rawOdds.odds, name, header).desc" class="text-bet-header-content fut-color-dynamic">
                      {{ replaceMarketName(reducedNamingStyle, header, event.home_team, event.away_team) }} {{ getOddByNameAndHeader(rawOdds.odds, name, header).desc ? '(' + getOddByNameAndHeader(rawOdds.odds, name, header).desc + ')' : ' ' }}
                    </span>
                  </span>
                  <span v-else class="text-white text-start fut-color-dynamic">
                    {{ getOddByNameAndHeader(rawOdds.odds, name, header).desc ? getOddByNameAndHeader(rawOdds.odds, name, header).desc : ' ' }}
                  </span>
                  <span :class="[{'odd-fb ms-auto': layout === 'FB' || layout === 'FB2'}]">
                    <span v-if="getOddByNameAndHeader(rawOdds.odds, name, header).super_odd && getOddByNameAndHeader(rawOdds.odds, name, header).super_odd.slug === getOddByNameAndHeader(rawOdds.odds, name, header).type" :class="[{'fb-super-odd-container': layout === 'FB' || layout === 'FB2', 'super-odd-container': layout !== 'FB'}]">
                      <span class="normal-odd me-2">
                        {{ getOddByNameAndHeader(rawOdds.odds, name, header).super_odd.normal_odd ? getOddByNameAndHeader(rawOdds.odds, name, header).super_odd.normal_odd : '-' }}
                      </span>
                      <span class="super-odd">
                        {{ getOddByNameAndHeader(rawOdds.odds, name, header).super_odd.odd ? getOddByNameAndHeader(rawOdds.odds, name, header).super_odd.odd : '-' }}
                      </span>
                    </span>
                    <span v-else class="position-relative ms-odd-3" :class="{'ms-odd-0': layout === 'FB' || layout === 'FB2'}">
                      <span style="vertical-align: middle">
                        <font-awesome-icon v-if="getOddByNameAndHeader(rawOdds.odds, name, header).blocked" class="text-white flash fut-color-dynamic" :class="{ 'top-displacement': layout === 'FB' || layout === 'FB2' }" style="font-size: 22px" :icon="['fas', 'lock']" />
                        <font-awesome-icon v-if="getOddByNameAndHeader(rawOdds.odds, name, header).finished" class="text-white flash fut-color-dynamic" :class="{ 'top-displacement': layout === 'FB' || layout === 'FB2' }" style="font-size: 22px" :icon="['fas', 'times']" />
                        <font-awesome-icon v-if="getOddByNameAndHeader(rawOdds.odds, name, header).leverage && getOddByNameAndHeader(rawOdds.odds, name, header).leverage === 'up'" class="text-white fut-color-dynamic flash" :class="{ 'top-displacement': layout === 'FB' || layout === 'FB2' }" style="font-size: 22px" :icon="['fas', 'caret-up']" />
                        <font-awesome-icon v-if="getOddByNameAndHeader(rawOdds.odds, name, header).leverage && getOddByNameAndHeader(rawOdds.odds, name, header).leverage === 'down'" class="text-white fut-color-dynamic flash-2" :class="{ 'top-displacement': layout === 'FB' || layout === 'FB2' }" style="font-size: 22px" :icon="['fas', 'caret-down']" />
                      </span>
                      {{ getOddByNameAndHeader(rawOdds.odds, name, header).odds ? getOddByNameAndHeader(rawOdds.odds, name, header).odds : '-' }}
                    </span>
                  </span>
                </div>
              </template>
            </td>
          </tbody>
        </template>
      </table>
    </div>
  </div>
</template>
<script>
import utils from '@/utils/utils.js'

export default {
  props: {
    reducedNamingStyle: {
      type: Boolean,
      default: false
    },
    event: {
      type: Object,
      default: () => ({})
    },
    rawOdds: {
      type: Object,
      default: () => ({})
    },
    live: {
      type: Boolean,
      default: false
    },
    tickets: {
      type: Array,
      default: () => ([])
    },
    font: {
      type: String,
      default: ''
    },
    layout: {
      type: String,
      default: 'default'
    },
    rows: {
      type: Number,
      default: 12
    }
  },
  methods: {
    replaceMarketName (active, text, home, away) {
      return utils.replaceMarketName(active, text, home, away)
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
      if (this.layout !== 'FB') {
        return false
      }
      if (tickets.find(e => e.gameId === gameId && e.odd.type !== type)) {
        this.$emit('invalidMultiple', true)
      } else {
        this.$emit('invalidMultiple', false)
      }
      return tickets.find(e => e.gameId === gameId && e.odd.type !== type)
    },
    selectBet (ticket) {
      this.$emit('selectBet', ticket)
    },
    checkIfNames (list) {
      let hasName = false
      list.forEach((e) => {
        if (e && e !== '') {
          hasName = true
        }
      })
      return hasName
    },
    getHeaders (odds) {
      const headers = []
      if (!Array.isArray(odds)) {
        return headers
      }
      odds.forEach((e) => {
        let has = false
        headers.forEach((f) => {
          if (e.header === f) {
            has = true
          }
        })
        if (!has && !e.finished) {
          headers.push(e.header)
        }
      })
      return headers
    },
    getNames (odds) {
      const names = []
      if (!Array.isArray(odds)) {
        return names
      }
      odds.forEach((e) => {
        let has = false
        names.forEach((f) => {
          if (e.name === f) {
            has = true
          }
        })
        if (!has && !e.finished) {
          names.push(e.name)
        }
      })
      return names
    },
    getOddByNameAndHeader (odds, name, header) {
      let odd = {
        header: '',
        name: '',
        odds: '',
        leverage: '',
        desc: '',
        type: ''
      }
      odds.forEach((e) => {
        if (e.name === name && e.header === header) {
          odd = e
        }
      })
      return odd
    },
    // todo add slugify to utils
    slugify (string) {
      if (!string) {
        return ''
      }
      /* eslint-disable */
      return string
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '-')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
      /* eslint-enable */
    },
    // todo add hasSelected to utils
    hasSelected (type) {
      const currentTicketIndex = this.tickets.findIndex(obj => obj.odd.type === type)
      if (currentTicketIndex !== -1) {
        return true
      }
      return false
    },
    getLevarage (levarage) {
      if (levarage === 'up') {
        return 'background-lev-success'
      }
      if (levarage === 'down') {
        return 'background-lev-danger'
      }
      return levarage
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/variables";
@import "@/assets/layout/breakpoints";
.mb-01{
  margin-bottom: 10px;
  @include md{
    margin-bottom: 2px;
  }
}
.table{
  table-layout: fixed;
}
//todo switch all scss variables to css var()
.table-td-dark{
  background-color: var(--fut-background-darkest);
}
.table-td-old-bet{
  background-color: var(--nsx-dark-3);
}
.nav-link{
    color: $white;
    border: none;
}
.nav-link:hover{
    background-color: var(--fut-background-darkest);
    border: none;
    border-radius: 0;
}
.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link{
    color: $white;
    background-color: var(--fut-background-darkest);
    border: none;
    border-radius: 0;
    border-bottom: 2px solid var(--fut-primary);
    font-weight: 900;
}
.nav-tabs{
    border-bottom: 1px solid $gray-600 !important;
}
.bg-table-black {
  background: $black !important;
}
.table{
  th{
    padding: 5px;
    text-align: center;
  }
  th.bet365{
    font-size: 13.3px;
    // border-bottom: none;
    background: var(--nsx-dark-7);
    padding: 3px;
    border: none !important;
    border-bottom: 2px solid var(--nsx-dark-5) !important;
    font-weight: 500;
  }
  td.bet365{
    font-size: 13px;
    font-weight: 500 !important;
  }
  .nsx-bg-name{
    background: var(--nsx-dark-4);
  }
}
.table {
  .default {
    padding: 5px;
    text-align: center;
    border-bottom: 3px solid var(--fut-background-darker) !important;
    border-right: 3px solid var(--fut-background-darker);
  }
  .bet365{
    padding: 5px;
    text-align: center;
    border: 1px solid var(--nsx-dark-5) !important;
  }
  .fb-name{
    width: 50px;
    border-bottom: 2px solid var(--fut-background-white);
    @include md{
      border-bottom: 2px solid transparent;
      width: 100px;
    }
    font-size: 11px;
    text-align: center;
    vertical-align: middle;
    // padding-top: 10px;
  }
  .fb-cell{
    margin-left: 5px;
    margin-bottom: 2px;
    padding: 0px;
    color: white;
    white-space: nowrap;
    text-align: center;
    border-radius: 5px;
    overflow: auto;
    border-bottom: 2px solid var(--fut-background-white);
    @include md{
      border-bottom: none;
      overflow: initial;
      text-align: initial;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      background: var(--fut-background-white-2);
    }
    @include _md{
      .odd-flex-container{
        background: var(--fut-background-lightest-2);
        border-radius: 5px;
      }
    }
    cursor: pointer;
    .text-bet-header{
      .text-bet-header-content{
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: center;
        // padding: 8px;
        padding: 8px 0px 0px 8px;
      }
      font-weight: 700;
      width: 100%;
      color: var(--fut-primary);
      max-width: 60%;
      @include md {
        color: white;
        width: initial;
        .text-bet-header-content{
          width: initial;
          text-overflow: ellipsis;
          overflow: initial;
          text-align: initial;
          padding: 8px;
        }
        font-weight: initial;
        background: var(--fut-background-lightest-2);
      }
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      // margin-left: 5px;
      padding: 0;
    }
    span{
      font-size: 14px;
      @include md{
        font-size: 11px;
      }
      display: inline-block;
    }
    &:hover{
      @include md {
        background: linear-gradient(90deg, var(--fut-primary) 0%, var(--fut-secondary) 100%);
        *{
          color: var(--fut-background-black) !important;
        }
        .text-bet-header{
          background: var(--fut-primary-darkest);
        }
      }
    }
    &.fb-active{
      @include _md{
        .odd-flex-container{
          background: linear-gradient(90deg, var(--fut-primary) 0%, var(--fut-secondary) 100%);
          border-radius: 5px;
        }
      }
      @include md{
        background: linear-gradient(90deg, var(--fut-primary) 0%, var(--fut-secondary) 100%);
      }
      *{
        color: var(--fut-background-black) !important;
      }
      .text-bet-header{
        @include _md{
          color: white !important;
        }
        @include md {
          background: var(--fut-primary-darkest);
        }
      }
    }
    .fb-side-width{
      background: var(--fut-background-2);
      margin: 0px;
      min-width: initial;
      padding: 10px 2px;
      position: absolute;
      left: 0;
      // height: 100%;
      display: none;
      @include md {
        display: inline;
        position: initial;
      }
    }
    .odd-fb{
      display: block;
      padding-top: 0;
      padding: 0.5rem;
      padding-left: 0;
      @include md{
        display: inline-block;
        float: right;
      }
    }
  }
  .fb-dark-cell{
    background: var(--fut-primary) !important;
    border-bottom: 2px solid transparent;
    &:hover{
      @include md {
        background: linear-gradient(90deg, var(--fut-secondary) 0%, var(--fut-secondary) 100%) !important;
        .text-bet-header{
          background: var(--fut-secondary-darker) !important;
        }
      }
    }
  }
}
.lighter {
  td {
    background: var(--fut-background-lightest);
  }
}
.darker {
  td {
    background: var(--fut-background-darkest);
  }
}
.stripped{
  &.bet365-table-spacing{
    border-top: 0px !important;
  }
  tr:nth-child(even)  {
    background: var(--fut-background-lightest);
  }
  tr:nth-child(odd) {
    background: var(--fut-background-darkest);
  }
}
.click-bet{
  cursor: pointer;
}
.click-bet:hover{
  background: var(--fut-primary-darker) !important;
}
.click-bet-disabled{
  cursor: initial;
}
.click-bet-disabled:hover{
  background: var(--fut-primary-darkest) !important;
}

.old-bet-click-bet{
  cursor: pointer;
}
.old-bet-click-bet:hover{
  background: var(--nsx-dark-5) !important;
}
.old-bet-click-bet-disabled{
  cursor: initial;
}
.old-bet-click-bet-disabled:hover{
  background: var(--fut-primary-darkest) !important;
}
.bet-selected{
  background: var(--fut-primary-lightest) !important;
  color: var(--fut-background-darker) !important;
  font-weight: 600 !important;
  *, .text-bet{
    color: var(--fut-background-darker) !important;
    font-weight: 600 !important;
  }
}
.bet-selected-old{
  background: #ffffff !important;
  *{
    color: #000000 !important;
  }
}
.bl-1{
  border-left: 1px solid $white !important;
}
.smaller{
  font-size: 14px;
}
.col-style{
  background: var(--fut-background-darkest);
  border-bottom: 3px solid var(--fut-background-darker) !important;
  border-right: 3px solid var(--fut-background-darker);
}
.col-style-old-bet{
  background: var(--nsx-dark-3);
  border: 1px solid var(--nsx-dark-5) !important;
}
.text-bet{
  color: #ffdf1b;
}
.td-guide{
  background: var(--fut-background-darker) !important;
  font-weight: 700;
}
.header-text{
  padding: 1px 10px;
  background: linear-gradient(--nsx-dark-5, --nsx-dark-6)!important;
  font-size: 13.3px;
}
.header-fb-text{
  background: var(--fut-background-2)!important;
  font-size: 11px;
  padding: 10px 10px;
  @include md{
    padding: 4px 10px;
  }
}
.bet365-bg{
  background: var(--nsx-dark-3);
}
.bet365{
  font-size: 13px !important;
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
    font-size: 14px;
    line-height: 5px;
    vertical-align: middle;
    vertical-align: -webkit-baseline-middle;
  }
  .super-odd-icon{
    position: absolute;
    top: 0;
    right: 0;
    // font-size: 20px;
    // height: 5px;
    // width: 5px;
    // background: #ad123a;
    transform: translate(50%, -50%) rotate(45deg);
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
    border-top: 7px solid transparent;
    border-bottom: 7px solid var(--fut-primary);
  }
  .super-odd{
    vertical-align: middle;
    vertical-align: -webkit-baseline-middle;
    font-weight: 700;
    border-bottom: 2px solid var(--fut-primary);
  }
}
.fb-super-odd-container{
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // width: 100%;
  // height: 100%;
  line-height: 8px;
  transform: translateY(-3px);
  .normal-odd{
    text-decoration: line-through;
    opacity: .5;
    font-size: 14px;
    line-height: 5px;
    vertical-align: middle;
    vertical-align: -webkit-baseline-middle;
  }
  .super-odd-icon{
    position: absolute;
    top: 0;
    right: 0;
    // font-size: 20px;
    // height: 5px;
    // width: 5px;
    // background: #ad123a;
    transform: translate(50%, -50%) rotate(45deg);
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
    border-top: 7px solid transparent;
    border-bottom: 7px solid var(--fut-primary);
  }
  .super-odd{
    vertical-align: middle;
    vertical-align: -webkit-baseline-middle;
    font-weight: 700;
    border-bottom: 2px solid var(--fut-primary);
  }
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
.leverage-down-arrow{
  vertical-align: middle;
  position: absolute;
  left: -15px;
  // left: calc(50% - 25px);
  // transform: translate(-50%);
  width: 10px;
  height: 10px;
  // border-radius: 50%;
  // background: #ff595fb4;
  display: inline-block;
}
.leverage-up-arrow{
  vertical-align: middle;
  position: absolute;
  left: -15px;
  // left: calc(50% - 25px);
  // transform: translate(-50%);
  width: 10px;
  height: 10px;
  // border-radius: 50%;
  // background: greenyellow;
  display: inline-block;
}
.top-displacement {
  top: -10px;
}
.ms-odd-3{
  margin-left: 1rem;
}
.ms-odd-0{
  margin-left: 0 !important;
}
.bg-dark-2{
  background: var(--fut-background-2);
}
</style>
