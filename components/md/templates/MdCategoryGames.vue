<template>
  <div class="md-category">
    <md-casino-header
      v-if="getCasinoFilteredGame"
      :name="getCasinoFilteredGame[0].name"
    />
    <div v-if="getCasinoFilteredGame">
      <div
        v-for="(item, idx) in getCasinoFilteredGame"
        :key="idx"
        class="category-body"
      >
        <md-casino-card-game
          v-for="(game, gameIdx) in item.games"
          :key="`img_game_${gameIdx}`"
          :game="game"
          :width="`calc(${100 / gamesPerRow}% - 10px)`"
          class="mb-3"
          @openGame="openGame(game)"
        />
      </div>
    </div>
    <md-view-more-btn
      :loading="getCasinoLoading"
      @viewMore="concat()"
    />

    <md-casino-game-modal
      v-model="iframe"
      :current-game="currentGame"
      :iframe-game-url="iframeGameUrl"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MdCasinoHeader from '@/components/md/atoms/MdCasinoHeader.vue'
import MdCasinoGameModal from '@/components/md/molecules/MdCasinoGameModal.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'MdCategoryGames',
  components: {
    MdCasinoHeader,
    MdCasinoGameModal
  },
  mixins: [windowWidth],
  data () {
    return {
      iframeGameUrl: null,
      iframe: false,
      currentGame: null,
      slug: '',
      page: 2
    }
  },
  computed: {
    ...mapGetters({
      getCasinoGames: 'casino/getCasinoGames',
      getCasinoMostPlayedGames: 'casino-featured/getCasinoMostPlayedGames',
      getCasinoNew: 'casino-featured/getCasinoNew',
      getCasinoCategoryGames: 'casino-category-games/getCasinoCategoryGames',
      getCasinoLoading: 'casino/getCasinoLoading'
    }),
    getCasinoFilteredGame () {
      if (this.slug === 'mocked-most') {
        return this.getCasinoMostPlayedGames
      } else if (this.slug === 'mocked-new') {
        return this.getCasinoNew
      } else {
        return this.getCasinoCategoryGames
      }
    },
    gamesPerRow () {
      if (this.width < 427) {
        return 2
      } else if (this.width < 769) {
        return 3
      } else {
        return 5
      }
    }
  },
  mounted () {
    this.updateOptions({
      sidebar: true
    })

    this.slug = this.$route.params.categorySlug

    if (this.slug === 'mocked-most') {
      this.fetchCasinoMostPlayedGames()
    } else if (this.slug === 'mocked-new') {
      this.fetchCasinoNewGames()
    } else {
      this.fetchCasinoGamesByCategory(this.slug)
    }

    if (this.$route.query.gameid) {
      this.fetchCasinoSingleGame(this.$route.query.gameid).then((res) => {
        this.currentGame = res
        this.iframe = true
      })
    }
  },
  methods: {
    ...mapActions({
      fetchCasinoSingleGame: 'casino/fetchCasinoSingleGame',
      fetchCasinoGamesByCategory: 'casino-category-games/fetchCasinoGamesByCategory',
      concatCasinoGamesByCategory: 'casino-category-games/concatCasinoGamesByCategory',
      fetchCasinoMostPlayedGames: 'casino-featured/fetchCasinoMostPlayedGames',
      concatCasinoMostPlayedGames: 'casino-featured/concatCasinoMostPlayedGames',
      fetchCasinoNewGames: 'casino-featured/fetchCasinoNewGames',
      concatCasinoNewGames: 'casino-featured/concatCasinoNewGames',
      updateOptions: 'layout/updateOptions',
      fetchCasinoGameIframeUrl: 'casino/fetchCasinoGameIframeUrl'
    }),
    openGame (game) {
      if (game.agregator && game.agregator === 'softgaming') {
        this.fetchCasinoGameIframeUrl({ game_id: game.id }).then((result) => {
          this.iframeGameUrl = result.url
          const searchURL = new URL(window.location)
          searchURL.searchParams.set('gameid', game.id)
          window.history.pushState({}, '', searchURL)
        }).catch((err) => {
          console.error('casino new url fetching error', err)
          this.modalOpen = false
        })
      } else {
        this.currentGame = game
        this.iframe = true
        const searchURL = new URL(window.location)
        searchURL.searchParams.set('gameid', game.id)
        window.history.pushState({}, '', searchURL)
      }
    },
    concat () {
      if (this.slug === 'mocked-most') {
        this.concatCasinoMostPlayedGames(this.page++)
      } else if (this.slug === 'mocked-new') {
        this.concatCasinoNewGames(this.page++)
      } else {
        this.concatCasinoGamesByCategory({ categorySlug: this.slug, page: this.page++ })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.md-category {
  background: var(--md-bg-color);
}

.category-body {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
