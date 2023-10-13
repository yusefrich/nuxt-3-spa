<template>
  <div>
    <div class="mobile-menu w-100 d-flex">
      <div v-if="productRedirect" class="main-content">
        <fb-fut-button class="a menu-content" :to="productRedirect.url">
          <div class="d-grid justify-content-center">
            <img class="icon-size" src="/FbIcons/sports.svg">
          </div>
          <span class="mb-0 w-100 text-center d-inline-block">{{ productRedirect.title }}</span>
        </fb-fut-button>
      </div>
      <div v-if="!applicationType('casino') || applicationType('sports')" class="main-content">
        <fb-fut-button
          class="a menu-content"
          :class="{ selected: currentRoute('/sports') || currentRoute('/aovivo') || currentRoute('/') }"
          to="/sports"
        >
          <div class="d-grid justify-content-center">
            <!-- <img class="icon-size" src="/FbIcons/sports.svg"> -->
            <div
              class="icon-size custom"
              :class="{ selected: currentRoute('/sports') || currentRoute('/aovivo') || currentRoute('/') }"
            />
          </div>
          <span class="mb-0 w-100 text-center d-inline-block">{{ $tc('i18n_esporte', 2) }}</span>
        </fb-fut-button>
      </div>
      <div
        v-if="(!applicationType('casino') || applicationType('sports')) && !currentRoute('/sports') && !currentRoute('/aovivo') && !currentRoute('/')"
        class="main-content"
      >
        <fb-fut-button class="a menu-content" to="/aovivo">
          <div class="d-grid justify-content-center">
            <!-- <img class="icon-size" src="/FbIcons/sports_live.png"> -->
            <img class="icon-size" src="/FbIcons/cassino_futebol.svg">
          </div>
          <span class="mb-0 w-100 text-center d-inline-block">{{ $t('i18n_ao_vivo') }}</span>
        </fb-fut-button>
      </div>
      <div v-if="(!applicationType('sports') || applicationType('casino')) && (landingStyle === 'casino' || landingStyle === 'all')" class="main-content">
        <fb-fut-button class="a menu-content" to="/casino">
          <div class="d-grid justify-content-center">
            <img class="icon-size" src="/FbIcons/video_slot.svg">
          </div>
          <span class="mb-0 w-100 text-center d-inline-block">{{ $t('i18n_cassino') }}</span>
        </fb-fut-button>
      </div>
      <div v-if="(!applicationType('sports') || applicationType('casino')) && (landingStyle === 'casino' || landingStyle === 'all')" class="main-content">
        <fb-fut-button class="a menu-content" to="/casino-aovivo">
          <div class="d-grid justify-content-center">
            <img class="icon-size" src="/FbIcons/live_casino.svg">
            <!-- <img class="icon-size" src="/FbIcons/cassino_futebol_2.svg"> -->
          </div>
          <span class="mb-0 w-100 text-center d-inline-block">{{ $t('i18n_cassino_ao_vivo') }}</span>
        </fb-fut-button>
      </div>
      <div v-if="(!applicationType('sports') || applicationType('casino')) && (landingStyle === 'casino' || landingStyle === 'all')" class="main-content">
        <fb-fut-button class="a menu-content" to="/casino?cat=virtuals">
          <div class="d-grid justify-content-center">
            <!-- <img class="icon-size" src="/FbIcons/virtualsports.png"> -->
            <img class="icon-size" src="/FbIcons/cassino_virtuais_2.svg">
          </div>
          <span class="mb-0 w-100 text-center d-inline-block">{{ $t('i18n_virtuais') }}</span>
        </fb-fut-button>
      </div>
      <div class="main-content">
        <fb-fut-button
          class="a menu-content"
          :external="productConfigPromoUrl.status !== null"
          :target="productConfigPromoUrl.status ? '_blank' : '_self'"
          :to="productConfigPromoUrl.url"
        >
          <div class="d-grid justify-content-center">
            <img class="icon-size" src="/FbIcons/promotions.svg" height="30px">
          </div>
          <span class="mb-0 w-100 text-center d-inline-block">{{ productConfigPromoUrl.status ? $t('i18n_ranking') : $tc('i18n_promocao', 2) }}</span>
        </fb-fut-button>
      </div>
    </div>

    <div
      v-if="currentRoute('/sports') || currentRoute('/aovivo') || currentRoute('/')"
      class="sports-modules"
    >
      <n-link class="module" :to="localePath('/sports')" :class="{ selected: selectedTab === 'pre-match' }">
        <span>{{ $t('i18n_pre_jogo') }}</span>
      </n-link>
      <n-link class="module" :to="localePath('/aovivo')" :class="{ selected: selectedTab === 'live' }">
        <span>{{ $t('i18n_ao_vivo') }}</span>
      </n-link>
      <n-link class="module" to="/sports?longTerm=true" :class="{ selected: selectedTab === 'long-term' }">
        <span>{{ $t('i18n_longo_prazo') }}</span>
      </n-link>
    </div>
  </div>
