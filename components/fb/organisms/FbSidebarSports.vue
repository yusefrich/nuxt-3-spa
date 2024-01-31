<template>
  <div id="sidebarListSports">
    <div v-if="outright" class="outright-mobile-content d-md-none">
      <span class="outright-mobile-text fut-color-dynamic">
        {{ $t('i18n_longo_prazo') }}
      </span>
    </div>
    <fb-sections-heading v-else class="d-md-none" :title="$t('i18n_esporte', 2)" :route="sportsRoute">
      <fb-fut-button class="bg-transparent border-0" @click="showClock()">
        <font-awesome-icon class="icon-time-filter text-white" :icon="['far', 'clock']" />
      </fb-fut-button>
    </fb-sections-heading>
    <div>
      <div v-if="outright" class="w-100 text-white d-none d-md-flex align-items-center outright-content">
        <span class="outright-text fut-color-dynamic">
          {{ $t('i18n_longo_prazo') }}
        </span>
      </div>
      <div v-else class="w-100 text-white d-none d-md-flex align-items-center">
        <fb-fut-button
          v-if="currentHour"
          to="/sports"
          class="w-100 week-times text-center text-decoration-none active"
        >
          <font-awesome-icon :icon="['fas', 'clock']" />
          <div class="close-btn">
            <font-awesome-icon :icon="['fas', 'times']" />
          </div>
        </fb-fut-button>
        <fb-fut-button
          v-else
          class="w-100 week-times text-center text-decoration-none"
          @click="showHours()"
        >
          <font-awesome-icon :icon="['fas', 'clock']" />
        </fb-fut-button>
        <fb-fut-button
          v-for="day in days"
          :key="'day_filter_' + day"
          :to="currentDay === day ? '/sports' : '/sports?day='+day"
          class="w-100 week-times text-center text-decoration-none"
          :class="{active: currentDay === day, 'week-times-dark': font === 'dark'}"
        >
          <span class="the-day">{{ day }}</span>
          <div class="close-btn">
            <font-awesome-icon :icon="['fas', 'times']" />
          </div>
        </fb-fut-button>
      </div>
      <transition name="fade" appear>
        <div v-if="clock === true" class="text-white d-flex d-md-none align-items-center m-1">
          <fb-fut-button v-if="currentHour" to="/sports" class="w-100 week-times text-center text-decoration-none active">
            <font-awesome-icon :icon="['fas', 'clock']" />
            <div class="close-btn">
              <font-awesome-icon :icon="['fas', 'times']" />
            </div>
          </fb-fut-button>
          <fb-fut-button v-else class="w-100 week-times text-center text-decoration-none" @click="showHours()">
            <font-awesome-icon :icon="['fas', 'clock']" />
          </fb-fut-button>
          <fb-fut-button
            v-for="day in days"
            :key="'day_filter_mobile_' + day"
            :to="currentDay === day ? '/sports' : '/sports?day='+day"
            :class="{active: currentDay === day}"
            class="w-100 week-times text-center text-decoration-none"
          >
            <span>{{ day }}</span>
          </fb-fut-button>
        </div>
      </transition>
      <transition name="fade" appear>
        <div v-if="clock && hours === true" class="hours-content-mobile d-md-none">
          <fb-fut-button to="/sports?hour=1" class="a hours-button fut-color-dynamic">
            1h
          </fb-fut-button>
          <fb-fut-button to="/sports?hour=3" class="a hours-button fut-color-dynamic">
            3h
          </fb-fut-button>
          <fb-fut-button to="/sports?hour=6" class="a hours-button fut-color-dynamic">
            6h
          </fb-fut-button>
          <fb-fut-button to="/sports?hour=9" class="a hours-button fut-color-dynamic">
            9h
          </fb-fut-button>
          <fb-fut-button to="/sports?hour=12" class="a hours-button fut-color-dynamic">
            12h
          </fb-fut-button>
          <fb-fut-button to="/sports?hour=24" class="a hours-button fut-color-dynamic">
            24h
          </fb-fut-button>
        </div>
      </transition>
      <transition name="fade" appear>
        <div v-if="hours === true" class="hours-content">
          <fb-fut-button to="/sports?hour=1" class="a hours-button fut-color-dynamic">
            1h
          </fb-fut-button>
          <fb-fut-button to="/sports?hour=3" class="a hours-button fut-color-dynamic">
            3h
          </fb-fut-button>
          <fb-fut-button to="/sports?hour=6" class="a hours-button fut-color-dynamic">
            6h
          </fb-fut-button>
          <fb-fut-button to="/sports?hour=9" class="a hours-button fut-color-dynamic">
            9h
          </fb-fut-button>
          <fb-fut-button to="/sports?hour=12" class="a hours-button fut-color-dynamic">
            12h
          </fb-fut-button>
          <fb-fut-button to="/sports?hour=24" class="a hours-button fut-color-dynamic">
            24h
          </fb-fut-button>
        </div>
      </transition>
      <div v-for="(sport, idx) in allSportsData" :key="'group_of_lists'+idx+'_'+customId" class="m-2 m-md-0">
        <fb-fut-button
          :id="'sportButton'+sport.id+''+customId"
          class="w-100 button-sport align-items-center d-flex collapsed justify-content-between"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#sport-${sport.id}-collapse-${customId}`"
          aria-expanded="true"
          :aria-controls="`sport-${sport.id}-collapse-${customId}`"
        >
          <div v-if="outright" class="ms-md-2">
            <img class="me-2 me-md-0" src="/FbIcons/100.png">
            <span class="fw-normal text-white ms-md-2 fut-color-dynamic">{{ sport.name }}</span>
          </div>
          <div v-else class="ms-md-2">
            <img v-if="sport.id === 6046" class="me-2 me-md-0" src="/FbIcons/1.png">
            <img v-if="sport.id === 48242" class="me-2 me-md-0" src="/FbIcons/6.png">
            <img v-if="sport.id === 154919" class="me-2 me-md-0" src="/FbIcons/69.png">
            <img v-if="sport.id === 54094" class="me-2 me-md-0" src="/FbIcons/3.png">
            <img v-if="sport.id === 265917" class="me-2 me-md-0" src="/FbIcons/19.png">
            <img v-if="sport.id === 154830" class="me-2 me-md-0" src="/FbIcons/4.png">
            <img v-if="sport.id === 621569" class="me-2 me-md-0" src="/FbIcons/60.png">
            <img v-if="sport.id === 35709" class="me-2 me-md-0" src="/FbIcons/5.png">
            <img v-if="sport.id === 154914" class="me-2 me-md-0" src="/FbIcons/23.png">
            <img v-if="sport.id === 687890" class="me-2 me-md-0" src="/FbIcons/95.png">
            <img v-if="sport.id === 131506" class="me-2 me-md-0" src="/FbIcons/2.png">
            <span class="fw-normal text-white ms-md-2 fut-color-dynamic">{{ sport.name }}</span>
          </div>
          <span class="event-count text-center fut-color-dynamic">{{ sport.games }}</span>
        </fb-fut-button>
        <div :id="`sport-${sport.id}-collapse-${customId}`" class="collapse">
          <ul id="countryList" class="btn-toggle-nav list-unstyled fw-normal mb-0 small">
            <li v-for="(item, idx2) in sport.country" :key="`count_${item.id}_${idx2}_${customId}`">
              <template v-if="item.link">
                <a
                  :href="localePath(`/sport/${sport.id}/league/${item.cc}`)"
                  class="w-100 button-sport-leagues align-items-center d-flex d-md-none justify-content-between text-decoration-none py-2 w-100"
                >
                  <div>
                    <span class="mx-20 text-white fut-color-dynamic">{{ item.name }}</span>
                  </div>
                  <span class="event-count text-center fut-color-dynamic">{{ item.games }}</span>
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
                  <span v-if="selectedGroupIds && checkId(selectedGroupIds, item.cc + '+' + sport.id)" class="text-success check-group"><font-awesome-icon :icon="['fas', 'check']" /></span>
                  <span v-else class="event-count text-center fut-color-dynamic">{{ item.games }}</span>
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
              >
                <div>
                  <span class="mx-20 text-white fut-color-dynamic">{{ item.name }}</span>
                </div>
                <span class="event-count text-center fut-color-dynamic">{{ item.games }}</span>
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
                  <span v-if="selectedGroupIds && checkId(selectedGroupIds, league.id + '+' + sport.id)" class="text-success check-group"><font-awesome-icon :icon="['fas', 'check']" /></span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import FbSectionsHeading from '@/components/fb/atoms/FbSectionsHeading'
