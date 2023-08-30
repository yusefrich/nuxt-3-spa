<template>
  <div>
    <hr v-if="!layout === 'oldBet365'" class="bg-primary mb-1 mt-1">
    <h4 v-if="layout === 'default'" class="text-white mb-2 mt-1">
      {{ rawOdds.name }}
    </h4>
    <p v-if="layout === 'oldBet365'" class="text-highlight mb-0 header-text">
      {{ rawOdds.name }}
    </p>
    <div class="row">
      <div v-for="(item, index) in groupOddsInTableFormat(rawOdds.odds)" :key="'name_odd_team_games_'+index" class="col-6">
        <p class="text-white fw-bold text-center">
          {{ item.name }}
        </p>
      </div>
    </div>
    <div class="row ">
      <div class="col-6">
        <div v-if="groupOddsInTableFormat(rawOdds.odds)[0]" class="container-fluid row  m-0 px-0">
          <div v-for="(item, index) in groupOddsInTableFormat(rawOdds.odds)[0].odds" :key="'odds_group_goal_team_'+index" class="col-6" :class="layout === 'default' ? 'p-1' : 'px-0'">
            <div
              :class="[layout === 'oldBet365' ? 'table-td-old-bet' : 'table-td-dark', 'p-1', 'text-center', layout === 'default' ? 'click-bet' : 'old-bet-click-bet', 'text-white', hasSelected(event.id, item.type, slugify(rawOdds.name))?'bet-selected':'']"
              @click="()=>!item.odds||item.odds<=0?{}:$emit('selectBet', { gameId: event.id, odd: item, market: rawOdds.name, event: `${event.home_team} x ${event.away_team}`, validate: event.datetime, live: live })"
            >
              {{ item.header }} - <span class="text-bet">{{ item.odds ? item.odds : '-' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div v-if="groupOddsInTableFormat(rawOdds.odds)[1]" class="container-fluid row  m-0 px-0">
          <div v-for="(item, index) in groupOddsInTableFormat(rawOdds.odds)[1].odds" :key="'odds_group_goal_team_'+index" class="col-6" :class="layout === 'default' ? 'p-1' : 'px-0'">
            <div
              :class="[layout === 'oldBet365' ? 'table-td-old-bet' : 'table-td-dark', 'p-1', 'text-center', layout === 'default' ? 'click-bet' : 'old-bet-click-bet', 'text-white', hasSelected(event.id, item.type, slugify(rawOdds.name))?'bet-selected':'']"
              @click="()=>!item.odds||item.odds<=0?{}:$emit('selectBet', { gameId: event.id, odd: item, market: rawOdds.name, event: `${event.home_team} x ${event.away_team}`, validate: event.datetime, live: live })"
            >
              {{ item.header }} - <span class="text-bet">{{ item.odds ? item.odds : '-' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-responsive d-none">
      <table class="table">
        <thead>
          <tr>
            <th
              v-for="(item, index) in groupOddsInTableFormat(rawOdds.odds)"
              :key="index+'name_odd'"
              class="text-white  d-md-table-cell"
              colspan="2"
            >
              {{ item.name }}
            </th>
          </tr>
        </thead>
        <tbody class="stripped">
          <div class="row">
            <div class="col-6">
              <td
                :class="['table-td-dark', 'text-white', 'click-bet']"
                @click="()=>{}"
              >
                3.41
              </td>
              <td
                :class="['table-td-dark', 'text-white', 'click-bet']"
                @click="()=>{}"
              >
                3.41
              </td>
            </div>
            <div class="col-6">
              <td
                :class="['table-td-dark', 'text-white', 'click-bet']"
                @click="()=>{}"
              >
                3.41
              </td>
              <td
                :class="['table-td-dark', 'text-white', 'click-bet']"
                @click="()=>{}"
              >
                3.41
              </td>
            </div>
          </div>
        </tbody>
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
    live: {
      type: Object,
      default: () => ({})
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
  mounted () {
    // this.groupOddsByTeam(this.rawOdds.odds)
  },
  methods: {
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
    groupOddsInTableFormat (odds) {
      const chunks = []
      odds.forEach((e) => {
        let has = false
        chunks.forEach((c) => {
          if (c.name === e.name) {
            has = true
          }
        })
        if (!has) {
          chunks.push({ name: e.name, odds: [] })
        }
      })
      chunks.forEach((e) => {
        odds.forEach((j) => {
          if (e.name === j.name) {
            e.odds.push(j)
          }
        })
      })
      return chunks
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/variables";
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
