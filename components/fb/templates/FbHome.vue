<template>
  <div>
    <template v-if="getCurrentLayoutStyle === 'FB'">
      <fb-sidebar-sports
        v-if="sidebar"
        custom-id="home"
        class="d-md-none d-print-none"
        :all-sports-data="getAllMetadataSports"
        :gamelist-id="'sidebarList'"
      />
      <fb-sidebar-sports
        v-if="sidebar"
        custom-id="homeoutright"
        class="d-md-none d-print-none"
        :outright="true"
        :all-sports-data="getAllMetadataSports"
        :gamelist-id="'sidebarList'"
      />
    </template>

    <fb-sections-heading
      v-else
      class="d-md-none"
      :title="$tc('i18n_esporte', 2)"
      route="/sports"
    />

    <div>
      <fb-carrosel
        v-if="currentSlides && !getPreMatchGroupedEvents && onHome"
        class="d-none d-md-block"
        :slides="currentSlides"
        sm
      />
    </div>

    <div v-if="hasFilters || !isMobile">
      <!-- <fb-games-list
        v-if="currentFeaturedSport != 6046 || (currentSettings && getPreMatchFeaturedEvents && getPreMatchFeaturedEvents[0] && getPreMatchFeaturedEvents[0].games.length > 0 && !getPreMatchGroupedEvents)"
        :class="{'d-none d-md-block': sidebar}"
        :events="getPreMatchFeaturedEvents"
        :events-sport="currentSport"
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
            <fa :icon="['fas', 'fire']" />
            <span class="title-head">{{ $t('i18n_mais_popular') }}</span>
          </div>
        </template>
        <template #options>
          <div class="options-container w-100 my-1">
            <template v-for="(sport, index) in getAllMetadataSports">
              <fb-fut-button
                v-if="index < 5 && currentSettings"
                :key="'home_sport_select_'+index"
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
      </fb-games-list> -->
      <fb-games-list
        v-if="currentSettings && !getPreMatchGroupedEvents"
        :class="{'d-none d-md-block': sidebar}"
        :events="getPreMatchEvents"
        :events-sport="currentSport"
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
            <fa style="font-size: 14px" :icon="['far', 'clock']" />
            <span class="title-head">{{ $t('i18n_proximos') }}</span>
          </div>
        </template>
        <template #options>
          <div class="options-container w-100 my-1">
            <template v-for="(sport, index) in getAllMetadataSports">
              <fb-fut-button
                v-if="index < 5 && currentSettings"
                :key="'home_sport_select_'+index"
                :fixed-width="200"
                :primary="sport.id === currentSport"
                style="width: 20%"
                block
                class="m-0 px-2 py-1 btn-select-sport fut-color-dynamic"
                :class="{'select-active': currentSport === sport.id}"
                @click="
                  changeFilter({sport: sport.id}),
                  fetchPreMatchEvents(),
                  currentSport=sport.id
                "
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
            :class="{ 'd-none d-md-block': sidebar }"
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
            <template #title>
              <div class="d-none d-md-block py-1">
                <span class="title-head">{{ events.name }}</span>
                <fb-fut-button
                  class="text-background float-end px-1 py-0"
                  @click="toggleLeagueToStack(getPreMatchGroupedIdsReverse[index])"
                >
                  <fa :icon="['fas', 'times']" />
                </fb-fut-button>
              </div>
            </template>
          </fb-games-list>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import { mapState, mapActions } from 'pinia'
import { useLayoutStore } from '@/stores/layout'
import { useSettingsStore } from '@/stores/settings'
import { usePreMatchStore } from '@/stores/pre-match'
import { useMetadataSportsStore } from '@/stores/metadata-sports'
import { useTicketsPreCashInStore } from '@/stores/tickets-pre-cash-in'
import { usePreMatchGroupedEventsStore } from '@/stores/pre-match-grouped-events'

