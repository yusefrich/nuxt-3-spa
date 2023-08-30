<template>
  <div class="d-block d-md-flex">
    <div class="row m-0 pt-md-3 bets-content">
      <div class="col-12 px-0">
        <slide-nsx
          v-if="currentSettings && currentSettings.slide_fullwith"
          :current-featured-bets="getPreMatchFeaturedEvents"
          :current-slides="getSlides"
          fullwidth
        />
      </div>
      <div class="col-md-7 px-0">
        <slide-nsx
          v-if="currentSettings && !currentSettings.slide_fullwith"
          :current-featured-bets="getPreMatchFeaturedEvents"
          :current-slides="getSlides"
          @selectBet="ticket => toggleTicket(ticket)"
        />
        <select-sport-nsx-horizontal
          :current-settings="currentSettings"
          :sports="getMetadataSports"
          class="d-md-none"
          @getDynamicSports="getDynamic()"
        />
        <template v-if="getPreMatchFeaturedEvents && getPreMatchFeaturedEvents.length > 0">
          <nsx-card-wrapper
            v-for="(event, index) in getPreMatchFeaturedEvents"
            :key="'main_event_mobile_betting_' + index"
            class="d-md-none"
            gray
            icon="/bet365icons/1.svg"
            :subtitle="`<span style='color: var(--fut-secondary)'>${$t('i18n_futebol')}</span>`"
            :title="`<span class='fw-bold' style='color: var(--fut-secondary)'>${event.league}</span>`"
          >
            <horizontal-games-list-nsx
              v-if="currentSport"
              :events="[event]"
              not-groupped
              :current-sport="currentSport"
              :tickets="getPreCashInTickets"
              @selectBet="ticket => toggleTicket(ticket)"
              @commitCurrentEvent="commitCurrentEvent($event)"
            />
          </nsx-card-wrapper>
        </template>
        <template v-else-if="mainLeagueEvents && mainLeagueEvents.length > 0">
          <nsx-card-wrapper
            v-for="(mainGames, index) in mainLeagueEvents"
            :key="'games_list_mobile_' + index"
            class="d-md-none"
            gray
            :icon="mainGames[0].games[0].country_icon ? mainGames[0].games[0].country_icon : '/bet365icons/1.svg'"
            :subtitle="`<span style='color: var(--fut-secondary)'>${$t('i18n_futebol')}</span>`"
            :title="`<span class='fw-bold' style='color: var(--fut-secondary)'>${mainGames[0] ? mainGames[0].name : ''}</span>`"
          >
            <horizontal-games-list-nsx
              v-if="currentSport"
              :events="mainGames"
              :current-sport="currentSport"
              :tickets="getPreCashInTickets"
              @selectBet="ticket => toggleTicket(ticket)"
              @commitCurrentEvent="commitCurrentEvent($event)"
            />
          </nsx-card-wrapper>
        </template>
        <nsx-card-wrapper
          class="d-md-none"
          gray
          icon="img/br.png"
          :subtitle="`<span class='fw-bold' style='color: var(--fut-secondary)'>${$t('i18n_futebol')}</span>`"
          title="<span class='fw-bold' style='color: var(--fut-secondary)'>Brasil</span>"
        >
          <horizontal-games-list-nsx
            v-if="currentSport && getPreMatchEvents && getPreMatchEvents.length > 0"
            :events="getPreMatchEvents"
            :current-sport="currentSport"
            :tickets="getPreCashInTickets"
            @selectBet="ticket => toggleTicket(ticket)"
            @commitCurrentEvent="commitCurrentEvent($event)"
          />
        </nsx-card-wrapper>
        <nsx-card-wrapper
          class="mb-0"
          :subtitle="`${ $t('i18n_ao_vivo') }<span style='color: #ffba39'> ${ $t('i18n_em_tempo_real') }</span>`"
          :header-link="`/sport/${currentSport}/aovivo`"
          center
        >
          <select-sport-nsx
            class="mb-0"
            :games="getInplayEvents"
            :current-settings="currentSettings"
            :sports="getMetadataInplaySports"
            @change="id=> changeInplaySport(id)"
            @getCurrentSportsInplay="getCurrentSportsInplay()"
          />
        </nsx-card-wrapper>
        <nsx-card-wrapper gray :icon="getCurrentIcon()" :title="`<span class='fw-bold' style='color: var(--fut-secondary)'>${getCurrentName()}</span>`">
          <inplay-games-list-nsx
            :key="'classic_'+currentSport"
            :loading="getInplayLoading"
            class="d-none d-md-block"
            :current-bets="getInplayEvents"
            :current-sport="currentSport"
            :tickets="getPreCashInTickets"
            :live="true"
            @selectBet="ticket => toggleTicket(ticket)"
          />
          <full-inplay-games-list-nsx
            :key="'full_'+currentSport"
            :loading="getInplayLoading"
            class="d-md-none"
            :current-bets="getInplayEvents"
            :current-sport="currentSport"
            :current-settings="currentSettings"
            :tickets="getPreCashInTickets"
            @selectBet="ticket => toggleTicket(ticket)"
          />
        </nsx-card-wrapper>
      </div>
      <div class="col-md-5 px-1">
        <nsx-card-wrapper
          gray
          :logo="currentSettings?currentSettings.logo_mobile?currentSettings.logo_mobile:currentSettings.logo:''"
          :subtitle="`<span class='fw-bold' style='color: var(--fut-secondary)'>${$t('i18n_melhores_listas_em_destaque')}</span>`"
        >
          <div class="row m-0">
            <div v-for="(item, index) in getPreMatchMainLeagues" :key="`leagues_main_${item.item}_${index}`" class="col-6 px-0">
              <nsx-fut-button
                class="fut-color-dynamic d-flex justify-content-between"
                block
                gray
                :to="`/sport/${currentSport ? currentSport : 1}/league/${item.id}`"
              >
                <div class="d-flex event-holder">
                  <img
                    style="border-radius: 100%"
                    :src="item.icon?item.icon:'/bet365icons/1.svg'"
                    class="me-1 mt-1"
                    width="20px"
                    height="20px"
                    alt=""
                  >
                  <span class="event-tite fut-color-dynamic">{{ item.name }}</span>
                </div>
                <font-awesome-icon class="icon fut-color-dynamic me-1 event-icon" :icon="['fas', 'caret-right']" />
              </nsx-fut-button>
            </div>
          </div>
        </nsx-card-wrapper>
        <template v-if="getPreMatchFeaturedEvents && getPreMatchFeaturedEvents.length > 0">
          <nsx-card-wrapper
            v-for="(beting, index) in getPreMatchFeaturedEvents"
            :key="'main_event_betting_'+index"
            class="d-none d-md-block"
            gray
            icon="/bet365icons/1.svg"
            :subtitle="`<span style='color: var(--fut-secondary)'>${$t('i18n_futebol')}</span>`"
            :title="`<span class='fw-bold' style='color: var(--fut-secondary)'>${beting.league}</span>`"
          >
            <games-list-nsx
              v-if="currentSport"
              :events="[beting]"
              :current-sport="currentSport"
              :odds="getOdds"
              not-groupped
              :tickets="getPreCashInTickets"
              @selectCurrentGame="selectCurrentGame($event)"
              @selectBet="ticket => toggleTicket(ticket)"
            />
          </nsx-card-wrapper>
        </template>
        <template v-else-if="mainLeagueEvents && mainLeagueEvents.length > 0">
          <nsx-card-wrapper
            v-for="(mainGames, index) in mainLeagueEvents"
            :key="'games_list_' + index"
            class="d-none d-md-block"
            gray
            :icon="mainGames[0].games[0].country_icon ? mainGames[0].games[0].country_icon : '/bet365icons/1.png'"
            :subtitle="`<span style='color: var(--fut-secondary)'>${$t('i18n_futebol')}</span>`"
            :title="`<span class='fw-bold' style='color: var(--fut-secondary)'>${mainGames[0] ? mainGames[0].name : ''}</span>`"
          >
            <games-list-nsx
              v-if="currentSport"
              :events="mainGames"
              :current-sport="currentSport"
              :odds="getOdds"
              :tickets="getPreCashInTickets"
              @selectCurrentGame="selectCurrentGame($event)"
              @selectBet="ticket => toggleTicket(ticket)"
            />
          </nsx-card-wrapper>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import dayjs from 'dayjs'
