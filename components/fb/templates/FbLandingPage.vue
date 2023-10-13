<template>
  <div>
    <fb-select-page-landing
      v-if="currentSettings"
      :landing_style="layout"
      :font="currentSettings.font"
    />
    <div class="px-2 pt-2">
      <fb-carrosel
        v-if="getSlides"
        class="mb-2"
        :slides="getSlides"
        sm
      />
      <div class="d-none d-md-block">
        <fb-carrosel
          v-if="getCasinoSliders && getCasinoSliders.slides"
          sm
          :slides="getCasinoSliders.slides"
        />
      </div>
      <div v-if="layout === 'casino' || layout === 'default'" class="d-md-none">
        <fb-carrosel
          v-if="getCasinoSliders && getCasinoSliders.slides_mobile"
          sm
          :slides="getCasinoSliders.slides_mobile"
        />
      </div>
      <div v-if="currentSettings" class="d-flex pt-2 pb-4">
        <template v-if="currentSettings.landing_buttons && currentSettings.landing_buttons.length > 0">
          <fb-fut-button
            v-for="(btns, index) in currentSettings.landing_buttons"
            :key="btns.link"
            class="w-100 me-1 pb-2"
            style="border-radius: 0"
            :to="btns.link"
            external
            :dark="index === 0"
            :secondary="index === 1"
          >
            <img height="60px" :src="btns.img">
          </fb-fut-button>
        </template>
        <template v-else>
          <fb-fut-button
            v-if="currentSettings"
            class="w-100 me-1 pb-2"
            :to="layout === 'inplay' ? 'aovivo' : 'sports'"
            dark
          >
            <span class="d-block text-primary"><fa :icon="['fas', 'chevron-circle-up']" /></span>
            <span class="d-block">{{ $tc('i18n_cotacao', 2).toUpperCase() }}</span>
            <span style="font-size:25px; line-height: 20px" class="d-block fw-bold text-primary">{{ $t('i18n_altas').toUpperCase() }}</span>
          </fb-fut-button>
          <fb-fut-button
            class="w-100 ms-1 pb-3"
            to="/depositos-e-saques"
            secondary
          >
            <span class="d-block text-white"><fa :icon="['fas', 'dollar-sign']" /></span>
            <span class="d-block">{{ $tc('i18n_saque', 1).toUpperCase() }}</span>
            <span style="font-size:25px; line-height: 20px" class="d-block fw-bold text-white">{{ $t('i18n_Rápido').toUpperCase() }}</span>
          </fb-fut-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FbFutButton from '@/components/fb/atoms/FbFutButton.vue'
import FbSelectPageLanding from '@/components/fb/molecules/FbSelectPageLanding.vue'
import FbCarrosel from '@/components/fb/atoms/FbCarrosel.vue'

export default {
  name: 'FbLandingPage',
  components: {
    FbSelectPageLanding,
    FbFutButton,
    FbCarrosel
  },
  props: {
    layout: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      getCasinoSliders: 'metadata-casino/getCasinoSliders',
      currentSettings: 'settings/currentSettings',
      getSlides: 'layout/getSlides'
    })
  },
  beforeMount () {
    this.updateOptions({
      ticket: false
    })
  },
  mounted () {
    this.fetchCasinoSliders()
    this.fetchCurrentSlides()
  },
  methods: {
    ...mapActions({
      fetchCasinoSliders: 'metadata-casino/fetchCasinoSliders',
      fetchCurrentSlides: 'layout/fetchCurrentSlides',
      updateOptions: 'layout/updateOptions'
    })
  }
}
</script>