import FbFutButton from '@/components/fb/atoms/FbFutButton'
import FbSectionsHeading from '@/components/fb/atoms/FbSectionsHeading'
import FbCarrosel from '@/components/fb/atoms/FbCarrosel'
import FbGamesList from '@/components/fb/organisms/FbGamesList'
import Fb2SidebarSports from '@/components/fb/organisms/Fb2SidebarSports'
import Fb2SelectPageSlider from '@/components/fb/molecules/Fb2SelectPageSlider'
import FbSidebarSports from '@/components/fb/organisms/FbSidebarSports'

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
  data () {
    return {
      currentSport: 6046,
      currentFeaturedSport: 6046,
      days: ['Do', '2ª', '3ª', '4ª', '5ª', '6ª', 'Sa'],
      sidebar: true
    }
  },
  computed: {
    ...mapState(usePreMatchStore, {
      getPreMatchEvents: 'getPreMatchEvents',
      getPreMatchLoading: 'getPreMatchLoading',
      getFilters: 'getFilters'
    }),
    ...mapState(useMetadataSportsStore, {
      getMetadataSports: 'getMetadataSports',
      getAllMetadataSports: 'getAllMetadataSports'
    }),
    ...mapState(usePreMatchGroupedEventsStore, {
      getPreMatchGroupedEvents: 'getPreMatchGroupedEvents',
      getPreMatchGroupedIdsReverse: 'getPreMatchGroupedIdsReverse'
    }),
    ...mapState(useSettingsStore, {
      currentSlides: 'currentSlides',
      currentSettings: 'currentSettings'
    }),
    ...mapState(useLayoutStore, {
      getCurrentLayoutStyle: 'getCurrentLayoutStyle',
      getCurrentSportsProvider: 'getCurrentSportsProvider'
    }),
    ...mapState(useTicketsPreCashInStore, {
      getPreCashInTickets: 'getPreCashInTickets'
    }),
    // ...mapGetters({
    //   getPreMatchFeaturedEvents: 'pre-match-featured-events/getPreMatchFeaturedEvents',
    // }),
    onHome () {
      if (!process.client) {
        return false
      }
      return window.location.pathname === '/'
    },
    isMobile () {
      return this.width <= 821
    },
    hasFilters () {
      if (this.getCurrentLayoutStyle === 'FB') {
        return true
      }

      if (Object.keys(this.$route.query).length) {
        return true
      }

      return false
    }
  },
  created () {
    this.changeFilter({ sport: +this.$route.params.sportId })
    this.changeFilter({ date: dayjs().format('YYYY-MM-DD') })
    this.changeFilter({ hour: null })

    if (this.$route.query.day && this.days.find(el => el === this.$route.query.day)) {
      const days = []

      for (let i = 0; i < this.days.length; i++) {
        const e = this.days[i]

        if (i >= dayjs().day()) {
          days.push(e)
        }
      }

      for (let i = 0; i < this.days.length; i++) {
        const e = this.days[i]

        if (i < dayjs().day()) {
          days.push(e)
        }
      }

      this.days = days

      this.sidebar = false

      this.changeFilter({ date: dayjs().add(this.days.findIndex(obj => obj === this.$route.query.day), 'day').format('YYYY-MM-DD') })
    }

    if (this.$route.query.hour) {
      this.sidebar = false

      this.changeFilter({ hour: this.$route.query.hour, date: null })
    }

    if (this.getCurrentSportsProvider !== 'upgaming') {
      this.fetchAllMetadataSports(this.getFilters)
    }
  },
  async mounted () {
    await this.fetchMetadataSports()

    if (this.getMetadataSports && this.getMetadataSports.length > 0) {
      this.changeFilter({ sport: this.getMetadataSports[0].id })

      this.currentSport = this.getMetadataSports[0].id
    }

    this.fetchPreMatchEvents()

    this.fetchSliders().then(() => {
      this.commitSlides(this.currentSlides)
    })

    // this.fetchPreMatchFeaturedEvents(this.getFilters.sport)
    // this.commitFeaturedBets(this.getPreMatchFeaturedEvents)

    if (this.$route.query.currentSport) {
      this.currentSport = +this.$route.query.currentSport
    } else if (this.getAllMetadataSports && this.getAllMetadataSports.length) {
      this.currentSport = this.getAllMetadataSports[0].id
    }

    //* if contain games query parameter and on mobile redirect to the page of the league and clear grouped events
    if (this.$route.query && this.$route.query.games && this.isMobile) {
      this.fetchPreMatchGroupedEvents([])
      this.$router.push(`/sport/${this.currentSport}/league/${this.$route.query.games.split('_')[0]}`)
    }
  },
  methods: {
    ...mapActions(useMetadataSportsStore, {
      fetchMetadataSports: 'fetchMetadataSports',
      fetchAllMetadataSports: 'fetchAllMetadataSports'
    }),
    ...mapActions(usePreMatchStore, {
      changeFilter: 'changeFilter',
      fetchPreMatchEvents: 'fetchPreMatchEvents'
    }),
    ...mapActions(useTicketsPreCashInStore, {
      toggleTicket: 'toggleTicket',
      setInvalidMultiple: 'setInvalidMultiple'
    }),
    ...mapActions(useSettingsStore, {
      fetchSliders: 'fetchSliders',
      commitSlides: 'commitSlides'
    }),
    ...mapActions(usePreMatchGroupedEventsStore, {
      fetchPreMatchGroupedEvents: 'fetchPreMatchGroupedEvents'
    }),
    // ...mapActions({
    //   commitFeaturedBets: 'bets/commitFeaturedBets',
    //   fetchPreMatchFeaturedEvents: 'pre-match-featured-events/fetchPreMatchFeaturedEvents',
    // }),
    // refetchFeatured () {
    //   this.fetchPreMatchFeaturedEvents(this.currentFeaturedSport)
    // },
    toggleLeagueToStack (id) {
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
