<template>
  <div class="mt-5">
    <sg-home-filter
      v-if="(!live && getCasinoGames) || (live && getLiveCasinoGames)"
      target="_blank"
      :categories="live ? getLiveCasinoGames : getCasinoGames"
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
import { mapActions, mapState } from 'pinia'
import { useBaseStore } from '@/stores/base'
import { useCasinoStore } from '@/stores/casino'
import { useLiveCasinoStore } from '@/stores/live-casino'
import { useCasinoFeaturedStore } from '@/stores/casino-featured'
import { useCasinoCategoryGamesStore } from '@/stores/casino-category-games'
import { useLiveCasinoFeaturedStore } from '@/stores/live-casino-featured'

import SgListGames from '@/components/sg/organisms/SgListGames'
import SgHomeFilter from '@/components/sg/organisms/SgHomeFilter'

export default {
  name: 'SgCategoryGames',
  components: {
    SgListGames,
    SgHomeFilter
  },
  props: {
    live: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      modalOpen: false,
      slugFilter: null,
      currentGame: null
    }
  },
  computed: {
    ...mapState(useBaseStore, {
      loggedInUser: 'loggedInUser'
    }),
    ...mapState(useCasinoStore, {
      getCasinoGames: 'getCasinoGames'
    }),
    ...mapState(useLiveCasinoStore, {
      getLiveCasinoGames: 'getLiveCasinoGames'
    }),
    ...mapState(useCasinoFeaturedStore, {
      getCasinoNew: 'getCasinoNew',
      getCasinoMostPlayedGames: 'getCasinoMostPlayedGames'
    }),
    ...mapState(useCasinoCategoryGamesStore, {
      getCasinoCategoryGames: 'getCasinoCategoryGames'
    }),
    ...mapState(useLiveCasinoFeaturedStore, {
      getLiveCasinoNew: 'getLiveCasinoNew',
      getLiveCasinoMostPlayedGames: 'getLiveCasinoMostPlayedGames'
    }),
    getCasinoFilteredGame () {
      if (this.$route.params.categorySlug === 'mocked-most') {
        return this.live ? this.getLiveCasinoMostPlayedGames : this.getCasinoMostPlayedGames
      } else if (this.$route.params.categorySlug === 'mocked-new') {
        return this.live ? this.getLiveCasinoNew : this.getCasinoNew
      } else {
        return this.getCasinoCategoryGames
      }
    }
  },
  mounted () {
    if (this.$route.params.categorySlug === 'mocked-most') {
      this.live ? this.fetchLiveCasinoMostPlayedGames() : this.fetchCasinoMostPlayedGames()
    } else if (this.$route.params.categorySlug === 'mocked-new') {
      this.live ? this.fetchLiveCasinoNewGames() : this.fetchCasinoNewGames()
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
    ...mapActions(useCasinoStore, {
      fetchCasinoSingleGame: 'fetchCasinoSingleGame'
    }),
    ...mapActions(useCasinoFeaturedStore, {
      fetchCasinoNewGames: 'fetchCasinoNewGames',
      fetchCasinoMostPlayedGames: 'fetchCasinoMostPlayedGames'
    }),
    ...mapActions(useCasinoCategoryGamesStore, {
      fetchCasinoGamesByCategory: 'fetchCasinoGamesByCategory'
    }),
    ...mapActions(useLiveCasinoFeaturedStore, {
      fetchLiveCasinoNewGames: 'fetchLiveCasinoNewGames',
      fetchLiveCasinoMostPlayedGames: 'fetchLiveCasinoMostPlayedGames'
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
