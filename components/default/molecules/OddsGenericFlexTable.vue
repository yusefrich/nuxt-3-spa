<template>
  <div>
    <hr v-if="!layout === 'oldBet365'" class="bg-primary mb-1 mt-1">
    <h4 v-if="layout === 'default'" class="text-white mb-2 mt-1">
      {{ rawOdds.name }}
    </h4>
    <p
      v-if="layout === 'oldBet365'"
      class="text-highlight mb-0 header-text"
    >
      {{ rawOdds.name }}
    </p>
    <div class="table-responsive">
      <table class="table" :class="{'mb-0': layout === 'oldBet365'}">
        <thead>
          <tr>
            <th
              :class="layout === 'oldBet365' ? 'bet365' : 'default'"
              style="max-width: 100px"
              class="text-white  d-md-table-cell"
            />
            <th
              v-for="(item, index) in getHeaders(rawOdds.odds)"
              :key="'header_key_'+rawOdds.name+index"
              class="text-white  d-md-table-cell"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <template
          v-for="(name, index) in getNames(rawOdds.odds)"
          :key="`group_odds_${rawOdds.name}_${index}`"
        >
          <tbody class="stripped">
            <td style="max-width: 100px" class="text-white fw-bold">
              {{ title }}
            </td>
            <td
              v-for="(header, j) in getHeaders(rawOdds.odds)"
              :key="`group_body_odds_${rawOdds.name}_${j}`"
              :class="[
                layout === 'oldBet365' ? 'bet365' : 'default',
                layout === 'oldBet365' ? 'table-td-old-bet' : 'table-td-dark',
                'text-bet',
                layout === 'oldBet365' ? 'old-bet-click-bet' : 'click-bet',
                hasSelected(getOddByNameAndHeader(rawOdds.odds, name, header).type) ? layout === 'oldBet365' ? 'bet-selected-old' : 'bet-selected' : ''
              ]"
              @click="()=>!getOddByNameAndHeader(rawOdds.odds, name, header).odds||getOddByNameAndHeader(rawOdds.odds, name, header).odds<=0?{}:$emit('selectBet', { gameId: event.id, odd: getOddByNameAndHeader(rawOdds.odds, name, header), market: rawOdds.name, event: `${event.home_team} x ${event.away_team}`, validate: event.datetime, live: live })"
            >
              <span class="text-white">{{ getOddByNameAndHeader(rawOdds.odds, name, header).name }} -</span>{{ getOddByNameAndHeader(rawOdds.odds, name, header).odds ? getOddByNameAndHeader(rawOdds.odds, name, header).odds : '-' }}
            </td>
          </tbody>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rawOdds: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: ''
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
    layout: {
      type: String,
      default: 'default'
    },
    event: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'selectBet'
  ],
  methods: {
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

.nsx-bg-name{
  background: var(--nsx-dark-4);
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
  }
  td.bet365{
    font-size: 13px;
    font-weight: 500 !important;
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
  background: linear-gradient(#363636ff,#282828ff)!important;
  font-size: 13.3px;
}
.bet365-bg{
  background: var(--nsx-dark-3);
}
.bet365{
  font-size: 13px !important;
}
</style>
