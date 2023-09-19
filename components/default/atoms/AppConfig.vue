<template>
  <div>
    <component :is="'style'">
      :root{
      --white: #fafafa;
      --fut-highlight:{{ config?config.color_highlight?config.color_highlight:'#ff9d00':'' }};
      --fut-card-highlight:{{ getCardHighlight(config) }};

      --fut-primary-color:{{ getHsl(config?config.color_main:'')['h'] }}, {{ getHsl(config?config.color_main:'')['s'] }}%;
      --fut-primary-l:{{ getHsl(config?config.color_main:'')['l'] }}%;

      --fut-background-color:{{ getHsl(config?config.color_background:'')['h'] }}, {{ getHsl(config?config.color_background:'')['s'] }}%;
      --fut-background-l:{{ getHsl(config?config.color_background:'')['l'] }}%;

      --fut-background-logo-color:{{ getHsl(config?config.color_background_logo:'')['h'] }}, {{ getHsl(config?config.color_background_logo:'')['s'] }}%;
      --fut-background-logo-l:{{ getHsl(config?config.color_background_logo:'')['l'] }}%;

      --fut-background-header-color:{{ getHsl(config?config.color_navbar:'')['h'] }}, {{ getHsl(config?config.color_navbar:'')['s'] }}%;
      --fut-background-header-l:{{ getHsl(config?config.color_navbar:'')['l'] }}%;

      --fut-background-games-list-color:{{ getHsl(config?config.color_games_list:'')['h'] }}, {{ getHsl(config?config.color_games_list:'')['s'] }}%;
      --fut-background-games-list-l:{{ getHsl(config?config.color_games_list:'')['l'] }}%;

      --fut-background-2-color:{{ getHsl(config?config.color_background_sec:'')['h'] }}, {{ getHsl(config?config.color_background_sec:'')['s'] }}%;
      --fut-background-2-l:{{ getHsl(config?config.color_background_sec:'')['l'] }}%;

      --fut-background-3-color:{{ getHsl(config?config.color_background_third:'')['h'] }}, {{ getHsl(config?config.color_background_third:'')['s'] }}%;
      --fut-background-3-l:{{ getHsl(config?config.color_background_third:'')['l'] }}%;

      --fut-background-header-darker: hsl(var(--fut-background-header-color),calc(var(--fut-background-header-l) - 15%));
      --fut-background-header: hsl(var(--fut-background-header-color),var(--fut-background-header-l));
      --fut-background-header-light: hsl(var(--fut-background-header-color),calc(var(--fut-background-header-l) + 7%));
      --fut-background-header-lighter: hsl(var(--fut-background-header-color),calc(var(--fut-background-header-l) + 15%));
      --fut-background-header-lightest: hsl(var(--fut-background-header-color),calc(var(--fut-background-header-l) + 17%));
      --fut-background-header-white: hsl(var(--fut-background-header-color),calc(var(--fut-background-header-l) + 25%));

      --fut-background-games-list-darker: hsl(var(--fut-background-games-list-color),calc(var(--fut-background-games-list-l) - 20%));
      --fut-background-games-list: hsl(var(--fut-background-games-list-color),var(--fut-background-games-list-l));
      --fut-background-games-list-lighter: hsl(var(--fut-background-games-list-color),calc(var(--fut-background-games-list-l) + 5%));
      --fut-background-games-list-lightest: hsl(var(--fut-background-games-list-color),calc(var(--fut-background-games-list-l) + 10%));

      --fut-background-2-white: hsl(var(--fut-background-2-color),calc(var(--fut-background-2-l) + 20%));
      --fut-background-2-lightest-2: hsl(var(--fut-background-2-color),calc(var(--fut-background-2-l) + 15%));
      --fut-background-2-lightest: hsl(var(--fut-background-2-color),calc(var(--fut-background-2-l) + 10%));
      --fut-background-2-lighter: hsl(var(--fut-background-2-color),calc(var(--fut-background-2-l) + 5%));
      --fut-background-2: hsl(var(--fut-background-2-color),var(--fut-background-2-l));
      --fut-background-2-darker: hsl(var(--fut-background-2-color),calc(var(--fut-background-2-l) - 5%));
      --fut-background-2-darkest: hsl(var(--fut-background-2-color),calc(var(--fut-background-2-l) - 10%));

      --fut-background-3: hsl(var(--fut-background-3-color),var(--fut-background-3-l));
      --fut-background-3-white: hsl(var(--fut-background-3-color),calc(var(--fut-background-3-l) + 15%));

      --fut-primary: hsl(var(--fut-primary-color),var(--fut-primary-l));
      --fut-primary-transparent: hsla(var(--fut-primary-color),calc(var(--fut-primary-l) - 20%), .4);
      --fut-primary-transparent-2: hsla(var(--fut-primary-color),var(--fut-primary-l), .4 );
      --fut-primary-darker: hsl(var(--fut-primary-color),calc(var(--fut-primary-l) - 5%));
      --fut-primary-darkest: hsl(var(--fut-primary-color),calc(var(--fut-primary-l) - 10%));
      --fut-primary-black: hsl(var(--fut-primary-color),calc(var(--fut-primary-l) - 17%));

      --fut-primary-lighter: hsl(var(--fut-primary-color),calc(var(--fut-primary-l) + 5%));
      --fut-primary-lightest: hsl(var(--fut-primary-color),calc(var(--fut-primary-l) + 10%));

      --fut-background-logo: hsl(var(--fut-background-logo-color),var(--fut-background-logo-l));
      --fut-background-logo-darker: hsl(var(--fut-background-logo-color),calc(var(--fut-background-logo-l) - 5%));

      --fut-background: hsl(var(--fut-background-color),var(--fut-background-l));
      --fut-background-transparent: hsla(var(--fut-background-color),calc(var(--fut-background-l) - 12%), .8);
      --fut-background-transparent-2: hsla(var(--fut-background-color),calc(var(--fut-background-l) - 12%), .6);
      --fut-background-darker: hsl(var(--fut-background-color),calc(var(--fut-background-l) - 5%));
      --fut-background-darkest: hsl(var(--fut-background-color),calc(var(--fut-background-l) - 10%));
      --fut-background-black: hsl(var(--fut-background-color),calc(var(--fut-background-l) - 12%));
      --fut-background-black-2: hsl(var(--fut-background-color),calc(var(--fut-background-l) - 17%));
      --fut-background-blacker: hsl(var(--fut-background-color),calc(var(--fut-background-l) - 30%));

      --fut-background-lighter: hsl(var(--fut-background-color),calc(var(--fut-background-l) + 5%));
      --fut-background-lightest: hsl({{ getHsl(config?config.color_background:'')['h'] + 10 }}, {{ getHsl(config?config.color_background:'')['s'] - 70 }}%, calc(var(--fut-background-l) + 10%));
      --fut-background-lightest-2: hsl(var(--fut-background-color),calc(var(--fut-background-l) + 10%));
      --fut-background-white: hsl({{ getHsl(config?config.color_background:'')['h'] + 10 }}, {{ getHsl(config?config.color_background:'')['s'] - 70 }}%, calc(var(--fut-background-l) + 15%));
      --fut-background-white-2: hsl(var(--fut-background-color),calc(var(--fut-background-l) + 20%));
      --fut-background-white-3: hsl(var(--fut-background-color),calc(var(--fut-background-l) + 30%));

      --fut-background-logo: hsl(var(--fut-background-logo-color),var(--fut-background-logo-l));

      --fut-secondary-color:{{ getHsl(config?config.color_sec:'')['h'] }}, {{ getHsl(config?config.color_sec:'')['s'] }}%;
      --fut-secondary-l:{{ getHsl(config?config.color_sec:'')['l'] }}%;

      --fut-secondary: hsl(var(--fut-secondary-color),var(--fut-secondary-l));
      --fut-secondary-darker: hsl(var(--fut-secondary-color),calc(var(--fut-secondary-l) - 5%));
      --fut-secondary-darkest: hsl(var(--fut-secondary-color),calc(var(--fut-secondary-l) - 10%));
      --fut-secondary-black: hsl(var(--fut-secondary-color),calc(var(--fut-secondary-l) - 20%));

      --fut-secondary-lighter: hsl(var(--fut-secondary-color),calc(var(--fut-secondary-l) + 5%));
      --fut-secondary-lightest: hsl(var(--fut-secondary-color),calc(var(--fut-secondary-l) + 10%));
      --fut-color-dynamic: {{ config.font === 'light' ? '#fafafa' : '#333333' }};
      --fut-color-dynamic-inverse: {{ config.font === 'light' ? '#333333' : '#fafafa' }};

      --nsx-dark-0: hsl(var(--fut-background-color),calc(var(--fut-background-l) + 0%));
      --nsx-dark-1: hsl(var(--fut-background-color),calc(var(--fut-background-l) + 6%));
      --nsx-dark-2: hsl(var(--fut-background-color),calc(var(--fut-background-l) + 11%));
      --nsx-dark-3: hsl(var(--fut-background-color),calc(var(--fut-background-l) + 18.1%));
      --nsx-dark-3-2: hsl(var(--fut-background-color),calc(var(--fut-background-l) + 24%));
      --nsx-dark-4: hsl(var(--fut-background-color),calc(var(--fut-background-l) + 20.2%));
      --nsx-dark-5: hsl(var(--fut-background-color),calc(var(--fut-background-l) + 23%));
      --nsx-dark-6: hsl(var(--fut-background-color),calc(var(--fut-background-l) + 22%));
      --nsx-dark-7: hsl(var(--fut-background-color),calc(var(--fut-background-l) + 15%));
      --nsx-dark-8: hsl(var(--fut-background-color),calc(var(--fut-background-l) - 2%));
      --nsx-gray-0: hsl(var(--fut-background-color),calc(var(--fut-background-l) + 47%));
      --nsx-gray-1: hsl(var(--fut-background-color),calc(var(--fut-background-l) + 50%));
      --nsx-gray-2: hsl(var(--fut-background-color),calc(var(--fut-background-l) + 10%));
      --nsx-gray-3: hsl(var(--fut-background-color),calc(var(--fut-background-l) + 25%));
      }
    </component>
    <component :is="'style'">
      :root{
      --nsx-dark-0: #0a0a0a;
      --nsx-dark-1: #0a0a0a;
      --nsx-dark-2: #1f1f1f;
      --nsx-dark-3: #292929;
      --nsx-dark-3-2: #141414;
      --nsx-dark-4: #333333;
      --nsx-dark-5: #3d3d3d;
      --nsx-dark-6: #474747;
      --nsx-dark-7: #262626;
      --nsx-dark-8: #201f1f;
      --nsx-gray-0: #686868;
      --nsx-gray-1: #6a6a6a;
      --nsx-gray-2: #282828;
      --nsx-gray-3: #362b2b;
      }
    </component>
    <component :is="'style'" v-if="getCurrentLayoutStyle === 'oldBet365'">
      *{
      font-family: Helvetica
      }
    </component>
    <component :is="'style'" v-else-if="getCurrentLayoutStyle === 'FB' || getCurrentLayoutStyle === 'FB2'">
      *{
      font-family: Roboto, sans-serif
      }
      .fb-scroll::-webkit-scrollbar-track {
      opacity: .3;
      background-color: var(--fut-background-black);
      }
      .fb-scroll::-webkit-scrollbar {
      opacity: .3;
      }
      .fb-scroll::-webkit-scrollbar-thumb {
      opacity: .3;
      border-radius: 50px;
      border: 5px solid var(--fut-background-black);
      background-color: var(--fut-background-lighter);
      }

      body::-webkit-scrollbar-track {
      opacity: .3;
      background-color: var(--fut-background-black);
      }
      body::-webkit-scrollbar {
      opacity: .3;
      }
      body::-webkit-scrollbar-thumb {
      opacity: .3;
      border-radius: 50px;
      border: 5px solid var(--fut-background-black);
      background-color: white;
      }
    </component>
    <component :is="'style'" v-else>
      body::-webkit-scrollbar-track {
      opacity: .3;
      border-radius: 0.125rem;
      background-color: lightgray;
      }
      body::-webkit-scrollbar {
      opacity: .3;
      width: 0.25rem;
      border-radius: 0.125rem;
      }
      body::-webkit-scrollbar-thumb {
      opacity: .3;
      border-radius: 0.125rem;
      background-color: gray;
      }
    </component>
    <component :is="'style'" v-if="config.font === 'dark'">
      .fut-color-dynamic{
      color: #333333 !important;
      }
      .fut-all-color-dynamic h1{
      color: #333333 !important;
      }
      .fut-all-color-dynamic h3{
      color: #333333 !important;
      }
      .fut-all-color-dynamic p{
      color: #333333 !important;
      }
      .fut-color-dynamic::placeholder{
      color: #a1a1a1 !important;
      }
      .fut-image-dynamic{
      filter: invert(1);
      }
      .fut-color-dynamic-gray{
      color: #8d8d8d !important;
      }
      .fut-selected-color-dynamic{
      color: var(--fut-secondary) !important;
      font-weight: 700 !important;
      }
      .fut-bg-dynamic{
      background: #ededed !important;
      }
      .fut-odds-success{
      color: #4b9147 !important;
      }
    </component>
  </div>
