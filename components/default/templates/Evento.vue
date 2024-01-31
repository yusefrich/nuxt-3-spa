<template>
  <div class="container-fluid mx-0">
    <div class="row mx-0">
      <div class="col-lg-12">
        <div class="row m-0">
          <div
            :class="{
              'smaller-spacing-field': getInplaySingleEvent && !getInplaySingleEvent.livescore_id && live,
              'spacing-field': getInplaySingleEvent && getInplaySingleEvent.livescore_id && live,
              'col-md-9': live,
              'w-100': !live
            }"
          >
            <template v-if="live">
              <heading-title
                v-if="getInplaySingleEvent"
                :key="getInplaySingleEvent ? +getInplaySingleEvent.time + totalScore(getInplaySingleEvent) : '-'"
                :live="live"
                :current-event="getInplaySingleEvent"
              />
            </template>
            <heading-title
              v-else
              :live="live"
              :current-event="getPreMatchSingleEvent"
            />
            <game-detail-list
              :live="live"
              :layout="getCurrentLayoutStyle"
              :tickets="getPreCashInTickets"
              :event="live ? getInplaySingleEvent : getPreMatchSingleEvent"
              @selectBet="ticket => toggleTicket(ticket)"
            />
          </div>

          <!-- <div
            v-if="live"
            class="col-soccer-field transition"
            :class="{'high': currentScroll > 40}"
          >
            <inplay-heading-title
              :current-event="getInplaySingleEvent"
              class="d-none d-md-block"
            />
            <fut-inplay-field
              v-if="getInplaySingleEvent && getInplaySingleEvent.livescore_id && getStatscoreConfig" :id="getInplaySingleEvent.livescore_id"
              :statscore-config="getStatscoreConfig"
            />
            <div v-else class="mt-3 field-default">
              <img src="/img/field.png" class="img-fluid img-loading-field" alt="Field loading">
              <h4>{{ $t('i18n_aguardando_jogo') }}</h4>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'

import { useLayoutStore } from '@/stores/layout'
import { useTicketsPreCashInStore } from '@/stores/tickets-pre-cash-in'
import { usePreMatchSingleEvent } from '@/stores/pre-match-single-event'

import GameDetailList from '@/components/default/organisms/GameDetailList'
import HeadingTitle from '@/components/default/molecules/HeadingTitle'
// import InplayHeadingTitle from '@/components/default/molecules/InplayHeadingTitle'
// import FutInplayField from '@/components/default/atoms/FutInplayField'

import global from '@/mixins.js/global.js'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'

export default {
  name: 'Evento',
  components: {
    GameDetailList,
    HeadingTitle,
    // FutInplayField,
    // InplayHeadingTitle
  },
  mixins: [global, sportradarTagManager],
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
      type: Boolean
    }
  },
  data () {
    return {
      interval: null,
      redirectTimer: null
    }
  },
  computed: {
    ...mapState(useLayoutStore, {
      getStatscoreConfig: 'getStatscoreConfig',
      getCurrentLayoutStyle: 'getCurrentLayoutStyle'
    }),
    ...mapState(useTicketsPreCashInStore, {
      getPreCashInTickets: 'getPreCashInTickets'
    }),
    ...mapState(usePreMatchSingleEvent, {
      getPreMatchSingleEvent: 'getPreMatchSingleEvent'
    }),
    // ...mapGetters({
    //   getInplaySingleEvent: 'inplay-single-event/getInplaySingleEvent',
    // }),
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

      if (!this.getPreMatchSingleEvent.datetime) {
        return
      }

      const ms = new Date(this.getPreMatchSingleEvent.datetime).getTime() - new Date().getTime()

      if (ms > 604800016) {
        return
      }

      if (new Date() > new Date(this.getPreMatchSingleEvent.datetime)) {
        // this.$router.push(this.localePath(`/sport/${this.$route.params.sportId}/aovivo/${this.getPreMatchSingleEvent.id}`))
        this.$router.push(this.localePath('/'))
      } else if (!this.mobileSafari) {
        this.redirectTimer = setTimeout(() => {
          // this.$router.push(this.localePath(`/sport/${this.$route.params.sportId}/aovivo/${this.getPreMatchSingleEvent.id}`))
          this.$router.push(this.localePath('/'))
        }, ms)
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
    clearTimeout(this.redirectTimer)
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

<style scoped lang="scss">
@import "@/assets/layout/breakpoints";
.img-loading-field{
  filter: grayscale(1);
  opacity: .4;
  border-radius: 10px;
}
.field-default{
  position: relative;
  h4{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: 700;
    @include _md{
      font-size: 14px;
    }
  }
}
.col-soccer-field{
  position: fixed;
  top: 69px;
  right: 0;
  flex: 1;
  width: 100%;
  padding: 0px 33px;
  @include md{
    padding: 0px;
    top: 121px;
    flex: 0 0 auto;
    width: 23%;
  }
}
.high{
  padding: 0px;
  @include _md {
    width: 50%;
  }
  @include md {
    top: 100px;
  }
}
.smaller-spacing-field{
  margin-top: 160px;
  @include md {
    margin-top: 0px;
  }
}
.spacing-field{
  margin-top: 400px;
  @include md {
    margin-top: 0px;
  }
}
</style>
