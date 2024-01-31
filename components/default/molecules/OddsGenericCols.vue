<template>
  <div :class="{'bg-dark-2 mb-01': layout === 'FB'}">
    <hr v-if="!layout === 'oldBet365'" class="bg-primary mb-1 mt-1">
    <p
      v-if="layout === 'oldBet365'"
      class="text-highlight mb-0 header-text py-1 fw-bold fut-color-dynamic"
    >
      {{ rawOdds.name }}
    </p>
    <p
      v-else-if="layout === 'FB'"
      class="text-white mb-0 header-fb-text fut-color-dynamic"
    >
      {{ rawOdds.name }}
    </p>
    <h4
      v-else
      class="text-white mb-2 mt-1 fut-color-dynamic fut-color-dynamic"
    >
      {{ rawOdds.name }}
    </h4>
    <div
      class="table-responsive"
      style="padding: 0px 1px"
    >
      <table
        class="table"
        :class="{'mb-0': layout === 'oldBet365'}"
      >
        <thead v-if="layout !== 'FB'">
          <tr>
            <th
              v-for="(item, index) in getHeaders(rawOdds.odds)"
              :key="'header_key_'+rawOdds.name+index"
              class="text-white fut-color-dynamic d-md-table-cell"
              :class="layout === 'oldBet365' ? 'bet365' : 'default'"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <template
          v-for="index in getColsMaxLine(getOddsHeaderGroup(rawOdds.odds))"
        >
          <tbody
            v-if="rawOdds.odds"
            :key="`group_odds_${rawOdds.name}_${index}`"
            class="stripped"
          >
            <template
              v-for="(odd, j, k) in groupedOdds"
              :key="`group_body_odds_${rawOdds.name}_${j}_${k}`"
            >
              <td
                :class="[
                  'position-relative',
                  'text-bet',
                  'ticket-odd-t',
                  'fut-odds-success',
                  {'bet365 table-td-old-bet old-bet-click-bet' : layout === 'oldBet365'},
                  {'default table-td-dark click-bet' : layout === 'default'},
                  {'fb-cell' : layout === 'FB'},
                  {'fb-dark-cell': font === 'dark'},
                  {'bet-selected-old' : layout === 'oldBet365' && hasSelected(odd[index - 1]?odd[index - 1].type:null)},
                  {'bet-selected' : layout === 'default' && hasSelected(odd[index - 1]?odd[index - 1].type:null)},
                  {'fb-active' : (layout === 'FB') && hasSelected(odd[index - 1]?odd[index - 1].type:null)},
                  odd[index - 1] && getLevarage(odd[index - 1].leverage) ? getLevarage(odd[index - 1].leverage) : ''
                ]"
                @click="()=>(!odd[index - 1]||!odd[index - 1].odds||odd[index - 1].odds<=0) && (!odd[index - 1]||!odd[index - 1].super_odd||odd[index - 1].super_odd.odds<=0)||invalidMultiple(event.id, trueValueOdd(odd[index - 1]).type, tickets)?{}:$emit('selectBet', { gameId: event.id, odd: trueValueOdd(odd[index - 1]), market: rawOdds.name, event: `${event.home_team} x ${event.away_team}`, validate: odd[index - 1].datetime, live: live })"
              >
                <div
                  class="p-0"
                  :class="{'d-flex m-1 mt-2 m-md-0 odd-flex-container': layout === 'FB'}"
                >
                  <template v-if="layout === 'FB'">
                    <div
                      v-if="odd[index - 1] && !odd[index - 1].finished"
                      class="fb-side-width"
                    />
                    <span
                      v-if="odd[index - 1] && !odd[index - 1].finished"
                      class=" text-start text-bet-header"
                      :class="{'bg-primary-dark': font === 'dark'}"
                    >
                      <span class="text-bet-header-content fut-color-dynamic">
                        {{ replaceMarketName(reducedNamingStyle, odd[index - 1].header, event.home_team, event.away_team) }} {{ odd[index - 1].header && odd[index - 1].desc ? ' / ' : '' }} {{ odd[index - 1].desc ? replaceMarketName(reducedNamingStyle, odd[index - 1].desc, event.home_team, event.away_team) : ' ' }}
                      </span>
                    </span>
                  </template>
                  <template v-else>
                    <span
                      v-if="odd[index - 1] && !odd[index - 1].finished"
                      class="text-white fut-color-dynamic"
                    >
                      {{ odd[index - 1].desc ? odd[index - 1].desc : ' ' }}
                    </span>
                  </template>
                  <span
                    v-if="odd[index - 1] && !odd[index - 1].finished"
                    :class="[{'odd-fb ms-auto': layout === 'FB'}]"
                  >
                    <span
                      v-if="odd[index - 1].super_odd && odd[index - 1].super_odd.slug === odd[index - 1].type"
                      :class="[{
                        'fb-super-odd-container': layout === 'FB',
                        'super-odd-container': layout !== 'FB'
                      }]"
                    >
                      <span class="normal-odd me-2">
                        {{ odd[index - 1].super_odd.normal_odd ? odd[index - 1].super_odd.normal_odd : '-' }}
                      </span>
                      <span class="text-primary super-odd-icon" />
                      <span class="super-odd">
                        {{ odd[index - 1].super_odd.odd ? odd[index - 1].super_odd.odd : '-' }}
                      </span>
                    </span>
                    <span
                      v-else
                      class="position-relative ms-odd-3 text-white"
                      :class="{'ms-odd-0': layout === 'FB'}"
                    >
                      <span style="vertical-align: middle">
                        <font-awesome-icon
                          v-if="odd[index - 1].blocked"
                          class="text-white fut-color-dynamic flash"
                          :class="{ 'top-displacement': layout === 'FB' }"
                          style="font-size: 22px"
                          :icon="['fas', 'lock']"
                        />
                        <font-awesome-icon
                          v-if="odd[index - 1].finished"
                          class="text-white fut-color-dynamic flash"
                          :class="{ 'top-displacement': layout === 'FB' }"
                          style="font-size: 22px"
                          :icon="['fas', 'times']"
                        />
                        <span
                          v-if="odd[index - 1].leverage && odd[index - 1].leverage === 'up'"
                          class="leverage-up-arrow"
                          :class="{ 'top-displacement': layout === 'FB' }"
                          style="vertical-align: middle"
                        >
                          <font-awesome-icon
                            class="text-white fut-color-dynamic flash"
                            style="font-size: 22px"
                            :icon="['fas', 'caret-up']"
                          />
                        </span>
                        <span
                          v-if="odd[index - 1].leverage && odd[index - 1].leverage === 'down'"
                          class="leverage-down-arrow"
                          :class="{ 'top-displacement': layout === 'FB' }"
                          style="vertical-align: middle"
                        >
                          <font-awesome-icon
                            class="text-white fut-color-dynamic flash-2"
                            style="font-size: 22px"
                            :icon="['fas', 'caret-down']"
                          />
                        </span>
                      </span>
                      {{ odd[index - 1].odds ? odd[index - 1].odds : '-' }}
                    </span>
                  </span>
                </div>
              </td>
            </template>
          </tbody>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
