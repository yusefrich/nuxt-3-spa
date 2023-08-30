<template>
  <div class="container">
    <div class="header">
      <button class="return-btn transition" @click="$router.push(localePath('/sports'))">
        <font-awesome-icon class="icon" :icon="['fas', 'chevron-left']" />
      </button>
      <p class="sport m-0">
        {{ sports[currentSport] }}
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
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'SkSport',
  mixins: [windowWidth],
  data () {
    return {
      currentSport: null,
      selectedComp: 'inplay'
    }
  },
  computed: {
    ...mapGetters({
      getInplayEvents: 'inplay/getInplayEvents',
      getPreMatchEvents: 'pre-match/getPreMatchEvents',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets'
    }),
    sports () {
      return {
        6046: this.$t('i18n_futebol'),
        35709: this.$t('i18n_handebol'),
        48242: this.$t('i18n_basquete'),
        54094: this.$t('i18n_tenis'),
        131506: this.$t('i18n_futebol_americano'),
        154830: this.$t('i18n_volei'),
        154914: this.$t('i18n_basebol'),
        154919: this.$t('i18n_boxe'),
        265917: this.$t('i18n_tenis_de_mesa'),
        621569: this.$t('i18n_volei_de_praia'),
        687890: 'E-Games'
      }
    },
    compList () {
      return {
        inplay: {
          text: this.$t('i18n_eventos_ativos')
        },
        preMatch: {
          text: this.$t('i18n_comecando_em_breve')
        }
      }
    },
    isMobile () {
      return this.width <= 821
    },
    events () {
      if (
        (this.selectedComp === 'preMatch' && !this.getPreMatchEvents) ||
        (this.selectedComp === 'inplay' && !this.getInplayEvents)
      ) {
        return []
      }

      if (this.selectedComp === 'preMatch') {
        return this.getPreMatchEvents
      }

      return this.getInplayEvents
    }
  },
  watch: {
    '$route.query.tab' (value) {
      this.selectedComp = value
    }
  },
  created () {
    this.currentSport = this.$route.params.sportId

    this.changeComp('inplay')
  },
  methods: {
    ...mapActions({
      changeFilter: 'pre-match/changeFilter',
      fetchInplayEvents: 'inplay/fetchInplayEvents',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket',
      fetchPreMatchEvents: 'pre-match/fetchPreMatchEvents',
      changeSkOpenTicket: 'tickets-pre-cash-in/changeSkOpenTicket'
    }),
    changeComp (compName) {
      this.selectedComp = compName

      this.$router.replace({ query: { tab: this.selectedComp } })

      const compActions = {
        inplay: () => this.fetchInplayEvents(this.currentSport),
        preMatch: () => {
          this.changeFilter({ sport: this.currentSport })
          this.fetchPreMatchEvents()
        }
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

    .sport {
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