</template>
<script>
/* eslint-disable */
// import { mapGetters, mapActions } from 'vuex'
import { mapState } from 'pinia'
import { useLayoutStore } from '@/stores/layout'
import utils from '@/utils/utils.js'

export default {
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    sportsBook: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      stackedOdds: []
    }
  },
  head () {
    return {
      title: this.config.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.config.desc
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.config.keywords
        },
        {
          hid: 'og:locale',
          name: 'og:locale',
          content: this.config.og_locale ? this.config.og_locale : ''
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: this.config.og_site_name ? this.config.og_site_name : ''
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: this.config.og_type ? this.config.og_type : ''
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.config.og_title ? this.config.og_title : ''
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.config.og_description ? this.config.og_description : ''
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: this.config.og_url ? this.config.og_url : ''
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.config.og_image ? this.config.og_image : ''
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: this.config.icon }
      ]
    }
  },
  mounted () {
    if (process.env.GEOLOC && process.env.GEOLOC === 'true') {
      this.getLocation()
    }
  },
  computed: {
    ...mapState(useLayoutStore, {
      getCurrentApplicationType: 'getCurrentApplicationType',
      getCurrentLayoutStyle: 'getCurrentLayoutStyle',
      getCurrentThemeStyle: 'getCurrentThemeStyle'
    })
  },
  methods: {
    getCardHighlight (config) {
      if (config && config.color_highlight && config.color_highlight !== 'black' && config.color_highlight !== '#000000') {
        return config.color_highlight
      }
      return '#00000000'
    },
    getHsl (hex) {
      return utils.getHsl(hex)
    },
    getLocation () {
      if (!navigator.geolocation) {
        // console.log('navigator not supported')
        return
      }
      // console.log('checking location ->', navigator)
      navigator.geolocation.getCurrentPosition((res) => {
        // console.log('this is the position', res)
      }, (err) => {
        // console.log('erro on getting pos', err)
      })
    }
  }
}
/* eslint-enable */
</script>
<style lang="scss">
@import "@/assets/layout/breakpoints";
@import "@/assets/layout/variables";
.mobile-spacing{
  // margin-bottom: 100px;
  @include lg{
    margin-bottom: 0px;
  }
}
.btn-block{
  border-radius: 0;
}
.accordion-button{
  outline: none !important;
  box-shadow: none !important;
}
.tab-content{
  .accordion-button{
    background-color: $gray-600;
    border: none;
    color: var(--white);
  }
}
.accordion-item{
  border: none;
  border-bottom: 4px solid var(--fut-background-lightest);
}
.accordion-collapse{
  background-color: var(--fut-background-lightest);
  color: var(--white);
}
.accordion-button:not(.collapsed) {
    background-color: var(--fut-primary-lightest);
    color: var(--white);
}
.accordion-item:last-of-type .accordion-button.collapsed{
  border-radius: 0;
}
.accordion-button:not(.collapsed)::after{
  /* background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='#ffffff'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>"); */
}
.filter-group {
  .btn-outline-primary{
    border-color: #424b53;
    color: var(--white);
    outline: none !important;
    box-shadow: none !important;
    background-color: #3a4249;
  }
  .btn-outline-primary:hover{
    border-color: var(--fut-primary);
    background-color: var(--fut-primary);
    color: var(--white);
  }
}
.btn-primary {
    background-color: var(--fut-primary);
    border-color: var(--fut-primary);
}
.btn-secondary {
    background-color: var(--fut-secondary);
    border-color: var(--fut-secondary);
}
a {
    color: var(--fut-primary);
}
a:hover {
    color: var(--fut-primary-darker);
}
.text-highlight {
    color: var(--fut-highlight) !important;
}
.text-primary {
    color: var(--fut-primary) !important;
}
.text-dark {
    color: #333333 !important;
}
.border-primary {
  border-color: var(--fut-primary) !important;
}
.text-secondary {
    color: var(--fut-secondary) !important;
}
.text-secondary-light {
    color: var(--fut-secondary-lightest) !important;
}
.bg-primary {
    background-color: var(--fut-primary) !important;
}
.bg-background {
    background-color: var(--fut-background) !important;
}
.bg-secondary {
    background-color: var(--fut-secondary) !important;
}
.bg-navbar {
  background-color: var(--fut-background-header) !important;
}
.btn-check:checked + .btn-primary, .btn-check:active + .btn-primary, .btn-primary:active, .btn-primary.active, .show > .btn-primary.dropdown-toggle {
    color: #000;
    background-color: var(--fut-primary-lighter);
    border-color: var(--fut-primary-lighter);
}
.btn-primary:hover {
    color: #000;
    background-color: var(--fut-primary-darker);
    border-color: var(--fut-primary-darker);
}
.btn-check:checked + .btn-secondary, .btn-check:active + .btn-secondary, .btn-secondary:active, .btn-secondary.active, .show > .btn-secondary.dropdown-toggle {
    color: #000;
    background-color: var(--fut-secondary-lighter);
    border-color: var(--fut-secondary-lighter);
}
.btn-secondary:hover {
    color: #000;
    background-color: var(--fut-secondary-darker);
    border-color: var(--fut-secondary-darker);
}
.btn-open-side{
  position: fixed;
  z-index: 30;
  top: 50%;
  padding: 15px 8px;
}
.btn-open-side.btn-right{
  left: 100%;
  transform: translateX(-100%);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.btn-open-side.btn-left{
  left: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.main-content{
  //min-height: 100vh;
  width: 100% !important;
}
.sidebar{
  width: 100vw;
  position: fixed;
  left: -101%;
  background: var(--fut-background-darkest);
}
.sidebar.open{
  left: 0px;
  z-index: 10;
  position: fixed;
  top: 0;
  background: $dark;
  min-height: 100vh;
}
.sidebar-sp {
  @include md {
    width: 345px;
    margin-left: 20px;
  }
}
.sidebar-nsx{
  width: 70vw;
  position: fixed;
  left: -70vw;
  top: 0;
  // background: var(--fut-background-darkest);
  background: linear-gradient(to right,var(--nsx-dark-1) 90%,var(--nsx-dark-8) 98%);
}
.sidebar-nsx.open{
  left: 0px;
  z-index: 10;
  position: fixed;
  top: 0;
  // background: $dark;
  background: linear-gradient(to right,var(--nsx-dark-1) 90%,var(--nsx-dark-8) 98%);
  min-height: 100vh;
}
.content-sp{
  width: 100%;
  @include md {
    width: 80%;
  }
  // margin-left: 10px;
}
.content-nsx{
  position: relative;
  left: 0;
  width: 100%;
}
.content-nsx.open{
  position: relative;
  left: 70vw;
}
.nav-nsx{
  nav{
    // position: relative;
    left: 0;
    z-index: 9999;
  }
}
.nav-nsx.open{
  nav{
    // position: relative;
    left: 70vw;
  }
}
.content{
  width: 100vw;
}
.content-full{
  width: 100%;
}

@include md {
  .sidebar{
    display: block;
    position: relative;
    left: initial;
    width: 200px;
  }
  .sidebar-nsx{
    display: block;
    position: relative;
    left: initial;
    width: 40px;
    @include lg {
      width: 200px;
    }
  }
  .content{
    width: calc(100vw - 204px);
  }
}
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.bg-dark{
  background-color: var(--fut-background-darker) !important;
}
.bg-custom-black{
  background-color: var(--fut-background-black) !important;
}
.bg-Sp{
  background-color: white !important;
  @include md {
    background-color: var(--fut-background-darker) !important;
  }
}
.bg-darkest{
  background-color: var(--fut-background-darkest) !important;
}
.text-background{
  color: var(--fut-background-darker) !important;
}
.nav-filter{
  .nav-link{
    color: var(--fut-secondary);
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
  }
  .nav-link:hover{
    background-color: var(--fut-secondary-black);
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-radius: 0;
  }
  .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link{
    color: $white;
    background-color: var(--fut-secondary-darkest);
    border: none;
    border-radius: 0;
    border-bottom: 2px solid var(--fut-secondary);
    font-weight: 900;
  }
  .nav-tabs{
    border-bottom: 1px solid $gray-600 !important;
  }
}
.bg-nsx{
  background: var(--nsx-dark-3) !important;
}
.nsx-scroll{
  &::-webkit-scrollbar-track {
    opacity: .3;
    border-radius: 0.125rem;
    background-color: var(--nsx-dark-7);
  }
  &::-webkit-scrollbar {
    opacity: .3;
    width: 13px;
    // border-radius: 0.125rem;
  }
  &::-webkit-scrollbar-thumb {
    border: solid 2px var(--nsx-dark-7);
    opacity: .3;
    border-radius:50px;
    width: 5px;
    background-color: var(--nsx-dark-6);
  }
}
.nsx-scroll-black{
  &::-webkit-scrollbar-track {
    opacity: .3;
    border-radius: 0.125rem;
    background-color: #1d1d1d;
  }
  &::-webkit-scrollbar {
    opacity: .3;
    width: 13px;
    // border-radius: 0.125rem;
  }
  &::-webkit-scrollbar-thumb {
    border: solid 2px #1d1d1d;
    opacity: .3;
    border-radius:50px;
    width: 5px;
    background-color: var(--nsx-dark-6)34;
  }
}
.bg-nsx-white{
  background: #c5c5c5;
}
.v-toast{
  z-index: 9999 !important;
}
.page-full{
  min-height: 100vh;
}
.nowrap{
  white-space: nowrap;
}
svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa{
  overflow: visible;
  box-sizing: content-box;
}
.VueCarousel-navigation-button {
  padding: 0 !important;
  background: var(--fut-background-lighter) !important;
  font-weight: 900 !important;
  border-radius: 50px;
  padding: 2px 7px !important;
  @include md {
    padding: 5px 12px !important;
  }
}
.bg-primary-dark {
  background: var(--fut-primary-darker) !important;
}
.bg-primary-lighter {
  background: var(--fut-primary-lighter) !important;
}
.bg-primary-transparent {
  background: var(--fut-primary-transparent-2) !important;
}
.fixed-black {
  color: #333333 !important;
}
.hover-secondary:hover {
  background: var(--fut-secondary) !important;
}
.hover-color-white:hover {
  color: #ffffff !important;
}
.hover-color-secondary:hover {
  color: var(--fut-secondary) !important;
}
.w-fb-custom {
  width: 100% !important;
  @include md {
    width: initial !important;
  }
}
.text-games-list {
  color: var(--fut-background-games-list-lighter);
}
.text-games-list-stronger {
  color: var(--fut-background-games-list-lighter);
  filter: contrast(1.75);
}
</style>
