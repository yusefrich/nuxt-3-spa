<template>
  <div class="bg-leagues">
    <nav style="height: 33px;" class="d-flex">
      <nsx-fut-button to="/" class="pe-0 ps-2">
        <font-awesome-icon class="me-2 mt-0 icon text-nav" :icon="['fas', 'caret-left']" />
      </nsx-fut-button>
      <div id="nav-tab" class="nav nav-tabs mx-2" role="tablist">
        <nsx-fut-button
          class="p-2 nav-link fut-color-dynamic active"
          role="tab"
          aria-selected="true"
          :to="`/sport/${sport}/games/0`"
        >
          {{ $t('i18n_todos') }}
        </nsx-fut-button>
        <nsx-fut-button
          class="p-2 nav-link fut-color-dynamic"
          role="tab"
          aria-selected="true"
          :to="`/sport/${sport}/games/12`"
        >
          12hs
        </nsx-fut-button>
        <nsx-fut-button
          class="p-2 nav-link fut-color-dynamic"
          role="tab"
          aria-selected="true"
          :to="`/sport/${sport}/games/24`"
        >
          24hs
        </nsx-fut-button>
        <nsx-fut-button
          class="p-2 nav-link fut-color-dynamic"
          role="tab"
          aria-selected="true"
          :to="`/sport/${sport}/games/48`"
        >
          48hs
        </nsx-fut-button>
        <nsx-fut-button
          class="p-2 nav-link fut-color-dynamic"
          role="tab"
          aria-selected="true"
          :to="`/sport/${sport}/aovivo`"
        >
          {{ $t('i18n_ao_vivo') }}
        </nsx-fut-button>
      </div>
    </nav>
    <div v-if="loading" class="bg-leagues-row text-center" style="padding-top: 90px; padding-bottom: 90px">
      <font-awesome-icon class="icon-loading spin spinner-class" :icon="['fas', 'circle-notch']" />
    </div>
    <div v-else id="accordion-league-list" class="accordion">
      <!-- // * dinamic accordion by leagues -->
      <div v-if="mainLeagues.length > 0">
        <div id="league-main" class="mb-0">
          <nsx-fut-button block class="text-start bg-gray h-100 league-btn py-1" type="button" data-bs-toggle="collapse" data-bs-target="#league-main-collapse">
            <img :src="currentSettings?currentSettings.logo_mobile?currentSettings.logo_mobile:currentSettings.logo:''" height="15px" width="auto" alt="">
            <span>
              {{ $t('i18n_principais_listas') }}
            </span>
          </nsx-fut-button>
        </div>
        <div id="league-main-collapse" class="accordion-collapse collapse show" aria-labelledby="league-main">
          <div class="accordion-body p-0">
            <div class="row bg-leagues-row m-0">
              <div v-for="(main, k) in mainLeagues" :key="'main_league_btn' + k" class="col-6 col-md-4 px-0">
                <nsx-fut-button block class="btn-league text-start d-flex league-btn" :to="`/sport/${sport}/league/${main.id}`">
                  <img v-if="sport === 6046" :src="main.icon?main.icon:'/bet365icons/1.svg'" width="20px" height="20px" style="border-radius: 100%">
                  <img v-else-if="sport === 48242" :src="main.icon?main.icon:'/bet365icons/2.svg'" width="20px" height="20px" style="border-radius: 100%">
                  <img v-else-if="sport === 154919" :src="main.icon?main.icon:'/bet365icons/10.svg'" width="20px" height="20px" style="border-radius: 100%">
                  <img v-else-if="sport === 54094" :src="main.icon?main.icon:'/bet365icons/5.svg'" width="20px" height="20px" style="border-radius: 100%">
                  <img v-else-if="sport === 265917" :src="main.icon?main.icon:'/bet365icons/20.svg'" width="20px" height="20px" style="border-radius: 100%">
                  <img v-else-if="sport === 154830" :src="main.icon?main.icon:'/bet365icons/23.svg'" width="20px" height="20px" style="border-radius: 100%">
                  <img v-else-if="sport === 621569" :src="main.icon?main.icon:'/bet365icons/34.svg'" width="20px" height="20px" style="border-radius: 100%">
                  <img v-else-if="sport === 35709" :src="main.icon?main.icon:'/bet365icons/6.svg'" width="20px" height="20px" style="border-radius: 100%">
                  <img v-else-if="sport === 154914" :src="main.icon?main.icon:'/bet365icons/3.svg'" width="20px" height="20px" style="border-radius: 100%">
                  <img v-else-if="sport === 687890" :src="main.icon?main.icon:'/bet365icons/games.svg'" width="20px" height="20px" style="border-radius: 100%">
                  <img v-else-if="sport === 131506" :src="main.icon?main.icon:'/bet365icons/16.svg'" width="20px" height="20px" style="border-radius: 100%">
                  <span class="ms-2">{{ main.name }}</span>
                </nsx-fut-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-for="(leagues, index) in generalLeagues" :key="'league_loop_'+index">
        <div :id="`league-${index}`" class="mb-0">
          <nsx-fut-button block class="text-start bg-gray h-100 d-flex league-btn py-1" type="button" data-bs-toggle="collapse" :data-bs-target="`#league-${index}-collapse`">
            <img v-if="sport === 6046" :src="leagues.games[0].country_icon?leagues.games[0].country_icon:'/bet365icons/1.svg'" width="15px" height="15px" class="me-2 rounded-circle">
            <img v-else-if="sport === 48242" :src="leagues.games[0].country_icon?leagues.games[0].country_icon:'/bet365icons/2.svg'" width="15px" height="15px" class="me-2 rounded-circle">
            <img v-else-if="sport === 154919" :src="leagues.games[0].country_icon?leagues.games[0].country_icon:'/bet365icons/10.svg'" width="15px" height="15px" class="me-2 rounded-circle">
            <img v-else-if="sport === 54094" :src="leagues.games[0].country_icon?leagues.games[0].country_icon:'/bet365icons/5.svg'" width="15px" height="15px" class="me-2 rounded-circle">
            <img v-else-if="sport === 265917" :src="leagues.games[0].country_icon?leagues.games[0].country_icon:'/bet365icons/20.svg'" width="15px" height="15px" class="me-2 rounded-circle">
            <img v-else-if="sport === 154830" :src="leagues.games[0].country_icon?leagues.games[0].country_icon:'/bet365icons/23.svg'" width="15px" height="15px" class="me-2 rounded-circle">
            <img v-else-if="sport === 621569" :src="leagues.games[0].country_icon?leagues.games[0].country_icon:'/bet365icons/34.svg'" width="15px" height="15px" class="me-2 rounded-circle">
            <img v-else-if="sport === 35709" :src="leagues.games[0].country_icon?leagues.games[0].country_icon:'/bet365icons/6.svg'" width="15px" height="15px" class="me-2 rounded-circle">
            <img v-else-if="sport === 154914" :src="leagues.games[0].country_icon?leagues.games[0].country_icon:'/bet365icons/3.svg'" width="15px" height="15px" class="me-2 rounded-circle">
            <img v-else-if="sport === 687890" :src="leagues.games[0].country_icon?leagues.games[0].country_icon:'/bet365icons/games.svg'" width="15px" height="15px" class="me-2 rounded-circle">
            <img v-else-if="sport === 131506" :src="leagues.games[0].country_icon?leagues.games[0].country_icon:'/bet365icons/16.svg'" width="15px" height="15px" class="me-2 rounded-circle">
            <span class="fut-color-dynamic">
              {{ leagues.country }}
            </span>
          </nsx-fut-button>
        </div>
        <div :id="`league-${index}-collapse`" class="accordion-collapse collapse show" :aria-labelledby="`league-${index}`">
          <div class="accordion-body p-0">
            <div class="row bg-leagues-row m-0">
              <div v-for="( league, j ) in leagues.games" :key="'league_game_' + j" class="col-12 col-md-4 px-0">
                <nsx-fut-button :to="`/sport/${sport}/league/${league.id}`" block class="btn-league text-start league-btn fut-color-dynamic">
                  {{ league.name }}
                </nsx-fut-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'

