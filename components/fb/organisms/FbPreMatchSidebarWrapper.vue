<template>
  <div>
    <div class="d-none d-md-grid py-2 bg-games-list">
      <span class="fw-bold title-head container fut-color-dynamic">{{ $t('i18n_pre_jogo').toUpperCase() }}</span>
    </div>
    <div class="container">
      <div class="search-content d-md-flex d-none rounded my-1 mt-2 px-2 align-items-center">
        <input v-model="term" class="w-100 my-1 search" :placeholder="$t('i18n_buscar')" type="text" @keyup.enter="searchGames()">
        <fb-fut-button ref="searchBtn" class="search-icon-btn" :to="localePath(term ? '/search/' + term : '#')">
          <font-awesome-icon :icon="['fas', 'search']" />
        </fb-fut-button>
      </div>
    </div>
    <div
      v-for="(league, index) in mainLeagues"
      :key="'main_league_'+index" class="container px-1"
    >
      <fb-fut-button
        :to="'/sport/'+(league.sport_id ? league.sport_id : '6046')+'/league/'+league.id" class="main-league my-2"
      >
        <template v-if="league.icon">
          <img class="icon-size-img m-1 me-3" :src="league.icon" alt="">
        </template>
        <template v-else>
          <i v-if="league.sport_id === 6046" :class="['icon', 'icon-soccer', 'text-white', 'p-1', 'pe-3']" />
          <i v-else-if="league.sport_id === 48242" :class="['icon', 'icon-basket', 'text-white', 'p-1', 'pe-3']" />
          <i v-else-if="league.sport_id === 154919" :class="['icon', 'icon-boxing', 'text-white', 'p-1', 'pe-3']" />
          <i v-else-if="league.sport_id === 54094" :class="['icon', 'icon-tenis', 'text-white', 'p-1', 'pe-3']" />
          <i v-else-if="league.sport_id === 265917" :class="['icon', 'icon-mesa', 'text-white', 'p-1', 'pe-3']" />
          <i v-else-if="league.sport_id === 154830" :class="['icon', 'icon-voley', 'text-white', 'p-1', 'pe-3']" />
          <i v-else-if="league.sport_id === 621569" :class="['icon', 'icon-voley', 'text-white', 'p-1', 'pe-3']" />
          <i v-else-if="league.sport_id === 35709" :class="['icon', 'icon-soccer', 'text-white', 'p-1', 'pe-3']" />
          <i v-else-if="league.sport_id === 154914" :class="['icon', 'icon-tenis-2', 'text-white', 'p-1', 'pe-3']" />
          <i v-else-if="league.sport_id === 687890" :class="['icon', 'icon-joy', 'text-white', 'p-1', 'pe-3']" />
          <i v-else-if="league.sport_id === 131506" :class="['icon', 'icon-football', 'text-white', 'p-1', 'pe-3']" />
          <i v-else :class="['icon', 'icon-soccer', 'text-white', 'p-1', 'pe-3']" />
        </template>
        <div class="text-white text-start">
          <span v-if="league.sport" class="sport pt-1">{{ league.sport }}</span>
          <span v-else-if="sport === 6046" class="sport pt-1">{{ $t('i18n_futebol') }}</span>
          <span v-else-if="sport === 48242" class="sport pt-1">{{ $t('i18n_basquete') }}</span>
          <span v-else-if="sport === 154919" class="sport pt-1">{{ $t('i18n_boxe_mma') }}</span>
          <span v-else-if="sport === 54094" class="sport pt-1">{{ $t('i18n_tenis') }}</span>
          <span v-else-if="sport === 265917" class="sport pt-1">{{ $t('i18n_tenis_de_mesa') }}</span>
          <span v-else-if="sport === 154830" class="sport pt-1">{{ $t('i18n_volei') }}</span>
          <span v-else-if="sport === 621569" class="sport pt-1">{{ $t('i18n_volei_de_praia') }}</span>
          <span v-else-if="sport === 35709" class="sport pt-1">{{ $t('i18n_handebol') }}</span>
          <span v-else-if="sport === 154914" class="sport pt-1">{{ $t('i18n_basebol') }}</span>
          <span v-else class="sport pt-1">{{ $t('i18n_futebol') }}</span>
          <span class="league">{{ league.name }}</span>
        </div>
      </fb-fut-button>
    </div>
    <slot />
  </div>
</template>

<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  name: 'FbPreMatchSidebarWrapper',
  components: {
    FbFutButton
  },
  props: {
    settings: {
      type: Object,
      default: null
    },
    loadingLeagues: {
      type: Boolean,
      default: false
    },
    sport: {
      type: Number,
      default: 6046
    },
    mainLeagues: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      term: null
    }
  },
  mounted () {
    this.term = this.$route.params.term
  },
  methods: {
    searchGames () {
      const el = this.$refs.searchBtn
      el.click()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";

.bg-header {
  background-color: var(--fut-background-header);
  color: white;
}
.bg-games-list {
  background-color: var(--fut-background-2);
  color: white;
}
.search-content {
  width: 100%;
  line-height: 24px;
  height: 24px;
  padding-right: 25px;
  background-color: var(--fut-background-darker);
  .search-icon-btn {
    color: var(--fut-background-white);
  }
}
svg {
  margin-top: 2px;
  height: 16px;
}
.search {
  border: none;
  outline: none;
  height: 24px;
  font-size: 12px;
  background-color: var(--fut-background-darker);
  color: var(--fut-primary);
}
.week-times {
    background-color: var(--fut-background-lighter);
    margin: 0px 1px;
    border: none;
    color: white;
  @include md {
    border-right: 1px solid var(--fut-background-3);
    margin: 2px 0px;
    border-bottom: 1px solid var(--fut-background-3);
    font-size: 11px;
    padding: 3px 0;
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
  font-size: 10px;
  // padding: 2% 2%;
  margin: 10px 0px 0px;
  @include md {
    background-color: var(--fut-background);
    border: none;
    margin: 0px;
    border-radius: 0px;
    border-bottom: 1px solid var(--fut-background-3);
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
  border-bottom: 1px solid var(--fut-background-3);
  padding: 2% 2%;
  @include md {
    background-color: var(--fut-background);
    border: none;
    margin: 0px;
    padding: 0%;
    border-bottom: 1px solid var(--fut-background-3);
  }
}
.button-sport-inside {
  text-decoration: none;
  text-align: left;
  border-bottom: 1px solid var(--fut-background-3);
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
  max-width: 100vw;
  @include md{
    margin-top: 0px;
  }
}
.main-league {
  display: none;
  @include md {
    background-color: var(--fut-background-3);
    display: flex;
    padding: 0px 5px 0px 5px;
    align-items: center;
    text-decoration: none;
    border-radius: 3px;
    .sport {
      font-size: 10px;
      line-height: 5px;
      display: block;
      padding-bottom: 4px;
      color: var(--fut-primary);
    }
    .league {
      line-height: 5px;
      color: white;
      font-size: 12px;
    }
    .league-icon-style {
      width: 40px;
      height: 40px;
    }
  }
  &:hover {
    background-color: var(--fut-background-darker);
  }
}
.icon {
  font-size: 40px;
  margin-top: 3px;
}
.icon-size-img{
  width: 40px;
  height: 40px;
  object-fit: contain;
}
</style>
