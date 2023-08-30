<template>
  <div class="d-block d-md-flex">
    <div class="row m-0 bets-content">
      <div class="col-12 px-0 min-height-nsx">
        <nsx-time-filter
          :countries="getMetadataOrderedCountries"
          :current-country-cc="currentCountryCc"
          @changeCountry="(country) => {filters.country = country; currentCountryCc = country}"
        />
        <nsx-card-wrapper
          back
          :icon="getSportIcon(filters.sport)"
          :title="getSportName(filters.sport)"
        >
          <games-list-nsx
            v-if="events && events.length > 0"
            :loading="loading"
            :events="events"
            :table-heading="tableHeading"
            :odds="getOdds"
            heading
            @selectCurrentGame="selectCurrentGame($event)"
          />
        </nsx-card-wrapper>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import GamesListNsx from '@/components/nsx/organisms/GamesListNsx.vue'
import NsxCardWrapper from '@/components/nsx/molecules/NsxCardWrapper.vue'
import NsxTimeFilter from '@/components/nsx/molecules/NsxTimeFilter.vue'

export default {
  name: 'GamesFilteredNsx',
  components: {
    GamesListNsx,
    NsxCardWrapper,
    NsxTimeFilter
  },
  data () {
    return {
      loading: false,
      currentCountryCc: null,
      filters: {
        date: null,
        hour: null,
        team: null,
        page: null,
        country: null,
        paginate: 'all',
        sport: 1
      },
      currentSport: null,
      tableHeading: {}
    }
  },
  computed: {
    ...mapGetters({
      getMetadataOrderedCountries: 'metadata-countries/getMetadataOrderedCountries',
      currentSettings: 'settings/currentSettings',
      getOdds: 'odds/getOdds',
      events: 'events/events'
    })
  },
  watch: {
    'filters.country' () {
      this.loading = true
      this.fetchEvents(this.filters).finally(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.filters.sport = +this.$route.params.sportId

    if (this.$route.params.timeFilter && +this.$route.params.timeFilter > 0) {
      this.filters.hour = +this.$route.params.timeFilter
    }

    this.loading = true

    this.fetchEvents(this.filters).finally(() => {
      this.loading = false
    })

    this.fetchMetadataOrderedCountries(this.filters.sport)

    this.currentSport = (this.$route.params.sportId) ? +this.$route.params.sportId : 1

    this.tableHeading = {
      title: this.$t('i18n_resultado_final').toUpperCase(),
      subtitle: [this.$t('i18n_casa'), this.$t('i18n_empate'), this.$t('i18n_fora')],
      subtitleSlug: ['full_time_result_home', 'full_time_result_draw', 'full_time_result_away']
    }

    if (this.currentSport !== 1 && this.currentSport !== 6046) {
      this.tableHeading = {
        title: this.$t('i18n_resultado_final').toUpperCase(),
        subtitle: [this.$t('i18n_casa'), this.$t('i18n_fora')],
        subtitleSlug: ['full_time_result_home', 'full_time_result_away']
      }
    }
  },
  methods: {
    ...mapActions({
      fetchEvents: 'events/fetchEvents',
      commitCurrentEvent: 'bets/commitCurrentEvent',
      fetchPreMatchSingleEvent: 'pre-match-single-event/fetchPreMatchSingleEvent',
      fetchMetadataOrderedCountries: 'metadata-countries/fetchMetadataOrderedCountries'
    }),
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
    selectCurrentGame (slug) {
      this.commitCurrentEvent({})

      this.fetchPreMatchSingleEvent(slug).then((res) => {
        this.commitCurrentEvent(res)
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
.min-height-nsx{
  min-height: calc(100vh - 50px);
}
</style>
