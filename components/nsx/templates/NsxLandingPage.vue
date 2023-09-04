<template>
  <div style="min-height: 100vh">
    <select-route-nsx-horizontal
      :current-settings="currentSettings"
      :sports="getMetadataSports"
      @getDynamicSports="getDynamic()"
    />
    <div class="px-2">
      <slide-nsx
        :current-featured-bets="currentFeaturedBets"
        :current-slides="currentSlides"
      />
      <div class="d-flex pt-2 pb-4">
        <nsx-fut-button
          rounded
          class="w-100 me-1 pb-2"
          to="/sports"
          gray_darker
        >
          <span class="d-block text-white"><font-awesome-icon :icon="['fas', 'chevron-circle-up']" /></span>
          <span class="d-block text-white">{{ $t('i18n_cotacao', 2).toUpperCase() }}</span>
          <span style="font-size:25px; line-height: 20px" class="d-block fw-bold text-white">{{ $t('i18n_altas').toUpperCase() }}</span>
        </nsx-fut-button>
        <nsx-fut-button
          rounded
          class="w-100 ms-1 pb-3"
          to="/depositos-e-saques"
          gray_nsx
        >
          <span class="d-block text-secondary"><font-awesome-icon :icon="['fas', 'dollar-sign']" /></span>
          <span class="d-block text-white">{{ $t('i18n_saque', 1).toUpperCase() }}</span>
          <span style="font-size:25px; line-height: 20px" class="d-block fw-bold text-secondary">{{ $t('i18n_Rápido').toUpperCase() }}</span>
        </nsx-fut-button>
      </div>
    </div>
    <footer-nsx :current-settings="currentSettings" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton.vue'
import FooterNsx from '@/components/nsx/molecules/FooterNsx.vue'
import SlideNsx from '@/components/nsx/organisms/SlideNsx.vue'
import SelectRouteNsxHorizontal from '@/components/nsx/molecules/SelectRouteNsxHorizontal.vue'

export default {
  name: 'NsxLandingPage',
  components: {
    NsxFutButton,
    FooterNsx,
    SlideNsx,
    SelectRouteNsxHorizontal
  },
  computed: {
    ...mapGetters({
      currentSettings: 'settings/currentSettings',
      currentFeaturedBets: 'bets/currentFeaturedBets',
      currentSlides: 'settings/currentSlides',
      getMetadataSports: 'metadata-sports/getMetadataSports'
    })
  },
  beforeMount () {
    this.updateOptions({
      ticket: false
    })
  },
  methods: {
    ...mapActions({
      fetchMetadataSports: 'metadata-sports/fetchMetadataSports',
      updateOptions: 'layout/updateOptions'
    }),
    getDynamic () {
      this.fetchMetadataSports()
    }
  }
}
</script>
