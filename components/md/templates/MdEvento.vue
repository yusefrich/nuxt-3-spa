<template>
  <div :class="{ 'evento-wrapper': live }">
    <div
      class="evento"
      :class="[
        { 'live-event': live },
        live && hasGameField ? 'w-75' : 'w-100'
      ]"
    >
      <div class="col-markets-field">
        <div
          class="d-md-none league-mobile"
          :class="{ 'blue-bg': live }"
        >
          <button
            class="back-btn"
            @click="$router.go(-1)"
          >
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
          </button>
          <p
            v-if="getPreMatchSingleEvent && getPreMatchSingleEvent.league"
            class="mb-0"
          >
            <small>{{ getPreMatchSingleEvent.league }}</small>
          </p>
        </div>
        <template v-if="live">
          <div
            v-if="getInplaySingleEvent"
            class="live-heading transition"
            :class="{ 'live-heading-mb': currentScroll < 1 }"
          >
            <p class="text-center mb-0 d-none d-md-block league">
              {{ getInplaySingleEvent.league_name }}
            </p>
            <p class="text-center mb-0 time">
              <small> <font-awesome-icon class="icon me-0" :icon="['fas', 'clock']" /> {{ getInplaySingleEvent.time }}</small>
            </p>
            <div class="scoreboard">
              <p class="mb-0 me-2">
                {{ getInplaySingleEvent.home_team }}
              </p>
              <div
                v-for="(result, idx) in getInplaySingleEvent.result"
                :key="idx"
              >
                <p v-if="idx === 0 && idx+1 !== getInplaySingleEvent.result.length" class="mb-0 text-white">
                  <small>Sets</small>
                </p>
                <p :key="'home_result' + +result.home" class="mb-0 mx-1">
                  {{ result.home }}:{{ result.away }}
                </p>
              </div>
              <p class="mb-0 ms-2">
                {{ getInplaySingleEvent.away_team }}
              </p>
            </div>
          </div>
        </template>
        <md-heading-title
          v-else
          :live="live"
          :current-event="getPreMatchSingleEvent"
        />
        <md-game-detail-list
          :live="live"
          :tickets="getPreCashInTickets"
          :event="live ? getInplaySingleEvent : getPreMatchSingleEvent"
          @selectBet="ticket => toggleTicket(ticket)"
        />
      </div>
    </div>

    <!-- <div
      v-if="live && hasGameField"
      class="col-soccer-field transition"
      :class="{ 'high': currentScroll > 1 }"
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
    </div> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'

import { useLayoutStore } from '@/stores/layout'
import { useTicketsPreCashInStore } from '@/stores/tickets-pre-cash-in'
import { usePreMatchSingleEvent } from '@/stores/pre-match-single-event'

import MdHeadingTitle from '@/components/md/molecules/MdHeadingTitle'
import MdGameDetailList from '@/components/md/organisms/MdGameDetailList'
// import FutInplayField from '@/components/default/atoms/FutInplayField'

import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'

