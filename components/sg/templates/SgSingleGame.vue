<template>
  <div class="mt-5 mb-3">
    <div class="bg-dark p-3">
      <div class="d-flex">
        <sg-game-card
          v-if="getCasinoGame"
          :item="getCasinoGame"
          :user="loggedInUser"
          @select="(payload) => openGameModal(payload)"
          @register="callRegisterModal()"
        />
        <div v-if="getCasinoGame" class="route-contents ms-3">
          <h3 class="text-white">
            {{ getCasinoGame.name }}
          </h3>
          <h5 class="provider-title text-white">
            <small>{{ getCasinoGame.provider }}</small>
          </h5>
          <div class="mt-5">
            <button class="game-btn-play transition mb-1" @click="()=>{loggedInUser ? openGameModal(getCasinoGame) : callRegisterModal()}">
              <small>
                <font-awesome-icon :icon="['fas', 'play-circle']" /> {{ $t('i18n_jogo_real') }}
              </small>
            </button>
            <button v-if="!loggedInUser" class="sec-game-btn-play transition" @click="openGameModal(getCasinoGame)">
              <small>
                {{ $t('i18n_modo_diversao') }}
              </small>
            </button>
          </div>
        </div>
      </div>
    </div>

    <sg-highlight
      v-if="getCasinoMostPlayedGames && getCasinoMostPlayedGames.games && getCasinoMostPlayedGames.games.length > 0"
      comp-id="single"
      :user="loggedInUser"
      title="Recomendados para você!"
      :games="getCasinoMostPlayedGames"
      @select="payload => openGameModal(payload)"
    />

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
import { useCasinoFeaturedStore } from '@/stores/casino-featured'

import SgGameCard from '@/components/sg/atoms/SgGameCard'
import SgCasinoGamesModal from '@/components/sg/molecules/SgCasinoGamesModal'
import SgHighlight from '@/components/sg/organisms/SgHighlight'

export default {
  name: 'SgSingleGame',
  components: {
    SgGameCard,
    SgCasinoGamesModal,
    SgHighlight
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
      getCasinoGame: 'getCasinoGame',
      getCasinoGames: 'getCasinoGames'
    }),
    ...mapState(useCasinoFeaturedStore, {
      getCasinoMostPlayedGames: 'getCasinoMostPlayedGames'
    })
  },
  mounted () {
    this.fetchCasinoSingleGame(this.$route.params.gameId).then((res) => {
      this.currentGame = res
      this.modalOpen = true
    })
  },
  methods: {
    ...mapActions(useCasinoStore, {
      fetchCasinoSingleGame: 'casino/fetchCasinoSingleGame'
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

<style scoped lang="scss">
.provider-title {
  background: #fafafa50;
  padding: 2px 15px;
  display: inline-block;
  border-radius: 50px;
}
.sec-game-btn-play {
  // transform: translate(-50%, -50%);
  background: rgba(128, 128, 128, 0.438);
  border-radius: 100px;
  padding: 5px 20px;
  border: none;
  color: white;
  font-weight: 500;
  font-size: 22px;
  &:hover {
    background: rgba(128, 128, 128, 0.678);
  }
}
.game-btn-play {
  // display: block;
  // opacity: 0;
  // transform: translate(-50%, -50%) scale(1.5);
  background: #71b417;
  border-radius: 100px;
  padding: 5px 20px;
  border: none;
  white-space: nowrap;
  color: white;
  font-weight: 900;
  font-size: 22px;
  &:hover {
    background: #578f0d;
  }
}
</style>
