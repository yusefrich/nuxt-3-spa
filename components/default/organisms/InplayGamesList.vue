<template>
  <div>
    <div v-if="breadcrumb" class="d-flex">
      <fut-button to="/" class="btn text-white mb-2 me-2 fut-color-dynamic">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </fut-button>
      <h3 class="text-primary mb-0 mt-1">
        {{ $t('i18n_ao_vivo') }}
      </h3>
    </div>
    <div v-if="league" class="heading-league">
      <fut-button to="/" class="btn text-white px-0 fut-color-dynamic">
        <font-awesome-icon class="text-primary icon me-2" :icon="['fas', 'arrow-left']" />{{ $t('i18n_todos_os_jogos') }}
      </fut-button>
    </div>
    <nav v-if="nav" class="nav-filter">
      <div v-if="!searching" id="nav-tab" class="nav nav-tabs mt-3" role="tablist">
        <div class="ms-auto">
          <fut-input
            v-model="filters.team"
            :type="'search'"
            :dark="true"
            :rounded="true"
            class="search-input d-none d-md-inline-block"
            :placeholder="$t('i18n_buscar_jogo')"
          />
          <fut-button class="search-icon d-md-none" @click="searching = true">
            <font-awesome-icon class="text-primary icon fut-color-dynamic" :icon="['fas', 'search']" />
          </fut-button>
        </div>
      </div>
      <fut-input
        v-if="searching"
        v-model="filters.team"
        :dark="true"
        :rounded="true"
        class="search-input"
        :placeholder="$t('i18n_buscar_jogo')"
      />
      <fut-button v-if="searching" class="search-icon close-search" @click="searching = false">
        <font-awesome-icon class="text-primary icon" :icon="['fas', 'times']" />
      </fut-button>
    </nav>
    <div id="nav-tabContent" class="tab-content" />
    <div v-if="!loading" class="table-responsive table-height">
      <table id="events-table" class="table">
        <client-only>
          <template v-for="(betGroup) in inplayGames" :key="betGroup.name">
            <tbody class="header">
              <tr>
                <td class="text-white " colspan="5">
                  {{ betGroup.name }}
                </td>
                <td class="text-white" colspan="3">
                  {{ betGroup.games && betGroup.games[0] && betGroup.games[0].odds && betGroup.games[0].odds[0] ? betGroup.games[0].odds[0].name : '-' }}
                </td>
              </tr>
            </tbody>
            <template v-for="game in betGroup.games" :key="game.id">
              <tbody :class="['stripped', 'header', 'select']">
                <tr class="table-values">
                  <td class="text-white text-start fut-color-dynamic" colspan="5">
                    <div class="hover-link" @click="navigate(`/sport/${sport}/aovivo/${game.id}`)">
                      <p class="mb-0 d-flex justify-content-between">
                        <span>
                          {{ game.home_team }}
                          <!-- <span v-if="game.home_goal" class="text-goal flash">GOL!!!</span> -->
                          <span v-if="(currentTime() - game.home_goal_real_time < 2000) && game.home_goal && (+sport === 6046 || +sport === 35709)" class="text-goal goal-flash">GOL!!!</span>
                          <!-- <span v-if="game.home_goal && (+sport !== 6046 && +sport !== 35709)" class="text-goal flash">
                            {{ $t('i18n_ponto') }} !!!
                          </span> -->
                        </span>
                        <span class="d-flex">
                          <template v-if="game.result">
                            <span v-for="(result, index) in game.result" :key="'home_home_results_' + index" class="result-list">{{ result.home }}</span>
                          </template>
                        </span>
                      </p>
                      <p class="mb-0 d-flex justify-content-between">
                        <span>
                          {{ game.away_team }}
                          <!-- <span v-if="game.away_goal" class="text-goal flash">GOL!!!</span> -->
                          <span v-if="(currentTime() - game.away_goal_real_time < 2000) && game.away_goal && (+sport === 6046 || +sport === 35709)" class="text-goal goal-flash-2">GOL!!!</span>
                          <!-- <span v-if="game.away_goal && (+sport !== 6046 && +sport !== 35709)" class="text-goal flash">
                            {{ $t('i18n_ponto') }} !!!
                          </span> -->
                        </span>
                        <span class="d-flex">
                          <template v-if="game.result">
                            <span v-for="(result, index) in game.result" :key="'home_away_results_' + index" class="result-list">{{ result.away }}</span>
                          </template>
                        </span>
                      </p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <p class="mb-0">
                        <small>tempo: {{ game.time }}</small>
                      </p>
                      <fut-button class="btn p-0 ms-2 btn-odds-link fut-color-dynamic" :to="`/sport/${sport}/aovivo/${game.id}`">
                        {{ $t('i18n_ver_mais') }} >
                      </fut-button>
                    </div>
                  </td>
                  <template v-for="(oddsMarket, j) in game.odds" :key="'odd_key__' + j">
                    <td
                      v-for="(odd, k) in oddsMarket.odds"
                      :key="'odd_key_' + j + '_' + k"
                      style="vertical-align: middle;"
                      :class="['position-relative', 'transition','text-white fut-color-dynamic', hasSelected(odd.type)?'bet-selected':'', 'click-bet',!odd.odds || odd.odds<=0 || odd.odds==1?'click-bet-disabled':'', getLevarage(odd.leverage)]"
                      colspan="1"
                      @click="()=>odd.odds<=0||odd.odds==1?{}:$emit('selectBet', { gameId: game.id, odd: odd, market: oddsMarket.name, event: `${game.home_team} x ${game.away_team}`, validate: game.datetime, live: live })"
                    >
                      <span v-if="odd.leverage && odd.leverage === 'up'" class="leverage-up-arrow" style="vertical-align: middle">
                        <font-awesome-icon class="text-white fut-color-dynamic flash" style="font-size: 17px" :icon="['fas', 'caret-up']" />
                      </span>
                      <span v-if="odd.leverage && odd.leverage === 'down'" class="leverage-down-arrow" style="vertical-align: middle">
                        <font-awesome-icon class="text-white fut-color-dynamic flash-2" style="font-size: 17px" :icon="['fas', 'caret-down']" />
                      </span>
                      <span>
                        {{ odd.odds && odd.odds != 0 && odd.odds != 1 ? odd.odds : '-' }}
                      </span>
                    </td>
                  </template>
                  <td v-if="!game.odds || game.odds.length === 0" colspan="8" />
                </tr>
              </tbody>
            </template>
          </template>
        </client-only>
      </table>
      <div v-if="adding" class="w-100 p-4">
        <spinner />
      </div>
    </div>
    <div v-else>
      <min-loader :condition="true" />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import MinLoader from '@/components/default/atoms/MinLoader.vue'
