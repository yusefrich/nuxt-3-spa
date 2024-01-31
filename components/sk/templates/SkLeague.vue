<template>
  <div class="container">
    <div class="header">
      <button
        class="return-btn transition"
        @click="$router.push(localePath('/sports'))"
      >
        <font-awesome-icon class="icon" :icon="['fas', 'chevron-left']" />
      </button>
      <p class="league m-0">
        <span v-if="getPreMatchLeagueEvents && getPreMatchLeagueEvents.length">
          {{ getPreMatchLeagueEvents[0].name }}
        </span>
      </p>
    </div>

    <div :class="{ 'd-flex': !isMobile }" class="my-4">
      <sk-components-select
        :components-list="compList"
        :selected-component="selectedComp"
        @changeComponent="changeComp($event)"
      />
    </div>

    <ul class="events-list">
      <li
        v-for="(item, idx) in getPreMatchLeagueEvents"
        :key="idx"
        class="mt-2 pt-1"
      >
        <!-- Rota que retorna os jogos por liga tem que retornar o sport_id tambem -->
        <sk-leagues-table
          :league="item"
          :comp-id="idx"
          :live="selectedComp === 'inplay'"
          show
          :tickets="getPreCashInTickets"
          :is-mobile="isMobile"
          :events-sport="currentSport"
          @selectBet="toggleTicket($event)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'

import { useTicketsPreCashInStore } from '@/stores/tickets-pre-cash-in'
import { usePreMatchLeagueEvents } from '@/stores/pre-match-league-events'

import SkLeaguesTable from '@/components/sk/molecules/SkLeaguesTable'
import SkComponentsSelect from '@/components/sk/molecules/SkComponentsSelect'

export default {
  name: 'SkLeague',
  components: {
    SkLeaguesTable,
    SkComponentsSelect
  },
  data () {
    return {
      leagueId: null,
      selectedComp: 'preMatch'
    }
  },
  computed: {
    ...mapState(useTicketsPreCashInStore, {
      getPreCashInTickets: 'getPreCashInTickets',
    }),
    ...mapState(usePreMatchLeagueEvents, {
      getPreMatchLeagueEvents: 'getPreMatchLeagueEvents'
    }),
    compList () {
      return {
        // inplay: {
        //   text: this.$t('i18n_eventos_ativos')
        // },
        preMatch: {
          text: this.$t('i18n_comecando_em_breve')
        }
      }
    }
  },
  created () {
    this.leagueId = this.$route.params.id

    this.changeComp('preMatch')
  },
  methods: {
    ...mapActions(usePreMatchLeagueEvents, {
      fetchPreMatchLeagueEvents: 'fetchPreMatchLeagueEvents'
    }),
    ...mapActions(useTicketsPreCashInStore, {
      toggleTicket: 'toggleTicket',
    }),
    changeComp (compName) {
      this.selectedComp = compName

      const compActions = {
        // inplay: () => this.fetchInplayEvents(this.currentSport),
        preMatch: () => this.fetchPreMatchLeagueEvents(this.leagueId)
      }

      compActions[this.selectedComp]()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 34px 3vw 0 3vw !important;

  .header {
    display: flex;

    .return-btn {
      border: none;
      background: var(--fut-background-darkest);
      color: var(--fut-color-dynamic);
      padding: 16px 20px;
      margin-right: 12px;
      display: flex;
      border-radius: .25rem;

      .icon {
        width: 12px;
        height: 12px;
      }

      &:hover {
        background: var(--fut-background-black-2);
      }
    }

    .league {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--fut-background-darkest);
      border-radius: .25rem;
      text-decoration: none;
      color: var(--fut-color-dynamic);
      font-weight: 600;
      font-size: .875rem;
      padding: 0 18px;
      margin: 0;
    }
  }

  .events-list {
    padding: 0;
    margin: 0;
    list-style: none;
  }
}
</style>
