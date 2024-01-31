<template>
  <div>
    <div
      class="container-fluid mx-0 p-0 p-lg-2"
      style="padding-top: 0 !important;"
    >
      <div class="row mx-0">
        <div
          class="p-lg-2 p-0"
          style="padding-top: 0 !important;"
          :class="{
            'col-12': !currentAds,
            'col-12': currentAds && currentAds.length === 0,
            'col-lg-10': currentAds && currentAds.length > 0
          }"
        >
          <select-sport
            :default-top-distance="genericStyling"
            :sports="getMetadataSports"
          />

          <!-- <feat+ -->
          <stories-menu
            :dynamic-items="currentSettings.nav_bar"
            class="d-md-none"
          />

          <games-list
            v-if="currentSettings"
            :nav-filter-generic-distance="genericStyling"
            :events="getPreMatchEvents"
            :events-sport="getFilters.sport"
            :loading="getPreMatchLoading"
            :stripped="currentSettings.stripped"
            :settings="currentSettings"
            :tickets="getPreCashInTickets"
            view-more
            @selectBet="ticket => toggleTicket(ticket)"
            @fetchPage="concatPreMatchEvents()"
            @fetchSearch="fetchSearch($event)"
            @fetchDate="fetchDate($event)"
          />
        </div>

        <div v-if="currentAds" class="col-lg-2">
          <ad-banner
            v-for="(ad, index) in currentAds"
            :key="'ad_'+index"
            :img="ad.img"
            :url="ad.link"
            class="mb-3 d-none d-lg-block"
            size="tall"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import { mapActions, mapState } from 'pinia'
import { useSettingsStore } from '@/stores/settings'
import { usePreMatchStore } from '@/stores/pre-match'
import { useMetadataSportsStore } from '@/stores/metadata-sports'
import { useTicketsPreCashInStore } from '@/stores/tickets-pre-cash-in'

import windowWidth from '@/mixins.js/windowWidth.js'
import SelectSport from '@/components/default/molecules/SelectSport'
// import FeaturedSlides from '@/components/default/organisms/FeaturedSlides'
import GamesList from '@/components/default/organisms/GamesList'
import AdBanner from '@/components/default/atoms/AdBanner'
import StoriesMenu from '@/components/default/atoms/StoriesMenu'

export default {
  components: {
    SelectSport,
    // FeaturedSlides,
    GamesList,
    AdBanner,
    StoriesMenu
  },
  props: {
    genericStyling: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      days: ['Do', '2ª', '3ª', '4ª', '5ª', '6ª', 'Sa']
    }
  },
  mixins: [windowWidth],
  computed: {
    ...mapState(useSettingsStore, {
      currentAds: 'currentAds',
      currentSettings: 'currentSettings'
    }),
    ...mapState(usePreMatchStore, {
      getPreMatchEvents: 'getPreMatchEvents',
      getPreMatchLoading: 'getPreMatchLoading',
      getFilters: 'getFilters'
    }),
    ...mapState(useTicketsPreCashInStore, {
      getPreCashInTickets: 'getPreCashInTickets'
    }),
    ...mapState(useMetadataSportsStore, {
      getMetadataSports: 'getMetadataSports'
    }),
    // ...mapGetters({
    //   // todo refactor this part
    //   getPreMatchFeaturedEvents: 'pre-match-featured-events/getPreMatchFeaturedEvents',
    // }),
    onHome () {
      if (!process.client) {
        return false
      }
      return window.location.pathname === '/'
    },
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
  async mounted () {
    await this.fetchMetadataSports()
    if (this.getMetadataSports && this.getMetadataSports.length > 0) {
      this.changeFilter({ sport: this.getMetadataSports[0].id })
    }

    this.fetchPreMatchEvents()
    this.fetchPreMatchFeaturedEvents(this.getFilters.sport)
    this.fetchSliders()
    // this.commitFeaturedBets(this.getPreMatchFeaturedEvents)
  },
  methods: {
    ...mapActions(useSettingsStore, {
      fetchSliders: 'fetchSliders'
    }),
    ...mapActions(usePreMatchStore, {
      changeFilter: 'changeFilter',
      fetchPreMatchEvents: 'fetchPreMatchEvents',
      concatPreMatchEvents: 'concatPreMatchEvents'
    }),
    ...mapActions(useTicketsPreCashInStore, {
      toggleTicket: 'toggleTicket'
    }),
    ...mapActions(useMetadataSportsStore, {
      fetchMetadataSports: 'fetchMetadataSports'
    }),
    // ...mapActions({
    //   fetchPreMatchFeaturedEvents: 'pre-match-featured-events/fetchPreMatchFeaturedEvents',
    //   commitFeaturedBets: 'bets/commitFeaturedBets',
    // }),
    fetchSearch (payload) {
      this.changeFilter({ team: payload })
      this.fetchPreMatchEvents()
    },
    fetchDate (payload) {
      this.changeFilter({
        page: null,
        hour: null,
        date: payload
      })

      this.fetchPreMatchEvents()
    }
  }
}
</script>
