<template>
  <!-- Componente sem chamada -->
  <div style="min-height: 100vh;" class="container-fuid pt-2">
    <div class="banner-content mx-2">
      <swiper
        v-if="banner"
        class="swiper"
        :options="swiperOption"
      >
        <swiper-slide>
          <img
            height="100%"
            width="100%"
            src="/img/casino.png"
            class="d-none d-md-block"
            alt=""
          >
          <img
            height="100%"
            width="100%"
            src="/img/mob-casino.png"
            class="d-md-none"
            alt=""
          >
        </swiper-slide>
        <template v-for="(provider, index) in games" :key="'casino_games_slide_holder_' + index">
          <swiper-slide v-if="index < 3" class="game-slider-container">
            <img
              height="100%"
              width="100%"
              src="/img/casino.png"
              class="d-none d-md-block"
              alt=""
            >
            <img
              height="100%"
              width="100%"
              src="/img/mob-casino.png"
              class="d-md-none"
              alt=""
            >
            <div
              v-if="provider.games && provider.games[0]"
              class="game-slider"
              :style="'background-image:linear-gradient(black, black), url(' + provider.games[0].icon + ')'"
            />
            <div class="game-slider-content">
              <div class="row">
                <div class="col-6 pointer" @click="()=>{link=provider.games[0].url; iframe=true}">
                  <img
                    class="casino-icon-slider"
                    :src="provider.games[0].icon ? provider.games[0].icon : '/img/mob-casino.png'"
                    :class="{bnw: !provider.games[0].icon}"
                    alt=""
                  >
                </div>
                <div class="col-6 pointer" @click="()=>{link=provider.games[0].url; iframe=true}">
                  <h4 class="text-white fut-color-dynamic">
                    {{ provider.games[0].name }}
                  </h4>
                  <p class="text-white fut-color-dynamic">
                    {{ provider.games[0].description }}
                  </p>
                  <fut-button primary class="casino-slider-btn text-white fut-color-dynamic" @click="()=>{link=provider.games[0].url; iframe=true}">
                    {{ $t('i18n_jogar_agora') }}
                  </fut-button>
                </div>
              </div>
            </div>
          </swiper-slide>
        </template>
        <div slot="pagination" class="swiper-pagination" />
        <div slot="button-next" class="swiper-button-next" />
        <div slot="button-prev" class="swiper-button-prev" />
      </swiper>
    </div>
    <div class="casino-games-container">
      <div class="casino-games-filter p-2">
        <div class="casino-games-title-container mt-3">
          <h5 class="casino-games-title fw-bold text-capitalize">
            <div class="casino-games-title-border" />
            <fut-button style="display: flex" class="w-100 btn p-0" @click="showProviders = !showProviders">
              <p class="casino-games-title-name text-start fw-bold text-white fut-color-dynamic w-100">
                {{ $t('i18n_provedores') }}
              </p>
              <span class="text-white fut-color-dynamic fw-bold p-1">+</span>
            </fut-button>
            <div class="search-container float-end">
              <fut-input v-model="searchTerm" class="search-input" secondary icon="search" icon-white />
            </div>
          </h5>
          <div v-if="showProviders" class="providers transition p-2 row mx-0">
            <div v-for="provider in providers" :key="'provider_' + provider.slug" class="col-4 col-md-2 px-1 py-1">
              <div>
                <fut-button :to="'/casino/provider/' + provider.slug" class="provider-button text-white fut-color-dynamic">
                  <span class="w-100">
                    {{ provider.provider }}
                  </span>
                </fut-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!searching">
        <div v-for="(category, index) in games" :key="'casino_games_holder_' + index" class="casino-games p-2">
          <div class="casino-games-title-container">
            <h5 class="casino-games-title text-capitalize">
              <div class="casino-games-title-border" />
              <p class="casino-games-title-name text-white fut-color-dynamic w-100 fw-bold">
                {{ category.name }}
              </p>
              <small class="p-1">
                <fut-button :to="'/casino/category/' + category.slug" class="nowrap text-white fut-color-dynamic text-decoration-none pe-2"><font-awesome-icon class="icon text-white pe-2" :icon="['fas', 'plus']" />{{ $t('i18n_ver_mais') }}</fut-button>
              </small>
            </h5>
          </div>
          <div class="casino-games-group">
            <div v-for="(game, j) in category.games" :key="'casino_games_' + index + '_' + j" class="p-2 casino-game">
              <fut-button
                style="border-radius: 10px !important; overflow: hidden;"
                class="position-relative casino-button transition"
                block
                @click="()=>{link=game.url; iframe=true}"
              >
                <div class="play-overlay">
                  <font-awesome-icon class="icon" :icon="['fas', 'play-circle']" />
                </div>
                <img class="casino-icon" :src="game.icon ? game.icon : '/img/mob-casino.png'" :class="{bnw: !game.icon}" alt="">
                <div class="casino-name">
                  {{ game.name }}
                </div>
              </fut-button>
            </div>
          </div>
        </div>
        <div class="casino-games p-2 mb-4">
          <div v-if="gamesFiltered && gamesFiltered[0]" class="casino-games-title-container">
            <h5 class="casino-games-title text-capitalize">
              <div class="casino-games-title-border" />
              <p class="casino-games-title-name text-white fut-color-dynamic w-100 fw-bold">
                {{ gamesFiltered[0].category_br ? gamesFiltered[0].category_br : gamesFiltered[0].category }}
              </p>
            </h5>
          </div>
          <div class="casino-games-group">
            <div v-for="(game, j) in gamesFiltered" :key="'casino_games_' + j" class="p-2 casino-game">
              <fut-button
                style="border-radius: 10px !important; overflow: hidden;"
                class="position-relative casino-button transition"
                block
                @click="()=>{link=game.url; iframe=true}"
              >
                <div class="play-overlay">
                  <font-awesome-icon class="icon" :icon="['fas', 'play-circle']" />
                </div>
                <img class="casino-icon" :src="game.icon ? game.icon : '/img/mob-casino.png'" :class="{bnw: !game.icon}" alt="">
                <div class="casino-name">
                  {{ game.name }}
                </div>
              </fut-button>
            </div>
          </div>
          <div v-if="pagination && hasPages" class="text-center mt-3">
            <fut-button rounded primary @click="concatCasinoGamesByCategory(page)">
              {{ $t('i18n_mostrar_mais') }} <font-awesome-icon class="text-dark icon ms-2" :icon="['fas', 'plus']" />
            </fut-button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="casino-games p-2 mb-4">
          <div v-if="searchGames && searchGames[0]" class="casino-games-title-container">
            <h5 class="casino-games-title text-capitalize">
              <div class="casino-games-title-border" />
              <p class="casino-games-title-name text-white fut-color-dynamic w-100 fw-bold">
                {{ searchGames[0].category_br ? searchGames[0].category_br : searchGames[0].category }}
              </p>
            </h5>
          </div>
          <div class="casino-games-group">
            <div v-for="(game, j) in searchGames" :key="'casino_games_' + j" class="p-2 casino-game">
              <fut-button
                style="border-radius: 10px !important; overflow: hidden;"
                class="position-relative casino-button transition"
                block
                @click="()=>{link=game.url; iframe=true}"
              >
                <div class="play-overlay">
                  <font-awesome-icon class="icon" :icon="['fas', 'play-circle']" />
                </div>
                <img class="casino-icon" :src="game.icon ? game.icon : '/img/mob-casino.png'" :class="{bnw: !game.icon}" alt="">
                <div class="casino-name">
                  {{ game.name }}
                </div>
              </fut-button>
            </div>
          </div>
          <div v-if="pagination && hasPages" class="text-center mt-3">
            <fut-button rounded primary @click="concatCasinoGamesByCategory(page)">
              {{ $t('i18n_mostrar_mais') }} <font-awesome-icon class="text-dark icon ms-2" :icon="['fas', 'plus']" />
            </fut-button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="iframe" class="iframe-modal">
      <div class="content-modal p-2">
        <fut-button class="text-white btn-close-modal" @click="iframe = false">
          <font-awesome-icon :icon="['fas', 'times']" />
        </fut-button>
        <iframe :src="link" height="100%" width="100%" title="Casino game" />
      </div>
    </div>
  </div>