import Spinner from '@/components/default/atoms/Spinner.vue'
import FutButton from '@/components/default/atoms/FutButton.vue'
import FutInput from '@/components/default/atoms/FutInput.vue'

export default {
  name: 'InplayGamesList',
  components: {
    MinLoader,
    Spinner,
    FutButton,
    FutInput
  },
  props: {
    inplayGames: {
      type: Array,
      default: () => ([])
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
  watch: {
    'filters.team' (newVal) {
      this.$emit('searchTerm', newVal)
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
    navigate (link) {
      this.$router.push(this.localePath(link))
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

.btn-odds-link{
  font-size: 13px;
  margin-top: 1px;
  font-weight: 700;
  color: #fff;
}
.oddsLink{
  width: 100%;
  height: 100%;
}
.bg-table-black {
  background: $black !important;
}
.table {
  th,
  td {
    text-align: center;
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
.stripped:nth-child(even) {
  td {
    background: var(--fut-background-lightest);
  }
}
.stripped:nth-child(odd) {
  td {
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
}
.bl-1{
  border-left: 1px solid $white !important;
}
.smaller{
  font-size: 14px;
}
/* .heading-mobile{
  position: sticky;
  position: -webkit-sticky;
  top: 0;
} */
.header{
  td{
    border-top: none !important;
    border-bottom: none !important;
    border-right: 3px solid var(--fut-background-darker);
    background: var(--fut-background-games-list);
  }
}
.select{
  td{
    padding: 10px;
    @include md{
      padding: 10px;
    }
  }
}
.table-values{
  font-weight: bold;
  font-size: 13px;
  @include md{
    font-size: 15px;
  }
}
.hover-link{
  cursor: pointer;
  span{
    opacity: .6;
  }
}
.hover-link:hover{
  cursor: pointer;
  span{
    opacity: 1;
  }
}
.nav-filter{
  position: sticky;
  top: 0px;
  background: var(--fut-background-darker);
  z-index: 1;
}
.close-search{
  position: absolute;
  right: 0;
  top: 0;
}
/* .table-height{
  height: 70vh;
} */
.team-flag{
  width: 23px;
  height: 23px;
  object-fit: contain;
  margin-left: 10px;
}
.result-list{
  width: 15px;
  margin-right: 5px;
}
.background-lev-danger:before{
  // background: #ff595fb4 !important;
  content: "";
  width: 0;
  height: 0;
  border-bottom: 20px solid #c62828;
  border-left: 20px solid transparent;
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
  border-top: 20px solid #558b2f;
  border-left: 20px solid transparent;
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
  left: calc(50% - 25px);
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
  left: calc(50% - 25px);
  transform: translate(-50%);
  width: 10px;
  height: 10px;
  // border-radius: 50%;
  // background: greenyellow;
  display: inline-block;
}

@media (max-width: 425px) {
  .leverage-down-arrow,
  .leverage-up-arrow {
    display: none;
  }
}
</style>
