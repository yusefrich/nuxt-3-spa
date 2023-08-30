<template>
  <div class="mt-5">
    <sg-home-filter
      v-if="getCasinoGames"
      target="_blank"
      :categories="getCasinoGames"
      @select="slug => slugFilter = slug"
    />
    <template v-if="getCasinoFilteredGame">
      <div v-for="(gamesg, idx) in getCasinoFilteredGame" :key="'category_group_' + idx">
        <sg-list-games
          v-if="!slugFilter || slugFilter === game.slug"
          :game-group="gamesg"
          :user="loggedInUser"
          class="mb-4"
          @select="payload => openGameModal(payload)"
          @register="callRegisterModal()"
        />
      </div>
    </template>

    <sg-casino-games-modal
      v-model="modalOpen"
      :current-game="currentGame"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SgListGames from '@/components/sg/organisms/SgListGames.vue'
import SgHomeFilter from '@/components/sg/organisms/SgHomeFilter.vue'

export default {
  name: 'SgHome',
  components: {
    SgListGames,
    SgHomeFilter
  },
  data () {
    return {
      modalOpen: false,
      slugFilter: null,
      currentGame: null
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      getCasinoGames: 'casino/getCasinoGames',
      getCasinoMostPlayedGames: 'casino-featured/getCasinoMostPlayedGames',
      getCasinoNew: 'casino-featured/getCasinoNew',
      getCasinoCategoryGames: 'casino-category-games/getCasinoCategoryGames'
    }),
    getCasinoFilteredGame () {
      if (this.$route.params.categorySlug === 'mocked-most') {
        return this.getCasinoMostPlayedGames
      } else if (this.$route.params.categorySlug === 'mocked-new') {
        return this.getCasinoNew
      } else {
        return this.getCasinoCategoryGames
      }
    }
  },
  mounted () {
    if (this.$route.params.categorySlug === 'mocked-most') {
      this.fetchCasinoMostPlayedGames()
    } else if (this.$route.params.categorySlug === 'mocked-new') {
      this.fetchCasinoNewGames()
    } else {
      this.fetchCasinoGamesByCategory(this.$route.params.categorySlug)
    }

    if (this.$route.query.gameid) {
      this.fetchCasinoSingleGame(this.$route.query.gameid).then((res) => {
        this.currentGame = res
        this.modalOpen = true
      })
    }
  },
  methods: {
    ...mapActions({
      fetchCasinoSingleGame: 'casino/fetchCasinoSingleGame',
      fetchCasinoGamesByCategory: 'casino-category-games/fetchCasinoGamesByCategory',
      fetchCasinoMostPlayedGames: 'casino-featured/fetchCasinoMostPlayedGames',
      fetchCasinoNewGames: 'casino-featured/fetchCasinoNewGames'
    }),
    callRegisterModal () {
      document.getElementById('registerModal').click()
    },
    openGameModal (data) {
      this.modalOpen = true
      this.currentGame = data

      const searchURL = new URL(window.location)
      searchURL.searchParams.set('gameid', data.id)
      window.history.pushState({}, '', searchURL)
    }
  }
}
</script>
