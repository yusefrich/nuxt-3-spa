<template>
  <div>
    <template v-if="getCurrentLayoutStyle === 'FB'">
      <fb-sidebar-sports
        v-if="sidebar"
        custom-id="home"
        class="d-md-none d-print-none"
        :all-sports-data="getAllMetadataSports"
        :loading-leagues="getPreMatchLeaguesLoading"
        :gamelist-id="'sidebarList'"
        @selectCurrentSport="payload => fetchMetadataCountries(payload)"
        @selectCurrentSportCountry="payload => fetchPreMatchLeaguesByCountry({sportId: payload.sportId, country: payload.countryId})"
      />
      <fb-sidebar-sports
        v-if="sidebar"
        custom-id="homeoutright"
        class="d-md-none d-print-none"
        :outright="true"
        :all-sports-data="getAllMetadataSports"
        :loading-leagues="getPreMatchLeaguesLoading"
        :gamelist-id="'sidebarList'"
        @selectCurrentSport="payload => fetchMetadataCountries(payload)"
        @selectCurrentSportCountry="payload => fetchPreMatchLeaguesByCountry({sportId: payload.sportId, country: payload.countryId})"
      />
    </template>
    <template v-if="getCurrentLayoutStyle === 'FB2'">
      <div class="d-md-none">
        <!-- todo add here all the layouts components for the pixbet layout -->
        <!-- <h1 class="text-white">se liga</h1> -->
        <fb-2-select-page-slider
          v-if="currentSettings"
          :landing_style="getCurrentApplicationType"
          :font="currentSettings.font"
        />
        <fb-2-sidebar-sports
          v-if="sidebar"
          custom-id="home"
          class="d-md-none d-print-none"
          :all-sports-data="getAllMetadataSports"
          :loading-leagues="getPreMatchLeaguesLoading"
          :gamelist-id="'sidebarList'"
          @selectCurrentSport="payload => fetchMetadataCountries(payload)"
          @selectCurrentSportCountry="payload => fetchPreMatchLeaguesByCountry({sportId: payload.sportId, country: payload.countryId})"
        />
      </div>
    </template>
    <fb-sections-heading v-else class="d-md-none" :title="$t('i18n_esporte', 2)" route="/sports" />
    <div>
      <fb-carrosel
        v-if="currentSlides && !getPreMatchGroupedEvents"
        class="d-none d-md-block"
        :slides="currentSlides"
        sm
      />
    </div>
    <fb-games-list
      v-if="currentFeaturedSport != 6046 || (currentSettings && getPreMatchFeaturedEvents && getPreMatchFeaturedEvents[0] && getPreMatchFeaturedEvents[0].games.length > 0 && !getPreMatchGroupedEvents)"
      :class="{'d-none d-md-block': sidebar}"
      :events="getPreMatchFeaturedEvents"
      :events-sport="getCurrentProvider === 'default' ? 1 : currentSport"
      :loading="getPreMatchLoading"
      :stripped="currentSettings.stripped"
      :font="currentSettings.font"
      :tickets="getPreCashInTickets"
      :settings="currentSettings"
      @invalidMultiple="val => setInvalidMultiple(val)"
      @selectBet="ticket => toggleTicket(ticket)"
    >
      <template #title>
        <div class="section-title-padding">
          <font-awesome-icon :icon="['fas', 'fire']" />
          <span class="title-head">{{ $t('i18n_mais_popular') }}</span>
        </div>
      </template>
      <template #options>
        <div class="options-container w-100 my-1">
          <template v-for="(sport, index) in getAllMetadataSports" :key="'home_sport_select_'+index">
            <fb-fut-button
              v-if="index < 5 && currentSettings"
              :fixed-width="200"
              :primary="sport.id === currentFeaturedSport"
              style="width: 20%"
              block
              class="m-0 px-2 py-1 btn-select-sport fut-color-dynamic"
              :class="{'select-active': currentFeaturedSport === sport.id}"
              @click="()=>{currentFeaturedSport=sport.id; refetchFeatured()}"
            >
              {{ sport.name }}
            </fb-fut-button>
          </template>
        </div>
      </template>
    </fb-games-list>
    <fb-games-list
      v-if="currentSettings && !getPreMatchGroupedEvents"
      :class="{'d-none d-md-block': sidebar}"
      :events="getPreMatchEvents"
      :events-sport="getCurrentProvider === 'default' ? 1 : currentSport"
      :loading="getPreMatchLoading"
      :stripped="currentSettings.stripped"
      :font="currentSettings.font"
      :tickets="getPreCashInTickets"
      :settings="currentSettings"
      @invalidMultiple="val => setInvalidMultiple(val)"
      @selectBet="ticket => toggleTicket(ticket)"
    >
      <template #title>
        <div class="section-title-padding">
          <font-awesome-icon style="font-size: 14px" :icon="['far', 'clock']" />
          <span class="title-head">{{ $t('i18n_proximos') }}</span>
        </div>
      </template>
      <template #options>
        <div class="options-container w-100 my-1">
          <template v-for="(sport, index) in getAllMetadataSports" :key="'home_sport_select_'+index">
            <fb-fut-button
              v-if="index < 5 && currentSettings"
              :fixed-width="200"
              :primary="sport.id === currentSport"
              style="width: 20%"
              block
              class="m-0 px-2 py-1 btn-select-sport fut-color-dynamic"
              :class="{'select-active': currentSport === sport.id}"
              @click="()=>{changeFilter({sport: sport.id}); fetchPreMatchEvents(); currentSport=sport.id}"
            >
              {{ sport.name }}
            </fb-fut-button>
          </template>
        </div>
      </template>
    </fb-games-list>
    <template v-if="currentSettings && getPreMatchGroupedEvents">
      <div
        v-for="(events, index) in getPreMatchGroupedEvents"
        :key="'event_group_list'+index"
      >
        <fb-games-list
          :class="{'d-none d-md-block': sidebar}"
          :events="[events]"
          :events-sport="+getPreMatchGroupedIdsReverse[index].split('+')[1]"
          :loading="getPreMatchLoading"
          :stripped="currentSettings.stripped"
          :font="currentSettings.font"
          :tickets="getPreCashInTickets"
          :settings="currentSettings"
          @invalidMultiple="val => setInvalidMultiple(val)"
          @selectBet="ticket => toggleTicket(ticket)"
        >
          <template slot="title">
            <div class="d-none d-md-block py-1">
              <span class="title-head">{{ events.name }}</span>
              <fb-fut-button class="text-background float-end px-1 py-0" @click="toggleLeagueToStack(getPreMatchGroupedIdsReverse[index])">
                <font-awesome-icon :icon="['fas', 'times']" />
              </fb-fut-button>
            </div>
          </template>
        </fb-games-list>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import dayjs from 'dayjs'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'
