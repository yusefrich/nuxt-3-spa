<template>
  <div>
    <div v-if="league" class="heading-league">
      <h3 v-if="events && events[0] && events[0].name" class="text-white fut-color-dynamic">
        {{ events[0].name }}
      </h3>
      <fut-button to="/" class="btn text-white px-0 fut-color-dynamic">
        <font-awesome-icon class="text-primary icon me-2" :icon="['fas', 'arrow-left']" />{{ $t('i18n_todos_os_jogos') }}
      </fut-button>
    </div>
    <nav v-if="!noFilter" class="nav-filter" :class="{'default-nav-filter': navFilterGenericDistance}">
      <div v-if="!searching" id="nav-tab" class="nav nav-tabs mt-1" role="tablist">
        <fut-button
          id="nav-hoje-tab"
          class="nav-link fw-bold active px-3 py-1"
          data-bs-toggle="tab"
          data-bs-target="#nav-hoje"
          role="tab"
          aria-controls="nav-hoje"
          aria-selected="true"
          @click="todayFilter"
        >
          {{ $t('i18n_proximos') }}
        </fut-button>
        <fut-button
          id="nav-amanha-tab"
          class="nav-link fw-bold px-3 py-1"
          data-bs-toggle="tab"
          data-bs-target="#nav-amanha"
          role="tab"
          aria-controls="nav-amanha"
          aria-selected="false"
          @click="tomorowFilter"
        >
          {{ $t('i18n_amanha') }}
        </fut-button>
        <fut-button
          id="nav-todos-tab"
          class="nav-link fw-bold px-3 py-1"
          data-bs-toggle="tab"
          data-bs-target="#nav-todos"
          role="tab"
          aria-controls="nav-todos"
          aria-selected="false"
          @click="allFilter"
        >
          {{ $t('i18n_todos') }}
        </fut-button>
        <fut-button
          id="nav-todos-tab"
          class="nav-link text-primary fw-bold"
          :to="`/sport/${eventsSport}/aovivo`"
        >
          {{ $t('i18n_ao_vivo') }}
        </fut-button>
        <div class="ms-auto">
          <fut-input
            v-model="searchTerm"
            :type="'search'"
            :dark="true"
            :rounded="true"
            class="search-input d-none d-md-inline-block"
            :placeholder="$t('i18n_buscar_jogo')"
          />
          <fut-button class="search-icon d-md-none" @click="searching = true">
            <font-awesome-icon class="text-primary icon" :icon="['fas', 'search']" />
          </fut-button>
        </div>
      </div>
      <fut-input
        v-if="searching"
        v-model="searchTerm"
        :dark="true"
        :rounded="true"
        class="search-input"
        :placeholder="$t('i18n_buscar_jogo')"
      />
      <fut-button v-if="searching" class="search-icon close-search" @click="searching = false">
        <font-awesome-icon class="text-primary icon" :icon="['fas', 'times']" />
      </fut-button>
    </nav>
    <div id="nav-tabContent" class="tab-content" />
    <div style="padding-right: 1px" class="table-responsive table-height">
      <table id="events-table" class="table">
        <template v-for="(betGroup) in events" :key="betGroup.name">
          <thead class="header">
            <tr class="d-none d-md-table-row">
              <td class="text-white" colspan="2">
                ...
              </td>
              <td class="text-white" colspan="3">
                {{ betGroup.name }}
              </td>
              <td
                v-for="(oddTitle, oddTitleIndex) in getOddTitleHeading(betGroup.games)"
                :key="'heading_' + oddTitleIndex"
                class="text-white odd-header-desktop-container"
                :colspan="oddTitle.colspan"
              >
                {{ oddTitle.title }}
              </td>
            </tr>
            <tr class="d-md-none">
              <td class="text-white py-1" :colspan="getTotlaOddTitleHeading(getOddTitleHeading(betGroup.games))">
                {{ betGroup.name }}
              </td>
            </tr>
          </thead>
          <template v-for="(game, count) in betGroup.games" :key="'mobile_heading'+game.id">
            <thead class="lighter header">
              <tr class="d-md-none">
                <td
                  class="text-white pt-1"
                  colspan="6"
                  @click="eventsSport !== 18 && eventsSport !== 9 && eventsSport !== 14 ? navigate('/sport/'+eventsSport+'/evento/'+game.slug) : {}"
                >
                  <p class="mb-0 fut-color-dynamic">
                    <small>{{ formattedDate(game.datetime) }} - {{ formattedHour(game.datetime) }}</small>
                  </p>
                  <p class="mb-0 fut-color-dynamic">
                    <strong>
                      {{ game.home_team }} x {{ game.away_team }}
                    </strong>
                  </p>
                </td>
              </tr>
              <tr class="d-md-none">
                <td
                  v-for="(oddTitle, oddTitleIndex) in getOddTitleHeading(betGroup.games)"
                  :key="'heading_' + oddTitleIndex"
                  :colspan="oddTitle.colspan"
                  class="bg-secondary text-white py-0 odd-header-mobile-container"
                >
                  <span class="odd-header-mobile"><small>{{ oddTitle.title }}</small></span>
                </td>
              </tr>
            </thead>
            <tbody :key="game.id" class="header select mobile-darker" :class="[count%2===0 ? 'darker' : 'odds-lighter', stripped ? stripped : '']">
              <tr class="table-values">
                <td class="text-white d-none d-md-table-cell fut-color-dynamic" colspan="1">
                  {{ formattedDate(game.datetime) }}
                </td>
                <td class="text-white d-none d-md-table-cell fut-color-dynamic" colspan="1">
                  {{ formattedHour(game.datetime) }}
                </td>
                <td
                  class="text-white text-start d-none d-md-table-cell hover-link fut-color-dynamic"
                  colspan="3"
                  @click="eventsSport !== 18 && eventsSport !== 9 && eventsSport !== 14 ? navigate('/sport/'+eventsSport+'/evento/'+game.slug) : {}"
                >
                  <span>
                    {{ game.home_team }} {{ game.away_team ? 'x' : '' }} {{ game.away_team }}
                  </span>
                </td>
                <template v-for="(oddsGroup, index) in game.odds" :key="'odd_slug_j_'+j+'__'+index">
                  <template v-if="(settings && settings.both_score === 0 && index === 0) || (settings && settings.both_score === 1)" :key="'odd_slug_j_'+j+'_'+index">
                    <td
                      v-for="(odd, j) in oddsGroup.odds"
                      :key="'odd_slug_j_'+j+'_'+index"
                      :class="['table-odd', 'position-relative', 'text-white', 'fut-color-dynamic', hasSelected(odd.type)?'bet-selected':'', 'click-bet', !odd.odds||odd.odds<=0||odd.odds==1?'click-bet-disabled':'']"
                      colspan="1"
                      @click="()=>!odd.odds||odd.odds<=0||odd.odds==1?{}:$emit('selectBet', { gameId: game.id, odd: odd, market: oddsGroup.name, event: `${game.home_team} x ${game.away_team}`, validate: game.datetime, live: false })"
                    >
                      <span v-if="odd.super_odd" class="super-odd-container">
                        <span class="normal-odd">
                          {{ odd.super_odd && odd.super_odd.normal_odd ? odd.super_odd.normal_odd : '-' }}
                        </span>
                        <br>
                        <span class="super-odd">
                          {{ odd.super_odd && odd.super_odd.odd != 0 && odd.super_odd.odd != 1 ? odd.super_odd.odd : '-' }}
                        </span>
                      </span>
                      <span v-else class="bet-holder">
                        <small class="bet-holder-header">
                          {{ replaceMarketName(settings.name_team === 0, odd.header, game.home_team, game.away_team) }}
                        </small>
                        <span class="bet-holder-odds">
                          {{ odd.odds && odd.odds != 0 && odd.odds != 1 ? odd.odds : '-' }}
                        </span>
                      </span>
                    </td>
                  </template>
                </template>
                <td :class="['text-white', 'click-bet', 'fut-color-dynamic']" colspan="1" @click="navigate('/sport/'+eventsSport+'/evento/'+game.slug)">
                  +{{ game.odds_total }}
                </td>
              </tr>
            </tbody>
          </template>
        </template>
      </table>
      <div v-if="viewMore" class="show-more-holder text-center mb-4">
        <fut-button
          v-if="!pageLimit && !loading"
          :primary="true"
          @click="$emit('fetchPage')"
        >
          {{ $t('i18n_mostrar_mais') }} <font-awesome-icon class="text-dark icon ms-2" :icon="['fas', 'plus']" />
        </fut-button>
      </div>
      <div v-if="loading" class="w-100 p-4">
        <spinner />
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import FutButton from '@/components/default/atoms/FutButton.vue'
import FutInput from '@/components/default/atoms/FutInput.vue'
import Spinner from '@/components/default/atoms/Spinner'
import utils from '@/utils/utils'
export default {
  components: {
    FutInput,
    FutButton,
    Spinner
  },
  props: {
    noFilter: {
      type: Boolean,
      default: false
    },
    navFilterGenericDistance: {
      type: Boolean,
      default: false
    },
    settings: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    eventsSport: {
      type: Number,
      default: null
    },
    events: {
      type: Array,
      default: () => ([])
    },
    stripped: {
      type: String,
      default: ''
    },
    tickets: {
      type: Array,
      default: () => ([])
    },
    viewMore: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pageLimit: false,
      league: null,
      searching: false,
      searchTerm: null,
      bets: []
    }
  },
  created () {
    this.league = this.$route.params.id
  },
  methods: {
    replaceMarketName (active, text, home, away) {
      return utils.replaceMarketName(active, text, home, away)
    },
    /* eslint-disable */
    getOddTitleHeading (games) {
      let title = []
      games.forEach((e) => {
        if (e.odds) {
          e.odds.forEach((f) => {
            if (title.findIndex((obj => obj.title === f.name)) === -1) {
              title.push({ title: f.name, colspan: f.odds.length })
            }
          })
        }
      })
      title.push({ title: '+', colspan: 1 })
      let modTitle = []
      if (this.settings && this.settings.both_score === 0) {
        modTitle.push(title[0])
        modTitle.push(title[title.length - 1])
      } else {
        modTitle = title
      }
      return modTitle
    },
    getTotlaOddTitleHeading (currentHeading) {
      let colspan = 0
      currentHeading.forEach(e => {
        colspan += e.colspan
      })
      return colspan
    },
    todayFilter () {
      this.$emit('fetchDate', dayjs().format('YYYY-MM-DD'))
    },
    tomorowFilter () {
      this.$emit('fetchDate', dayjs().add(1, 'day').format('YYYY-MM-DD'))
    },
    allFilter () {
      this.$emit('fetchDate', null)
    },
    navigate (link) {
      this.$router.push(this.localePath(link))
    },
    formattedDate (date) {
      return utils.formattedDate(date)
    },
    formattedHour (hour) {
      return dayjs(hour).format('HH:mm')
    },
    hasSelected (type) {
      const currentTicketIndex = this.tickets.findIndex(obj => obj.odd.type === type)
      if (currentTicketIndex !== -1) {
        return true
      }
      return false
    },
    onMobile () {
      return window.innerWidth < 768
    }
  },
  watch: {
    searchTerm (val) {
      this.$emit('fetchSearch', val)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/variables";
@import "@/assets/layout/breakpoints";
.oddsLink{
  width: 100%;
  height: 100%;
}
.bg-table-black {
  background: var(--fut-background) !important;
}
.table {
  th,
  td {
    text-align: center;
  }
}
.lighter {
  td {
    background: var(--fut-background-lightest);
  }
}
.odds-lighter.stripped {
  td {
    background: var(--fut-background-darkest);
    @include md{
      background: var(--fut-background-lightest);
    }
  }
}
.darker.stripped {
  td {
    background: var(--fut-background-darkest);
  }
}
.odds-lighter.light {
  td {
    background: var(--fut-background-darkest);
    @include md{
      background: var(--fut-background-lightest);
    }
  }
}
.darker.dark {
  td {
    background: var(--fut-background-darkest);
  }
}
.odds-lighter.dark {
  td {
    background: var(--fut-background-darkest);
  }
}
.darker.light {
  td {
    background: var(--fut-background-darkest);
    @include md{
      background: var(--fut-background-lightest);
    }
  }
}
.bg-table-odds:nth-child(even) {
  background: var(--fut-background-darkest);
  @include md{
    background: var(--fut-background-lightest);
  }
}
.bg-table-odds:nth-child(odd) {
  background: #fafafa;
}
.click-bet{
  cursor: pointer;
}
.click-bet:hover{
  @include md {
    background: var(--fut-primary-darker) !important;
  }
}
.click-bet-disabled{
  cursor: initial;
}
.click-bet-disabled:hover{
  background: var(--fut-primary-darkest) !important;
}
.bet-selected{
  background: var(--fut-primary-lightest) !important;
  color: var(--fut-background-darker) !important;
}
.bl-1{
  border-left: 1px solid $white !important;
}
.smaller{
  font-size: 14px;
}
.header{
  td{
    border-top: none !important;
    border-bottom: none !important;
    border-right: 3px solid var(--fut-background-darker);
    background: var(--fut-background-games-list);
  }
}
.select{
  td{
    padding: 5px;
    @include md{
      padding: 7px;
    }
  }
}
.table-values{
  font-weight: bold;
  font-size: 13px;
  @include md{
    font-size: 15px;
  }
}
.hover-link{
  cursor: pointer;
  span{
    opacity: .6;
  }
}
.hover-link:hover{
  cursor: pointer;
  span{
    opacity: 1;
  }
}
.nav-filter{
  position: sticky;
  top: 107px;
  @media (min-width: 992px) {
    top: 140px;
  }
  background: var(--fut-background-darker);
  z-index: 1;
}
.close-search{
  position: absolute;
  right: 0;
  top: 0;
}
.heading-title{
  font-size: 13px;
}
.super-odd-container{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  .normal-odd{
    text-decoration: line-through;
    opacity: .5;
    font-size: 14px;
    line-height: 5px;
  }
  .super-odd-icon{
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%) rotate(45deg);
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
    border-top: 7px solid transparent;
    border-bottom: 7px solid var(--fut-primary);
  }
  .super-odd{
    font-weight: 700;
    border-bottom: 2px solid var(--fut-primary);
  }
}
.table-odd{
  max-width: 50px;
  @include md {
    max-width: 100px;
  }
}
.bet-holder{
  position: relative;
  .bet-holder-header{
    width: 100%;
    line-height: 11px;
    font-weight: 400 !important;
    font-size: 13px;
    margin-right: 0;
    display:block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .bet-holder-odds{
    line-height: 18px;
    display: block;
  }
}
.odd-header-desktop-container{
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.odd-header-mobile-container{
  max-width: 50px;
  .odd-header-mobile{
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.default-nav-filter{
  top: 52px;
  @include md {
    top: 88px;
  }
}
</style>
