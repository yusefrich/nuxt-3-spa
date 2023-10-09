<template>
  <div class="container">
    <div class="header">
      <button class="return-btn transition" @click="$router.push(localePath('/sports'))">
        <font-awesome-icon class="icon" :icon="['fas', 'chevron-left']" />
      </button>
      <p class="league m-0">
        <span v-if="events && events.length">{{ events[0].name }}</span>
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
        v-for="(item, idx) in events"
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
          @selectBet="toggleTicket($event), changeSkOpenTicket(true)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SkLeague',
  data () {
    return {
      leagueId: null,
      selectedComp: 'preMatch'
    }
  },
  computed: {
    ...mapGetters({
      events: 'events/events',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets'
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
    ...mapActions({
      toggleTicket: 'tickets-pre-cash-in/toggleTicket',
      fetchEventsFromLeague: 'events/fetchEventsFromLeague',
      changeSkOpenTicket: 'tickets-pre-cash-in/changeSkOpenTicket'
    }),
    changeComp (compName) {
      this.selectedComp = compName

      const compActions = {
        // inplay: () => this.fetchInplayEvents(this.currentSport),
        preMatch: () => this.fetchEventsFromLeague(this.leagueId)
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
