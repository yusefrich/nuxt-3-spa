<template>
  <div id="sidebarListSports">
    <fb-2-sports-select
      :all-sports-data="allSportsData"
      :current-sport="currentSport"
      @changeSport="$emit('changeSport', $event)"
    />

    <fb-2-date-time-filter />

    <div v-if="!hasFilters">
      <div
        v-for="(sport, idx) in allSportsData"
        :key="`group_of_lists${idx}_${customId}`"
      >
        <ul v-if="currentSport === sport.id" id="countryList" class="btn-toggle-nav list-unstyled fw-normal mb-0 small">
          <li v-for="(item, idx2) in sport.country" :key="`count_${item.id}_${idx2}_${customId}`">
            <template v-if="item.link">
              <a
                :href="localePath(`/sport/${sport.id}/league/${item.cc}`)"
                class="w-100 button-sport-leagues align-items-center d-flex d-md-none justify-content-between text-decoration-none py-2 w-100"
              >
                <div>
                  <span class="mx-20 text-white fut-color-dynamic">{{ item.name }}</span>
                </div>
                <fa class="icon" :icon="['fas', 'chevron-down']" />
              </a>
              <a
                class="w-100 button-sport-leagues align-items-center d-none d-md-flex justify-content-between text-decoration-none position-relative py-2 w-100"
                href="#"
                @click="
                  currentRoute('/') ? toggleLeagueToStack({id: item.cc, sport_id: sport.id}) : navigate(`/?games=${item.cc}`)
                "
              >
                <div>
                  <span class="mx-20 text-white fut-color-dynamic">{{ item.name }}</span>
                </div>
                <fa class="icon" :icon="['fas', 'chevron-down']" />
              </a>
            </template>
            <fb-fut-button
              v-else
              :id="'countryButton'+item.id+'Sport'+sport.id+''+customId"
              class="w-100 button-sport-leagues align-items-center d-flex justify-content-between"
              data-bs-toggle="collapse"
              :data-bs-target="`#country-${item.id}-${sport.id}-collapse-${customId}`"
              aria-expanded="false"
              :aria-controls="`country-${item.id}-${sport.id}-collapse-${customId}`"
              border-radius="0px"
            >
              <div>
                <span class="mx-20 text-white fut-color-dynamic">{{ item.name }}</span>
              </div>
              <fa class="icon" :icon="['fas', 'chevron-down']" />
            </fb-fut-button>
            <div
              :id="`country-${item.id}-${sport.id}-collapse-${customId}`"
              class="collapse"
              data-bs-parent="#countryList"
            >
              <a
                v-for="(league, j) in item.leagues"
                :key="`league_${item.cc}_${idx2}_${j}_${customId}`"
                :href="localePath(`/sport/${sport.id}/league/${league.id}?sref=sportButton${sport.id}${customId}&cref=countryButton${item.id}Sport${sport.id}${customId}`)"
                class="button-sport-inside d-md-none"
              >
                <span class="mx-20 text-white fut-color-dynamic">{{ league.name }}</span>
              </a>
              <a
                v-for="(league, j) in item.leagues"
                :key="`league_${item.id}_${idx2}_${j}_${customId}`"
                class="button-sport-inside d-none d-md-block"
                @click="
                  currentRoute('/') ? toggleLeagueToStack({...league, sport_id: sport.id}) : navigate(`/?games=${league.id}`)
                "
              >
                <span class="mx-20 text-white fut-color-dynamic">{{ league.name }}</span>
                <span v-if="selectedGroupIds && checkId(selectedGroupIds, league.id + '')" class="text-success check-group"><fa :icon="['fas', 'check']" /></span>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  name: 'Fb2SidebarSports',
  components: {
    FbFutButton
  },
  props: {
    outright: {
      type: Boolean,
      default: false
    },
    customId: {
      type: String,
      default: ''
    },
    font: {
      type: String,
      default: ''
    },
    mainLeagues: {
      type: Array,
      default: () => ([])
    },
    allSportsData: {
      type: Array,
      default: () => ([])
    },
    selectedGroupIds: {
      type: Array,
      default: () => ([])
    },
    currentSport: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      hoursType: false
    }
  },
  computed: {
    hasFilters () {
      if (Object.keys(this.$route.query).length && !Object.keys(this.$route.query).includes('longTerm')) {
        return true
      }

      return false
    }
  },
  watch: {
    allSportsData (value) {
      if (value && value.length) {
        this.$emit('changeSport', value[0].id)
      }
    },
    '$route.query.currentSport' (value) {
      this.$emit('changeSport', +value)
    }
  },
  methods: {
    navigate (link) {
      window.location.replace(link)
    },
    currentRoute (route) {
      return route === '' + this.$nuxt.$route.path || route + '/' === '' + this.$nuxt.$route.path
    },
    checkId (array, id) {
      return array.includes(id)
    },
    toggleLeagueToStack (league) {
      const currentParams = new URL(location.href).searchParams.get('games')
      const current = currentParams ? (currentParams + '').split('_') : []
      let currentString = ''

      const leagueIndex = current.findIndex(obj => obj === league.id + '+' + league.sport_id)
      if (leagueIndex !== -1) {
        current.splice(leagueIndex, 1)
      }

      current.forEach((e) => {
        if (currentString) {
          currentString = currentString + '_' + e
        } else {
          currentString = e
        }
      })

      if (leagueIndex === -1) {
        if (currentString) {
          currentString = currentString + '_' + league.id + '+' + league.sport_id
        } else {
          currentString = league.id + '+' + league.sport_id
        }
      }

      const searchURL = new URL(window.location)
      searchURL.searchParams.delete('games')
      if (currentString) {
        searchURL.searchParams.set('games', currentString)
      }
      this.$emit('selectedGroupEvents', currentString)
      window.history.pushState({}, '', searchURL)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.check-group{
  position: absolute;
  right: 5px;
  top: 5px;
}
.icon-filter{
  border-right: 1px solid white;
  padding-right: 15px;
  height: 25px;
  width: 25px;
}
.icon-time-filter{
  width: 25px;
  height: 25px;
}
.sport-head{
  font-size: 15px;
}
.bg-gray {
  background-color: var(--fut-background);
  color: white;
}
.search-content {
  width: 100%;
  line-height: 24px;
  height: 24px;
  background-color: #DDD;
  padding-right: 25px;
}
.search {
  border: none;
  outline: none;
  height: 24px;
  font-size: 12px;
}
.week-times {
  background-color: var(--fut-background-3);
  margin: 0px 1px;
  border: none;
  border-radius: 0;
  color: white;
  font-size: 11px;
  padding: 15px 0px;
  position: relative;
  @include md {
    font-size: 10px;
    border-right: 1px solid var(--fut-background-3-white);
    margin: 2px 0px;
    border-bottom: 1px solid var(--fut-background-3-white);
    padding: 3px 0;
  }
  .close-btn{
    background: red;
    position: absolute;
    bottom: -5px;
    right: -5px;
    width: 14px;
    height: 14px;
    z-index: 10;
    border-radius: 50%;
    display: none;
  }
  &.active{
    .the-day{
      color: var(--fut-background);
    }
    .close-btn{
      display: initial;
    }
    background-color: var(--fut-primary);
  }
  &:hover {
    background-color: var(--fut-background-darker);
  }
}
.week-times-dark {
  &.active{
    .close-btn{
      display: initial;
    }
    background-color: var(--fut-primary);
    color: #333333 !important;
  }
  &:hover {
    background-color: var(--fut-primary);
  }
}
.hours-content {
  display: none;
  @include md {
    position: absolute;
    display: flex;
    flex-direction: column;
    .a {
      border: none;
      vertical-align: middle;
      background: var(--fut-background-darkest);
      opacity: 0.9;
      color: white;
      font-size: 11px;
      width: 35px;
      height: 25px;
      text-align: center;
      &:hover {
        background: var(--fut-background);
      }
    }
  }
}
.hours-content-mobile {
  margin: 0 14px;
  display: flex;
  .a {
    vertical-align: middle;
    text-align: center;
    border: none;
    background: var(--fut-background-3);
    font-size: 11px;
    color: white;
    height: 30px;
    width: 30px;
    margin: 0 1px;
  }
}
.title-head {
  font-size: 12px;
}
.button-sport {
  background-color: var(--fut-background);
  border: none;
  border-radius: 5px;
  font-size: 17px;
  line-height: 30px;
  padding: 5px;
  margin: 10px 0px 0px;
  @include md {
    background-color: var(--fut-background);
    border: none;
    margin: 0px;
    font-size: 13px;
    border-radius: 0px;
    border-bottom: 1px solid var(--fut-background-3);
    padding: 0%;
  }
  &:hover {
    background-color: var(--fut-background-darker);
  }
}
.button-sport-leagues {
  background-color: var(--fut-background-lightest-2);
  border: none;
  text-align: left;
  font-size: 15px;
  padding: 10px;
  @include md {
    background-color: var(--fut-background);
    border: none;
    margin: 0px;
    padding: 0%;
    font-size: 12px;
    border-bottom: 1px solid var(--fut-background-3);
  }

  .icon {
    color: var(--fut-color-dynamic);
  }
  &[aria-expanded="true"] {
    .icon {
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
    }
  }
}
.button-sport-inside {
  position: relative;
  display: block;
  text-decoration: none;
  text-align: left;
  border-bottom: 1px solid var(--fut-background-white-3);
  background-color: var(--fut-background-white-2);
  font-size: 14px;
  padding: 7px 20px;
  cursor: pointer;
  // overflow: hidden;
  @include md {
    font-size: 11px;
    padding: 5px 25px;
  }
  &:hover {
    background-color: var(--fut-background-darker);
  }
}
.event-count {
  color: white;
  font-size: 14px;
  @include md {
    min-width: 22px;
    text-align: center;
    line-height: 30px;
    font-size: 9px;
    font-weight: normal;
    background: var(--fut-background-darker);
  }
}
.main-league {
  display: none;
  @include md {
    background-color: var(--fut-background-3);
    display: flex;
    padding: 1% 1%;
    align-items: center;
    text-decoration: none;
    border-radius: 3px;
    .sport {
      font-size: 10px;
    }
    .league {
      color: white;
      font-size: 12px;
    }
    .league-icon-style {
      width: 40px;
      height: 40px;
    }
  }
}
.outright-text{
  font-size: 14px;
  text-transform: uppercase;
}
.outright-content{
  background: var(--fut-background-3);
  padding: 2px;
  padding-left: 5px;
}
.outright-mobile-content{
  margin-left: 5px;
  margin-top: 5px;
  padding: 4px 5px;
}
.outright-mobile-text{
  font-size: 14px;
  color: white;
  text-transform: uppercase;
}
</style>