import utils from '@/utils/utils.js'

export default {
  name: 'OddsGenericCols',
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
    layout: {
      type: String,
      default: 'default'
    },
    font: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 12
    }
  },
  emits: [
    'selectBet',
    'invalidMultiple'
  ],
  data () {
    return {
      groupedOdds: null
    }
  },
  mounted () {
    this.groupedOdds = this.getOddsHeaderGroup(this.rawOdds.odds)
  },
  methods: {
    replaceMarketName (active, text, home, away) {
      return utils.replaceMarketName(active, text, home, away)
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
    trueValueOdd (odd) {
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
    checkIfNames (list) {
      let hasName = false

      list.forEach((e) => {
        if (e && e !== '') {
          hasName = true
        }
      })

      return hasName
    },
    groupByKey (array, key) {
      return array
        .reduce((hash, obj) => {
          if (obj[key] === undefined) {
            return hash
          }

          if (obj[key] === '') {
            return hash
          }

          return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
        }, {})
    },
    splitArrayIntoChunksOfLen (arr, len) {
      const chunksArray = []
      let i = 0
      const n = arr.length

      while (i < n) {
        chunksArray.push(arr.slice(i, i += len))
      }

      return chunksArray
    },
    getColsMaxLine (oddsGroup) {
      let maxLength = Number.NEGATIVE_INFINITY

      if (Array.isArray(oddsGroup)) {
        oddsGroup.forEach((e) => {
          if (e.length > maxLength) {
            maxLength = e.length
          }
        })
      }

      for (const item in oddsGroup) {
        if (item.length > maxLength) {
          maxLength = item.length
        }
      }

      return maxLength
    },
    getFirstCotation (list) {
      return list.pop()
    },
    getOddsHeaderGroup (oddsRaw) {
      const odds = []

      oddsRaw.forEach((e) => {
        if (!e.finished) {
          odds.push(e)
        }
      })

      let group = this.groupByKey(odds, 'header')

      if (!group || Object.keys(group).length === 0) {
        group = this.splitArrayIntoChunksOfLen(odds, this.rawOdds.cols ? Math.ceil(odds.length / +this.rawOdds.cols) : Math.ceil(odds.length / 3))
        return group
      }

      const newGroup = []

      for (const key in group) {
        if (Object.hasOwnProperty.call(group, key)) {
          const e = group[key]
          newGroup.push(e)
        }
      }

      return newGroup
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
    // todo add hasSelected to utils
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
    border-bottom: none;
    background: var(--nsx-dark-7);
    padding: 3px;
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
    border-bottom: 2px solid transparent;
    width: 100px;
    font-size: 11px;
    text-align: center;
    padding-top: 10px;
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
        background: var(--fut-background-lightest-2) !important;
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
        padding: 8px 0px 0px 8px;
      }
      font-weight: 700;
      width: 100%;
      color: var(--fut-primary);
      max-width: 55%;
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
          background: linear-gradient(90deg, var(--fut-primary) 0%, var(--fut-secondary) 100%) !important;
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
      display: none;
      @include md{
        display: inline;
        position: initial;
      }
    }
    .odd-fb{
      display: block;
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
  @include md {
    background: var(--fut-primary-darker) !important;
  }
}
.click-bet-disabled{
  cursor: initial !important;
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
  width: 10px;
  height: 10px;
  display: inline-block;
}
.leverage-up-arrow{
  vertical-align: middle;
  position: absolute;
  left: -15px;
  width: 10px;
  height: 10px;
  display: inline-block;
}
.top-displacement {
  top: -4px;
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
.table > :not(caption) > * > * {
  background-color: transparent !important;
}
</style>
