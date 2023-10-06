<template>
  <div class="container">
    <div class="header">
      <button class="return-btn transition" @click="$router.go(-1)">
        <font-awesome-icon class="icon" :icon="['fas', 'chevron-left']" />
      </button>
      <div class="links">
        <NuxtLink v-if="!isMobile" :to="localePath(`/sport/${currentSport}`)" class="link">
          {{ sports[currentSport] }}
        </NuxtLink>
        <span v-if="!isMobile" class="line" />
        <!-- Colocar país quando o back retornar o pais da liga -->
        <NuxtLink
          v-if="live && getInplaySingleEvent && !isMobile"
          :to="localePath(`/sport/${currentSport}/league/${getInplaySingleEvent.league_id}`)"
          class="link"
        >
          {{ getInplaySingleEvent.league_name }}
        </NuxtLink>
        <!-- Falta retornar o league_id na rota que traz o preMatchSingleEvent -->
        <NuxtLink
          v-else-if="!live && getPreMatchSingleEvent && !isMobile"
          :to="localePath(
            getPreMatchSingleEvent.league_id
              ? `/sport/${currentSport}/league/${getPreMatchSingleEvent.league_id}`
              : '/sports'
          )"
          class="link"
        >
          {{ getPreMatchSingleEvent.league }}
        </NuxtLink>
        <span v-if="!isMobile" class="line" />
        <p v-if="live && getInplaySingleEvent" class="link teams">
          {{ getInplaySingleEvent.home_team }} - {{ getInplaySingleEvent.away_team }}
        </p>
        <p v-else-if="!live && getPreMatchSingleEvent" class="link teams">
          {{ getPreMatchSingleEvent.home_team }} - {{ getPreMatchSingleEvent.away_team }}
        </p>
      </div>
    </div>

    <div
      :class="[
        isMobile || (getSkOpenTicket && width <= 1440) ? 'body-flex' : 'body',
        live && hasGameField && getInplaySingleEvent ? 'with-field' : 'without-field'
      ]"
    >
      <div v-if="live && hasGameField && getInplaySingleEvent" class="mini-field">
        <div
          class="col-soccer-field transition"
        >
          <div class="soccer-screen">
            <fut-inplay-field
              v-if="hasGameField"
              :id="getInplaySingleEvent.livescore_id"
              :statscore-config="getStatscoreConfig"
            />
            <div v-else class="field-default">
              <img src="/img/field.png" class="img-fluid img-loading-field" alt="Field loading">
              <h4>{{ $t('i18n_aguardando_jogo') }}</h4>
            </div>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <div v-if="!isMobile" class="statistics">
          <div class="stats-wrapper">
            <div class="time">
              <span v-if="live && getInplaySingleEvent">
                {{ getInplaySingleEvent.time }}<span class="flashing">'</span>
              </span>
              <span v-else-if="!live && getPreMatchSingleEvent">
                {{ getPreMatchSingleEvent.datetime }}
              </span>
            </div>
            <div class="score-icon">
              <font-awesome-icon class="icon" :icon="['fas', 'futbol']" />
            </div>
            <div class="home-team">
              <span v-if="live && getInplaySingleEvent">
                {{ getInplaySingleEvent.home_team }}
              </span>
              <span v-else-if="!live && getPreMatchSingleEvent">
                {{ getPreMatchSingleEvent.home_team }}
              </span>
            </div>
            <div class="away-team">
              <span v-if="live && getInplaySingleEvent">
                {{ getInplaySingleEvent.away_team }}
              </span>
              <span v-else-if="!live && getPreMatchSingleEvent">
                {{ getPreMatchSingleEvent.away_team }}
              </span>
            </div>
            <div class="home-result">
              <span v-if="live && getInplaySingleEvent">
                {{ getInplaySingleEvent.home_result }}
              </span>
              <span v-else-if="!live && getPreMatchSingleEvent">
                -
              </span>
            </div>
            <div class="away-result">
              <span v-if="live && getInplaySingleEvent">
                {{ getInplaySingleEvent.away_result }}
              </span>
              <span v-else-if="!live && getPreMatchSingleEvent">
                -
              </span>
            </div>
          </div>
        </div>

        <div
          v-if="(live && getInplaySingleEvent) || (!live && getPreMatchSingleEvent)"
          class="markets"
        >
          <div>
            <sk-components-select
              :components-list="marketTypesList"
              :selected-component="selectedType"
              @changeComponent="changeMarketType($event)"
            />
          </div>
        </div>

        <div>
          <sk-input
            v-model="search"
            name="search-market"
            :placeholder="$t('i18n_procurar')"
            start-icon
            class="sk-search-input mt-3"
          >
            <template #placeholder-icon>
              <font-awesome-icon class="search-icon" :icon="['fas', 'search']" />
            </template>
          </sk-input>
        </div>

        <template v-if="marketsPerType[selectedType]">
          <div
            v-for="(market, idx) in filteredMarkets"
            :key="idx"
            class="text-white mt-3"
          >
            <div v-if="market && hasValidOdds(market.odds)" :key="'main_'+idx">
              <sk-odds-generic-table
                v-if="market.slug === 'generic_table'"
                :key="oddsSum(market.odds)"
                :tickets="getPreCashInTickets"
                :live="live"
                :raw-odds="market"
                :event="live ? getInplaySingleEvent : getPreMatchSingleEvent"
                :comp-id="`generic_table_${idx}`"
                @selectBet="toggleTicket($event), changeSkOpenTicket(true)"
              />
              <sk-odds-generic-cols
                v-if="market.slug === 'generic_cols'"
                :key="oddsSum(market.odds)"
                :tickets="getPreCashInTickets"
                :live="live"
                :raw-odds="market"
                :event="live ? getInplaySingleEvent : getPreMatchSingleEvent"
                :comp-id="`generic_cols_${idx}`"
                @selectBet="toggleTicket($event), changeSkOpenTicket(true)"
              />
              <sk-odds-generic-list
                v-if="market.slug === 'generic_list'"
                :key="oddsSum(market.odds)"
                :tickets="getPreCashInTickets"
                :live="live"
                :raw-odds="market"
                :event="live ? getInplaySingleEvent : getPreMatchSingleEvent"
                :comp-id="`generic_list_${idx}`"
                @selectBet="ticket=>toggleTicket(ticket)"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FutInplayField from '@/components/default/atoms/FutInplayField.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'SkEvento',
  components: {
    FutInplayField
  },
  mixins: [windowWidth],
  props: {
    slug: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    currentSport: {
      type: String,
      default: '1'
    },
    live: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      interval: null,
      selectedType: 'main',
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      getStatscoreConfig: 'layout/getStatscoreConfig',
      getSkOpenTicket: 'tickets-pre-cash-in/getSkOpenTicket',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getInplaySingleEvent: 'inplay-single-event/getInplaySingleEvent',
      getPreMatchSingleEvent: 'pre-match-single-event/getPreMatchSingleEvent'
    }),
    hasGameField () {
      if (this.getInplaySingleEvent && this.getInplaySingleEvent.livescore_id && this.getStatscoreConfig) {
        return true
      }

      return false
    },
    sports () {
      return {
        6046: this.$t('i18n_futebol'),
        35709: this.$t('i18n_handebol'),
        48242: this.$t('i18n_basquete'),
        54094: this.$t('i18n_tenis'),
        131506: this.$t('i18n_futebol_americano'),
        154830: this.$t('i18n_volei'),
        154914: this.$t('i18n_basebol'),
        154919: this.$t('i18n_boxe'),
        265917: this.$t('i18n_tenis_de_mesa'),
        621569: this.$t('i18n_volei_de_praia'),
        687890: 'E-Games'
      }
    },
    isMobile () {
      return this.width <= 821
    },
    marketTypesList () {
      const marketTypes = {}

      if (this.live && this.getInplaySingleEvent) {
        this.getInplaySingleEvent.all_odds.forEach((item) => {
          marketTypes[item.header] = {
            text: item.label
          }
        })
      }

      if (!this.live && this.getPreMatchSingleEvent) {
        this.getPreMatchSingleEvent.all_odds.forEach((item) => {
          marketTypes[item.header] = {
            text: item.label
          }
        })
      }

      return marketTypes
    },
    marketsPerType () {
      const types = {}

      if (this.live && this.getInplaySingleEvent) {
        this.getInplaySingleEvent.all_odds.forEach((item) => {
          types[item.header] = {
            markets: item.odds
          }
        })
      }

      if (!this.live && this.getPreMatchSingleEvent) {
        this.getPreMatchSingleEvent.all_odds.forEach((item) => {
          types[item.header] = {
            markets: item.odds
          }
        })
      }

      return types
    },
    filteredMarkets () {
      if (!this.marketsPerType[this.selectedType].markets) {
        return []
      }

      if (this.search !== '') {
        return this.marketsPerType[this.selectedType].markets.filter(
          item => item.name.toLowerCase().includes(this.search.toLowerCase())
        )
      }

      return this.marketsPerType[this.selectedType].markets
    }
  },
  created () {
    if (this.live) {
      this.fetchInplaySingleEvent(this.id)

      if (
        !process.env.WS_HOST ||
        !process.env.WS_KEY ||
        !process.env.WS_ACTIVE ||
        (process.env.WS_ACTIVE && process.env.WS_ACTIVE !== 'true')
      ) {
        clearInterval(this.interval)

        this.interval = setInterval(() => {
          this.updateInplaySingleEvent(this.id)
        }, 5000)
      }
    } else {
      this.fetchPreMatchSingleEvent(this.slug)
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    ...mapActions({
      toggleTicket: 'tickets-pre-cash-in/toggleTicket',
      changeSkOpenTicket: 'tickets-pre-cash-in/changeSkOpenTicket',
      fetchInplaySingleEvent: 'inplay-single-event/fetchInplaySingleEvent',
      updateInplaySingleEvent: 'inplay-single-event/updateInplaySingleEvent',
      fetchPreMatchSingleEvent: 'pre-match-single-event/fetchPreMatchSingleEvent'
    }),
    changeMarketType (type) {
      this.selectedType = type
    },
    hasValidOdds (odds) {
      let invalidOddCheck = false

      if (!odds) {
        return false
      }

      odds.forEach((e) => {
        if (e.finished) {
          invalidOddCheck = true
        }
      })

      return !invalidOddCheck
    },
    oddsSum (odds) {
      let total = 0

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
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 34px 3vw 0 3vw !important;

  .header {
    display: flex;

    .return-btn {
      border: none;
      background: var(--fut-background-darkest);
      color: var(--fut-color-dynamic);
      padding: 16px 20px;
      margin-right: 12px;
      display: flex;
      border-radius: .25rem;

      .icon {
        width: 12px;
        height: 12px;
      }

      &:hover {
        background: var(--fut-background-black-2);
      }
    }

    .links {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--fut-background-darkest);
      border-radius: .25rem;

      .link {
        text-decoration: none;
        color: var(--fut-color-dynamic);
        font-weight: 600;
        font-size: .875rem;
        padding: 0 18px;
        margin: 0;

        &.teams {
          color: var(--fut-secondary);
        }
      }
      .line {
        background: var(--fut-background);
        width: 2px;
        height: 2.73em;
        transform: skew(-20deg);
      }
    }
  }

  .with-field {
    grid-template-columns: minmax(0,1fr) 360px;
    grid-template-areas: "content-wrapper widget";
  }

  .without-field {
    grid-template-areas: "content-wrapper";
  }

  .body {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;

  }
  .body-flex {
    display: flex;
    margin-top: 1.5rem;
    flex-direction: column;
  }
  .content-wrapper {
    grid-area: content-wrapper;
    display: flex;
    flex-direction: column;

    .statistics {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-height: 200px;
      padding: 2rem;
      color: var(--fut-color-dynamic);
      font-size: .875rem;
      font-weight: 600;
      z-index: 1;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: var(--fut-background-lightest-2);
        background-image: url(/Sk/intern-soccer-bg.jpg);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        opacity: .3;
        z-index: -1;
      }

      .stats-wrapper {
        box-shadow: 0 4px 6px -1px #0003, 0 2px 4px -1px #0000001f;
        min-width: 250px;
        max-width: calc(100% - 2rem);
        border-radius: .25rem;
        width: auto;
        display: grid;
        grid-template-areas:
          "competitor_title matchScore_title"
          "competitor_home matchScore_home"
          "competitor_away matchScore_away"
        ;
        background: var(--fut-background);
        overflow: hidden;
        grid-template-columns: 1fr 32px;

        .time {
          grid-area: competitor_title / competitor_title / competitor_title / competitor_title;
          background: var(--fut-background-darkest);
          width: 100%;
          height: 100%;
          display: flex;
          padding: .5rem;
          align-items: center;
          .flashing {
            animation: blink 2s infinite linear;
          }
          @keyframes blink {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        }
        .score-icon {
          grid-area: matchScore_title / matchScore_title / matchScore_title / matchScore_title;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: .5rem;
          background: var(--fut-background-darkest);
        }
        .home-team {
          grid-area: competitor_home / competitor_home / competitor_home / competitor_home;
          padding: .5rem;
          border-bottom: 1px solid var(--fut-background-lightest-2);
          display: flex;
          align-items: center;
        }
        .away-team {
          grid-area: competitor_away / competitor_away / competitor_away / competitor_away;
          padding: .5rem;
          display: flex;
          align-items: center;
        }
        .home-result {
          grid-area: matchScore_home;
          padding: .5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--fut-background-lightest-2);
          color: var(--fut-highlight);
        }
        .away-result {
          grid-area: matchScore_away;
          padding: .5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--fut-background-lightest-2);
          color: var(--fut-highlight);
        }
      }
    }

    .markets {
      margin-top: 1rem;
      width: 100%;
    }

    .sk-search-input {
      position: relative;

      .search-icon {
        color: var(--fut-secondary);
      }
    }
  }
  .mini-field {
    grid-area: widget;
    z-index: 1;
  }
}

.field-default{
  position: relative;
  h4{
    position: absolute;
    top: 63%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--fut-color-dynamic);
    font-weight: 700;
  }
}
</style>
