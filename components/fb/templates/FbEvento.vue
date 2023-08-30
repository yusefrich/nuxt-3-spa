<template>
  <div class="px-1 w-100">
    <div v-if="live && getInplaySingleEventLoading || !live && getPreMatchEventLoading" class="spinner-container">
      <spinner />
    </div>
    <fb-heading-title
      :live="live"
      :statscore-config="getStatscoreConfig"
      :event="live ? getInplaySingleEvent : getPreMatchSingleEvent"
      @toggle="filter=!filter"
    />
    <fb-game-detail-list
      v-if="currentSettings"
      :font="currentSettings.font"
      :reduced-naming-style="currentSettings.name_team === 0"
      :live="live"
      :filter="filter"
      :layout="getCurrentLayoutStyle"
      :tickets="getPreCashInTickets"
      :event="live ? getInplaySingleEvent : getPreMatchSingleEvent"
      @invalidMultiple="val => setInvalidMultiple(val)"
      @selectBet="ticket => toggleTicket(ticket)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FbGameDetailList from '@/components/fb/organisms/FbGameDetailList.vue'
import FbHeadingTitle from '@/components/fb/molecules/FbHeadingTitle.vue'
import Spinner from '@/components/default/atoms/Spinner.vue'
import global from '@/mixins.js/global.js'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'

export default {
  name: 'FbEvento',
  components: {
    FbGameDetailList,
    FbHeadingTitle,
    Spinner
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
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      filter: true,
      interval: null,
      redirectTimer: null
    }
  },
  computed: {
    ...mapGetters({
      currentSettings: 'settings/currentSettings',
      getStatscoreConfig: 'layout/getStatscoreConfig',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getPreMatchSingleEvent: 'pre-match-single-event/getPreMatchSingleEvent',
      getInplaySingleEvent: 'inplay-single-event/getInplaySingleEvent',
      getPreMatchEventLoading: 'inplay-single-event/getPreMatchEventLoading',
      getInplaySingleEventLoading: 'inplay-single-event/getInplaySingleEventLoading',
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle'
    }),
    mobileSafari () {
      const browser = navigator.userAgent
      const safari = browser.includes('Safari') && !browser.includes('Chrome')
      const mobile = window.innerWidth < 720

      return safari && mobile
    }
  },
  async mounted () {
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
        this.$router.push(this.localePath(`/sport/${this.$route.params.sportId}/aovivo/${this.getPreMatchSingleEvent.id}`))
      } else if (!this.mobileSafari) {
        this.redirectTimer = setTimeout(() => {
          this.$router.push(this.localePath(`/sport/${this.$route.params.sportId}/aovivo/${this.getPreMatchSingleEvent.id}`))
        }, ms)
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
    clearTimeout(this.redirectTimer)
  },
  methods: {
    ...mapActions({
      setInvalidMultiple: 'tickets-pre-cash-in/setInvalidMultiple',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket',
      fetchPreMatchSingleEvent: 'pre-match-single-event/fetchPreMatchSingleEvent',
      updateInplaySingleEvent: 'inplay-single-event/updateInplaySingleEvent',
      fetchInplaySingleEvent: 'inplay-single-event/fetchInplaySingleEvent'
    }),
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
  .spinner-container{
    background: var(--fut-background);
    padding-top: 10px;
    padding-bottom: 10px;
  }
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
