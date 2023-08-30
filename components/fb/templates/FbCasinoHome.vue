<template>
  <div style="min-height: 100vh;" class="container-fuid pt-2">
    <div class="banner-content mx-2">
      <div class="d-none d-md-block">
        <fb-carrosel v-if="getCasinoSliders && getCasinoSliders.slides" :slides="getCasinoSliders.slides" />
      </div>
      <div class="d-md-none">
        <fb-carrosel v-if="getCasinoSliders && getCasinoSliders.slides_mobile" :slides="getCasinoSliders.slides_mobile" />
      </div>
    </div>
    <fb-fut-button
      v-if="productRedirect && loggedInUser"
      class="btn-product-redirect d-md-none"
      @click="redirectProduct()"
    >
      <img width="20" height="20" src="/svg/bid-icon_1.svg" alt="bid icon">
      {{ productRedirect.title }}
    </fb-fut-button>
    <div class="casino-games-container">
      <fb-casino-sticky-bar
        :providers="getCasinoProviders"
        :categories="getCasinoCategories"
        :top-offset="topOffset"
        @search="search => searchTerm = search"
      />
      <div class="mt-3">
        <!-- <div>
          <code>{{ casinoGames }}</code>
        </div> -->
        <div v-for="(category, index) in casinoGames" :key="'casino_games_holder_' + index" class="casino-games p-2">
          <div class="casino-games-title-container mt-md-4">
            <h5 class="casino-games-title text-capitalize">
              <p class="casino-games-title-name text-white fut-color-dynamic w-100 fw-bold">
                <span>
                  {{ category.name }}
                </span>
              </p>
              <small v-if="category.slug">
                <fb-fut-button
                  v-if="!catTerm"
                  :to="'/casino?cat=' + category.slug"
                  class="nowrap text-white fut-color-dynamic text-decoration-none pe-2"
                >
                  {{ $t('i18n_ver_mais') }}
                </fb-fut-button>
              </small>
            </h5>
          </div>
          <div class="casino-games-group">
            <template v-for="(game, j) in category.games">
              <div v-if="(j < 9) || ((catTerm || provTerm) || (searchTerm && searchTerm !== ''))" :key="'casino_games_' + index + '_' + j" class="p-3 casino-game">
                <fb-fut-button
                  style="border-radius: 10px !important; overflow: hidden;"
                  class="position-relative casino-button transition"
                  block
                  @click="openGame(game)"
                >
                  <div class="play-overlay transition">
                    <font-awesome-icon class="icon transition" :icon="['fas', 'play']" />
                    <div class="circle-icon" />
                  </div>
                  <img v-lazy-load class="casino-icon" :data-src="game.icon ? game.icon : '/img/mob-casino.png'" :class="{bnw: !game.icon}" alt="">
                  <div class="casino-name text-white">
                    {{ game.name }}
                  </div>
                </fb-fut-button>
              </div>
            </template>
          </div>
          <div
            v-if="(catTerm || provTerm) && (!searchTerm || searchTerm === '')"
            class="casino-games-pagination text-center"
          >
            <fb-fut-button
              v-if="hasPages"
              class="casino-pagination-btn text-white"
              @click="concatNewGames()"
            >
              {{ $t('i18n_mais') }}
            </fb-fut-button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="iframe" class="iframe-modal">
      <div class="content-modal">
        <fb-fut-button class="text-white btn-close-modal" @click="iframe = false">
          <font-awesome-icon :icon="['fas', 'times']" />
        </fb-fut-button>
        <fb-fut-button
          v-if="agregator !== 'softgaming'"
          class="text-white btn-close-modal"
          style="right: 40px"
          :to="link"
          target="_blank"
          @click="iframe = false"
        >
          <font-awesome-icon :icon="['fas', 'external-link-alt']" />
        </fb-fut-button>
        <font-awesome-icon class="iframe-modal-icon fut-spin text-white fut-color-dynamic" :icon="['fas', 'circle-notch']" />
        <iframe v-if="!agregator || agregator === '' || agregator === 'wac' || agregator === 'br4bet' || agregator === 'banana-live' || agregator === 'banana' || agregator === 'fds'" :src="link" height="100%" width="100%" title="Casino game" />
        <div v-else-if="agregator === 'softgaming' && !gameCode && !type4url && !iframeHtml" id="egamings_container" />
        <iframe
          v-else-if="agregator === 'softgaming' && type4url"
          :src="type4url"
          id="slotFrame"
          width="100%"
          height="100%"
          frameBorder="0"
          marginheight="0"
          marginwidth="0"
          class="egamings_game_frame"
          allow="autoplay *;fullscreen *;"
          allowfullscreen
        >
        </iframe>
        <iframe
          v-else-if="agregator === 'softgaming' && iframeHtml"
          :srcdoc="iframeHtml"
          id="slotFrame"
          width="100%"
          height="100%"
          frameBorder="0"
          marginheight="0"
          marginwidth="0"
          class="egamings_game_frame"
          allow="autoplay *;fullscreen *;"
          allowfullscreen
        >
        </iframe>

        <div class="h-100" v-else v-html="gameCode"></div>
      </div>
    </div>
    <fut-modal
      class="text-center"
      title="Entrar"
      :open="loginIframe"
      @onClose="()=>{ loginIframe = false; }"
    >
      <p>Realize seu login para acessar esse jogo!</p>
      <fb-login-form v-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'" :currentSettings="currentSettings" @logUser="logUser($event)" />
      <fut-login v-else @logUser="logUser($event)" :vertical="true" />
    </fut-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FbFutButton from '@/components/fb/atoms/FbFutButton'
