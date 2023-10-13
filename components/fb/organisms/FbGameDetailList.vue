<template>
  <div v-if="event">
    <nav v-if="filter" class="nav-fb-filter">
      <div id="nav-tab" class="nav nav-tabs" role="tablist">
        <template v-for="(eventsHeader, i) in event.all_odds">
          <fb-fut-button
            :id="`nav-${eventsHeader.header}-tab`"
            :key="'odds_header_'+i"
            :class="`nav-link ${i===0?'active':''} ${font === 'dark'?'nav-link-dark':''}`"
            data-bs-toggle="tab"
            :data-bs-target="`#nav-${eventsHeader.header}`"
            role="tab"
            :aria-controls="`nav-${eventsHeader.header}`"
            aria-selected="true"
          >
            {{ eventsHeader.label }}
          </fb-fut-button>
        </template>
      </div>
    </nav>
    <div id="nav-tabContent" class="tab-content mt-1 fb-scroll">
      <template v-for="(eventsHeader, i) in event.all_odds">
        <div
          :id="`nav-${eventsHeader.header}`"
          :key="'odds_body_'+i"
          :class="`tab-pane fade ${i===0?'show active':''}`"
          role="tabpanel"
        >
          <template v-for="(main, index) in eventsHeader.odds">
            <div v-if="main" :key="'main_'+index">
              <odds-over-exact-under
                v-if="main.slug === 'corners'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-over-exact-under
                v-else-if="main.slug === 'corners_first_half'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-over-exact-under
                v-else-if="main.slug === 'alternative_corners'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-over-under
                v-else-if="main.slug === 'goals_goals_over_under'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-over-under
                v-else-if="main.slug === 'asian_total_corners'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-generic-table
                v-else-if="main.slug === 'corners_race'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :font="font"
                :layout="layout"
                :multiple-select="false"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @invalidMultiple="val => $emit('invalidMultiple', val)"
                @selectBet="ticket => $emit('selectBet', ticket)"
              />
              <odds-generic-table
                v-else-if="main.slug === 'specials'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :font="font"
                :layout="layout"
                :multiple-select="false"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @invalidMultiple="val => $emit('invalidMultiple', val)"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-generic-table
                v-else-if="main.slug === 'player_goalscorers'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :font="font"
                :layout="layout"
                :multiple-select="false"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @invalidMultiple="val => $emit('invalidMultiple', val)"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-generic-table
                v-else-if="main.slug === 'multicorners'"
                :key="oddsSum(main.odds)"
                :font="font"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :multiple-select="false"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @invalidMultiple="val => $emit('invalidMultiple', val)"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-generic-table
                v-else-if="main.slug === 'to_score_in_half'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :font="font"
                :layout="layout"
                :multiple-select="false"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @invalidMultiple="val => $emit('invalidMultiple', val)"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-generic-table
                v-else-if="main.slug === 'corners_2_way_over_95'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :font="font"
                :layout="layout"
                :multiple-select="false"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @invalidMultiple="val => $emit('invalidMultiple', val)"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-generic-table
                v-else-if="main.slug === 'first_half_asian_corners'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :font="font"
                :layout="layout"
                :multiple-select="false"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @invalidMultiple="val => $emit('invalidMultiple', val)"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-generic-table
                v-else-if="main.slug === 'multi_scorers'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :font="font"
                :layout="layout"
                :multiple-select="false"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @invalidMultiple="val => $emit('invalidMultiple', val)"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-generic-flex-table
                v-else-if="main.slug === 'corners_first_10_minutes'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :title="$t('i18n_escanteios')"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-generic-flex-table
                v-else-if="main.slug === 'first_ten_minutes_goals'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :title="$t('i18n_gols')"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-generic-table
                v-else-if="main.slug === 'corners_2_way'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :font="font"
                :layout="layout"
                :multiple-select="false"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @invalidMultiple="val => $emit('invalidMultiple', val)"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-over-under
                v-else-if="main.slug === 'first_half_goals'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-over-under
                v-else-if="main.slug === 'goals_second_half_goals'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-basic-table
                v-else-if="main.slug === 'goals_odd_even_odd'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-basic-table
                v-else-if="main.slug === 'goals_both_teams_to_score_in_1st_half'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-flex-row
                v-else-if="main.slug === 'goals_total_goals_both_teams_to_score_over_under'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :rows="6"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-flex-row
                v-else-if="main.slug === 'home_team_exact_goals'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :rows="3"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-flex-row
                v-else-if="main.slug === 'away_team_exact_goals'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :rows="3"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-flex-row
                v-else-if="main.slug === 'first_goal_method'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :rows="4"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-flex-row
                v-else-if="main.slug === 'total_corners'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :rows="6"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-flex-row
                v-else-if="main.slug === 'player_to_be_sent_off'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :rows="6"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-flex-table
                v-else-if="main.slug === 'corner_handicap'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :rows="4"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-flex-row
                v-else-if="main.slug === 'own_goal'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :rows="6"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-basic-table
                v-else-if="main.slug === 'goals_both_teams_to_score_in_2nd_half'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-over-under
                v-else-if="main.slug === 'goals_alternative_total_goals'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-group-goals-team-total
                v-else-if="main.slug === 'goals_team_total_goals'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-generic-table
                v-else-if="main.slug === 'generic_table'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :font="font"
                :layout="layout"
                :multiple-select="false"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @invalidMultiple="val => $emit('invalidMultiple', val)"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-generic-cols
                v-else-if="main.slug === 'generic_cols'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :font="font"
                :layout="layout"
                :multiple-select="false"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @invalidMultiple="val => $emit('invalidMultiple', val)"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <odds-generic-list
                v-else-if="main.slug === 'generic_list'"
                :key="oddsSum(main.odds)"
                :reduced-naming-style="reducedNamingStyle"
                :layout="layout"
                :tickets="tickets"
                :live="live"
                :raw-odds="main"
                :event="event"
                @invalidMultiple="val => $emit('invalidMultiple', val)"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <div v-else :key="oddsSum(main.odds)">
                <hr class="bg-primary mb-1 mt-1">
                <h4 class="text-white mb-2 mt-1 fut-color-dynamic">
                  {{ main.name }}
                </h4>
                <div v-if="!main.column" class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th v-for="(odd, j) in main.odds" :key="'header_'+index+j" class="text-white  d-md-table-cell fut-color-dynamic">
                          {{ getTeamName(odd.name) }}
                        </th>
                      </tr>
                    </thead>
                    <tbody class="stripped">
                      <tr>
                        <template v-for="(odd, k) in main.odds">
                          <td
                            v-if="!Array.isArray(odd.odds)"
                            :key="'inside_'+index+k"
                            :class="['text-bet', 'click-bet', 'fut-odds-success', hasSelected(odd.type)?'bet-selected':'']"
                            @click="()=>odd.odds<=0?{}:$emit('selectBet', { gameId: event.id, odd: odd, market: main.name, event: `${event.home_team} x ${event.away_team}`, validate: event.datetime, live: live })"
                          >
                            {{ odd.odds ? odd.odds : '-' }}
                          </td>
                        </template>
                      </tr>
                      <template v-for="(odd, k) in getScoreOdds(main.odds)">
                        <tr :key="'inside_new_'+index+k">
                          <template v-for="(iodd, l) in odd">
                            <td v-if="iodd.odds" :key="'inside_new_'+index+k+l" :class="['text-white', iodd.odds.odds?'click-bet':'td-guide', hasSelected(iodd.odds.type)?'bet-selected':'']" @click="()=>!iodd.odds.odds||iodd.odds.odds<=0?{}:$emit('selectBet', { gameId: event.id, odd: iodd.odds, market: iodd.name, event: `${event.home_team} x ${event.away_team}`, validate: event.datetime, live: live })">
                              <div>
                                <span class="me-3 fut-color-dynamic">{{ iodd.odds.name }}</span>
                                <span v-if="iodd.odds.odds" class="text-bet fut-odds-success">{{ iodd.odds.odds ? iodd.odds.odds : '-' }}</span>
                                <span v-else class="text-white fut-color-dynamic">{{ iodd.odds.header }}</span>
                              </div>
                            </td>
                            <td v-else :key="'inside_new_'+index+k+l" :class="['text-white', '']" />
                          </template>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
                <div v-else class="row px-2 m-0">
                  <div
                    v-for="(odd, j) in main.odds"
                    :key="'oddColums_'+j"
                    :class="['col-12 col-md-4 col-style', 'click-bet', 'text-white', hasSelected(odd.type)?'bet-selected':'']"
                    @click="()=>odd.odds<=0?{}:$emit('selectBet', { gameId: event.id, odd: odd, market: main.name, event: `${event.home_team} x ${event.away_team}`, validate: event.datetime, live: live })"
                  >
                    <p class="pt-2 ps-3 mb-2">
                      {{ odd.name }} <span class="text-bet fut-odds-success ms-1">{{ odd.odds ? odd.odds : '-' }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'
import OddsOverUnder from '@/components/default/molecules/OddsOverUnder.vue'
import OddsOverExactUnder from '@/components/default/molecules/OddsOverExactUnder.vue'
import OddsBasicTable from '@/components/default/molecules/OddsBasicTable.vue'
import OddsFlexRow from '@/components/default/molecules/OddsFlexRow.vue'
import OddsFlexTable from '@/components/default/molecules/OddsFlexTable.vue'
import OddsGenericTable from '@/components/default/molecules/OddsGenericTable.vue'
import OddsGenericCols from '@/components/default/molecules/OddsGenericCols.vue'
import OddsGenericList from '@/components/default/molecules/OddsGenericList.vue'
import OddsGenericFlexTable from '@/components/default/molecules/OddsGenericFlexTable.vue'
import OddsGroupGoalsTeamTotal from '@/components/default/molecules/OddsGroupGoalsTeamTotal.vue'
import utils from '@/utils/utils'

export default {
  components: {
    FbFutButton,
    OddsOverUnder,
    OddsOverExactUnder,
    OddsBasicTable,
    OddsFlexRow,
    OddsGenericFlexTable,
    OddsFlexTable,
    OddsGroupGoalsTeamTotal,
    OddsGenericTable,
    OddsGenericList,
    OddsGenericCols
  },
  props: {
    live: {
      type: Boolean,
      default: false
    },
    reducedNamingStyle: {
      type: Boolean,
      default: false
    },
    font: {
      type: String,
      default: ''
    },
    tickets: {
      type: Array,
      default: () => []
    },
    event: {
      type: Object,
      default: () => ({})
    },
    filter: {
      type: Boolean,
      default: false
    },
    layout: {
      type: String,
      default: 'default'
    }
  },
  data () {
    return {
      search: '',
      bets: []
    }
  },
  methods: {
    oddsSum (odds) {
      let total = 0
      // return 0
      if (!odds) {
        return total
      }
      if (Array.isArray(odds)) {
        return odds.reduce((accumulator, object) => {
          return accumulator + +object.odds
        }, 0)
      }
      if (typeof odds === 'object' && !Array.isArray(odds) && odds !== null) {
        for (const key in odds) {
          if (Object.hasOwnProperty.call(odds, key)) {
            total = total + +odds[key].odds
          }
        }
      }
      return total
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
    getScoreOdds (odds) {
      if (odds && odds[0] && Array.isArray(odds[0].odds)) {
        const formattedOdds = []
        let condition = true
        let count = 0
        while (condition) {
          const oddsGroup = []
          let keep = true
          let keep1 = true
          let keep2 = true
          if (odds[0] && odds[0].odds && odds[0].odds[count]) {
            oddsGroup.push({ odds: odds[0].odds[count] })
          } else {
            oddsGroup.push({ odds: null })
            keep = false
          }
          if (odds[1] && odds[1].odds && odds[1].odds[count]) {
            oddsGroup.push({ odds: odds[1].odds[count] })
          } else {
            oddsGroup.push({ odds: null })
            keep1 = false
          }
          if (odds[2] && odds[2].odds && odds[2].odds[count]) {
            oddsGroup.push({ odds: odds[2].odds[count] })
          } else {
            oddsGroup.push({ odds: null })
            keep2 = false
          }
          formattedOdds.push(oddsGroup)
          count = count + 1
          condition = (keep || keep1 || keep2)
        }
        return formattedOdds
      } else {
        return []
      }
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
@import "@/assets/layout/variables";
@import "@/assets/layout/breakpoints";
.nav-fb-filter{
  background-color: var(--fut-background-black);
  // padding: 15px 10px;
  @include md{
    // padding-bottom: 4px;
    background-color: var(--fut-background);
  }
  .nav-tabs{
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    @include md{
      flex-wrap: wrap;
    }
  }
  .nav-link{
    font-size: 11px;
    text-transform: uppercase;
    color: white;
    border: none;
    background-color: var(--fut-background-darker);
    margin-right: 5px;
    border-radius: 5px;
    padding: 12px;
    font-size: 15px;
    white-space: nowrap;
    @include md{
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 0px;
      margin-right: 1px;
    }
  }
  .nav-link:hover{
    background: linear-gradient(90deg, var(--fut-primary-black) 0%, var(--fut-primary) 100%);
    border-radius: 0;
  }
  .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link{
    background: linear-gradient(90deg, var(--fut-primary-black) 0%, var(--fut-primary) 100%);
    border: none;
    color: black;
    font-weight: 400;
    border-radius: 5px;
    padding: 12px;
    font-size: 15px;
    @include md{
      padding: 4px 8px;
      font-size: 11px;
      border-radius: 0;
      color: black;
    }
  }
  .nav-tabs{
    border: none;
  }
}

.bg-table-black {
  background: $black !important;
}
.table {
  th,
  td {
    padding: 5px;
    text-align: center;
    border-bottom: 3px solid var(--fut-background-darker) !important;
    border-right: 3px solid var(--fut-background-darker);
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
.bet-selected{
  background: var(--fut-primary-lightest) !important;
  color: var(--fut-background-darker) !important;
  font-weight: 600 !important;
  *, .text-bet{
    color: var(--fut-background-darker) !important;
    font-weight: 600 !important;
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
.text-bet{
  color: #ffdf1b;
}
.td-guide{
  background: var(--fut-background-darker) !important;
  font-weight: 700;
}
.tab-content{
  @include md{
    max-height: calc(100vh - 235px);
    overflow: auto;
  }
}
</style>
