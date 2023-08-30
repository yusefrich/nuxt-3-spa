<template>
  <div
    style="background: var(--nsx-dark-1);"
    class="container-fluid px-0 px-md-1 d-md-flex d- mx-0"
  >
    <div class="row mx-0 bets-content">
      <div class="col-md-12 px-0 min-height-nsx">
        <nsx-card-wrapper
          v-if="(live && getInplaySingleEvent) || getPreMatchSingleEvent"
          back
          :icon="getSportIcon(currentSport)"
          :title="live ? getEventTitle(getInplaySingleEvent) : getEventTitle(getPreMatchSingleEvent)"
          :subtitle="live ? getEventSubtitle(getInplaySingleEvent) : getEventSubtitle(getPreMatchSingleEvent)"
        >
          <div
            v-if="live"
            class="d-none d-md-block position-relative"
          >
            <img
              style="object-fit: cover"
              width="100%"
              height="105px"
              src="/img/live.jpg"
              alt="Live Img Field"
            >
            <div class="nsx-game-score w-100">
              <div
                v-if="(live && getInplaySingleEvent)"
                class="nsx-heading d-flex justify-content-between"
              >
                <div>
                  <span>{{ getInplaySingleEvent.time }}</span>
                  <font-awesome-icon v-if="getInplaySingleEvent.time" class="icon me-1" :icon="['fas', 'clock']" />
                </div>
                <div class="d-flex">
                  <div
                    v-for="(result, j) in getInplaySingleEvent.result"
                    :key="'result_icon_inplay_'+j"
                    class="mx-2"
                  >
                    <span v-if="j === 0 && j+1 !== getInplaySingleEvent.result.length">S</span>
                    <font-awesome-icon v-else-if="j+1 === getInplaySingleEvent.result.length" class="icon me-1" :icon="['fas', 'futbol']" />
                    <span v-else>J</span>
                  </div>
                </div>
              </div>
              <div class="nsx-body">
                <div class="item d-flex justify-content-between">
                  <span v-if="live && getInplaySingleEvent">{{ getInplaySingleEvent.home_team }}</span>
                  <span v-if="!live && getPreMatchSingleEvent">{{ getPreMatchSingleEvent.home_team }}</span>
                  <div v-if="live && getInplaySingleEvent && getInplaySingleEvent.result">
                    <span v-for="(result, j) in getInplaySingleEvent.result" :key="'result_home_inplay_'+j" class="result-list">{{ result.home }}</span>
                  </div>
                </div>
                <div class="item d-flex justify-content-between">
                  <span v-if="live && getInplaySingleEvent">{{ getInplaySingleEvent.away_team }}</span>
                  <span v-if="!live && getPreMatchSingleEvent">{{ getPreMatchSingleEvent.away_team }}</span>
                  <div v-if="live && getInplaySingleEvent && getInplaySingleEvent.result">
                    <span v-for="(result, j) in getInplaySingleEvent.result" :key="'result_away_inplay_'+j" class="result-list">{{ result.away }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="live" class="d-md-none w-100">
            <fut-inplay-field
              v-if="getInplaySingleEvent && getInplaySingleEvent.livescore_id && getStatscoreConfig"
              :id="getInplaySingleEvent.livescore_id"
              :key="'field_'+getInplaySingleEvent.livescore_id"
              :statscore-config="getStatscoreConfig"
              name="liveInplay"
            />
          </div>
          <div
            v-if="live"
            class="d-md-none w-100 fixed-field not-showing-field"
            :class="{'showing-field':currentScroll > 50}"
          >
            <fut-inplay-field
              v-if="getInplaySingleEvent && getInplaySingleEvent.livescore_id && getStatscoreConfig"
              :id="getInplaySingleEvent.livescore_id"
              :key="'mobile_field_'+getInplaySingleEvent.livescore_id"
              :statscore-config="getStatscoreConfig"
              name="liveInplayFixed"
            />
          </div>
          <game-detail-list
            :live="live"
            :layout="getCurrentLayoutStyle"
            :tickets="getPreCashInTickets"
            :event="live ? getInplaySingleEvent : getPreMatchSingleEvent"
            @selectBet="ticket => toggleTicket(ticket)"
          />
        </nsx-card-wrapper>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import GameDetailList from '@/components/default/organisms/GameDetailList.vue'
import NsxCardWrapper from '@/components/nsx/molecules/NsxCardWrapper.vue'
import FutInplayField from '@/components/default/atoms/FutInplayField.vue'
import global from '@/mixins.js/global.js'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'

export default {
  name: 'EventoNsx',
  components: {
    GameDetailList,
    NsxCardWrapper,
    FutInplayField
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
      currentSport: null,
      interval: null,
      redirectTimer: null
    }
  },
  computed: {
    ...mapGetters({
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getStatscoreConfig: 'layout/getStatscoreConfig',
      currentSettings: 'settings/currentSettings',
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle',
      getPreMatchSingleEvent: 'pre-match-single-event/getPreMatchSingleEvent',
      getInplaySingleEvent: 'inplay-single-event/getInplaySingleEvent'
    }),
    mobileSafari () {
      const browser = navigator.userAgent
      const safari = browser.includes('Safari') && !browser.includes('Chrome')
      const mobile = window.innerWidth < 720

      return safari && mobile
    }
  },
  async mounted () {
    this.currentSport = (this.$route.params.sportId) ? +this.$route.params.sportId : 1

    if (this.live) {
      this.fetchInplaySingleEvent(this.id)

      if (
        !process.env.WS_HOST ||
        !process.env.WS_KEY ||
        !process.env.WS_ACTIVE ||
        (process.env.WS_ACTIVE && process.env.WS_ACTIVE !== 'true')
      ) {
        this.interval = setInterval(() => {
          this.updateInplaySingleEvent(this.id)
        }, 5000)
      } else {
        this.interval = setInterval(() => {
          this.updateInplaySingleEvent(this.id)
        }, 180000)
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
      toggleTicket: 'tickets-pre-cash-in/toggleTicket',
      fetchPreMatchSingleEvent: 'pre-match-single-event/fetchPreMatchSingleEvent',
      fetchInplaySingleEvent: 'inplay-single-event/fetchInplaySingleEvent',
      updateInplaySingleEvent: 'inplay-single-event/updateInplaySingleEvent'
    }),
    getEventTitle (event) {
      if (!event) {
        return ''
      }
      return `<span class='text-secondary'>${event.home_team ? event.home_team : ''} ${event.home_team && event.away_team ? 'X' : ''} ${event.away_team ? event.away_team : ''}</span>`
    },
    getEventSubtitle (event) {
      if (!event) {
        return ''
      }
      return `<span class='text-secondary'>${this.getSportName(this.currentSport)} -> ${event.league_name ? event.league_name : ''}${event.league ? event.league : ''}</span>`
    },
    getSportName (id) {
      switch (id) {
        case 1:
          return this.$t('i18n_futebol')
        case 6046:
          return this.$t('i18n_futebol')
        case 48242:
          return this.$t('i18n_basquete')
        case 54094:
          return this.$t('i18n_tenis')
        case 265917:
          return this.$t('i18n_tenis_de_mesa')
        case 154830:
          return this.$t('i18n_volei')
        case 621569:
          return this.$t('i18n_volei_de_praia')
        case 35709:
          return this.$t('i18n_handebol')
        case 154914:
          return this.$t('i18n_basebol')
        case 131506:
          return 'Fut Amer.'
        case 687890:
          return 'E-games'
        case 154919:
          return this.$t('i18n_boxe_mma')
        default:
          return this.$t('i18n_futebol')
      }
    },
    getSportIcon (id) {
      switch (id) {
        case 1:
          return '/bet365icons/1.svg'
        case 6046:
          return '/bet365icons/1.svg'
        case 48242:
          return '/bet365icons/2.svg'
        case 54094:
          return '/bet365icons/5.svg'
        case 265917:
          return '/bet365icons/20.svg'
        case 154830:
          return '/bet365icons/23.svg'
        case 621569:
          return '/bet365icons/34.svg'
        case 35709:
          return '/bet365icons/6.svg'
        case 154914:
          return '/bet365icons/3.svg'
        case 131506:
          return '/bet365icons/16.svg'
        case 687890:
          return '/bet365icons/games.svg'
        case 154919:
          return '/bet365icons/10.svg'
        default:
          return '/bet365icons/1.svg'
      }
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
.fix-top{
  position: fixed;
  top: 50px;
}
.field-spacing{
  height: 420px;
}
.nsx-game-score{
  position: absolute;
  max-width: 300px;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  border-radius: 7px;
  .nsx-heading{
    padding: 0px 10px;
    background: #1d1d1d;
    border-radius: 7px 7px 0px 0px;
    span{
      color: var(--nsx-gray-0);
      font-size: 15px;
    }
    .icon{
      color: var(--nsx-gray-0);
      font-size: 15px;
    }
  }
  .nsx-body{
    .item{
      padding: 0px 10px;
      border-top: solid 1px #3c3c3c;
      span{
        color: #C5C5C5;
      }
    }
  }
}
.padding-bet{
  padding-top: 120px;
}
.bets-tickets{
  width: 250px;
}
.bets-content{
  width: 100%;
  &::-webkit-scrollbar-track {
    opacity: .3;
    border-radius: 0.125rem;
    background-color: var(--nsx-dark-7);
  }
  &::-webkit-scrollbar {
    opacity: .3;
    width: 13px;
  }
  &::-webkit-scrollbar-thumb {
    border: solid 2px var(--nsx-dark-7);
    opacity: .3;
    border-radius:50px;
    width: 5px;
    background-color: var(--nsx-dark-6);
  }
}
.fixed-field{
  position: fixed;
  top: 30px;
  z-index: 10;
}
.not-showing-field{
  display: none;
}
.showing-field{
  display: block;
}
.min-height-nsx{
  min-height: calc(100vh - 50px);
}
.result-list{
  width: 23px;
  display: inline-block;
  text-align: center;
  margin-right: 5px;
}
</style>
