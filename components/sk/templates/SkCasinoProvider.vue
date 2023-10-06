<template>
  <div>
    <div class="provider-title d-flex align-items-center">
      <div class="container">
        <h1>
          {{ $t('i18n_provedores') }}
        </h1>
      </div>
    </div>
    <div class="container sk-content">
      <sk-modal-search
        :items="fetched"
        :placeholder="$t('i18n_procure_seu_jogo')"
        :not-found="notFound"
        casino
        class="my-4"
        @search="search($event)"
      />

      <div
        class="providers-wrapper"
        :style="`
          grid-template-columns: repeat(${dynamicGrid.columns}, 1fr);
          gap: ${dynamicGrid.gap};
        `"
      >
        <NuxtLink
          v-for="(prov, idx) in getCasinoProviders"
          :key="idx"
          class="provider"
          :to="localePath(`/casino/provider/${prov.slug}`)"
        >
          <img
            v-if="prov.img"
            :src="prov.img"
          >
          <div v-else>
            <span>{{ prov.provider }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useMetadataCasinoStore } from '@/stores/metadata-casino'
import { useCasinoSearchGamesStore } from '@/stores/casino-search-games'

import SkModalSearch from '@/components/sk/molecules/SkModalSearch.vue'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'SkCasinoProvider',
  components: {
    SkModalSearch
  },
  mixins: [windowWidth],
  data () {
    return {
      cleanSearch: false,
      notFound: false
    }
  },
  computed: {
    ...mapState(useMetadataCasinoStore, {
      getCasinoProviders: 'getCasinoProviders'
    }),
    ...mapState(useCasinoSearchGamesStore, {
      getCasinoSearchGames: 'getCasinoSearchGames'
    }),
    fetched () {
      if (this.cleanSearch || !this.getCasinoSearchGames || (this.getCasinoSearchGames && this.getCasinoSearchGames.length === 0)) {
        return []
      }

      return this.getCasinoSearchGames[0].games
    },
    dynamicGrid () {
      if (this.skContentWidth < 500 && this.width < 520) {
        return { columns: 2, gap: '2rem 1rem' }
      } else if (this.skContentWidth < 700 && this.width < 930) {
        return { columns: 3, gap: '2rem 1rem' }
      } else if (this.skContentWidth < 850 && this.width < 1200) {
        return { columns: 4, gap: '2rem 1rem' }
      } else if (this.skContentWidth < 1000 && this.width < 1300) {
        return { columns: 5, gap: '2rem 1rem' }
      } else if (this.skContentWidth < 1150 && this.width < 1500) {
        return { columns: 6, gap: '2rem 1rem' }
      }

      return { columns: 7, gap: '2rem 1rem' }
    }
  },
  created () {
    this.fetchCasinoProviders()
  },
  methods: {
    ...mapActions(useMetadataCasinoStore, {
      fetchCasinoProviders: 'fetchCasinoProviders'
    }),
    ...mapActions(useCasinoSearchGamesStore, {
      searchCasinoGames: 'searchCasinoGames'
    }),
    search (value) {
      this.notFound = false

      if (value === '') {
        this.cleanSearch = true
        return
      }

      this.cleanSearch = false
      this.searchCasinoGames(value).then((res) => {
        if (!res.length) {
          this.notFound = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 3vw 0 3vw !important;
}

.provider-title {
  background: var(--fut-background-lighter);
  height: 115px;

  h1 {
    color: var(--fut-color-dynamic);
    font-size: 1.7rem;
    font-weight: 600;
  }
}

.providers-wrapper {
  display: grid;
  padding-top: 32px;

  .provider {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 63px;
    text-decoration: none;
    background: #365060;
    border-radius: .5rem;
    transition: all ease-in-out 200ms;
    box-shadow: 0rem .125rem .25rem #0000001f , 0rem .25rem .375rem #1b171733;
    overflow: hidden;

    img {
      padding: 5px;
      height: 100%;
      width: 100%;
    }

    div {
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      padding: 0 2px 0 4px;

      span {
        white-space: nowrap;
        color: var(--fut-color-dynamic);
        font-weight: 600;
        font-size: 1.2rem;
        text-align: center;
        text-transform: capitalize;
      }
    }

    &:hover {
      margin-top: -7px;
    }
  }
}
</style>
