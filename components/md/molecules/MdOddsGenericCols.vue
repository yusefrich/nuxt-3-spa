<template>
  <div class="generic-cols mt-2">
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
      <div class="flex-table">
        <div class="flex-thead">
          <span
            v-for="(item, index) in getHeaders"
            :key="'header_key_'+rawOdds.name+index"
            class="text-center"
          >
            {{ item }}
          </span>
        </div>

        <div class="flex-tbody">
          <div
            v-for="index in getColsMaxLine(getOddsHeaderGroup())"
            :key="`group_odds_${rawOdds.name}_${index}`"
            class="flex-tr"
          >
            <div
              v-for="(odd, j) in groupedOdds"
              :key="`group_body_odds_${rawOdds.name}_${j}`"
              :style="`width: calc(100% / ${groupedOdds.length});`"
              class="flex-td"
            >
              <div class="btn-wrapper">
                <md-odds-button
                  :key="`group_body_odds_${rawOdds.name}_${j}`"
                  :odd="odd[index - 1]"
                  :selected="hasSelected(odd[index - 1])"
                  width="90%"
                  @click="validateTicket(odd[index - 1])"
                >
                  <div class="btn-cols-text">
                    <span v-if="odd[index - 1] && !odd[index - 1].finished" class="first-text">
                      {{ odd[index - 1].desc ? odd[index - 1].desc : ' ' }}
                    </span>
                    <div v-if="odd[index - 1] && !odd[index - 1].finished" class="seconde-text">
                      <div
                        v-if="odd[index - 1].super_odd && odd[index - 1].super_odd.slug === odd[index - 1].type"
                        class="super-odd-wrapper"
                      >
                        <span class="normal-odd me-2">
                          {{ odd[index - 1].super_odd.normal_odd ? odd[index - 1].super_odd.normal_odd : '-' }}
                        </span>
                        <span class="text-primary super-odd-icon" />
                        <span class="super-odd">
                          {{ odd[index - 1].super_odd.odd ? odd[index - 1].super_odd.odd : '-' }}
                        </span>
                      </div>
                      <span v-else class="position-relative ms-3">
                        <span style="vertical-align: middle">
                          <font-awesome-icon
                            v-if="odd[index - 1].blocked"
                            class="flash"
                            style="font-size: 22px"
                            :icon="['fas', 'lock']"
                          />
                          <font-awesome-icon
                            v-if="odd[index - 1].finished"
                            class="flash"
                            style="font-size: 22px"
                            :icon="['fas', 'times']"
                          />
                          <span
                            v-if="odd[index - 1].leverage && odd[index - 1].leverage === 'up'"
                            class="leverage-up-arrow"
                            style="vertical-align: middle"
                          >
                            <font-awesome-icon class="flash" style="font-size: 22px" :icon="['fas', 'caret-up']" />
                          </span>
                          <span v-if="odd[index - 1].leverage && odd[index - 1].leverage === 'down'" class="leverage-down-arrow" style="vertical-align: middle">
                            <font-awesome-icon class="flash-2" style="font-size: 22px" :icon="['fas', 'caret-down']" />
                          </span>
                        </span>
                        {{ odd[index - 1].odds ? odd[index - 1].odds : '-' }}
                      </span>
                    </div>
                  </div>
                </md-odds-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MdOddsButton from '@/components/md/atoms/MdOddsButton.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'MdOddsGenericCols',
  components: {
    MdOddsButton
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
  data () {
    return {
      groupedOdds: null
    }
  },
  computed: {
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
  mounted () {
    this.groupedOdds = this.getOddsHeaderGroup(this.rawOdds.odds)
  },
  methods: {
    validateTicket (odd) {
      if ((!odd || !odd.odds || odd.odds <= 0) && (!odd.super_odd || odd.super_odd.odds <= 0)) {
        return
      }

      if (odd.blocked || odd.finished) {
        return
      }

      this.$emit('selectBet', {
        gameId: this.event.id,
        odd: this.trueValueOdd(odd),
        market: this.rawOdds.name,
        event: `${this.event.home_team} x ${this.event.away_team}`,
        validate: odd.datetime,
        live: this.live
      })
    },
    hasSelected (odd) {
      const currentTicketIndex = this.tickets.findIndex(obj => obj.odd.type === odd?.type)
      if (currentTicketIndex !== -1) {
        return true
      }
      return false
    },
    groupByKey (array, key) {
      return array
        .reduce((hash, obj) => {
          if (obj[key] === undefined) {
            return hash
          }
          if (obj[key] === '') {
            return hash
          }
          return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
        }, {})
    },
    splitArrayIntoChunksOfLen (arr, len) {
      const chunksArray = []
      let i = 0
      const n = arr.length
      while (i < n) {
        chunksArray.push(arr.slice(i, i += len))
      }
      return chunksArray
    },
    getOddsHeaderGroup () {
      const odds = []
      this.rawOdds.odds.forEach((e) => {
        if (!e.finished) {
          odds.push(e)
        }
      })
      let group = this.groupByKey(odds, 'header')
      if (!group || Object.keys(group).length === 0) {
        group = this.splitArrayIntoChunksOfLen(odds, this.rawOdds.cols ? Math.ceil(odds.length / +this.rawOdds.cols) : Math.ceil(odds.length / 3))
        return group
      }
      const newGroup = []
      for (const key in group) {
        if (Object.hasOwnProperty.call(group, key)) {
          const e = group[key]
          newGroup.push(e)
        }
      }
      return newGroup
    },
    getColsMaxLine (oddsGroup) {
      let maxLength = Number.NEGATIVE_INFINITY
      if (Array.isArray(oddsGroup)) {
        oddsGroup.forEach((e) => {
          if (e.length > maxLength) {
            maxLength = e.length
          }
        })
      }
      for (const item in oddsGroup) {
        if (item.length > maxLength) {
          maxLength = item.length
        }
      }
      return maxLength
    },
    trueValueOdd (odd) {
      const newOdd = { ...odd }
      if (newOdd.super_odd) {
        newOdd.odds = odd.super_odd.odd
      }
      return newOdd
    }
  }
}
</script>

<style lang="scss" scoped>
.generic-cols {
  background: var(--md-comp-bg-color);
  border: 1px solid var(--md-comp-border-color);
  border-radius: 6px;
  -webkit-box-shadow: 0 0 10px 0 var(--md-shadow-color);
  box-shadow: 0 0 10px 0 var(--md-shadow-color);
}
.market-title {
  border-bottom: 1px solid var(--md-comp-border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 17px;
  cursor: pointer;
  .header-text{
    font-weight: 600;
    color: var(--md-font-color);
  }
  .chevron-icon {
    color: var(--md-font-color);
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

.flex-table {
  width: 100%;
  .flex-thead {
    display: flex;
    width: 100%;
    color: var(--md-menu-idx-font-color);
    font-weight: 500;
    font-size: 13px;
    span {
      flex: 1;
    }
  }
  .flex-tbody {
    .flex-tr {
      display: flex;
      padding: 1px 0;
      .flex-td {
        font-size: 12px;
        .btn-wrapper {
          display: flex;
          justify-content: center;
          .btn-cols-text {
            display: flex;
            overflow: hidden;
            justify-content: space-between;
            .first-text {
              width: 70%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}
</style>