export default {
  components: { NsxFutButton },
  props: {
    sport: {
      type: Number,
      default: null
    },
    mainLeagues: {
      type: Array,
      default: () => ([])
    },
    generalLeagues: {
      type: Array,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      default: false
    },
    currentSettings: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style scoped lang="scss">
  .bg-leagues{
    background-color: var(--nsx-dark-2);
  }
  .text-nav{
    color: var(--nsx-gray-0);
  }
  .nav-link{
    color: var(--nsx-gray-0);
    border: none;
    font-size: 13.3px;
    border-bottom: 3px solid transparent !important;
    padding: .35rem .5rem !important;
  }
  .nav-link:hover{
    color: #ffa500 !important;
    opacity: 1;
    border: none;
    border-radius: 0;
  }
  .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link{
    color: #ffa500 !important;
    background-color: transparent;
    border: none;
    border-radius: 0;
    border-bottom: 3px solid #ffa500 !important;
    font-weight: 500;
  }
  .nav-tabs{
    border-bottom: none !important;
  }
  .bg-gray{
    background: var(--nsx-dark-6);
    span{
      color: #dbdbdb;
    }
  }
  .btn-league{
    color: #dbdbdb;
    font-size: 13.3px;
  }
  .btn-league:hover{
    color: #ffa500 !important;
  }
  .bg-leagues-row{
    background: var(--nsx-dark-5);
  }
  .icon-loading{
    font-size: 140px;
    color: #ffa500;
  }
  .spinner-class{
    animation-name: spin;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  @keyframes spin {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(360deg);
    }
  }
  span {
    font-size: 13.3px;
  }
  .league-btn{
    padding: .4rem;
    span{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
</style>
