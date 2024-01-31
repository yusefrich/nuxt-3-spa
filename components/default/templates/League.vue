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
        <!-- <featured-slides
          :odds="getOdds"
          :current-settings="currentSettings"
          :current-slides="currentSlides"
          :current-featured-bets="currentFeaturedBets"
          :tickets="getPreCashInTickets"
          @selectBet="ticket => toggleTicket(ticket)"
        /> -->
        <games-list
          v-if="currentSport && currentSettings"
          :nav-filter-generic-distance="genericStyling"
          :events="getPreMatchLeagueEvents"
          :events-sport="currentSport"
          :no-filter="true"
          :stripped="currentSettings.stripped"
          :settings="currentSettings"
          :table-heading="tableHeading"
          @selectBet="ticket => toggleTicket(ticket)"
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
import { mapState, mapActions } from 'pinia'

import { useSettingsStore } from '@/stores/settings'
import { useMetadataSportsStore } from 'stores/metadata-sports'
import { useTicketsPreCashInStore } from '@/stores/tickets-pre-cash-in'
import { usePreMatchLeagueEvents } from '@/stores/pre-match-league-events'

import SelectSport from '@/components/default/molecules/SelectSport'
// import FeaturedSlides from '@/components/default/organisms/FeaturedSlides'
import GamesList from '@/components/default/organisms/GamesList'

export default {
  name: 'League',
  components: {
    SelectSport,
    // FeaturedSlides,
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
    ...mapState(useSettingsStore, {
      currentAds: 'currentAds',
      currentSlides: 'currentSlides',
      currentSettings: 'currentSettings'
    }),
    ...mapState(useMetadataSportsStore, {
      getMetadataSports: 'getMetadataSports'
    }),
    ...mapState(useTicketsPreCashInStore, {
      getPreCashInTickets: 'getPreCashInTickets',
    }),
    ...mapState(usePreMatchLeagueEvents, {
      getPreMatchLeagueEvents: 'getPreMatchLeagueEvents'
    })
    // ...mapGetters({
    //   getOdds: 'odds/getOdds',
    //   currentFeaturedBets: 'bets/currentFeaturedBets',
    //   getPreMatchFeaturedEvents: 'pre-match-featured-events/getPreMatchFeaturedEvents'
    // })
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

    this.fetchPreMatchLeagueEvents(this.id)
    // await this.fetchPreMatchFeaturedEvents(this.currentSport)
    // this.commitFeaturedBets(this.getPreMatchFeaturedEvents)
  },
  methods: {
    ...mapActions(usePreMatchLeagueEvents, {
      fetchPreMatchLeagueEvents: 'fetchPreMatchLeagueEvents'
    }),
    ...mapActions(useTicketsPreCashInStore, {
      toggleTicket: 'toggleTicket',
    }),
    // ...mapActions({
    //   commitFeaturedBets: 'bets/commitFeaturedBets',
    //   changeFilter: 'pre-match/changeFilter',
    //   fetchPreMatchEvents: 'pre-match/fetchPreMatchEvents',
    //   fetchPreMatchFeaturedEvents: 'pre-match-featured-events/fetchPreMatchFeaturedEvents'
    // }),
    fetchSearch (payload) {
      // this.changeFilter({ team: payload })
      // this.fetchPreMatchEvents()
    },
    fetchDate (payload) {
      // this.changeFilter({
      //   page: null,
      //   hour: null,
      //   date: payload
      // })

      // this.fetchPreMatchEvents()
    }
  }
}
</script>
