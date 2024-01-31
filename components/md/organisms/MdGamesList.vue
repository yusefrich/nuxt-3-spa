<template>
  <div>
    <div v-if="league">
      <n-link :to="localePath('/')" class="ms-3 px-0 go-back">
        <font-awesome-icon class="icon me-2 mt-2" :icon="['fas', 'arrow-left']" />{{ $t('i18n_todos_os_jogos') }}
      </n-link>
    </div>

    <md-games-table-desk
      v-if="width > 1120"
      :events="events"
      :events-sport="eventsSport"
      :tickets="tickets"
      :inplay="inplay"
      :sport="sport"
      :hide-btn-text="hideBtnText"
      @selectBet="$emit('selectBet', $event)"
    />
    <md-games-table-mobile
      v-else
      :events="events"
      :events-sport="eventsSport"
      :tickets="tickets"
      :inplay="inplay"
      :sport="sport"
      :hide-btn-text="hideBtnText"
      @selectBet="$emit('selectBet', $event)"
    />
  </div>
</template>

<script>
import MdGamesTableDesk from '@/components/md/molecules/MdGamesTableDesk'
import MdGamesTableMobile from '@/components/md/molecules/MdGamesTableMobile'
import windowWidth from '@/mixins.js/windowWidth'

export default {
  components: {
    MdGamesTableDesk,
    MdGamesTableMobile
  },
  mixins: [windowWidth],
  props: {
    eventsSport: {
      type: [Number, String],
      default: null
    },
    events: {
      type: Array,
      default: () => ([])
    },
    tickets: {
      type: Array,
      default: () => ([])
    },
    inplay: {
      type: Boolean,
      default: false
    },
    sport: {
      type: [String, Number],
      default: ''
    },
    hideBtnText: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'selectBet'
  ],
  data () {
    return {
      league: null
    }
  },
  computed: {
    // computed para substituir events na prop do md-game-table... quando o back retornar o id nos eventos
    filteredEvents () {
      if (this.league) {
        return this.events.filter(item => item.id === this.league)
      }

      return this.events
    }
  },
  created () {
    this.league = this.$route.params.id
  }
}
</script>

<style lang="scss" scoped>
.go-back {
  color: var(--md-font-color);
  text-decoration: none;
}
</style>