export default {
  name: 'MdEvento',
  components: {
    MdHeadingTitle,
    MdGameDetailList,
    // FutInplayField
  },
  mixins: [sportradarTagManager],
  props: {
    slug: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    live: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      interval: null,
      currentScroll: 0,
      redirectTimer: null
    }
  },
  computed: {
    ...mapState(useLayoutStore, {
      getStatscoreConfig: 'getStatscoreConfig'
    }),
    ...mapState(useTicketsPreCashInStore, {
      getPreCashInTickets: 'getPreCashInTickets'
    }),
    ...mapState(usePreMatchSingleEvent, {
      getPreMatchSingleEvent: 'getPreMatchSingleEvent'
    }),
    // ...mapGetters({
    //   getInplaySingleEvent: 'inplay-single-event/getInplaySingleEvent'
    // }),
    hasGameField () {
      if (this.getInplaySingleEvent && this.getInplaySingleEvent.livescore_id && this.getStatscoreConfig) {
        return true
      }

      return false
    },
    mobileSafari () {
      const browser = navigator.userAgent
      const safari = browser.includes('Safari') && !browser.includes('Chrome')
      const mobile = window.innerWidth < 720

      return safari && mobile
    }
  },
  async mounted () {
    if (this.live) {
      // this.fetchInplaySingleEvent(this.id)

      // if (
      //   !process.env.WS_HOST ||
      //   !process.env.WS_KEY ||
      //   !process.env.WS_ACTIVE ||
      //   (process.env.WS_ACTIVE && process.env.WS_ACTIVE !== 'true')
      // ) {
      //   clearInterval(this.interval)

      //   this.interval = setInterval(() => {
      //     this.updateInplaySingleEvent(this.id)
      //   }, 5000)
      // }

      // document.querySelector('.scrollable-content').addEventListener('scroll', this.onScroll)
    } else {
      await this.fetchPreMatchSingleEvent(this.slug)

      if (this.getPreMatchSingleEvent) {
        this.srtmRetargeting(
          this.getPreMatchSingleEvent.id,
          '',
          this.getPreMatchSingleEvent.home_team,
          this.getPreMatchSingleEvent.home_team,
          '',
          this.getPreMatchSingleEvent.away_team,
          this.getPreMatchSingleEvent.away_team,
          '',
          this.getPreMatchSingleEvent.datetime,
          'not_started',
          this.getPreMatchSingleEvent.league,
          this.getPreMatchSingleEvent.sport_name,
          this.getOddsFullTimeResult(
            this.getPreMatchSingleEvent.all_odds
              ? this.getPreMatchSingleEvent.all_odds[0]
              : null
          ).home,
          this.getOddsFullTimeResult(
            this.getPreMatchSingleEvent.all_odds
              ? this.getPreMatchSingleEvent.all_odds[0]
              : null
          ).draw,
          this.getOddsFullTimeResult(
            this.getPreMatchSingleEvent.all_odds
              ? this.getPreMatchSingleEvent.all_odds[0]
              : null
          ).away
        )
      }

      if (!this.getPreMatchSingleEvent.datetime) return

      const ms = new Date(this.getPreMatchSingleEvent.datetime).getTime() - new Date().getTime()

      if (ms > 604800016) return

      if (new Date() > new Date(this.getPreMatchSingleEvent.datetime)) {
        // this.$router.push(this.localePath(`/sport/${this.$route.params.sportId}/aovivo/${this.getPreMatchSingleEvent.id}`))
        this.$router.push(this.localePath('/'))
      } else if (!this.mobileSafari) {
        this.redirectTimer = setTimeout(() => {
        //   this.$router.push(this.localePath(`/sport/${this.$route.params.sportId}/aovivo/${this.getPreMatchSingleEvent.id}`))
        this.$router.push(this.localePath('/'))
        }, ms)
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
    clearTimeout(this.redirectTimer)

    document.querySelector('.scrollable-content').removeEventListener('scroll', this.onScroll)
  },
  methods: {
    ...mapActions(useTicketsPreCashInStore, {
      toggleTicket: 'toggleTicket'
    }),
    ...mapActions(usePreMatchSingleEvent, {
      fetchPreMatchSingleEvent: 'fetchPreMatchSingleEvent'
    }),
    // ...mapActions({
    //   updateInplaySingleEvent: 'inplay-single-event/updateInplaySingleEvent',
    //   fetchInplaySingleEvent: 'inplay-single-event/fetchInplaySingleEvent'
    // }),
    totalScore (currentE) {
      return currentE.result.reduce((total, current) => +total + +current.away + +current.home, 0)
    },
    onScroll (e) {
      this.currentScroll = e.target.scrollTop
    },
    getOddsFullTimeResult (odds) {
      const returnOfodds = {
        home: '0.00',
        draw: '0.00',
        away: '0.00'
      }

      if (!odds || !odds.odds || odds.odds.length === 0) {
        return returnOfodds
      }

      odds.odds.forEach((e) => {
        if (e && e.name === 'Resultado Final') {
          returnOfodds.home = e.odds[0] ? e.odds[0].odds : '0.000'
          returnOfodds.draw = e.odds[1] ? e.odds[1].odds : '0.000'
          returnOfodds.away = e.odds[2] ? e.odds[2].odds : '0.000'
        }
      })

      return returnOfodds
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

.evento-wrapper {
  position: relative;
  display: flex;
  width: calc(100% + 24px);
  margin-left: -12px;
}
.evento {
  position: relative;
  display: flex;
}
.live-event {
  background-image:
    linear-gradient(transparent, var(--md-bg-color) 6%),
    url("/md/inplay-bg-img.png")
  ;
  background-size: contain;
  background-repeat: no-repeat;
  padding: 0 12px;
}

.league-mobile {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  color: var(--md-font-color);
  margin-top: -12px;

  .back-btn {
    color: var(--md-font-color);
    position: absolute;
    left: 10px;
    border: none;
    background: transparent;
    height: 100%;
    padding: 0 20px;
  }
}

.col-markets-field {
  width: 100%;
  position: relative;
}
.col-soccer-field {
  position: fixed;
  top: 68px;
  right: 0;
  flex: 1;
  width: 100%;
  padding: 115px 33px 0 33px;
  @include md{
    padding: 0px 12px 0 20px;
    top: 84px;
    flex: 0 0 auto;
    width: 23%;
  }

  .field-default{
    position: relative;
    h4{
      position: absolute;
      top: 63%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-weight: 700;
      @include _md{
        font-size: 14px;
      }
    }
  }
}
.high {
  padding-top: 0;
  @include _md {
    width: 50%;
  }
}

.blue-bg {
  background: var(--md-highlight);
  color: #fff;
  width: 100vw;
  margin-left: -12px;

  .back-btn {
    color: #fff;
  }
}
.live-heading {
  margin: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  width: 60%;
  background: var(--md-highlight);
  border-radius: 6px;
  color: var(--md-font-color);
  .league {
    padding-top: 3px;
    font-size: 12px;
  }
  .time {
    font-size: 11px;
  }
  .scoreboard {
    display: flex;
    justify-content: center;
    font-size: 15px;
    padding-bottom: 8px;
  }
}

@media (max-width: 425px) {
  .evento-wrapper {
    margin-left: 0 !important;
  }
  .evento {
    flex-direction: column;
  }
  .live-event {
    background-size: 100%, 100% 300px;
    background-repeat: no-repeat;
    background-position: top 33px center;
    width: 100vw !important;
    margin-left: -12px;
    padding: 0 12px;
  }
  .col-markets-field {
    width: 100%;
  }
  .live-heading {
    width: calc(100% - 24px);
    margin: 16px auto;
    .time {
      padding-top: 3px;
    }
  }
  .live-heading-mb {
    margin-bottom: 335px;
  }
}
</style>
