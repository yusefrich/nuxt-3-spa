<template>
  <div v-if="getPreMatchLeagueEvents">
    <fb-sections-heading
      class="d-md-none"
      :title="getSportTitle(currentSport)"
      :subtitle="getPreMatchLeagueEvents && getPreMatchLeagueEvents[0] && getPreMatchLeagueEvents[0].name ? getPreMatchLeagueEvents[0].name : ''"
      :route="sref ? '/sports?sref=' + sref + '&cref=' + cref : '/sports'"
    />
    <fb-games-list
      v-if="currentSettings"
      style="margin:0!important"
      :events="getPreMatchLeagueEvents"
      :events-sport="currentSport"
      :loading="loading"
      :stripped="currentSettings.stripped"
      :font="currentSettings.font"
      :tickets="getPreCashInTickets"
      :settings="currentSettings"
      :no-filter="true"
      @invalidMultiple="val => setInvalidMultiple(val)"
      @selectBet="ticket => toggleTicket(ticket)"
    >
      <template #title>
        <div class="d-none d-md-block py-1">
          <img v-if="currentSport === 6046" class="me-2 me-md-0" src="/FbIcons/1.png">
          <img v-if="currentSport === 48242" class="me-2 me-md-0" src="/FbIcons/6.png">
          <img v-if="currentSport === 154919" class="me-2 me-md-0" src="/FbIcons/69.png">
          <img v-if="currentSport === 54094" class="me-2 me-md-0" src="/FbIcons/3.png">
          <img v-if="currentSport === 265917" class="me-2 me-md-0" src="/FbIcons/19.png">
          <img v-if="currentSport === 154830" class="me-2 me-md-0" src="/FbIcons/4.png">
          <img v-if="currentSport === 621569" class="me-2 me-md-0" src="/FbIcons/60.png">
          <img v-if="currentSport === 35709" class="me-2 me-md-0" src="/FbIcons/5.png">
          <img v-if="currentSport === 154914" class="me-2 me-md-0" src="/FbIcons/23.png">
          <img v-if="currentSport === 687890" class="me-2 me-md-0" src="/FbIcons/95.png">
          <img v-if="currentSport === 131506" class="me-2 me-md-0" src="/FbIcons/2.png">
          <span class="title-head">
            {{ getPreMatchLeagueEvents && getPreMatchLeagueEvents[0] && getPreMatchLeagueEvents[0].name ? getPreMatchLeagueEvents[0].name : '' }}
          </span>
        </div>
      </template>
    </fb-games-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'

import { useSettingsStore } from '@/stores/settings'
import { useTicketsPreCashInStore } from '@/stores/tickets-pre-cash-in'
import { usePreMatchLeagueEvents } from '@/stores/pre-match-league-events'

import FbGamesList from '@/components/fb/organisms/FbGamesList'
import FbSectionsHeading from '@/components/fb/atoms/FbSectionsHeading'

export default {
  name: 'FbLeague',
  components: {
    FbGamesList,
    FbSectionsHeading
  },
  data () {
    return {
      sref: null,
      cref: null,
      currentSport: null,
      id: null,
      loading: false
    }
  },
  computed: {
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    }),
    ...mapState(useTicketsPreCashInStore, {
      getPreCashInTickets: 'getPreCashInTickets',
    }),
    ...mapState(usePreMatchLeagueEvents, {
      getPreMatchLeagueEvents: 'getPreMatchLeagueEvents'
    })
  },
  async mounted () {
    this.id = +this.$route.params.id
    this.currentSport = this.$route.params.sportId ? +this.$route.params.sportId : 1

    if (this.$route.query && this.$route.query.sref) {
      this.sref = this.$route.query.sref
      this.cref = this.$route.query.cref
    }

    this.loading = true

    this.fetchPreMatchLeagueEvents(this.id).finally(() => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions(usePreMatchLeagueEvents, {
      fetchPreMatchLeagueEvents: 'fetchPreMatchLeagueEvents'
    }),
    ...mapActions(useTicketsPreCashInStore, {
      toggleTicket: 'toggleTicket',
      setInvalidMultiple: 'setInvalidMultiple'
    }),
    getSportTitle (id) {
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
    }
  }
}
</script>
