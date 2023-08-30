<template>
  <div class="container-fluid mx-0 p-0 p-lg-2">
    <div class="row mx-0">
      <div
        class="p-lg-2 p-0"
        :class="{
          'col-12': !currentAds,
          'col-12': currentAds && currentAds.length === 0,
          'col-lg-10': currentAds && currentAds.length > 0
        }"
      >
        <select-sport :default-top-distance="genericStyling" :sports="getMetadataSports"/>
        <featured-slides
          :odds="getOdds"
          :current-settings="currentSettings"
          :current-slides="currentSlides"
          :current-featured-bets="currentFeaturedBets"
          :tickets="getPreCashInTickets"
          @selectBet="ticket => toggleTicket(ticket)"
        />
        <games-list
          v-if="currentSport && currentSettings"
          :nav-filter-generic-distance="genericStyling"
          :events="events"
          :events-sport="currentSport"
          :no-filter="true"
          :stripped="currentSettings.stripped"
          :settings="currentSettings"
          :table-heading="tableHeading"
          @selectBet="ticket => toggleTicket(ticket)"
          @fetchPage="concatPreMatchEvents()"
          @fetchSearch="fetchSearch($event)"
          @fetchDate="fetchDate($event)"
        />
      </div>
      <div class="col-lg-2">
        <template v-if="currentAds">
          <ad-banner
            v-for="(ad, index) in currentAds"
            :key="'ad_'+index"
            :img="ad.img"
            :url="ad.link"
            class="mb-3 d-none d-lg-block"
            size="tall"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SelectSport from '@/components/default/molecules/SelectSport.vue'
import FeaturedSlides from '@/components/default/organisms/FeaturedSlides.vue'
import GamesList from '@/components/default/organisms/GamesList.vue'

export default {
  name: 'League',
  components: {
    SelectSport,
    FeaturedSlides,
    GamesList
  },
  props: {
    genericStyling: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentSport: null,
      tableHeading: [],
      id: 1
    }
  },
  computed: {
    ...mapGetters({
      getMetadataSports: 'metadata-sports/getMetadataSports',
      events: 'events/events',
      getOdds: 'odds/getOdds',
      currentAds: 'settings/currentAds',
      currentSlides: 'settings/currentSlides',
      currentSettings: 'settings/currentSettings',
      currentFeaturedBets: 'bets/currentFeaturedBets',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getPreMatchFeaturedEvents: 'pre-match-featured-events/getPreMatchFeaturedEvents'
    })
  },
  async mounted () {
    this.id = +this.$route.params.id

    this.currentSport = (this.$route.params.sportId) ? +this.$route.params.sportId : 1
    this.tableHeading = []

    this.tableHeading.push(
      {
        title: this.$t('i18n_resultado_final').toUpperCase(),
        subtitle: [this.$t('i18n_casa'), this.$t('i18n_empate'), this.$t('i18n_fora')],
        subtitleSlug: ['full_time_result_home', 'full_time_result_draw', 'full_time_result_away']
      }
    )

    if (this.currentSettings && this.currentSettings.both_score) {
      this.tableHeading.push(
        {
          title: this.$t('i18n_ambos_marcam').toUpperCase(),
          subtitle: [this.$t('i18n_sim'), this.$t('i18n_nao')],
          subtitleSlug: ['both_teams_to_score_yes', 'both_teams_to_score_no']
        }
      )
    }

    if (this.currentSport !== 1 && this.currentSport !== 6046) {
      this.tableHeading = [
        {
          title: this.$t('i18n_resultado_final').toUpperCase(),
          subtitle: [this.$t('i18n_casa'), this.$t('i18n_fora')],
          subtitleSlug: ['full_time_result_home', 'full_time_result_away']
        }
      ]
    }

    this.fetchEventsFromLeague(this.id)
    await this.fetchPreMatchFeaturedEvents(this.currentSport)
    this.commitFeaturedBets(this.getPreMatchFeaturedEvents)
  },
  methods: {
    ...mapActions({
      fetchPreMatchFeaturedEvents: 'pre-match-featured-events/fetchPreMatchFeaturedEvents',
      concatPreMatchEvents: 'pre-match/concatPreMatchEvents',
      fetchEventsFromLeague: 'events/fetchEventsFromLeague',
      fetchPreMatchEvents: 'pre-match/fetchPreMatchEvents',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket',
      commitFeaturedBets: 'bets/commitFeaturedBets',
      changeFilter: 'pre-match/changeFilter'
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