import FbFutButton from '@/components/fb/atoms/FbFutButton'

export default {
  name: 'FbSidebarSports',
  components: {
    FbSectionsHeading,
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
    }
  },
  emits: [
    'selectedGroupEvents',
    'selectCurrentSportCountry'
  ],
  data () {
    return {
      days: ['Do', '2ª', '3ª', '4ª', '5ª', '6ª', 'Sa'],
      timeFilter: 0,
      currentDay: null,
      currentHour: null,
      currentCountry: '',
      currentSport: null,
      hours: false,
      clock: false
    }
  },
  computed: {
    sportsRoute () {
      if (process.env.LANDING_ROUTE) {
        return '/sports'
      }
      return '/'
    }
  },
  mounted () {
    this.currentDay = this.$route.query.day
    this.currentHour = this.$route.query.hour
    const days = []
    for (let i = 0; i < this.days.length; i++) {
      const e = this.days[i]
      if (i >= dayjs().day()) {
        days.push(e)
      }
    }
    for (let i = 0; i < this.days.length; i++) {
      const e = this.days[i]
      if (i < dayjs().day()) {
        days.push(e)
      }
    }
    this.days = days
  },
  methods: {
    navigate (link) {
      window.location.replace(link)
    },
    currentRoute (route) {
      return route === '' + this.$route.path || route + '/' === '' + this.$route.path
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
    },
    showHours () {
      this.hours = !this.hours
    },
    showClock () {
      this.clock = !this.clock
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
  border-radius: 5px;
  border-radius: 0px;
  font-size: 15px;
  border-bottom: 1px solid var(--fut-background-white);
  padding: 15px 10px;
  @include md {
    background-color: var(--fut-background);
    border: none;
    margin: 0px;
    padding: 0%;
    font-size: 12px;
    border-bottom: 1px solid var(--fut-background-3);
  }
  &:hover {
    background-color: var(--fut-background-darker);
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
  padding: 15px 20px;
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
