<template>
  <div class="d-block d-md-flex">
    <div class="row m-0 bets-content">
      <div class="col-12 px-0 min-height-nsx">
        <nsx-card-wrapper
          back
          :icon="getSportIcon(currentSport)"
          :title="`<span class='text-secondary'>${events&&events.length>0&&events[0]&&events[0].name?events[0].name:''}</span>`"
          :subtitle="`<span class='text-secondary'>${getSportName(currentSport)}</span>`"
        >
          <games-list-nsx
            v-if="events && events.length > 0"
            :current-sport="currentSport"
            :events="events"
            :loading="loading"
            :table-heading="tableHeading"
            :odds="getOdds"
            heading
            :tickets="getPreCashInTickets"
            @selectCurrentGame="selectCurrentGame($event)"
            @selectBet="ticket => toggleTicket(ticket)"
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

export default {
  name: 'LeagueNsx',
  components: {
    GamesListNsx,
    NsxCardWrapper
  },
  data () {
    return {
      currentSport: null,
      tableHeading: {},
      id: null
    }
  },
  computed: {
    ...mapGetters({
      loading: 'load',
      events: 'events/events',
      getOdds: 'odds/getOdds',
      currentSettings: 'settings/currentSettings',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getPreMatchFeaturedEvents: 'pre-match-featured-events/getPreMatchFeaturedEvents'
    })
  },
  async mounted () {
    this.id = +this.$route.params.id
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

    this.fetchEventsFromLeague(this.id)
    await this.fetchPreMatchFeaturedEvents(this.currentSport)
    this.commitFeaturedBets(this.getPreMatchFeaturedEvents)
  },
  methods: {
    ...mapActions({
      fetchPreMatchFeaturedEvents: 'pre-match-featured-events/fetchPreMatchFeaturedEvents',
      fetchPreMatchSingleEvent: 'pre-match-single-event/fetchPreMatchSingleEvent',
      fetchEventsFromLeague: 'events/fetchEventsFromLeague',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket',
      commitFeaturedBets: 'bets/commitFeaturedBets',
      commitCurrentEvent: 'bets/commitCurrentEvent'
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
