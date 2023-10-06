<template>
  <div class="container">
    <sk-carousel
      :items="slides"
      :full-width="isMobile"
      :is-mobile="isMobile"
    />

    <sk-modal-search
      :items="fetched"
      :placeholder="$t('i18n_procure_seu_evento')"
      :not-found="notFound"
      class="my-4"
      @search="search($event)"
    />

    <div>
      <sk-components-select
        :components-list="componentsList"
        :selected-component="currentComponent"
        @changeComponent="changeComponent($event)"
      />
    </div>

    <sk-games-list
      v-if="isGamesList"
      :title="componentsList[currentComponent].title"
      :title-icon="componentsList[currentComponent].titleIcon"
      :sports-list="componentsList[currentComponent].sports"
      :events="componentsList[currentComponent].events"
      :selected-sport="selectedSport"
      :live="componentsList[currentComponent].live"
      :tickets="getPreCashInTickets"
      :is-mobile="isMobile"
      name="main"
      class="my-4"
      @changeSport="changeSport($event)"
      @selectBet="selectBet($event)"
    />
    <sk-favorites
      v-else-if="currentComponent === 'SkFavorites'"
      :sports-list="getFavorites"
      :inplay-sports="componentsList[currentComponent].inplaySports"
      :pre-match-sports="componentsList[currentComponent].preMatchSports"
      :inplay-events="getInplayEvents"
      :pre-match-events="getPreMatchEvents"
      :selected-inplay-sport="favSelectedInplaySport"
      :selected-pre-match-sport="favSelectedPreMatchSport"
      :tickets="getPreCashInTickets"
      :is-mobile="isMobile"
      class="my-4"
      @changeFavorites="changeFavorites($event)"
      @changeSport="changeSport($event)"
      @selectBet="selectBet($event)"
    />
    <div v-else class="sk-my-bets mt-4">
      <div class="sk-my-bets-header">
        <h1>
          <font-awesome-icon class="icon" :icon="['fas', 'receipt']" />
          <span>{{ $t('i18n_apostas_esportivas') }}</span>
        </h1>
      </div>

      <div class="d-flex mb-3">
        <sk-components-select
          :components-list="myBetsComponentsList"
          :selected-component="myBetsCurrentComponent"
          @changeComponent="myBetsChangeComponent($event)"
        />
      </div>

      <sk-bets-history
        :items="bets"
        :logo="currentSettings.logo"
        :is-mobile="isMobile"
      />
    </div>
    <sk-games-list
      v-if="currentComponent === 'SkLobby' && getPreMatchFeaturedEvents"
      :title="$t('i18n_eventos_em_destaque')"
      :title-icon="['fas', 'fire-alt']"
      :events="getPreMatchFeaturedEvents"
      :selected-sport="selectedSport"
      :tickets="getPreCashInTickets"
      :is-mobile="isMobile"
      name="featured"
      class="my-4"
      @changeSport="changeSport($event)"
      @selectBet="selectBet($event)"
    />
    <sk-games-list
      v-if="currentComponent === 'SkLobby' && getPreMatchLeagueEvents"
      :title="$t('i18n_eventos_populares')"
      :title-icon="['fas', 'fire-alt']"
      :events="getPreMatchLeagueEvents"
      :selected-sport="selectedSport"
      :tickets="getPreCashInTickets"
      :is-mobile="isMobile"
      name="pre-match"
      class="my-4"
      @changeSport="changeSport($event)"
      @selectBet="selectBet($event)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SkCarousel from '@/components/sk/molecules/SkCarousel.vue'
