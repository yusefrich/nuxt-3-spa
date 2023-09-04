<template>
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
      <fb-fut-button class="a menu-content" to="/sports">
        <div class="d-grid justify-content-center">
          <img class="icon-size" src="/FbIcons/sports.svg">
        </div>
        <span class="mb-0 w-100 text-center d-inline-block">{{ $t('i18n_esporte', 2) }}</span>
      </fb-fut-button>
    </div>
    <div v-if="!applicationType('casino') || applicationType('sports')" class="main-content">
      <fb-fut-button class="a menu-content" to="/aovivo">
        <div class="d-grid justify-content-center">
          <!-- <img class="icon-size" src="/FbIcons/sports_live.png"> -->
          <img class="icon-size" src="/FbIcons/cassino_futebol.svg">
        </div>
        <span class="mb-0 w-100 text-center d-inline-block">{{ $t('i18n_ao_vivo') }}</span>
      </fb-fut-button>
    </div>
    <div v-if="(!applicationType('sports') || applicationType('casino')) && (landing_style === 'casino' || landing_style === 'all')" class="main-content">
      <fb-fut-button class="a menu-content" to="/casino">
        <div class="d-grid justify-content-center">
          <img class="icon-size" src="/FbIcons/video_slot.svg">
        </div>
        <span class="mb-0 w-100 text-center d-inline-block">{{ $t('i18n_cassino') }}</span>
      </fb-fut-button>
    </div>
    <div v-if="(!applicationType('sports') || applicationType('casino')) && (landing_style === 'casino' || landing_style === 'all')" class="main-content">
      <fb-fut-button class="a menu-content" to="/casino?cat=live">
        <div class="d-grid justify-content-center">
          <img class="icon-size" src="/FbIcons/live_casino.svg">
          <!-- <img class="icon-size" src="/FbIcons/cassino_futebol_2.svg"> -->
        </div>
        <span class="mb-0 w-100 text-center d-inline-block">{{ $t('i18n_cassino_ao_vivo') }}</span>
      </fb-fut-button>
    </div>
    <div v-if="(!applicationType('sports') || applicationType('casino')) && (landing_style === 'casino' || landing_style === 'all')" class="main-content">
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
        <span class="mb-0 w-100 text-center d-inline-block">{{ productConfigPromoUrl.status ? $t('i18n_ranking') : $t('i18n_promocao', 2) }}</span>
      </fb-fut-button>
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
    landing_style: {
      type: String
    },
    font: {
      type: String
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
    }
  },
  methods: {
    applicationType (term) {
      const config = '' + process.env.PRODUCT_CONFIG
      return config.includes(term)
    }
  }
}
</script>
<style lang="scss" scoped>
.mobile-menu {
  // background-color: var(--fut-background-header-light);
  overflow-x: scroll;
  display: block;
  white-space: nowrap;
  overflow-y: hidden;
  margin-top: 5px;
}
.icon-size {
  width: 30px;
  height: 30px;
  object-fit: contain;
  filter: grayscale(200%);
}
.main-content {
  width: 95px;
  padding: 4% 5%;
  // border: 1px solid var(--fut-background-header-lighter);
  white-space: nowrap;
  text-overflow: ellipsis;
    .a
    {
      text-decoration: none;
      color: white;
      font-size: 12px;
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
