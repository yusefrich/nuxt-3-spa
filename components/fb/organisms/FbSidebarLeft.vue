<template>
  <div id="sidebarList">
    <div class="bg-gray d-none d-md-grid py-2">
      <span class="fw-bold title-head container">{{ $t('i18n_pre_jogo').toUpperCase() }}</span>
    </div>
    <div class="header-sidebar-mobile bg-background d-flex d-md-none py-1 justify-content-between container">
      <div>
        <font-awesome-icon class="text-white mr-10" :icon="['fas', 'caret-left']" />
        <span class="text-white sport-head">{{ $tc('i18n_esporte', 2) }}</span>
      </div>
      <fb-fut-button class="bg-transparent border-0" @click="showClock()">
        <font-awesome-icon class="text-white" :icon="['fas', 'clock']" />
      </fb-fut-button>
    </div>
    <div class="container">
      <div class="search-content d-md-flex d-none bg-white rounded my-1 px-2 align-items-center">
        <input class="w-100 my-1 search" :placeholder="$t('i18n_buscar')" type="text">
        <font-awesome-icon :icon="['fas', 'search']" />
      </div>
    </div>
    <div class="container">
      <fb-fut-button to="#" class="main-league my-2">
        <img class="league-icon-style me-2" src="/FbIcons/leagueFutBr.png">
        <div>
          <span class="sport">{{ $t('i18n_futebol') }}</span>
          <br>
          <span class="league">Brasileirão Série A</span>
        </div>
      </fb-fut-button>
    </div>
    <div class="container">
      <fb-fut-button to="#" class="main-league my-2">
        <img class="league-icon-style me-2" src="/FbIcons/leagueFutBr.png">
        <div>
          <span class="sport">{{ $t('i18n_futebol') }}</span>
          <br>
          <span class="league">Brasileirão Série A</span>
        </div>
      </fb-fut-button>
    </div>
    <div class="container">
      <fb-fut-button to="#" class="main-league my-2">
        <img class="league-icon-style me-2" src="/FbIcons/leagueFutBr.png">
        <div>
          <span class="sport">{{ $t('i18n_futebol') }}</span>
          <br>
          <span class="league">Brasileirão Série A</span>
        </div>
      </fb-fut-button>
    </div>
    <div>
      <div class="w-100 text-white d-none d-md-flex align-items-center">
        <fb-fut-button class="w-100 week-times" @click="showHours()">
          <font-awesome-icon :icon="['fas', 'clock']" />
        </fb-fut-button>
        <fb-fut-button class="w-100 week-times">
          <span>6ª</span>
        </fb-fut-button>
        <fb-fut-button class="w-100 week-times">
          <span>Sa</span>
        </fb-fut-button>
        <fb-fut-button class="w-100 week-times">
          <span>{{ $t('i18n_do') }}</span>
        </fb-fut-button>
        <fb-fut-button class="w-100 week-times">
          <span>2ª</span>
        </fb-fut-button>
        <fb-fut-button class="w-100 week-times">
          <span>3ª</span>
        </fb-fut-button>
        <fb-fut-button class="w-100 week-times">
          <span>4ª</span>
        </fb-fut-button>
        <fb-fut-button class="w-100 week-times">
          <span>5ª</span>
        </fb-fut-button>
      </div>
      <transition name="fade" appear>
        <div v-if="clock === true" class="w-100 text-white d-flex d-md-none align-items-center container-fluid">
          <fb-fut-button class="w-100 week-times" @click="showHours()">
            <font-awesome-icon :icon="['fas', 'clock']" />
          </fb-fut-button>
          <fb-fut-button class="w-100 week-times">
            <span>6ª</span>
          </fb-fut-button>
          <fb-fut-button class="w-100 week-times">
            <span>Sa</span>
          </fb-fut-button>
          <fb-fut-button class="w-100 week-times">
            <span>{{ $t('i18n_do') }}</span>
          </fb-fut-button>
          <fb-fut-button class="w-100 week-times">
            <span>2ª</span>
          </fb-fut-button>
          <fb-fut-button class="w-100 week-times">
            <span>3ª</span>
          </fb-fut-button>
          <fb-fut-button class="w-100 week-times">
            <span>4ª</span>
          </fb-fut-button>
          <fb-fut-button class="w-100 week-times">
            <span>5ª</span>
          </fb-fut-button>
        </div>
      </transition>
      <transition name="fade" appear>
        <div v-if="clock && hours === true" class="hours-content-mobile d-md-none">
          <fb-fut-button class="hours-button">
            1h
          </fb-fut-button>
          <fb-fut-button class="hours-button">
            3h
          </fb-fut-button>
          <fb-fut-button class="hours-button">
            6h
          </fb-fut-button>
          <fb-fut-button class="hours-button">
            9h
          </fb-fut-button>
          <fb-fut-button class="hours-button">
            12h
          </fb-fut-button>
        </div>
      </transition>
      <transition name="fade" appear>
        <div v-if="hours === true" class="hours-content">
          <fb-fut-button class="hours-button">
            1h
          </fb-fut-button>
          <fb-fut-button class="hours-button">
            3h
          </fb-fut-button>
          <fb-fut-button class="hours-button">
            6h
          </fb-fut-button>
          <fb-fut-button class="hours-button">
            9h
          </fb-fut-button>
          <fb-fut-button class="hours-button">
            12h
          </fb-fut-button>
        </div>
      </transition>
      <div v-for="(sport, index) in sports" :key="'group_of_lists'+index">
        <fb-fut-button
          class="w-100 button-sport align-items-center d-flex collapsed rounded justify-content-between"
          data-bs-toggle="collapse"
          :data-bs-target="`#sport-${sport.id}-collapse`"
          aria-expanded="true"
          :aria-controls="`sport-${sport.id}-collapse`"
          @click="selectSport(sport.id)"
        >
          <div class="ms-md-2">
            <img v-if="sport.id === 6046" src="/FbIcons/1.png">
            <img v-if="sport.id === 48242" src="/FbIcons/6.png">
            <img v-if="sport.id === 154919" src="/FbIcons/69.png">
            <img v-if="sport.id === 54094" src="/FbIcons/3.png">
            <img v-if="sport.id === 265917" src="/FbIcons/19.png">
            <img v-if="sport.id === 154830" src="/FbIcons/4.png">
            <img v-if="sport.id === 621569" src="/FbIcons/60.png">
            <img v-if="sport.id === 35709" src="/FbIcons/5.png">
            <img v-if="sport.id === 154914" src="/FbIcons/23.png">
            <img v-if="sport.id === 687890" src="/FbIcons/95.png">
            <img v-if="sport.id === 131506" src="/FbIcons/2.png">
            <span class="fw-normal text-white ms-md-2">{{ sport.name }}</span>
          </div>
          <span class="event-count text-center">1</span>
        </fb-fut-button>
        <div :id="`sport-${sport.id}-collapse`" class="collapse" :class="{show: index===0}" data-bs-parent="#sidebarList">
          <div v-for="(item, idx) in countries" :key="`count_${item.cc}_${idx}`">
            <fb-fut-button
              class="w-100 button-sport-leagues align-items-center d-flex justify-content-between"
              @click="getLeagues(item.cc)"
            >
              <div>
                <span class="mx-20 text-white">{{ item.name }}</span>
              </div>
              <span class="event-count text-center">{{ item.total }}</span>
            </fb-fut-button>
            <div v-if="currentCountry === item.cc">
              <spinner v-if="loadingLeagues" />
              <div v-if="filteredLeagues && +filteredLeagues.cc === item.cc && filteredLeagues.sportId === sport.id" class="d-grid">
                <fb-fut-button
                  v-for="(league, j) in filteredLeagues.leagues"
                  :key="`league_${item.cc}_${idx}_${j}`"
                  :to="`/sport/${sport.id}/league/${league.id}`"
                  class="button-sport-inside py-1"
                >
                  <span class="mx-20 text-white">{{ league.name }}</span>
                </fb-fut-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Spinner from '@/components/default/atoms/Spinner'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  components: {
    Spinner,
    FbFutButton
  },
  props: {
    noFilter: {
      type: Boolean,
      default: false
    },
    loadingLeagues: {
      type: Boolean,
      default: false
    },
    filteredLeagues: {
      type: Object,
      default: () => ({})
    },
    mainLeagues: {
      type: Array,
      default: () => ([])
    },
    sports: {
      type: Array,
      default: () => ([])
    },
    countries: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      timeFilter: 0,
      currentCountry: '',
      currentSport: null,
      hours: false,
      clock: false
    }
  },
  watch: {
    sports (newVal) {
      if (newVal[0]) {
        this.currentSport = newVal[0].id
      }
    }
  },
  mounted () {
    if (this.sports) {
      this.currentSport = this.sports[0].id
    }
  },
  methods: {
    selectSport (id) {
      this.currentSport = this.currentSport === id ? null : id
      if (this.currentSport) {
        this.$emit('selectCurrentSport', this.currentSport)
      }
    },
    showHours () {
      this.hours = !this.hours
    },
    showClock () {
      this.clock = !this.clock
    },
    getLeagues (countryId) {
      this.currentCountry = countryId
      this.$emit('selectCurrentSportCountry', { countryId, sportId: this.currentSport })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

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
    background-color: var(--fut-background-lighter);
    margin: 0px 1px;
    border: none;
    color: white;
  @include md {
    border-right: 1px solid var(--fut-background-lightest);
    margin: 2px 0px;
    border-bottom: 1px solid var(--fut-background-lightest);
    font-size: 11px;
    padding: 3px 0;
  }
}
.hours-content {
  display: none;
  @include md {
    position: absolute;
    display: flex;
    flex-direction: column;
    button {
      border: none;
      background: var(--fut-background-darkest);
      opacity: 0.9;
      color: white;
      font-size: 11px;
      width: 35px;
      height: 25px;
      &:hover {
        background: var(--fut-background);
      }
    }
  }
}
.hours-content-mobile {
  margin: 0 14px;
  display: flex;
  button {
    border: none;
    background: var(--fut-background-lightest);
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
  background-color: var(--fut-background-darkest);
  border: none;
  border-radius: 5px;
  font-size: 12px;
  line-height: 30px;
  // padding: 2% 2%;
  margin: 10px 0px 0px;
  @include md {
    background-color: var(--fut-background);
    border: none;
    margin: 0px;
    border-radius: 0px;
    border-bottom: 1px solid var(--fut-background-lightest);
    padding: 0%;
  }
}
.button-sport-leagues {
  background-color: var(--fut-background);
  border: none;
  text-align: left;
  border-radius: 5px;
  border-radius: 0px;
  font-size: 12px;
  border-bottom: 1px solid var(--fut-background-lightest);
  padding: 2% 2%;
  @include md {
    background-color: var(--fut-background);
    border: none;
    margin: 0px;
    padding: 0%;
    border-bottom: 1px solid var(--fut-background-lightest);
  }
}
.button-sport-inside {
  text-decoration: none;
  text-align: left;
  border-bottom: 1px solid var(--fut-background-lightest);
  background-color: var(--fut-background-lighter);
  font-size: 12px;
  padding: 2% 3%;
  overflow: hidden;
  @include md {
    font-size: 11px;
    padding: 0% 1%;
  }
}
.event-count {
  color: white;
  @include md {
    min-width: 22px;
    text-align: center;
    line-height: 30px;
    font-size: 9px;
    font-weight: normal;
    background: var(--fut-background-darker);
  }
}
.header-sidebar-mobile{
  margin-top: 70px;
  @include md{
    margin-top: 0px;
  }
}
.main-league {
  display: none;
  @include md {
    background-color: var(--fut-background-lightest);
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
</style>