import FbCasinoStickyBar from '@/components/fb/organisms/FbCasinoStickyBar'
import FbCarrosel from '@/components/fb/atoms/FbCarrosel'
import FutModal from '@/components/default/organisms/FutModal.vue'
import FutLogin from '@/components/default/molecules/FutLogin.vue'
import FbLoginForm from '@/components/fb/molecules/FbLoginForm.vue'
import sportradarTagManager from '@/mixins.js/sportradarTagManager.js'

export default {
  name: 'FbCasinoHome',
  components: {
    FbFutButton,
    FbCasinoStickyBar,
    FutModal,
    FutLogin,
    FbLoginForm,
    FbCarrosel
  },
  mixins: [sportradarTagManager],
  props: {
    topOffset: {
      type: Number,
      default: 0
    },
    banner: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: false
    },
    searchGames: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      iframe: false,
      type4url: null,
      iframeHtml: null,
      gameCode: null,
      loginIframe: false,
      page: 2,
      agregator: null,
      link: null,
      showProviders: false,
      searchTerm: '',
      catTerm: '',
      provTerm: '',
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
  computed: {
    ...mapGetters({
      getCurrentLayoutStyle: 'layout/getCurrentLayoutStyle',
      loggedInUser: 'loggedInUser',
      currentSettings: 'settings/currentSettings',
      getCasinoGames: 'casino/getCasinoGames',
      getCasinoProviderGames: 'casino-provider-games/getCasinoProviderGames',
      getCasinoGameIframeUrl: 'casino/getCasinoGameIframeUrl',
      getCasinoProviders: 'metadata-casino/getCasinoProviders',
      getCasinoCategories: 'metadata-casino/getCasinoCategories',
      getCasinoSliders: 'metadata-casino/getCasinoSliders',
      getCasinoSearchedGames: 'casino/getCasinoSearchedGames',
      getCasinoLoading: 'casino-provider-games/getCasinoLoading',
      getCasinoCategoryGames: 'casino-category-games/getCasinoCategoryGames',
      getCasinoMostPlayedGames: 'casino-featured/getCasinoMostPlayedGames',
      getCasinoNew: 'casino-featured/getCasinoNew',
      getCasinoSearchGames: 'casino-search-games/getCasinoSearchGames',
      getCasinoSearchLoading: 'casino-search-games/getCasinoSearchLoading'
    }),
    productRedirect () {
      if (!process.env.PRODUCT_REDIRECT_URL && !process.env.PRODUCT_REDIRECT_TITLE) {
        return null
      }
      return { title: process.env.PRODUCT_REDIRECT_TITLE }
    },
    casinoGames () {
      if (this.searchTerm && !this.searching && !this.getCasinoSearchLoading) {
        return this.getCasinoSearchGames
      }

      if (this.$route.query.prov) {
        return this.getCasinoProviderGames
      }

      switch (this.$route.query.cat) {
        case undefined:
          return this.getCasinoGames
        case 'mocked-new':
          return this.getCasinoNew
        case 'mocked-most':
          return this.getCasinoMostPlayedGames
        default:
          return this.getCasinoCategoryGames
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
      this.searchTimeout = setTimeout(async () => {
        await this.searchCasinoGames(val)
        this.searching = false
      }, 1000)
    }
  },
  mounted () {
    this.page = 2
    if (this.$route.query.game) {
      this.fetchCasinoHeaderGames().then((result) => {
        this.link = result[this.$route.query.game].url
        this.iframe = true
      })
    } else {
      this.fetchCasinoHeaderGames()
    }
    this.fetchCasinoSliders()
    this.fetchCasinoCategories()
    this.fetchCasinoProviders()
    if (this.$route.query.gameid) {
      this.fetchCasinoSingleGame(this.$route.query.gameid).then((res) => {
        // console.log('GAME FETCHED', res)
        this.openGame(res)
      })
    }
    if (this.$route.query.prov) {
      this.provTerm = this.$route.query.prov
      this.fetchCasinoGamesByProvider(this.$route.query.prov)
      return
    }
    if (this.$route.query.cat) {
      this.catTerm = this.$route.query.cat
    }
    switch (this.$route.query.cat) {
      case undefined:
        this.fetchCasinoGames()
        break
      case 'mocked-new':
        this.fetchCasinoNewGames()
        break
      case 'mocked-most':
        this.fetchCasinoMostPlayedGames()
        break
      default:
        this.fetchCasinoGamesByCategory(this.$route.query.cat)
        break
    }
  },
  beforeDestroy () {
    clearTimeout(this.searchTimeout)
  },
  methods: {
    ...mapActions({
      login: 'login',
      authUser: 'authUser',
      fetchCasinoProviders: 'metadata-casino/fetchCasinoProviders',
      fetchCasinoCategories: 'metadata-casino/fetchCasinoCategories',
      fetchCasinoHeaderGames: 'metadata-casino/fetchCasinoHeaderGames',
      fetchCasinoSliders: 'metadata-casino/fetchCasinoSliders',
      searchCasinoGames: 'casino-search-games/searchCasinoGames',
      fetchCasinoGames: 'casino/fetchCasinoGames',
      fetchCasinoGameIframeUrl: 'casino/fetchCasinoGameIframeUrl',
      fetchCasinoBananaLiveIframeUrl: 'casino/fetchCasinoBananaLiveIframeUrl',
      fetchCasinoBananaIframeUrl: 'casino/fetchCasinoBananaIframeUrl',
      fetchCasinoFdsIframeUrl: 'casino/fetchCasinoFdsIframeUrl',
      fetchCasinoGamesByProvider: 'casino-provider-games/fetchCasinoGamesByProvider',
      concatCasinoGamesByProvider: 'casino-provider-games/concatCasinoGamesByProvider',
      fetchCasinoMostPlayedGames: 'casino-featured/fetchCasinoMostPlayedGames',
      concatCasinoMostPlayedGames: 'casino-featured/concatCasinoMostPlayedGames',
      fetchCasinoNewGames: 'casino-featured/fetchCasinoNewGames',
      concatCasinoNewGames: 'casino-featured/concatCasinoNewGames',
      fetchCasinoGamesByCategory: 'casino-category-games/fetchCasinoGamesByCategory',
      concatCasinoGamesByCategory: 'casino-category-games/concatCasinoGamesByCategory',
      fetchCasinoSingleGame: 'casino/fetchCasinoSingleGame',
      fetchProductRedirectUrl: 'onboarding-third-pt-auth/fetchProductRedirectUrl'
    }),
    async logUser (event) {
      await this.login(event)

      this.authUser().then((data) => {
        this.srtmLogin(data.id)

        window.location.reload()
      })
    },
    redirectProduct () {
      this.fetchProductRedirectUrl().then((result) => {
        if (process.client) {
          if (result.data) {
            setTimeout(() => {
              window.open(result.data.data.url, '_blank')
            })
          }
        }
      })
    },
    mountGameIframe (game, url) {
      console.log('mountGameIframe', game, url)
      const request = new XMLHttpRequest()
      let isIframe = false
      let origin = ''
      try {
        isIframe = window.self !== window.top
      } catch (e) {
        isIframe = true
      }

      if (isIframe) {
        try {
          origin = window.top.origin
        } catch (e) {}
      }

      const ref = isIframe ? (origin !== '' ? origin : document.referrer.split('?')[0]) : document.location.origin
      // let checkurl = 'https://checktest1.globexdns.com/en/UserAuth/RedRakeGaming?token=6bd6d08353b88b52685764c333190492' + '&ref=' + encodeURI(ref)
      const checkurl = url + '&ref=' + encodeURI(ref)

      request.addEventListener('loadend', function () {
        if (request.status !== 200) {
          if (request.status === 403) {
            console.log('check result: ERROR (restricted)')
          } else if (request.status === 404) {
            console.log('check result: ERROR (Empty token)')
          } else {
            console.log('check result: ERROR CODE ' + request.status)
          }
          document.getElementById('egamings_container').outerHTML = ''
          alert('Restricted')
        } else {
          console.log('check result: OK')
          const resp = JSON.parse(request.responseText)
          const ifr = document.createElement('iframe')
          ifr.setAttribute('src', resp.data)
          ifr.setAttribute('width', '100%')
          ifr.setAttribute('height', '100%')
          ifr.setAttribute('frameBorder', 0)
          ifr.setAttribute('marginheight', 0)
          ifr.setAttribute('marginwidth', 0)
          ifr.setAttribute('allowFullScreen', '')
          document.getElementById('egamings_container').appendChild(ifr)
        }
      })
      request.open('GET', checkurl)
      request.send()
    },
    mountGameIframe2 () {
      const d = document
      const s = 'script'
      const id = 'fundist-atmosfera'
      const fjs = d.getElementsByTagName(s)[0]
      const js = d.createElement(s)
      js.id = id
      js.src = 'https://liveslots.online/js/slot.api.js'
      fjs.parentNode.insertBefore(js, fjs)
      // js.onload = startGameLoader
    },
    openGame (game) {
      this.agregator = game.agregator
      if (this.agregator === 'softgaming') {
        if (!this.loggedInUser) {
          this.loginIframe = true
          return
        }
        this.iframe = true
        this.fetchCasinoGameIframeUrl({ game_id: game.id }).then((result) => {
          if (result.type === 2) {
            this.iframeHtml = result.url
            const searchURL = new URL(window.location)
            searchURL.searchParams.set('gameid', game.id)
            window.history.pushState({}, '', searchURL)
            return
          } else if (result.type === 4) {
            this.type4url = result.url
            this.mountGameIframe2()
            const searchURL = new URL(window.location)
            searchURL.searchParams.set('gameid', game.id)
            window.history.pushState({}, '', searchURL)
            return
          } else if (result.type === 5) {
            this.gameCode = result.url
            const searchURL = new URL(window.location)
            searchURL.searchParams.set('gameid', game.id)
            window.history.pushState({}, '', searchURL)
            return
          }
          const searchURL = new URL(window.location)
          searchURL.searchParams.set('gameid', game.id)
          window.history.pushState({}, '', searchURL)
          this.mountGameIframe(game, result.url)
        }).catch((err) => {
          console.error('casino new url fetching error', err)
          this.iframe = false
        })
      } else if (this.agregator === 'banana-live') {
        this.iframe = true
        this.fetchCasinoBananaLiveIframeUrl({ game_id: game.id }).then((result) => {
          this.link = result.url
          const searchURL = new URL(window.location)
          searchURL.searchParams.set('gameid', game.id)
          window.history.pushState({}, '', searchURL)
          // this.mountGameIframe(game, result.url)
        }).catch((err) => {
          console.error('casino new url fetching error', err)
          this.iframe = false
        })
      } else if (this.agregator === 'banana') {
        this.iframe = true
        this.fetchCasinoBananaIframeUrl({ game_id: game.id }).then((result) => {
          this.link = result.url
          const searchURL = new URL(window.location)
          searchURL.searchParams.set('gameid', game.id)
          window.history.pushState({}, '', searchURL)
          // this.mountGameIframe(game, result.url)
        }).catch((err) => {
          console.error('casino new url fetching error', err)
          this.iframe = false
        })
      } else if (this.agregator === 'fds') {
        this.iframe = true
        this.fetchCasinoFdsIframeUrl({ game_id: game.id }).then((result) => {
          this.link = result.url
          const searchURL = new URL(window.location)
          searchURL.searchParams.set('gameid', game.id)
          window.history.pushState({}, '', searchURL)
          // this.mountGameIframe(game, result.url)
        }).catch((err) => {
          console.error('casino new url fetching error', err)
          this.iframe = false
        })
      } else {
        this.link = game.url
        this.iframe = true
        const searchURL = new URL(window.location)
        searchURL.searchParams.set('gameid', game.id)
        window.history.pushState({}, '', searchURL)
      }
    },
    concatNewGames () {
      if (this.$route.query.prov) {
        this.hasPages = false
        this.concatCasinoGamesByProvider({ providerSlug: this.$route.query.prov, page: this.page }).then((result) => {
          this.page++
          if (!result || result.length <= 0) {
            this.hasPages = false
          } else {
            this.hasPages = true
          }
        })

        return
      }

      switch (this.$route.query.cat) {
        case 'mocked-new':
          this.hasPages = false
          this.concatCasinoNewGames(this.page).then((result) => {
            this.page++

            if (!result || result.length <= 0) {
              this.hasPages = false
            } else {
              this.hasPages = true
            }
          })
          break
        case 'mocked-most':
          this.hasPages = false
          this.concatCasinoMostPlayedGames(this.page).then((result) => {
            this.page++

            if (!result || result.length <= 0) {
              this.hasPages = false
            } else {
              this.hasPages = true
            }
          })
          break
        default:
          this.hasPages = false
          this.concatCasinoGamesByCategory({ categorySlug: this.$route.query.cat, page: this.page }).then((result) => {
            this.page++

            if (!result || result.length <= 0) {
              this.hasPages = false
            } else {
              this.hasPages = true
            }
          })
          break
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/layout/breakpoints";
#egamings_container{
  height: 100%;
}
.casino-pagination-btn{
  border: 3px solid var(--fut-primary);
  border-radius: 50px !important;
  padding: 0px 40px;
}
.btn-product-redirect{
  color: white;
  border: 2px solid var(--fut-primary);
  padding: 3px 15px;
  border-radius: 25px;
  width: 90%;
  margin-left: 5%;
  margin-top: 10px;
}
.pointer{
  cursor: pointer;
}
.nowrap{
  white-space: nowrap;
  font-size: 15px;
}
.btn-close-modal{
  position: absolute;
  top: 1px;
  right: 1px;
  border-radius: 100px;
  background: #333;
  padding: 3px 9px;
}
.iframe-modal{
  background: rgba(51, 51, 51, 0.637);
  position: fixed;
  z-index: 9999999999;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}
.content-modal{
  background: #333;
  width: 100vw;
  height: 100vh;
  @include md{
    width: 90vw;
    height: 90vh;
    transform: translate(5vw, 5vh);
  }
  padding: 34px 5px 5px 5px;
  border-radius: 10px;
}
.play-overlay{
  display: none;
  position: absolute;
  background: #00000091;
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
  .circle-icon{
    border: 5px solid white;
    width: 90px;
    height: 90px;
    border-radius: 50px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-55%, -50%);
  }
}
.casino-icon{
  width: 100%;
  // height: 100%;
  // object-fit: cover;
}
.text-gold{
  color: #eeba33;
}
.casino-name{
  display: none;
  position: absolute;
  padding-right: 10px;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  // background: var(--fut-primary);
  border-top-right-radius: 10px;
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.casino-games-title-container{
  // background: var(--fut-background-lighter);
  // border-radius: 5px;
  border-bottom: 1px solid var(--fut-primary);
  .casino-games-title{
    display: flex;
    font-size: 17px;
    margin-bottom: 0px;
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
      span{
        border-bottom: 3px solid var(--fut-primary);
        padding-left: 10px;
        padding-right: 10px;
      }
      text-transform: lowercase;
      display:inline-block;
      margin-top: 5px;
      margin-bottom: 0px;
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
    // height: 100px;
    @include md{
      // height: 200px;
    }
    width: 100%;
    // grid-area: other;
    &:first-child{
      // height: 200px;
      @include md {
        // height: 400px;
      }
      grid-area: a;
    }
    .casino-button{
      // height: 100%;
      // width: 100%;
      padding: 0px;
      // border: 1px solid var(--fut-primary);
    }
    .casino-button:hover{
      // border: 3px solid var(--fut-primary);
      .play-overlay{
        transform: scale(1.2); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
      }
      .casino-name{
        display: initial;
      }
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
    // border: 2px solid var(--fut-secondary);
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
      // margin-top: 20px;
    }
    .casino-slider-btn{
      font-size: 1em;
      font-weight: 700;
      border-radius: 50px !important;
      padding: 5px 20px;
    }
    .row{
      // transform: translateY(50%);
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
  // margin: 5px;
  width: 100%;
  text-align: left;
  &:hover{
    background: var(--fut-secondary-black);
  }
}
.iframe-modal-icon{
  font-size: 3rem;
  left: calc(50% - 60px);
  top: calc(50% - 60px);
  position: absolute;
  z-index: -1;
}
</style>