import SkModalSearch from '@/components/sk/molecules/SkModalSearch.vue'
import SkComponentsSelect from '@/components/sk/molecules/SkComponentsSelect.vue'
import SkGamesList from '@/components/sk/organisms/SkGamesList.vue'
import SkFavorites from '@/components/sk/organisms/SkFavorites.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'SkSports',
  components: {
    SkCarousel,
    SkModalSearch,
    SkComponentsSelect,
    SkGamesList,
    SkFavorites
  },
  mixins: [windowWidth],
  data () {
    return {
      cleanSearch: false,
      currentComponent: 'SkLobby',
      interval: null,
      sport: null,
      selectedSport: null,
      favSelectedInplaySport: null,
      favSelectedPreMatchSport: null,
      sportsIcons: {
        6046: { fa: false, value: ['icon', 'icon-soccer'] },
        35709: { fa: true, value: ['fas', 'futbol'] },
        48242: { fa: true, value: ['fas', 'basketball-ball'] },
        54094: { fa: false, value: ['icon', 'icon-tenis'] },
        131506: { fa: false, value: ['icon', 'icon-football'] },
        154830: { fa: false, value: ['icon', 'icon-voley'] },
        154914: { fa: false, value: ['icon', 'icon-tenis-2'] },
        154919: { fa: false, value: ['icon', 'icon-boxing'] },
        265917: { fa: true, value: ['fas', 'table-tennis'] },
        621569: { fa: true, value: ['fas', 'volleyball-ball'] },
        687890: { fa: true, value: ['fas', 'gamepad'] }
      },
      myBetsCurrentComponent: 'active',
      notFound: false
    }
  },
  computed: {
    ...mapGetters({
      userBets: 'userBets',
      currentSlides: 'settings/currentSlides',
      getInplayEvents: 'inplay/getInplayEvents',
      currentSettings: 'settings/currentSettings',
      getFavorites: 'favorites-sports/getFavorites',
      getPreMatchEvents: 'pre-match/getPreMatchEvents',
      getPreMatchLoading: 'pre-match/getPreMatchLoading',
      getMetadataSports: 'metadata-sports/getMetadataSports',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getMetadataInplaySports: 'metadata-sports/getMetadataInplaySports',
      getPreMatchMainLeagues: 'pre-match-main-leagues/getPreMatchMainLeagues',
      getPreMatchSeachEvents: 'pre-match-search-events/getPreMatchSeachEvents',
      getPreMatchLeagueEvents: 'pre-match-league-events/getPreMatchLeagueEvents',
      getPreMatchFeaturedEvents: 'pre-match-featured-events/getPreMatchFeaturedEvents'
    }),
    slides () {
      if (!this.currentSlides) {
        return null
      }

      if (Array.isArray(this.currentSlides)) {
        return this.currentSlides.map(slide => ({
          img: this.width > 768 ? slide.img : slide.img_mobile,
          link: slide.link
        }))
      }

      return Object.values(this.currentSlides).map(slide => ({
        img: this.width > 768 ? slide.img : slide.img_mobile,
        link: slide.link
      }))
    },
    fetched () {
      if (this.cleanSearch) {
        return []
      }

      return this.getPreMatchSeachEvents
    },
    componentsList () {
      return {
        SkLobby: {
          text: 'Lobby',
          icon: ['fas', 'basketball-ball'],
          title: this.$t('i18n_eventos_ativos'),
          titleIcon: ['fas', 'play-circle'],
          sports: this.getMetadataInplaySports.map((item) => {
            return { ...item, icon: this.sportsIcons[item.id] }
          }),
          events: this.getInplayEvents,
          live: this.getInplayEvents && !!this.getInplayEvents.length
        },
        SkMyBets: {
          text: this.$t('i18n_minhas_apostas'),
          icon: ['fas', 'receipt']
        },
        SkFavorites: {
          text: this.$t('i18n_favoritos'),
          icon: ['fas', 'star'],
          inplaySports: this.getMetadataInplaySports.map((item) => {
            return { ...item, icon: this.sportsIcons[item.id] }
          }),
          preMatchSports: this.getMetadataSports.map((item) => {
            return { ...item, icon: this.sportsIcons[item.id] }
          })
        },
        SkLive: {
          text: this.$t('i18n_eventos_ativos'),
          icon: ['fas', 'play-circle'],
          title: this.$t('i18n_eventos_ativos'),
          titleIcon: ['fas', 'play-circle'],
          sports: this.getMetadataInplaySports.map((item) => {
            return { ...item, icon: this.sportsIcons[item.id] }
          }),
          events: this.getInplayEvents,
          live: this.getInplayEvents && !!this.getInplayEvents.length
        },
        SkPreMatch: {
          text: this.$t('i18n_comecando_em_breve'),
          icon: ['fas', 'stopwatch'],
          title: this.$t('i18n_comecando_em_breve'),
          titleIcon: ['fas', 'stopwatch'],
          sports: this.getMetadataSports.map((item) => {
            return { ...item, icon: this.sportsIcons[item.id] }
          }),
          events: this.getPreMatchEvents
        }
      }
    },
    isGamesList () {
      return ['SkLobby', 'SkLive', 'SkPreMatch'].includes(this.currentComponent)
    },
    myBetsComponentsList () {
      return {
        active: {
          text: this.$t('i18n_ativo')
        },
        defined: {
          text: this.$t('i18n_definido')
        }
      }
    },
    bets () {
      if (!this.userBets) {
        return []
      }

      if (this.myBetsCurrentComponent === 'active') {
        return this.userBets.pending
      }

      return this.userBets.done
    },
    isMobile () {
      return this.width <= 821
    }
  },
  watch: {
    '$route.query.tab' (value) {
      this.currentComponent = value
    },
    '$route.query.myBetsTab' (value) {
      this.myBetsCurrentComponent = value
    }
  },
  created () {
    this.currentComponent = this.$route.query.tab || 'SkLobby'
    this.fetchSliders()

    this.changeComponent(this.currentComponent)

    this.fetchPreMatchFeaturedEvents()

    if (
      !process.env.WS_HOST ||
      !process.env.WS_KEY ||
      !process.env.WS_ACTIVE ||
      (process.env.WS_ACTIVE && process.env.WS_ACTIVE !== 'true')
    ) {
      this.interval = setInterval(() => {
        this.fetchInplayEvents(this.sport)
      }, 5000)
    } else {
      this.interval = setInterval(() => {
        this.fetchAndAddInplayEvents(this.sport)
      }, 180000)
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    ...mapActions({
      fetchUserBets: 'fetchUserBets',
      fetchSliders: 'settings/fetchSliders',
      changeFilter: 'pre-match/changeFilter',
      fetchInplayEvents: 'inplay/fetchInplayEvents',
      toggleTicket: 'tickets-pre-cash-in/toggleTicket',
      changeFavorites: 'favorites-sports/changeFavorites',
      fetchPreMatchEvents: 'pre-match/fetchPreMatchEvents',
      fetchAndAddInplayEvents: 'inplay/fetchAndAddInplayEvents',
      fetchMetadataSports: 'metadata-sports/fetchMetadataSports',
      changeSkOpenTicket: 'tickets-pre-cash-in/changeSkOpenTicket',
      fetchMetadataInplaySports: 'metadata-sports/fetchMetadataInplaySports',
      fetchPreMatchMainLeagues: 'pre-match-main-leagues/fetchPreMatchMainLeagues',
      fetchPreMatchLeagueEvents: 'pre-match-league-events/fetchPreMatchLeagueEvents',
      fetchPreMatchSearchEvents: 'pre-match-search-events/fetchPreMatchSearchEvents',
      fetchPreMatchFeaturedEvents: 'pre-match-featured-events/fetchPreMatchFeaturedEvents'
    }),
    search (value) {
      this.notFound = false

      if (value === '') {
        this.cleanSearch = true
        return
      }

      this.cleanSearch = false
      this.fetchPreMatchSearchEvents(value).then((res) => {
        if (!res.length) {
          this.notFound = true
        }
      })
    },
    changeComponent (compName) {
      this.$router.replace({ query: { tab: compName } })

      const compActions = {
        SkLobby: () => {
          this.fetchMetadataInplaySports().then((res) => {
            this.sport = res[0].id
            this.selectedSport = this.sport
            this.fetchInplayEvents(this.sport)
          })
          this.fetchPreMatchMainLeagues().then((result) => {
            this.fetchPreMatchLeagueEvents(result[0].id)
          })
        },
        SkMyBets: () => {
          this.myBetsCurrentComponent = this.$route.query.myBetsTab || 'active'
          this.fetchUserBets()
        },
        SkFavorites: async () => {
          await this.fetchMetadataInplaySports().then((res) => {
            if (Object.values(this.getFavorites).find(item => item.checked)) {
              this.sport = Object.values(this.getFavorites).find(item => item.checked).id
            } else {
              this.sport = res[0].id
            }

            this.favSelectedInplaySport = this.sport
            this.fetchInplayEvents(this.sport)
          })
          await this.fetchMetadataSports().then((res) => {
            if (Object.values(this.getFavorites).find(item => item.checked)) {
              this.sport = Object.values(this.getFavorites).find(item => item.checked).id
            } else {
              this.sport = res[0].id
            }

            this.favSelectedPreMatchSport = this.sport
            this.changeFilter({ sport: this.sport })
            this.fetchPreMatchEvents()
          })

          this.favoritesSportsList()
        },
        SkLive: () => {
          this.fetchMetadataInplaySports().then((res) => {
            this.sport = res[0].id
            this.selectedSport = this.sport
            this.fetchInplayEvents(this.sport)
          })
        },
        SkPreMatch: () => {
          this.fetchMetadataSports().then((res) => {
            this.sport = res[0].id
            this.selectedSport = this.sport
            this.changeFilter({ sport: res[0].id })
            this.fetchPreMatchEvents()
          })
        }
      }

      compActions[compName]()

      this.currentComponent = compName
    },
    changeSport (sport) {
      this.selectedSport = sport.sportId

      const compActions = {
        SkLobby: () => this.fetchInplayEvents(sport.sportId),
        SkFavorites: () => {
          if (sport.type === 'inplay') {
            this.favSelectedInplaySport = sport.sportId

            this.fetchInplayEvents(sport.sportId)
          } else {
            this.favSelectedPreMatchSport = sport.sportId

            this.changeFilter({ sport: sport.sportId })
            this.fetchPreMatchEvents()
          }
        },
        SkLive: () => this.fetchInplayEvents(sport.sportId),
        SkPreMatch: () => {
          this.changeFilter({ sport: sport.sportId })
          this.fetchPreMatchEvents()
        }
      }

      compActions[this.currentComponent]()
    },
    favoritesSportsList () {
      if (Object.keys(this.getFavorites).length) {
        this.fillFavorites(this.getFavorites)
      }

      if (
        (!this.getMetadataInplaySports && !this.getMetadataSports) ||
        (!this.getMetadataInplaySports.length && !this.getMetadataSports.length)
      ) {
        this.fillFavorites([])
      }

      if (!this.getMetadataSports || !this.getMetadataSports.length) {
        this.fillFavorites(this.getMetadataInplaySports)
      }

      if (!this.getMetadataInplaySports || !this.getMetadataInplaySports.length) {
        this.fillFavorites(this.getMetadataSports)
      }

      const onlyInPreMatch = this.getMetadataSports.filter(
        item => !this.getMetadataInplaySports.map(inplayItem => inplayItem.id).includes(item.id)
      )

      const allSports = this.getMetadataInplaySports.concat(onlyInPreMatch)

      this.fillFavorites(allSports)
    },
    fillFavorites (sports) {
      if (sports.length > 5) {
        sports.forEach((item, idx) => {
          if (idx < 5) {
            this.changeFavorites({ ...item, checked: true })
          } else {
            this.changeFavorites({ ...item, checked: false })
          }
        })
      } else {
        sports.forEach(item => this.changeFavorites({ ...item, checked: true }))
      }
    },
    selectBet (ticket) {
      this.toggleTicket(ticket)
      this.changeSkOpenTicket(true)
    },
    myBetsChangeComponent (compName) {
      this.$router.replace({ query: { myBetsTab: compName } })
      this.myBetsCurrentComponent = compName
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 34px 3vw 0 3vw !important;

  .sk-my-bets-header {
    display: flex;
    justify-content: space-between;
    color: var(--fut-color-dynamic);
    margin-bottom: 24px;

    h1 {
      font-weight: 700;
      font-size: 1.125rem;
      display: flex;
      align-items: center;
      margin: 0;

      .icon {
        color: var(--fut-secondary);
        margin-right: 8px;
      }
    }
    button {
      border: none;
      background: transparent;

      .icon {
        color: var(--fut-secondary);
      }
      &:hover {
        .icon {
          color: var(--fut-color-dynamic);
        }
      }
      &:active {
        .icon {
          transform: scale(.90);
        }
      }
    }
  }
}
</style>
