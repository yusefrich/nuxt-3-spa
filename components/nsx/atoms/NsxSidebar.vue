<template>
  <div class="sticky-sidebar">
    <div class="mobile-menu d-md-none">
      <img
        :src="currentSettings?currentSettings.logo_mobile?currentSettings.logo_mobile:currentSettings.logo:''"
        width="100%"
        height="60px"
        style="object-fit: contain"
        class="p-2"
      >
      <div class="d-flex justify-content-evenly">
        <nsx-fut-button class="menu-select" :class="{active: menuSelect === 0}" @click="menuSelect = 0">
          <font-awesome-icon style="font-size: 20px" class="text-white icon" :icon="['fas', 'futbol']" />
        </nsx-fut-button>
        <nsx-fut-button
          v-if="!applicationType('casino') || applicationType('sports')"
          :class="{active: menuSelect === 1}"
          class="menu-select"
          @click="menuSelect = 1"
        >
          <font-awesome-icon style="font-size: 20px" class="text-white icon" :icon="['fas', 'satellite-dish']" />
        </nsx-fut-button>
        <nsx-fut-button
          v-if="!applicationType('casino') || applicationType('sports')"
          class="menu-select"
          :class="{active: menuSelect === 2}"
          @click="menuSelect = 2"
        >
          <font-awesome-icon style="font-size: 20px" class="text-white icon" :icon="['fas', 'list']" />
        </nsx-fut-button>
      </div>
    </div>

    <ul v-if="menuSelect === 0" class="list-unstyled ps-0 sidebar-content fut-scrollbar">
      <li v-for="(sport, index) in sports" :key="'sports_return_select_'+index" class="mb-0 section-container">
        <nsx-fut-button block :disabled="!sport.active" :to="'/sport/' + sport.id + '/leagues'" class="text-start select-sport-btn d-flex">
          <img v-if="sport.id === 6046" src="/bet365icons/1.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 48242" src="/bet365icons/2.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 154919" src="/bet365icons/10.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 54094" src="/bet365icons/5.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 265917" src="/bet365icons/20.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 154830" src="/bet365icons/23.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 621569" src="/bet365icons/34.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 35709" src="/bet365icons/6.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 154914" src="/bet365icons/3.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 687890" src="/bet365icons/games.svg" width="25px" height="25px" alt="">
          <img v-if="sport.id === 131506" src="/bet365icons/16.svg" width="25px" height="25px" alt="">
          <span class="text-gray-nsx pt-1 ps-2 d-sm-none d-lg-block fut-color-dynamic">{{ sport.name }}</span>
        </nsx-fut-button>
      </li>
      <li
        v-for="(item, index) in navItems"
        :key="index"
        class="mb-0 section-container"
      >
        <nsx-fut-button
          block
          class="text-start select-sport-btn d-flex"
          external
          :to="item.nav_link"
        >
          <img v-if="item.img" :src="item.img" width="25px" height="25px" alt="">
          <span class="text-gray-nsx pt-1 ps-2 d-sm-none d-lg-block fut-color-dynamic">{{ item.nav_name }}</span>
        </nsx-fut-button>
      </li>
      <li class="d-md-none mb-0 py-1 section-container" @click.stop>
        <a
          href="#language"
          class="ps-2 text-decoration-none lang"
          data-bs-toggle="collapse"
          role="button"
          aria-expanded="false"
          aria-controls="language"
        >
          <img v-if="$i18n.locale.toUpperCase() === 'EN'" src="/flags/1.png" class="me-1" alt="Flag image">
          <img v-else-if="$i18n.locale === 'ES'" src="/flags/espanha.png" class="me-1 spanish-flag" alt="Flag image">
          <img v-else src="/flags/14.png" class="me-1" alt="Flag image">
          <span class="text-gray-nsx locale-text fut-color-dynamic">{{ $i18n.locale }}</span>
          <font-awesome-icon class="text-gray-nsx chevron-icon" :icon="['fas', 'chevron-down']" />
        </a>
        <div id="language" class="collapse">
          <div
            v-for="(locale, localeIdx) in $i18n.locales"
            :key="localeIdx"
            class="text-gray-nsx ms-4"
            @click="$emit('changeLanguage', locale)"
          >
            <img v-if="locale === 'EN'" src="/flags/1.png" class="me-1" alt="Flag image">
            <img v-else-if="locale === 'ES'" src="/flags/espanha.png" class="me-1 spanish-flag" alt="Flag image">
            <img v-else src="/flags/14.png" class="me-1" alt="Flag image">
            <span class="locale-text fut-color-dynamic">{{ locale }}</span>
          </div>
        </div>
      </li>
    </ul>

    <ul v-if="menuSelect === 1" class="list-unstyled ps-0 sidebar-content fut-scrollbar">
      <li class="mb-0 section-container">
        <nsx-fut-button to="/sport/6046/aovivo" block class="text-start select-sport-btn d-flex justify-content-between">
          <span class="pt-1 ps-2">{{ $t('i18n_futebol') }}</span>
          <span class="pt-1 ps-2">{{ $t('i18n_ao_vivo') }}</span>
        </nsx-fut-button>
      </li>
      <li class="mb-0 section-container">
        <nsx-fut-button to="/sport/48242/aovivo" block class="text-start select-sport-btn d-flex justify-content-between">
          <span class="pt-1 ps-2">{{ $t('i18n_basquete') }}</span>
          <span class="pt-1 ps-2">{{ $t('i18n_ao_vivo') }}</span>
        </nsx-fut-button>
      </li>
      <li class="mb-0 section-container">
        <nsx-fut-button disabled block class="text-start select-sport-btn d-flex justify-content-between">
          <span class="pt-1 ps-2">{{ $t('i18n_boxe_mma') }}</span>
          <span class="pt-1 ps-2">{{ $t('i18n_ao_vivo') }}</span>
        </nsx-fut-button>
      </li>
      <li class="mb-0 section-container">
        <nsx-fut-button disabled block class="text-start select-sport-btn d-flex justify-content-between">
          <span class="pt-1 ps-2">Bilhar</span>
          <span class="pt-1 ps-2">{{ $t('i18n_ao_vivo') }}</span>
        </nsx-fut-button>
      </li>
      <li class="mb-0 section-container">
        <nsx-fut-button disabled block class="text-start select-sport-btn d-flex justify-content-between">
          <span class="pt-1 ps-2">{{ $t('i18n_tenis') }}</span>
          <span class="pt-1 ps-2">{{ $t('i18n_ao_vivo') }}</span>
        </nsx-fut-button>
      </li>
      <li class="mb-0 section-container">
        <nsx-fut-button disabled block class="text-start select-sport-btn d-flex justify-content-between">
          <span class="pt-1 ps-2">{{ $t('i18n_tenis_de_mesa') }}</span>
          <span class="pt-1 ps-2">{{ $t('i18n_ao_vivo') }}</span>
        </nsx-fut-button>
      </li>
      <li class="mb-0 section-container">
        <nsx-fut-button disabled block class="text-start select-sport-btn d-flex justify-content-between">
          <span class="pt-1 ps-2">{{ $t('i18n_volei') }}</span>
          <span class="pt-1 ps-2">{{ $t('i18n_ao_vivo') }}</span>
        </nsx-fut-button>
      </li>
      <li class="mb-0 section-container">
        <nsx-fut-button disabled block class="text-start select-sport-btn d-flex justify-content-between">
          <span class="pt-1 ps-2">{{ $t('i18n_volei_de_praia') }}</span>
          <span class="pt-1 ps-2">{{ $t('i18n_ao_vivo') }}</span>
        </nsx-fut-button>
      </li>
      <li class="mb-0 section-container">
        <nsx-fut-button disabled block class="text-start select-sport-btn d-flex justify-content-between">
          <span class="pt-1 ps-2">{{ $t('i18n_handebol') }}</span>
          <span class="pt-1 ps-2">{{ $t('i18n_ao_vivo') }}</span>
        </nsx-fut-button>
      </li>
      <li class="mb-0 section-container">
        <nsx-fut-button disabled block class="text-start select-sport-btn d-flex justify-content-between">
          <span class="pt-1 ps-2">{{ $t('i18n_basebol') }}</span>
          <span class="pt-1 ps-2">{{ $t('i18n_ao_vivo') }}</span>
        </nsx-fut-button>
      </li>
      <li class="mb-0 section-container">
        <nsx-fut-button disabled block class="text-start select-sport-btn d-flex justify-content-between">
          <span class="pt-1 ps-2">Futebol Ame...</span>
          <span class="pt-1 ps-2">{{ $t('i18n_ao_vivo') }}</span>
        </nsx-fut-button>
      </li>
    </ul>

    <ul v-if="menuSelect === 2" class="list-unstyled ps-0 sidebar-content fut-scrollbar">
      <li v-if="productRedirect" class="mb-0 section-container">
        <nsx-fut-button :to="productRedirect.url" block class="text-start select-sport-btn select-menu-btn">
          <span class="pt-1 ps-2"><font-awesome-icon class="text-danger ms-1 me-2" to="/" :icon="['fas', 'square']" /> {{ productRedirect.title }}</span>
        </nsx-fut-button>
      </li>
      <li
        v-for="(item, idx) in navItemsSecond"
        :key="idx"
        class="mb-0 section-container"
      >
        <nsx-fut-button
          :to="item.link"
          block
          external
          class="text-start select-sport-btn select-menu-btn"
        >
          <span class="pt-1 ps-2">
            <img
              v-if="item.img"
              :src="item.img"
              width="25px"
              height="25px"
              alt=""
            >
            <font-awesome-icon
              v-else
              class="text-danger ms-1 me-2"
              :icon="['fas', 'square']"
            />
            {{ item.text }}
          </span>
        </nsx-fut-button>
      </li>
      <li class="mb-0 section-container">
        <nsx-fut-button
          :to="`${currentSettings ? 'https://wa.me/' + currentSettings.whats : '/suporte'}`"
          block
          class="text-start select-sport-btn select-menu-btn"
          target="_blank"
        >
          <span class="pt-1 ps-2"><font-awesome-icon class="text-danger ms-1 me-2" :icon="['fas', 'square']" /> {{ $t('i18n_suporte') }}</span>
        </nsx-fut-button>
      </li>
    </ul>
  </div>