import SelectSportNsx from '@/components/nsx/molecules/SelectSportNsx.vue'
import SelectSportNsxHorizontal from '@/components/nsx/molecules/SelectSportNsxHorizontal.vue'
import NsxCardWrapper from '@/components/nsx/molecules/NsxCardWrapper.vue'
import GamesListNsx from '@/components/nsx/organisms/GamesListNsx.vue'
import HorizontalGamesListNsx from '@/components/nsx/organisms/HorizontalGamesListNsx.vue'
import InplayGamesListNsx from '@/components/nsx/organisms/InplayGamesListNsx.vue'
import FullInplayGamesListNsx from '@/components/nsx/organisms/FullInplayGamesListNsx.vue'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'
import SlideNsx from '@/components/nsx/organisms/SlideNsx.vue'

export default {
  name: 'HomeNsx',
  components: {
    FullInplayGamesListNsx,
    NsxCardWrapper,
    GamesListNsx,
    HorizontalGamesListNsx,
    NsxFutButton,
    SelectSportNsx,
    InplayGamesListNsx,
    SlideNsx,
    SelectSportNsxHorizontal
  },
  data () {
    return {
      currentSport: null,
      mainLeagueEvents: [],
      days: ['Do', '2ª', '3ª', '4ª', '5ª', '6ª', 'Sa']
    }
  },
  computed: {
    ...mapGetters({
      currentSettings: 'settings/currentSettings',
      getPreMatchMainLeagues: 'pre-match-main-leagues/getPreMatchMainLeagues',
      getCuracaoToken: 'layout/getCuracaoToken',
      getOdds: 'odds/getOdds',
      getSlides: 'layout/getSlides',
      loading: 'load',
      getFilters: 'pre-match/getFilters',
      currentSlides: 'settings/currentSlides',
      getInplayEvents: 'inplay/getInplayEvents',
      getInplayLoading: 'inplay/getInplayLoading',
      getPreMatchEvents: 'pre-match/getPreMatchEvents',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getPreMatchFeaturedEvents: 'pre-match-featured-events/getPreMatchFeaturedEvents',
      getMetadataSports: 'metadata-sports/getMetadataSports',
      getMetadataInplaySports: 'metadata-sports/getMetadataInplaySports'
    })
  },
  created () {
    this.changeFilter({ sport: +this.$route.params.sportId })
    this.changeFilter({ date: dayjs().format('YYYY-MM-DD') })
    this.changeFilter({ hour: null })

    if (this.$route.query.day && this.days.find(el => el === this.$route.query.day)) {
      const days = this.days.slice(dayjs().day(), this.days.findIndex(obj => obj === this.$route.query.day))
      this.changeFilter({ date: dayjs().add(days.length, 'day').format('YYYY-MM-DD') })
    }

    if (this.$route.query.hour) {
      this.changeFilter({ hour: this.$route.query.hour })
    }
  },
  mounted () {
    if (this.$route.params.sportId) {
      this.currentSport = +this.$route.params.sportId
    } else {
      this.currentSport = 6046
    }

    this.clearAndFetchInplayEvents(6046)

    if (
      !process.env.WS_HOST ||
      !process.env.WS_KEY ||
      !process.env.WS_ACTIVE ||
      (process.env.WS_ACTIVE && process.env.WS_ACTIVE !== 'true')
    ) {
      this.interval = setInterval(() => {
        this.fetchInplayEvents(6046)
      }, 5000)
    } else {
      this.interval = setInterval(() => {
        this.fetchInplayEvents(6046)
      }, 180000)
    }

    this.fetchPreMatchMainLeagues().then((result) => {
      if (!result[0]) {
        return
      }

      this.fetchPreMatchLeagueEvents(result[0].id).then((r) => {
        this.mainLeagueEvents.push(r)

        if (!result[1]) {
          return
        }

        this.fetchPreMatchLeagueEvents(result[1].id).then((re) => {
          this.mainLeagueEvents.push(re)

          if (!result[2]) {
            return
          }

          this.fetchPreMatchLeagueEvents(result[2].id).then((res) => {
            this.mainLeagueEvents.push(res)

            if (!result[3]) {
              return
            }

            this.fetchPreMatchLeagueEvents(result[3].id).then((resp) => {
              this.mainLeagueEvents.push(resp)
              // eslint-disable-next-line
              console.log('ending', this.mainLeagueEvents)
            })
          })
        })
      })
    })

    this.fetchPreMatchEvents()
    this.fetchSliders().then(() => {
      this.commitSlides(this.currentSlides)
    })
    this.fetchPreMatchFeaturedEvents(this.getFilters.sport)
    this.commitFeaturedBets(this.getPreMatchFeaturedEvents)
    this.fetchCurrentSlides()
  },
  methods: {
    ...mapActions({
      commitSlides: 'settings/commitSlides',
      fetchSliders: 'settings/fetchSliders',
      commitCurrentEvent: 'bets/commitCurrentEvent',
      clearAndFetchInplayEvents: 'inplay/clearAndFetchInplayEvents',
      fetchInplayEvents: 'inplay/fetchInplayEvents',
      fetchPreMatchFeaturedEvents: 'pre-match-featured-events/fetchPreMatchFeaturedEvents',
      fetchPreMatchMainLeagues: 'pre-match-main-leagues/fetchPreMatchMainLeagues',
      fetchPreMatchLeagueEvents: 'pre-match-league-events/fetchPreMatchLeagueEvents',
      fetchCurrentSlides: 'layout/fetchCurrentSlides',
      commitFeaturedBets: 'bets/commitFeaturedBets',
      fetchPreMatchEvents: 'pre-match/fetchPreMatchEvents',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket',
      changeFilter: 'pre-match/changeFilter',
      fetchPreMatchSingleEvent: 'pre-match-single-event/fetchPreMatchSingleEvent',
      fetchMetadataSports: 'metadata-sports/fetchMetadataSports',
      fetchMetadataInplaySports: 'metadata-sports/fetchMetadataInplaySports'
    }),
    changeInplaySport (id) {
      this.currentSport = +id

      clearInterval(this.interval)

      this.clearAndFetchInplayEvents(id)

      this.interval = setInterval(() => {
        this.fetchInplayEvents(id)
      }, 5000)
    },
    getCurrentIcon () {
      switch (this.currentSport) {
        case 6046:
          return '/bet365icons/1.svg'
        case 48242:
          return '/bet365icons/2.svg'
        case 154919:
          return '/bet365icons/10.svg'
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
        case 687890:
          return '/bet365icons/games.svg'
        case 131506:
          return '/bet365icons/16.svg'
        default:
          return '/bet365icons/1.svg'
      }
    },
    getCurrentName () {
      switch (this.currentSport) {
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
          return '/bet365icons/1.svg'
      }
    },
    selectCurrentGame (slug) {
      this.commitCurrentEvent({})

      this.fetchPreMatchSingleEvent(slug).then((res) => {
        this.commitCurrentEvent(res)
      })
    },
    getDynamic () {
      this.fetchMetadataSports()
    },
    getCurrentSportsInplay () {
      this.fetchMetadataInplaySports()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.col-md-7{
  @include md{
    width: 52%;
  }
}
.col-md-5{
  @include md{
    width: 48%;
  }
}
.bets-tickets{
  width: 250px;
}
.bets-content{
  // width: 100vw;
  position: relative;
  width: 100%;
}
.event-holder{
  text-overflow: ellipsis;
  overflow: hidden;
}
.event-tite{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  padding-top: 5px;
}
.event-icon{
  margin-top: 5px;
}
.bg-bets{
  background: var(--nsx-dark-1);
}
</style>
