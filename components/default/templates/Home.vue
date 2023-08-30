<template>
  <div>
    <div class="container-fluid mx-0 p-0 p-lg-2" style="padding-top: 0 !important;">
      <div class="row mx-0">
        <div
          class="p-lg-2 p-0"
          style="padding-top: 0 !important;"
          :class="{'col-12': !currentAds, 'col-12': currentAds && currentAds.length === 0, 'col-lg-10': currentAds && currentAds.length > 0}"
        >
          <select-sport :default-top-distance="genericStyling" :sports="getMetadataSports" />
          <featured-slides
            :odds="getOdds"
            :current-settings="currentSettings"
            :current-slides="currentSlides"
            :current-featured-bets="currentFeaturedBets"
            :tickets="getPreCashInTickets"
            @selectBet="ticket => toggleTicket(ticket)"
          />
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
    <fut-modal
      v-if="currentSettings && currentSettings.popup_visit_site"
      :title="$t('i18n_atencao')"
      :open="fixed_modal"
      @onClose="fixed_modal = false"
    >
      <fut-html-render :content="currentSettings.popup_visit_site" />
      <div class="text-center">
        <fut-button primary type="button" @click="fixed_modal = false">
          {{ $t('i18n_continuar') }}
        </fut-button>
      </div>
    </fut-modal>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapActions, mapGetters } from 'vuex'
import SelectSport from '@/components/default/molecules/SelectSport'
import FeaturedSlides from '@/components/default/organisms/FeaturedSlides'
import GamesList from '@/components/default/organisms/GamesList'
import AdBanner from '@/components/default/atoms/AdBanner'
import StoriesMenu from '@/components/default/atoms/StoriesMenu'
import FutHtmlRender from '@/components/default/atoms/FutHtmlRender.vue'
import FutModal from '@/components/default/organisms/FutModal.vue'

export default {
  components: { SelectSport, FeaturedSlides, GamesList, AdBanner, StoriesMenu, FutModal, FutHtmlRender },
  props: {
    genericStyling: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fixed_modal: false,
      days: ['Do', '2ª', '3ª', '4ª', '5ª', '6ª', 'Sa']
    }
  },
  computed: {
    ...mapGetters({
      // todo refactor this part
      loggedInUser: 'loggedInUser',
      currentAds: 'settings/currentAds',
      getFilters: 'pre-match/getFilters',
      currentSlides: 'settings/currentSlides',
      currentSettings: 'settings/currentSettings',
      currentFeaturedBets: 'bets/currentFeaturedBets',
      getPreMatchFeaturedEvents: 'pre-match-featured-events/getPreMatchFeaturedEvents',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getMetadataSports: 'metadata-sports/getMetadataSports',
      getOdds: 'odds/getOdds',
      getPreMatchEvents: 'pre-match/getPreMatchEvents',
      getPreMatchLoading: 'pre-match/getPreMatchLoading'
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
    this.fetchPreMatchEvents()
    if (this.currentSettings.popup_visit_site && !this.loggedInUser) {
      this.fixed_modal = true
    }
    // merge incoming pr 66 card 261
    // await this.fetchPreMatchFeaturedEvents(this.getFilters.sport)
    // this.commitFeaturedBets(this.getPreMatchFeaturedEvents)
    // this.fetchSliders().then(() => {
    //   this.commitSlides(this.currentSlides)
    // })
  },
  methods: {
    ...mapActions({
      fetchPreMatchFeaturedEvents: 'pre-match-featured-events/fetchPreMatchFeaturedEvents',
      concatPreMatchEvents: 'pre-match/concatPreMatchEvents',
      fetchPreMatchEvents: 'pre-match/fetchPreMatchEvents',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket',
      commitFeaturedBets: 'bets/commitFeaturedBets',
      changeFilter: 'pre-match/changeFilter',
      commitSlides: 'settings/commitSlides',
      fetchSliders: 'settings/fetchSliders'
    }),
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