</template>

<script>
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'

export default {
  name: 'NsxSidebar',
  components: {
    NsxFutButton
  },
  props: {
    casinoGames: {
      type: Array,
      default: () => ([])
    },
    casinoCategories: {
      type: Array,
      default: () => ([])
    },
    currentSettings: {
      type: Object,
      default: () => ({})
    },
    sports: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      menuSelect: 0
    }
  },
  fetch () {
    this.$emit('getDynamicSports')
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
    navItems () {
      if (this.currentSettings.nav_bar && this.currentSettings.nav_bar.length) {
        const regex = new RegExp(window.location.origin, 'g')

        return this.currentSettings.nav_bar.filter(item =>
          item.nav_link.replace(regex, '') !== '/' &&
          item.nav_link.replace(regex, '') !== '/sport/6046/aovivo' &&
          item.nav_link.replace(regex, '') !== '/casino' &&
          item.nav_link.replace(regex, '') !== '/casino?cat=live' &&
          item.nav_link.replace(regex, '') !== '/promo'
        )
      }

      return []
    },
    navItemsSecond () {
      const items = []

      if (!this.applicationType('casino') || this.applicationType('sports')) {
        items.push(
          { link: '/', text: this.$t('i18n_esporte', 2) },
          { link: '/sport/6046/aovivo', text: this.$t('i18n_ao_vivo') }
        )
      }

      items.push({ link: '/promo', text: this.$t('i18n_promocao', 2) })

      if (!this.applicationType('sports') || this.applicationType('casino')) {
        items.push(
          { link: '/casino', text: this.$t('i18n_cassino'), icon: ['fas', 'dice'] },
          { link: '/casino?cat=live', text: this.$t('i18n_cassino_ao_vivo'), icon: ['fas', 'dice'] }
        )
      }

      if (this.currentSettings.nav_bar && this.currentSettings.nav_bar.length) {
        this.currentSettings.nav_bar.forEach((nav) => {
          const regex = new RegExp(window.location.origin, 'g')
          const foundItemIdx = items.findIndex(item => item.link === nav.nav_link.replace(regex, ''))

          if (nav.nav_link.replace(regex, '') === '') {
            items[0] = {
              link: '/',
              text: nav.nav_name,
              img: nav.img
            }
          }

          if (foundItemIdx !== -1) {
            items.splice(
              foundItemIdx,
              1,
              {
                link: nav.nav_link.replace(regex, ''),
                text: nav.nav_name,
                img: nav.img
              }
            )
          } else {
            items.push({
              link: nav.nav_link,
              text: nav.nav_name,
              img: nav.img,
              external: true
            })
          }
        })
      }

      return items
    }
  },
  methods: {
    openNewWindow (link) {
      window.open(link, 'newwindow', 'width=300,height=250')
      return false
    },
    applicationType (term) {
      const config = '' + process.env.PRODUCT_CONFIG
      return config.includes(term)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/variables";
@import "@/assets/layout/breakpoints";
.pointer{
  cursor: pointer;
}
.country-link{
  display: flex;
}
.country-name{
  white-space: nowrap;
  width: 100%;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.leagues-total{
  float: right;
  background: #6c757d;
  border-radius: 50%;
  width: 26px;
  margin-top: 2px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}
.form-range{
  width: 89% !important;
  margin-left: 7%;
}
.form-range::-webkit-slider-thumb {
  background: var(--white);
  border: 6px solid var(--fut-primary);
  border-radius: 10px 10px 10px 0;
  width: 20px;
  height: 20px;
  transform: rotate(-45deg);
}
.sticky-sidebar{
  @include lg{
    width: 200px;
  }
}
.slider-holder{
    background: var(--fut-background-2-lightest);

}
.section-container{
  margin-bottom: 3px;
  border-bottom: 1px solid var(--nsx-gray-2);

  .section-title{
    background: $black;
    width: 100%;
    color: $white;
    padding: 7px;
    border-left: 3px solid var(--fut-primary);
  }
  .section-link{
    margin-top: 5px;
    margin-bottom: 5px;
    background: var(--fut-background-2-lightest);
    a{
      width: 100%;
    }
  }
}
.section-container button:hover{
  background-color: rgba(0, 0, 0, 0.205);
}
.img-bg-inside{
  background: linear-gradient(
    0deg,
    var(--fut-primary-darkest) 0%,
    var(--fut-primary) 100%
  );
}
.img-container {
  img{
    object-fit: contain;
  }
  height: 112px !important;

  display: flex;
  align-items: center;
  justify-content: center;
}
.sidebar-content{
  height: calc(100vh - 125px);
  overflow: auto;
  background: linear-gradient(to right,var(--nsx-dark-1) 90%,var(--nsx-dark-8) 98%);
  margin-bottom: 0;
}
.leagues{
  padding-bottom: 10px;
}
.league-link{
  background: $gray-600;
  margin-top: 4px;
}
.select-sport-btn{
  padding-top: 5px;
  padding-bottom: 5px;
  @include md{
    padding-top: 4px;
    padding-bottom: 4px;
  }
  padding-left: 3px;
  color: #D2D2D2;
  font-size: 13.3px;
}
.select-menu-btn{
  padding-top: 8px;
  padding-bottom: 8px;
}
.select-sport-btn:disabled{
  opacity: .3;
}
.menu-select{
  opacity: .5;
}
.menu-select.active{
  opacity: 1 !important;
}
.text-gray-nsx{
  color: #d2d2d2;
}
.spanish-flag {
  width: 16px;
  height: 13px;
}
.locale-text {
  font-size: 13px;
}
.chevron-icon {
  height: 12px;
}
.lang[aria-expanded="true"] {
  color: var(--fut-primary);
  .chevron-icon {
    -webkit-transform: rotate(90deg);
    transform: rotate(180deg);
  }
}
</style>