</template>
<script>
import FutButton from '@/components/default/atoms/FutButton'
import FutInput from '@/components/default/atoms/FutInput'
export default {
  components: { FutButton, FutInput },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    banner: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: false
    },
    providers: {
      type: Array,
      default: () => ([])
    },
    gamesFiltered: {
      type: Array,
      default: () => ([])
    },
    searchGames: {
      type: Array,
      default: () => ([])
    },
    games: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      iframe: false,
      link: null,
      showProviders: false,
      searchTerm: '',
      searchTimeout: null,
      searching: false,
      hasPages: true,
      swiperOption: {
        autoHeight: true,
        loop: true,
        direction: 'horizontal',
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  watch: {
    searchTerm (val) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }
      if (val === '' || val === null || !val) {
        this.searching = false
        return
      }
      this.searching = true
      this.searchTimeout = setTimeout(() => {
        this.$emit('search', val)
      }, 1000)
    }
  }
}
</script>
<style scoped lang="scss">
@import "@/assets/layout/breakpoints";
.pointer{
  cursor: pointer;
}
.nowrap{
  white-space: nowrap;
}
.btn-close-modal{
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 100px;
  background: #333;
}
.iframe-modal{
  background: rgba(51, 51, 51, 0.637);
  position: fixed;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}
.content-modal{
  background: #333;
  width: 90vw;
  height: 90vh;
  border-radius: 10px;
  transform: translate(5vw, 5vh);
}
.play-overlay{
  display: none;
  position: absolute;
  background: rgba(51, 51, 51, 0.527);
  width: 100%;
  height: 100%;
  .icon{
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    font-size: 50px;
    color: #fafafa;
  }
}
.casino-icon{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.text-gold{
  color: #eeba33;
}
.casino-name{
  position: absolute;
  padding-right: 10px;
  bottom: 0px;
  left: 0;
  background: var(--fut-primary);
  border-top-right-radius: 10px;
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.casino-games-title-container{
  background: var(--fut-background-lighter);
  border-radius: 5px;
  .casino-games-title{
    display: flex;
    font-size: 17px;
    .casino-games-title-border{
      background: #eeba33;
      width: 5px;
      height: 15px;
      margin-top: 7px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    .casino-games-title-name{
      text-transform: lowercase;
      display:inline-block;
      margin-top: 5px;
      margin-bottom: 5px;
      padding-left: 10px;
      &:first-letter {
        text-transform: uppercase;
      }
    }
  }
}
.casino-games-group{
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "a a ."
    "a a .";
  @include md {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
      "a a . . . ."
      "a a . . . .";
  }
  .casino-game{
    display: inline-grid;
    height: 100px;
    @include md{
      height: 200px;
    }
    width: 100%;
    &:first-child{
      height: 200px;
      @include md {
        height: 400px;
      }
      grid-area: a;
    }
    .casino-button{
      padding: 0px;
      border: 1px solid var(--fut-primary);
    }
    .casino-button:hover{
      border: 3px solid var(--fut-primary);
      transform: scale(1.1); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
      .play-overlay{
        display: block;
      }
    }
  }
}
.casino-games-filter{
  .casino-games-title-container{
    background: var(--fut-secondary-darkest);
  }
}
.search-container{
  .search-input{
    margin-top: 5px;
    margin-right: 10px;
    height: 25px;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 34px -8px #000000;
    box-shadow: 0px 0px 34px -8px #000000;
  }
}
.bnw{
  filter: grayscale(1);
  opacity: .4;
}
.swiper-button-prev, .swiper-button-next{
  color: var(--fut-primary) !important;
}
.swiper-pagination-bullet{
  background: #000 !important;
  opacity: 0.5 !important;
}
.swiper-pagination-bullet-active{
  background: var(--fut-primary) !important;
}
.swiper-container{
  z-index: 0 !important;
}
.game-slider-container{
  overflow: hidden;
  .game-slider-content{
    background: var(--fut-primary-transparent);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    h4{
      font-size: 2em;
      font-weight: 700;
      margin-top: 20px;
      margin-bottom: 5px;
    }
    p{
      font-size: 1.2em;
      font-weight: 400;
    }
    .casino-slider-btn{
      font-size: 1em;
      font-weight: 700;
      border-radius: 50px !important;
      padding: 5px 20px;
    }
    .row{
      padding-top: 20px;
      height: 100%;
    }
  }
  .game-slider{
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: color;
    position: absolute;
    width: 150%;
    height: 150%;
    top: 0;
    transform: translate(-25%, -25%);
    filter: blur(10px);
  }
}
.casino-icon-slider{
  height: 200px;
  width: 200px;
  float: right;
  border-radius: 10px;
}
.icon-size{
  font-size: 15px;
}
.provider-button{
  border-radius: 10px !important;
  width: 100%;
  text-align: left;
  &:hover{
    background: var(--fut-secondary-black);
  }
}
</style>
