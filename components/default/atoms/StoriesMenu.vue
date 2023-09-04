<template>
  <div ref="sportsGroup" class="ov-container bg-dark">
    <ul class="mx-3 mt-3 mb-1">
      <li
        v-for="(item, idx) in navItems"
        :key="idx"
        class="transition m-0 p-0"
      >
        <div class="w-100 content">
          <fut-button
            :to="item.link"
            dark
            class="w-100 h-100 transition btn-select-sport d-flex align-items-center justify-content-center"
          >
            <img
              v-if="item.img"
              :src="item.img"
              width="42"
              height="42"
              alt="Icon"
            >
            <svg-icons
              v-else-if="item.icon"
              class="icon-component"
              :icon="item.icon"
            />
          </fut-button>
          <p class="sport-title mb-0 text-center pt-1 fut-color-dynamic">
            <strong>{{ item.text }}</strong>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import FutButton from '@/components/default/atoms/FutButton'
import SvgIcons from '@/components/default/atoms/SvgIcons.vue'
import global from '@/mixins.js/global.js'

export default {
  name: 'StoriesMenu',
  components: { FutButton, SvgIcons },
  mixins: [global],
  props: {
    dynamicItems: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      selected: 1,
      inplaySports: []
    }
  },
  computed: {
    navItems () {
      const items = [
        { link: '/', text: this.$t('i18n_esporte', 2), icon: 'sport' },
        { link: '/sport/6046/aovivo', text: this.$t('i18n_esportes_ao_vivo'), icon: 'live' },
        { link: '/casino', text: this.$t('i18n_cassino'), icon: 'casino' },
        { link: '/casino?cat=live', text: this.$t('i18n_cassino_ao_vivo'), icon: 'money' },
        { link: '/promo', text: this.$t('i18n_promocao', 1), icon: 'rocket' }
      ]

      if (this.dynamicItems && this.dynamicItems.length) {
        this.dynamicItems.forEach((nav) => {
          if (!nav.nav_link) {
            return
          }
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
          }
        })
      }

      return items
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/layout/variables";
  @import "@/assets/layout/breakpoints";
  .ov-container{
    display: grid;
    overflow-x: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    top: 65px;
    @include md {
      top: 97px;
    }
    z-index: 1;
  }
  .ov-container::-webkit-scrollbar{
    display: none;
  }
  ul{
    display: flex;
    flex-direction: row;
    padding: 0 0  35px 0;
    li{
      display: flex;
      justify-content: center;
      width: 22vw;
      height: 22vw;
      margin: 5px;
      .icon-component{
        height: 10vw;
        width: 10vw;
      }
      .content {
        max-width: 77px;
        max-height: 77px;
        margin: 5px;
      }
      a, button {
        padding-left: 10px !important;
        padding-right: 10px !important;
        display: block;
        width: 100%;
        white-space: nowrap;
      }
      .icon{
        font-size: 45px;
      }
    }
    p{
      color: $white;
      font-size: 12px;
      padding-top: 5px;
    }
  }
  a, button {
    border: none !important;
    padding: 5px !important;
  }
  .compact{
    @include md{
      .icon{
        font-size: 22px;
        padding-right: 5px;
      }
      p{
        margin-bottom: 0;
        padding-top: 0 !important;
        white-space: nowrap;
        align-self: center;
      }
      height: 35px;
      width: auto;
      a, button {
        padding-left: 10px !important;
        padding-right: 10px !important;
        display: flex;
      }
    }
  }
  .filler{
    width: 100% !important;
    position: absolute;
    z-index: -1;
  }
  .sport-title{
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .btn-select-sport:disabled{
    opacity: .35;
  }
  .btn-select-sport{
    border-radius: 100px !important;
  }
</style>
