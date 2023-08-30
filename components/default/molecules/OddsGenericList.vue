<template>
  <div>
    <hr v-if="!layout === 'oldBet365'" class="bg-primary mb-1 mt-1">
    <h4 v-if="layout === 'default'" class="text-white mb-2 mt-1 fut-color-dynamic">
      {{ rawOdds.name }}
    </h4>
    <p v-if="layout === 'oldBet365'" class="text-highlight mb-0 header-text py-1 fw-bold fut-color-dynamic">
      {{ rawOdds.name }}
    </p>
    <div class="container-fluid table" style="padding: 0px 1px">
      <div class="row w-100 m-0">
        <div
          v-for="(odds, j) in rawOdds.odds"
          :key="`group_body_list_odds_${odds.name}_${j}`"
          :class="[rawOdds.col ? 'col-' + rawOdds.col : 'col-3', 'px-0', getLevarage(odds.leverage)]"
        >
          <fut-button
            v-if="!odds.finished"
            block
            :class="[layout === 'oldBet365' ? 'bet365' : 'default', layout === 'oldBet365' ? 'table-td-old-bet' : 'table-td-dark', 'fut-odds-success', layout === 'oldBet365' ? 'old-bet-click-bet' : 'click-bet', hasSelected(event.id, odds.type, slugify(rawOdds.name))?layout === 'oldBet365' ? 'bet-selected-old' : 'bet-selected':'', 'ticket-odd-t']"
            @click="()=>!odds.odds||odds.odds<=0||invalidMultiple(event.id, odds.type, tickets)?{}:$emit('selectBet', { gameId: event.id, odd: odds, market: rawOdds.name, event: `${event.home_team} x ${event.away_team}`, validate: event.datetime, live: live })"
          >
            <span class="text-white"> {{ odds.name }} </span>
            <span class="text-bet ms-2 position-relative">
              <span style="vertical-align: middle">
                <font-awesome-icon v-if="odds.blocked" class="text-white flash" :class="{ 'top-displacement': layout === 'FB' || layout === 'FB2' }" style="font-size: 22px" :icon="['fas', 'lock']" />
                <font-awesome-icon v-if="odds.finished" class="text-white flash" :class="{ 'top-displacement': layout === 'FB' || layout === 'FB2' }" style="font-size: 22px" :icon="['fas', 'times']" />
                <font-awesome-icon v-if="odds.leverage && odds.leverage === 'up'" class="text-white flash" :class="{ 'top-displacement': layout === 'FB' || layout === 'FB2' }" style="font-size: 22px" :icon="['fas', 'caret-up']" />
              <font-awesome-icon v-if="odds.leverage && odds.leverage === 'down'" class="text-white flash-2" :class="{ 'top-displacement': layout === 'FB' || layout === 'FB2' }" style="font-size: 22px" :icon="['fas', 'caret-down']" />
              </span>
              {{ odds.odds }}
            </span>
          </fut-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FutButton from '@/components/default/atoms/FutButton.vue'
export default {
  components: { FutButton },
  props: {
    rawOdds: {
      type: Object,
      default: () => ({})
    },
    live: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 12
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
    event: {
      type: Object,
      default: () => ({})
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
    checkIfNames (list) {
      let hasName = false
      list.forEach((e) => {
        if (e && e !== '') {
          hasName = true
        }
      })
      return hasName
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
    getTeamName (team) {
      if (team === '1') {
        return this.event.home_team
      } else if (team === '2') {
        return this.event.away_team
      } else {
        return team
      }
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
        if (!has) {
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
        if (!has) {
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/variables";
@import "@/assets/layout/breakpoints";
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
.bet365{
  font-size: 13.3px;
  border-bottom: none;
  background: var(--nsx-dark-7);
  padding: 3px;
  border: none !important;
  font-weight: 500;
}
.bet365{
  font-size: 13px;
  font-weight: 500 !important;
}
.nsx-bg-name{
  background: var(--nsx-dark-4);
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
    border-bottom: 1px solid var(--nsx-dark-5) !important;
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
  background: linear-gradient(#363636ff,#282828ff)!important;
  font-size: 13.3px;
}
.bet365-bg{
  background: var(--nsx-dark-3);
}
.bet365{
  font-size: 13px !important;
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
</style>
