<template>
  <div class="md-leagues">
    <md-games-table-wrapper
      :title="$t('i18n_destaques')"
      img-url="/md/icon-stars.svg"
    >
      <template #table>
        <md-games-list
          v-if="currentSettings"
          :events="getPreMatchLeagueEvents"
          :events-sport="currentSport"
          :tickets="getPreCashInTickets"
          @selectBet="ticket => toggleTicket(ticket)"
        />
      </template>
    </md-games-table-wrapper>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'

import { useSettingsStore } from '@/stores/settings'
import { useTicketsPreCashInStore } from '@/stores/tickets-pre-cash-in'
import { usePreMatchLeagueEvents } from '@/stores/pre-match-league-events'

import MdGamesList from '@/components/md/organisms/MdGamesList'
import MdGamesTableWrapper from '@/components/md/atoms/MdGamesTableWrapper'

export default {
  name: 'MdLeague',
  components: {
    MdGamesList,
    MdGamesTableWrapper
  },
  data () {
    return {
      id: null,
      currentSport: null
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
    this.currentSport = (this.$route.params.sportId) ? +this.$route.params.sportId : 1

    document.querySelector('.scrollable-content').scrollTo({
      top: 0
    })

    this.fetchPreMatchLeagueEvents(this.id)
  },
  methods: {
    ...mapActions(usePreMatchLeagueEvents, {
      fetchPreMatchLeagueEvents: 'fetchPreMatchLeagueEvents'
    }),
    ...mapActions(useTicketsPreCashInStore, {
      toggleTicket: 'toggleTicket',
    })
  }
}
</script>

<style lang="scss" scoped>
.md-leagues {
  width: 100%;
  background: var(--md-bg-color);
}
</style>
