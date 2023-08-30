<template>
  <div class="d-block d-md-flex">
    <div class="row m-0 bets-content">
      <div class="col-md-12 px-0 min-height-nsx">
        <select-sport-nsx
          class="mb-0"
          :current-selected="sport"
          :games="getInplayEvents"
          :current-settings="currentSettings"
          :sports="getMetadataInplaySports"
          @change="id=>replaceRouter(id)"
        />
        <nsx-card-wrapper back-url="/" :icon="getSportIcon(getSportId)" :title="getSportName(getSportId)">
          <full-inplay-games-list-nsx
            :key="'full_'+sport"
            :loading="getInplayLoading"
            :current-bets="getInplayEvents"
            :current-sport="sport"
            :tickets="getPreCashInTickets"
            @selectBet="ticket => toggleTicket(ticket)"
          />
        </nsx-card-wrapper>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FullInplayGamesListNsx from '@/components/nsx/organisms/FullInplayGamesListNsx.vue'
import SelectSportNsx from '@/components/nsx/molecules/SelectSportNsx.vue'
import NsxCardWrapper from '@/components/nsx/molecules/NsxCardWrapper.vue'

export default {
  name: 'NsxAoVivo',
  components: {
    FullInplayGamesListNsx,
    SelectSportNsx,
    NsxCardWrapper
  },
  data () {
    return {
      sport: null,
      interval: null
    }
  },
  computed: {
    ...mapGetters({
      getMetadataInplaySports: 'metadata-sports/getMetadataInplaySports',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getInplayLoading: 'inplay/getInplayLoading',
      currentSettings: 'settings/currentSettings',
      getInplayEvents: 'inplay/getInplayEvents',
      getOdds: 'odds/getOdds'
    }),
    getSportId () {
      return +this.$route.params.sportId
    }
  },
  created () {
    this.sport = +this.$route.params.sportId

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
    replaceRouter (id) {
      this.$router.push(this.localePath(`/sport/${id}/aovivo`))
    },
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.bets-content{
  width: 100%;
  // @include md{
  //   width: 100%;
  //   max-height: calc(100vh - 125px);
  //   overflow: auto;
  // }
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
.event-holder{
  text-overflow: ellipsis;
  overflow: hidden;
}
.event-tite{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bg-bets{
  background: var(--nsx-dark-1);
}
.min-height-nsx{
  min-height: calc(100vh - 50px);
}
</style>
