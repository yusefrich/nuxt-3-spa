<template>
  <div class="generic-list">
    <div
      class="market-title"
      data-bs-toggle="collapse"
      :data-bs-target="`#collapse${compId}`"
      aria-expanded="true"
      :aria-controls="`collapse${compId}`"
      @click.stop
    >
      <h4 class="header-text mb-2 mt-1">
        {{ rawOdds.name }}
      </h4>
    </div>
    <div
      :id="`collapse${compId}`"
      class="container-fluid table show"
      style="padding: 0px 1px"
    >
      <div class="row w-100 m-0">
        <div
          v-for="(odd, j) in rawOdds.odds"
          :key="`group_body_list_odds_${odd.name}_${j}`"
          :class="[rawOdds.col ? 'col-' + rawOdds.col : 'col-3', 'px-0', getLevarage(odd.leverage)]"
        >
          <sk-odds-btn
            v-if="!odd.finished"
            :odd="odd"
            :selected="hasSelected(odd.type)"
            @click="validateTicket(odd)"
          >
            <span> {{ odd.name }} </span>
            <span class="ms-2 position-relative odd">
              <span style="vertical-align: middle">
                <font-awesome-icon
                  v-if="odd.blocked"
                  class="flash"
                  style="font-size: 22px"
                  :icon="['fas', 'lock']"
                />
                <font-awesome-icon
                  v-if="odd.finished"
                  class="flash"
                  style="font-size: 22px"
                  :icon="['fas', 'times']"
                />
                <font-awesome-icon
                  v-if="odd.leverage && odd.leverage === 'up'"
                  class="flash"
                  style="font-size: 22px"
                  :icon="['fas', 'caret-up']"
                />
                <font-awesome-icon
                  v-if="odd.leverage && odd.leverage === 'down'"
                  class="flash-2"
                  style="font-size: 22px"
                  :icon="['fas', 'caret-down']"
                />
              </span>
              {{ odd.odds }}
            </span>
          </sk-odds-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SkOddsBtn from '@/components/sk/atoms/SkOddsBtn.vue'

export default {
  name: 'SkOddsGenericList',
  components: {
    SkOddsBtn
  },
  props: {
    event: {
      type: Object,
      default: () => ({})
    },
    rawOdds: {
      type: Object,
      default: () => ({})
    },
    live: {
      type: Boolean,
      default: false
    },
    tickets: {
      type: Array,
      default: () => ([])
    },
    compId: {
      type: String,
      default: ''
    }
  },
  methods: {
    validateTicket (odd) {
      if (
        !odd.odds || odd.odds <= 1 || this.invalidMultiple(this.event.id, odd.type, this.tickets)
      ) {
        return
      }

      this.$emit('selectBet', {
        gameId: this.event.id,
        odd,
        market: this.rawOdds.name,
        event: `${this.event.home_team} x ${this.event.away_team}`,
        validate: this.event.datetime,
        live: this.live
      })
    },
    getLevarage (levarage) {
      if (levarage === 'up') {
        return 'background-lev-success'
      }
      if (levarage === 'down') {
        return 'background-lev-danger'
      }
      return levarage
    },
    invalidMultiple (gameId, type, tickets) {
      if (this.layout !== 'FB') {
        return false
      }
      return tickets.find(e => e.gameId === gameId && e.odd.type !== type)
    },
    hasSelected (type) {
      const currentTicketIndex = this.tickets.findIndex(obj => obj.odd.type === type)
      if (currentTicketIndex !== -1) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.generic-list {
  background: var(--fut-background-lighter);
  border-radius: 6px;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12), inset 0 1px rgba(255, 255, 255, .04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12), inset 0 1px rgba(255, 255, 255, .04);
}

.market-title {
  border-bottom: 2px solid var(--fut-background-lightest-2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 17px;
  cursor: pointer;
  .header-text{
    font-weight: 600;
    color: var(--fut-color-dynamic);
  }
  .chevron-icon {
    color: var(--fut-color-dynamic);
    width: 12px;
  }
  &[aria-expanded="false"] {
    .chevron-icon {
      -webkit-transform: rotate(90deg);
      transform: rotate(180deg);
    }
  }
}
.table {
  color: var(--fut-color-dynamic);
}
.odd {
  font-weight: 600;
  color: var(--fut-primary-lighter);
  white-space: nowrap;
}
</style>
