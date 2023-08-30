<template>
  <div class="container-fluid mx-0">
    <div class="row mx-0">
      <div
        :class="{
          'col-12': !currentAds,
          'col-12': currentAds && currentAds.length === 0,
          'col-lg-10': currentAds && currentAds.length > 0
        }"
      >
        <select-sport
          :default-top-distance="genericStyling"
          inplay
          :sports="getMetadataInplaySports"
        />
        <inplay-games-list
          :inplay-games="gamesFiltered"
          :loading="getInplayLoading"
          :tickets="getPreCashInTickets"
          nav
          breadcrumb
          @searchTerm="term => searchGamesByTerm(term)"
          @selectBet="ticket => toggleTicket(ticket)"
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
import InplayGamesList from '@/components/default/organisms/InplayGamesList.vue'
import SelectSport from '@/components/default/molecules/SelectSport.vue'

export default {
  name: 'AoVivo',
  components: {
    InplayGamesList,
    SelectSport
  },
  props: {
    genericStyling: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      gamesFiltered: [],
      filterTerm: '',
      sport: '6046',
      interval: null
    }
  },
  computed: {
    ...mapGetters({
      getMetadataInplaySports: 'metadata-sports/getMetadataInplaySports',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getInplayLoading: 'inplay/getInplayLoading',
      getInplayEvents: 'inplay/getInplayEvents',
      currentAds: 'settings/currentAds'
    }),
    inplayGamesComputed () {
      return this.getInplayEvents
    }
  },
  watch: {
    'inplayGamesComputed' () {
      this.searchGamesByTerm(this.filterTerm)
    }
  },
  created () {
    this.sport = this.$route.params.sportId

    this.fetchMetadataInplaySports()

    this.fetchInplayEvents(this.sport)

    if (
      !process.env.WS_HOST ||
      !process.env.WS_KEY ||
      !process.env.WS_ACTIVE ||
      (process.env.WS_ACTIVE && process.env.WS_ACTIVE !== 'true')
    ) {
      this.interval = setInterval(() => {
        this.fetchInplayEvents(this.sport)
      }, 5000)
    } else {
      this.interval = setInterval(() => {
        this.fetchAndAddInplayEvents(this.sport)
      }, 180000)
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    ...mapActions({
      fetchMetadataInplaySports: 'metadata-sports/fetchMetadataInplaySports',
      fetchAndAddInplayEvents: 'inplay/fetchAndAddInplayEvents',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket',
      fetchInplayEvents: 'inplay/fetchInplayEvents'
    }),
    searchGamesByTerm (term) {
      this.filterTerm = term
      const searchString = term.toLowerCase()

      if (searchString === '' || searchString === null) {
        this.gamesFiltered = this.getInplayEvents
        return
      }

      const doubleFilter = []

      this.getInplayEvents.forEach((el) => {
        if (el.name.toLowerCase().includes(searchString)) {
          doubleFilter.push(el)
        } else {
          const currentLeague = {
            name: el.name,
            id: el.id,
            games: []
          }

          el.games.forEach((game) => {
            if (
              game.away_team.toLowerCase().includes(searchString) ||
              game.home_team.toLowerCase().includes(searchString)
            ) {
              currentLeague.games.push(game)
            }
          })

          if (currentLeague.games.length > 0) {
            doubleFilter.push(currentLeague)
          }
        }
      })

      this.gamesFiltered = doubleFilter
    }
  }
}
</script>
