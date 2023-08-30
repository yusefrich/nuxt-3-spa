<template>
  <div class="generic-table mt-2">
    <div
      class="market-title"
      data-bs-toggle="collapse"
      :data-bs-target="`#collapse${compId}`"
      aria-expanded="true"
      :aria-controls="`collapse${compId}`"
      @click.stop
    >
      <h6 class="header-text mb-0">
        {{ rawOdds.name }}
      </h6>
      <font-awesome-icon class="chevron-icon" :icon="['fas', 'chevron-up']" />
    </div>
    <div
      :id="`collapse${compId}`"
      class="table-wrapper show"
    >
      <table>
        <thead>
          <tr>
            <th
              v-if="checkIfNames()"
            />
            <th
              v-for="(item, index) in getHeaders"
              :key="'header_key_'+rawOdds.name+index"
              :style="`width: calc(100% / ${checkIfNames() && width <= 425 ? getHeaders.length+1 : getHeaders.length});`"
              class="text-center"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(name, index) in getNames"
            :key="`group_odds_${rawOdds.name}_${index}`"
          >
            <td
              v-if="name"
              class=" fw-bold"
            >
              {{ name }}
            </td>
            <td
              v-for="(header, j) in getHeaders"
              :key="`group_body_odds_${rawOdds.name}_${j}`"
            >
              <div class="btn-wrapper">
                <sk-odds-btn
                  :key="`group_body_odds_${rawOdds.name}_${j}`"
                  :odd="rawOdds.odds[j]"
                  :selected="hasSelected(getOddByNameAndHeader(name, header).type)"
                  class="odd-btn"
                  @click="validateTicket(name, header)"
                >
                  <template v-if="!getOddByNameAndHeader(name, header).finished">
                    <div class="d-flex align-items-center justify-content-evenly">
                      <span v-if="getOddByNameAndHeader(name, header).desc">
                        {{ getOddByNameAndHeader(name, header).desc }}
                      </span>
                      <div>
                        <div
                          v-if="
                            getOddByNameAndHeader(name, header).super_odd && getOddByNameAndHeader(name, header).super_odd.slug === getOddByNameAndHeader(name, header).type
                          "
                          class="super-odd-wrapper"
                        >
                          <span class="normal-odd me-2">
                            {{ getOddByNameAndHeader(name, header).super_odd.normal_odd ? getOddByNameAndHeader(name, header).super_odd.normal_odd : '-' }}
                          </span>
                          <span class="super-odd">
                            {{ getOddByNameAndHeader(name, header).super_odd.odd ? getOddByNameAndHeader(name, header).super_odd.odd : '-' }}
                          </span>
                        </div>
                        <span v-else class="position-relative ms-3 odd">
                          <span style="vertical-align: middle">
                            <font-awesome-icon
                              v-if="getOddByNameAndHeader(name, header).blocked"
                              class="flash"
                              style="font-size: 22px"
                              :icon="['fas', 'lock']"
                            />
                            <font-awesome-icon
                              v-if="getOddByNameAndHeader(name, header).finished"
                              class="flash"
                              style="font-size: 22px"
                              :icon="['fas', 'times']"
                            />
                            <font-awesome-icon
                              v-if="getOddByNameAndHeader(name, header).leverage && getOddByNameAndHeader(name, header).leverage === 'up'"
                              class="flash"
                              style="font-size: 22px"
                              :icon="['fas', 'caret-up']"
                            />
                            <font-awesome-icon
                              v-if="getOddByNameAndHeader(name, header).leverage && getOddByNameAndHeader(name, header).leverage === 'down'"
                              class="flash-2"
                              style="font-size: 22px"
                              :icon="['fas', 'caret-down']"
                            />
                          </span>
                          {{ getOddByNameAndHeader(name, header).odds ? getOddByNameAndHeader(name, header).odds : '-' }}
                        </span>
                      </div>
                    </div>
                  </template>
                </sk-odds-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SkOddsBtn from '@/components/sk/atoms/SkOddsBtn.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'SkOddsGenericTable',
  components: {
    SkOddsBtn
  },
  mixins: [windowWidth],
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
  computed: {
    getNames () {
      if (!Array.isArray(this.rawOdds.odds)) {
        return []
      }

      const names = this.rawOdds.odds
        .filter(odd => !odd.finished)
        .map(odd => odd.name)

      return names.filter((name, idx) => names.indexOf(name) === idx)
    },
    getHeaders () {
      if (!Array.isArray(this.rawOdds.odds)) {
        return []
      }

      const headers = this.rawOdds.odds
        .filter(odd => !odd.finished)
        .map(odd => odd.header)

      return headers.filter((header, idx) => headers.indexOf(header) === idx)
    }
  },
  methods: {
    validateTicket (name, header) {
      if (!this.getOddByNameAndHeader(name, header).odds || this.getOddByNameAndHeader(name, header).odds <= 0) {
        return
      }
      if (this.getOddByNameAndHeader(name, header).super_odd && this.getOddByNameAndHeader(name, header).super_odd.odds <= 1) {
        return
      }

      this.selectBet({
        gameId: this.event.id,
        odd: this.trueValueOdd(this.getOddByNameAndHeader(name, header)),
        market: this.rawOdds.name,
        event: `${this.event.home_team} x ${this.event.away_team}`,
        validate: this.getOddByNameAndHeader(name, header).datetime,
        live: this.live
      })
    },
    getOddByNameAndHeader (name, header) {
      let odd = {
        header: '',
        name: '',
        odds: '',
        leverage: '',
        desc: '',
        type: ''
      }
      this.rawOdds.odds.forEach((e) => {
        if (e.name === name && e.header === header) {
          odd = e
        }
      })
      return odd
    },
    selectBet (ticket) {
      this.$emit('selectBet', ticket)
    },
    trueValueOdd (odd) {
      const newOdd = { ...odd }
      if (newOdd.super_odd) {
        newOdd.odds = odd.super_odd.odd
      }
      return newOdd
    },
    // todo add hasSelected to utils
    hasSelected (type) {
      const currentTicketIndex = this.tickets.findIndex(obj => obj.odd.type === type)
      if (currentTicketIndex !== -1) {
        return true
      }
      return false
    },
    checkIfNames () {
      return !this.getNames.includes('')
    },
    getLevarage (levarage) {
      if (levarage === 'up') {
        return 'background-lev-success'
      }
      if (levarage === 'down') {
        return 'background-lev-danger'
      }
      return levarage
    }
  }
}
</script>

<style lang="scss" scoped>
.generic-table {
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
.table-wrapper {
  padding: 8px 17px 17px 17px;
}
table {
  color: var(--fut-color-dynamic);
  width: 100%;
  thead {
    tr {
      th {
        color: var(--fut-secondary);
        font-weight: 500;
      }
    }
  }
  tbody {
    tr {
      td {
        min-width: 100px;
        .btn-wrapper {
          display: flex;
          justify-content: center;

          .odd {
            font-weight: 600;
            color: var(--fut-primary-lighter);
            white-space: nowrap;
          }
        }
      }
    }
  }
}

.super-odd-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  .normal-odd {
    font-size: 12px;
    margin-top: 2px;
    text-decoration: line-through;
    font-weight: 400;
  }
  .super-odd {
    text-decoration: underline;
  }
}

@media (max-width: 425px) {
  th {
    font-size: 13px;
  }
  td {
    min-width: 30px !important;
    font-size: 12px;
  }
}
</style>
