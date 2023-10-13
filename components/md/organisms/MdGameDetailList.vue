<template>
  <div v-if="event">
    <nav class="nav-filter">
      <button
        v-if="navScrollbar && scrolled > 0"
        class="scroll-left"
        @click.stop="changeScrollTo('left')"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>
      <ul class="nav-itens nav">
        <li
          v-for="(eventsHeader, idx) in event.all_odds"
          :key="'odds_header_'+idx"
        >
          <button
            :id="`nav-${eventsHeader.header}-tab`"
            :class="`link ${idx===0?'active':''}`"
            :data-bs-target="`#nav-${eventsHeader.header}`"
            :aria-controls="`nav-${eventsHeader.header}`"
            data-bs-toggle="tab"
            role="tab"
            aria-selected="true"
          >
            {{ eventsHeader.label }}
          </button>
        </li>
      </ul>
      <button
        v-if="navScrollbar && scrolled < scrollTabs"
        class="scroll-right"
        @click.stop="changeScrollTo('right')"
      >
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </nav>
    <div id="nav-tabContent" class="tab-content">
      <template v-for="(eventsHeader, i) in event.all_odds">
        <div
          :id="`nav-${eventsHeader.header}`"
          :key="'odds_body_'+i"
          :class="`tab-pane fade ${i===0?'show active':''}`"
          role="tabpanel"
        >
          <template v-for="(market, index) in eventsHeader.odds">
            <div v-if="market && hasValidOdds(market.odds)" :key="'main_'+index">
              <md-odds-generic-table
                v-if="market.slug === 'generic_table'"
                :key="oddsSum(market.odds)"
                :tickets="tickets"
                :live="live"
                :raw-odds="market"
                :event="event"
                :comp-id="`generic_table_${index}`"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <md-odds-generic-cols
                v-if="market.slug === 'generic_cols'"
                :key="oddsSum(market.odds)"
                :tickets="tickets"
                :live="live"
                :raw-odds="market"
                :event="event"
                :comp-id="`generic_cols_${index}`"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
              <md-odds-generic-list
                v-if="market.slug === 'generic_list'"
                :key="oddsSum(market.odds)"
                :tickets="tickets"
                :live="live"
                :raw-odds="market"
                :event="event"
                :comp-id="`generic_list_${index}`"
                @selectBet="ticket=>$emit('selectBet', ticket)"
              />
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import windowWidth from '~/mixins.js/windowWidth'

export default {
  name: 'MdGameDetailList',
  mixins: [windowWidth],
  props: {
    live: {
      type: Boolean,
      default: false
    },
    tickets: {
      type: Array,
      default: () => ([])
    },
    event: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      ulWidth: 0,
      scrolled: 0,
      scrollTo: 0
    }
  },
  computed: {
    navScrollbar () {
      if (this.ulWidth > this.width - 24) {
        return true
      }

      return false
    },
    scrollTabs () {
      return Math.ceil(this.ulWidth / this.width)
    }
  },
  mounted () {
    if (this.event) {
      this.ulWidth = document.querySelector('.nav-itens').scrollWidth
      window.addEventListener('resize', this.handleCurrentPageResize)
      this.handleCurrentPageResize()
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleCurrentPageResize)
  },
  methods: {
    handleCurrentPageResize () {
      this.ulWidth = document.querySelector('.nav-itens').scrollWidth
    },
    changeScrollTo (direction) {
      if (direction === 'right') {
        this.scrollTo += Math.floor(this.ulWidth / Math.ceil(this.ulWidth / (this.ulWidth - this.width)))
        document.querySelector('.nav-itens').scrollTo({
          left: this.scrollTo,
          behavior: 'smooth'
        })
        this.scrolled++
        return
      }

      this.scrollTo -= Math.floor(this.ulWidth / Math.ceil(this.ulWidth / (this.ulWidth - this.width)))
      document.querySelector('.nav-itens').scrollTo({
        left: this.scrollTo,
        behavior: 'smooth'
      })
      this.scrolled--
    },
    hasValidOdds (odds) {
      let invalidOddCheck = false
      if (!odds) {
        return false
      }
      odds.forEach((e) => {
        if (e.finished) {
          invalidOddCheck = true
        }
      })
      return !invalidOddCheck
    },
    oddsSum (odds) {
      let total = 0
      // return 0
      if (!odds) {
        return total
      }
      if (Array.isArray(odds)) {
        return odds.reduce((accumulator, object) => {
          return accumulator + +object.odds
        }, 0)
      }
      if (typeof odds === 'object' && !Array.isArray(odds) && odds !== null) {
        for (const key in odds) {
          if (Object.hasOwnProperty.call(odds, key)) {
            total = total + +odds[key].odds
          }
        }
      }
      return total
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-filter {
  position: relative;
  margin-top: 8px;
  background: var(--md-comp-bg-color);
  border-radius: 6px;
  border: 1px solid var(--md-comp-border-color);
  -webkit-box-shadow: 0 0 10px 0 var(--md-shadow-color);
  box-shadow: 0 0 10px 0 var(--md-shadow-color);
  .nav-itens {
    list-style: none;
    padding: 0 5px;
    margin: 0;
    display: flex;
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 0;
    }
    li {
      margin: 5px 0;
    }
  }
  .nav {
    flex-wrap: nowrap !important;
  }
  .link {
    background: var(--md-comp-bg-color);
    border-radius: 4px;
    border: none;
    padding: 2px 1rem;
    margin-right: 4px;
    white-space: nowrap;
    color: var(--md-font-color);
    &:hover {
      background: var(--fut-primary-darkest);
      color: #fff;
    }
  }
  .active {
    background: var(--fut-primary) !important;
    font-weight: normal !important;
    color: #fff;
  }
  .scroll-left {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    padding: 0 7px 0 10px;
    color: var(--md-font-color);
    background: var(--md-comp-bg-color);
    border: none;
    border-radius: 0 12px 12px 0;
    -webkit-box-shadow: 12px 0 10px 0 var(--md-comp-bg-color);
    box-shadow: 12px 0 10px 0 var(--md-comp-bg-color);
  }
  .scroll-right {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 0 10px 0 7px;
    color: var(--md-font-color);
    background: var(--md-comp-bg-color);
    border: none;
    border-radius: 12px 0 0 12px;
    -webkit-box-shadow: -12px 0 10px 0 var(--md-comp-bg-color);
    box-shadow: -12px 0 10px 0 var(--md-comp-bg-color);
  }
}

@media (max-width: 425px) {
  .link:hover {
    background: var(--md-comp-bg-color);
  }
}
</style>