import FbSectionsHeading from '@/components/fb/atoms/FbSectionsHeading.vue'
import FbCarrosel from '@/components/fb/atoms/FbCarrosel.vue'
import FbGamesList from '@/components/fb/organisms/FbGamesList.vue'
import Fb2SidebarSports from '@/components/fb/organisms/Fb2SidebarSports.vue'
import Fb2SelectPageSlider from '@/components/fb/molecules/Fb2SelectPageSlider.vue'
import FbSidebarSports from '@/components/fb/organisms/FbSidebarSports.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'FbHome',
  components: {
    FbCarrosel,
    FbFutButton,
    FbSidebarSports,
    Fb2SidebarSports,
    FbGamesList,
    FbSectionsHeading,
    Fb2SelectPageSlider
  },
  mixins: [windowWidth],
  props: {
    sidebar: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      currentSport: 6046,
      currentFeaturedSport: 6046,
      days: ['Do', '2ª', '3ª', '4ª', '5ª', '6ª', 'Sa']
    }
  },
  computed: {
    ...mapGetters({
      getFilters: 'pre-match/getFilters',
      getCurrentProvider: 'sports/getCurrentProvider',
      currentSlides: 'settings/currentSlides',
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle',
      getCurrentApplicationType: 'layout/getCurrentApplicationType',
      currentSettings: 'settings/currentSettings',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getPreMatchLeaguesLoading: 'pre-match-leagues/getPreMatchLeaguesLoading',
      getPreMatchLoading: 'pre-match/getPreMatchLoading',
      getPreMatchEvents: 'pre-match/getPreMatchEvents',
      getPreMatchFeaturedEvents: 'pre-match-featured-events/getPreMatchFeaturedEvents',
      getPreMatchGroupedEvents: 'pre-match-grouped-events/getPreMatchGroupedEvents',
      getPreMatchGroupedIds: 'pre-match-grouped-events/getPreMatchGroupedIds',
      getPreMatchGroupedIdsReverse: 'pre-match-grouped-events/getPreMatchGroupedIdsReverse',
      getAllMetadataSports: 'metadata-sports/getAllMetadataSports',
      getMetadataSports: 'metadata-sports/getMetadataSports'
    }),
    isMobile () {
      return this.width <= 768
    }
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
    this.fetchPreMatchEvents()
    this.fetchSliders().then(() => {
      this.commitSlides(this.currentSlides)
    })
    this.fetchPreMatchFeaturedEvents(this.getFilters.sport)
    this.commitFeaturedBets(this.getPreMatchFeaturedEvents)

    //* if contain games query parameter and on mobile redirect to the page of the league and clear grouped events
    if (this.$route.query && this.$route.query.games && this.isMobile) {
      this.fetchPreMatchGroupedEvents([])
      this.$router.push(`/sport/${this.currentSport}/league/${this.$route.query.games.split('_')[0]}`)
    }
  },
  methods: {
    ...mapActions({
      fetchSliders: 'settings/fetchSliders',
      commitSlides: 'settings/commitSlides',
      commitFeaturedBets: 'bets/commitFeaturedBets',
      fetchPreMatchEvents: 'pre-match/fetchPreMatchEvents',
      fetchMetadataCountries: 'metadata-countries/fetchMetadataCountries',
      fetchPreMatchLeaguesByCountry: 'pre-match-leagues/fetchPreMatchLeaguesByCountry',
      fetchPreMatchFeaturedEvents: 'pre-match-featured-events/fetchPreMatchFeaturedEvents',
      changeFilter: 'pre-match/changeFilter',
      fetchPreMatchGroupedEvents: 'pre-match-grouped-events/fetchPreMatchGroupedEvents',
      setInvalidMultiple: 'tickets-pre-cash-in/setInvalidMultiple',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket'
    }),
    productConfig () {
      return process.env.PRODUCT_CONFIG
    },
    refetchFeatured () {
      this.fetchPreMatchFeaturedEvents(this.currentFeaturedSport)
    },
    toggleLeagueToStack (id) {
      console.log('hay', id)
      const currentParams = new URL(location.href).searchParams.get('games')
      const current = currentParams ? (currentParams + '').split('_') : []
      let currentString = ''

      const leagueIndex = current.findIndex(obj => obj === id + '')
      if (leagueIndex !== -1) {
        current.splice(leagueIndex, 1)
      }

      current.forEach((e) => {
        if (currentString) {
          currentString = currentString + '_' + e
        } else {
          currentString = e
        }
      })

      if (leagueIndex === -1) {
        if (currentString) {
          currentString = currentString + '_' + id
        } else {
          currentString = id
        }
      }

      const searchURL = new URL(window.location)
      searchURL.searchParams.delete('games')
      if (currentString) {
        searchURL.searchParams.set('games', currentString)
      }
      window.history.pushState({}, '', searchURL)

      if (!currentString || currentString === '') {
        this.fetchPreMatchGroupedEvents([])
        return
      }
      this.fetchPreMatchGroupedEvents(('' + currentString).split('_'))
    }
  }
}
</script>

<style lang="scss" scoped>
.button-content {
  margin-top: -9px;
  text-align: center;
  padding: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.hp-box {
  width: calc(50% - 2px);
  width: 100%;
  min-height: 78px;
  position: relative;
  background-color: #31343b;
  box-shadow: 1px 2px 2px 0px rgba(0,0,0,0.4);
    a {
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      display: block;
      width: 100%;
      min-height: 78px;
    }
}
.icons-size {
  width: 150px;
}
.options-container{
  background: var(--fut-background-lighter);
  display: flex;
  button{
    margin-right: 1px !important;
    margin-bottom: 1px !important;
  }
}
.btn-select-sport{
  background-color: var(--fut-background-2);
  border: none;
  color: white;
  font-size: 11px;
  text-transform: uppercase;
  &:hover{
    // background-image: linear-gradient(to right, var(--fut-primary), var(--fut-secondary));
    background-image: linear-gradient(to right, var(--fut-background-games-list), var(--fut-background-games-list-lightest));
    color: black;
  }
}
.select-active{
  background-image: linear-gradient(to right, var(--fut-background-games-list), var(--fut-background-games-list-lightest));
  color: black;
}
.section-title-padding{
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
