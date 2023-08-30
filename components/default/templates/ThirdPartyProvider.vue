<template>
  <div>
    <iframe
      :key="providerUrl + ''"
      :src="providerUrl ? providerUrl : getDefaultUrl"
      frameborder="0"
      width="100%"
      :style="`height: calc(100vh - ${navbarHeight});`"
    >
    </iframe>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  props: {
    virtuals: {
      type: Boolean,
      default: false
    },
    esports: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isMobile: false,
      providerUrl: null,
      providerDefaultUrl: 'https://sportnew.inplaynet.tech/?c=mesk&brand=218&lang=BR',
      providerDefaultMobileUrl: 'https://sportnew.inplaynet.tech/mobile/?c=mesk&brand=218&lang=BR',
      providerDefaultVirtualUrl: 'https://sportnew.inplaynet.tech/?c=mesk&brand=218&lang=BR/virtual',
      providerDefaultMobileVirtualUrl: 'https://sportnew.inplaynet.tech/mobile/?c=mesk&brand=218&lang=BR/virtual',
      providerDefaultEsportsUrl: 'https://sportnew.inplaynet.tech/?c=mesk&brand=218&lang=BR/esports',
      providerDefaultMobileEspotsUrl: 'https://sportnew.inplaynet.tech/mobile/?c=mesk&brand=218&lang=BR/esports'
    }
  },
  mixins: [windowWidth],
  computed: {
    ...mapGetters({
      // todo refactor this part
      currentAds: 'settings/currentAds',
      currentSettings: 'settings/currentSettings',
      currentSlides: 'settings/currentSlides',
      currentFeaturedBets: 'bets/currentFeaturedBets',
      // * refactored
      getCasinoHeaderGames: 'metadata-casino/getCasinoHeaderGames',
      getCasinoHeaderCategories: 'metadata-casino/getCasinoHeaderCategories',
      getPreCashInTickets: 'tickets-pre-cash-in/getPreCashInTickets',
      getMetadataSports: 'metadata-sports/getMetadataSports',
      getOdds: 'odds/getOdds',
      loggedInUser: 'loggedInUser',
      getPreMatchEvents: 'pre-match/getPreMatchEvents',
      getPreMatchLoading: 'pre-match/getPreMatchLoading'
    }),
    getDefaultUrl () {
      if (this.isMobile) {
        return this.virtuals ? this.esports ? this.providerDefaultMobileEspotsUrl : this.providerDefaultMobileVirtualUrl : this.providerDefaultMobileUrl
      } else {
        return this.virtuals ? this.esports ? this.providerDefaultEsportsUrl : this.providerDefaultVirtualUrl : this.providerDefaultUrl
      }
    },
    navbarHeight () {
      let pixels = '0px'
      switch (this.layout) {
        case 'FB':
          if (this.isMobile) {
            pixels = '60px'
          } else {
            pixels = '128px'
          }
          break
        default:
          if (this.isMobile) {
            pixels = '65px'
          } else {
            pixels = '135px'
          }
          break
      }
      return pixels
    }
  },
  mounted () {
    this.isMobile = this.width <= 768
    if (this.loggedInUser) {
      // todo fetch the correct url based on user uuid
      this.fetchThirdPartyUrl({ Token: this.loggedInUser.player.uuid, Ismobile: this.isMobile }).then((res) => {
        if (this.virtuals) {
          this.providerUrl = res.Content + '#/virtual'
        } else if (this.esports) {
          this.providerUrl = res.Content + '#/esports'
        } else {
          this.providerUrl = res.Content
        }
      })
    }
    this.updateOptions({
      filter: false,
      sidebar: false,
      field: false,
      inplaySidebar: false,
      ticket: false
    })
  },
  methods: {
    ...mapActions({
      fetchThirdPartyUrl: 'third-party-provider/fetchThirdPartyUrl',
      updateOptions: 'layout/updateOptions'
    })
  }
}
</script>

<style>
</style>