</template>
<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'

export default {
  components: {
    FbFutButton
  },
  props: {
    landingStyle: {
      type: String,
      default: ''
    },
    font: {
      type: String,
      default: ''
    }
  },
  computed: {
    productConfigPromoUrl () {
      return { status: process.env.PRODUCT_CONFIG_PROMO_URL, url: process.env.PRODUCT_CONFIG_PROMO_URL ? process.env.PRODUCT_CONFIG_PROMO_URL : '/promo' }
    },
    productRedirect () {
      if (!process.env.PRODUCT_REDIRECT_URL && !process.env.PRODUCT_REDIRECT_TITLE) {
        return null
      }
      return { url: process.env.PRODUCT_REDIRECT_URL, title: process.env.PRODUCT_REDIRECT_TITLE }
    },
    selectedTab () {
      if (this.$route.path === '/aovivo' || this.$route.path === '/aovivo/') {
        return 'live'
      } else if (this.$route.query.longTerm) {
        return 'long-term'
      }

      return 'pre-match'
    }
  },
  methods: {
    applicationType (term) {
      const config = '' + process.env.PRODUCT_CONFIG
      return config.includes(term)
    },
    currentRoute (route) {
      return this.$route.fullPath.includes(route) || route === `${window.location.origin}${this.$route.fullPath}`
    }
  }
}
</script>
<style lang="scss" scoped>
.mobile-menu {
  background: var(--fut-background-header-light);
  overflow-x: scroll;
  display: block;
  white-space: nowrap;
  overflow-y: hidden;
}
.icon-size {
  width: 30px;
  height: 30px;
  object-fit: contain;
  // filter: grayscale(200%);
}
.custom {
  mask-image: url(/FbIcons/sports.svg);
  -webkit-mask-image: url(/FbIcons/sports.svg);
  mask-size: cover;
  -webkit-mask-size: cover;
  background-color: #fff;

  &.selected {
    background-color: var(--fut-primary) !important;
  }
}
.main-content {
  width: 95px;
  padding: 4% 5%;
  // border: 1px solid var(--fut-background-header-lighter);
  white-space: nowrap;
  text-overflow: ellipsis;
    .a {
      text-decoration: none;
      color: white;
      font-size: 12px;
    }
}

.selected {
  color: var(--fut-primary) !important;
}

.sports-modules {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: var(--fut-background);
  height: 40px;

  .module {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 14px;
    color: var(--fut-color-dynamic);

    &.selected {
      color: var(--fut-primary);
      border-bottom: 2px solid var(--fut-primary);
    }
  }
}
/*
.menu-content {
  width: 95px;
  padding: 4% 5%;
  border: 1px solid #52555e;
  text-decoration: none;
  color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
    span {
      font-size: 12px;
    }
}
*/
</style>
