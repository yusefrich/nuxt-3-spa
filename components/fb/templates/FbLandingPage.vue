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
            <img height="60" :src="btns.img">
          </fb-fut-button>
        </template>
        <template v-else>
          <fb-fut-button
            v-if="currentSettings"
            class="w-100 me-1 pb-2"
            :to="layout === 'inplay' ? 'aovivo' : 'sports'"
            dark
          >
            <span class="d-block text-primary"><font-awesome-icon :icon="['fas', 'chevron-circle-up']" /></span>
            <span class="d-block">{{ $t('i18n_cotacao', 2).toUpperCase() }}</span>
            <span style="font-size:25px; line-height: 20px" class="d-block fw-bold text-primary">{{ $t('i18n_altas').toUpperCase() }}</span>
          </fb-fut-button>
          <fb-fut-button
            class="w-100 ms-1 pb-3"
            to="/depositos-e-saques"
            secondary
          >
            <span class="d-block text-white"><font-awesome-icon :icon="['fas', 'dollar-sign']" /></span>
            <span class="d-block">{{ $t('i18n_saque', 1).toUpperCase() }}</span>
            <span style="font-size:25px; line-height: 20px" class="d-block fw-bold text-white">{{ $t('i18n_Rápido').toUpperCase() }}</span>
          </fb-fut-button>
        </template>
      </div>
      <div class="events-lists">
        <fb-games-list
          v-if="currentSettings"
          :events="getPreMatchEvents"
          :events-sport="currentSport"
          :loading="getPreMatchLoading"
          :stripped="currentSettings.stripped"
          :font="currentSettings.font"
          :tickets="getPreCashInTickets"
          :settings="currentSettings"
          landing-style
          :is-mobile="isMobile"
          @invalidMultiple="val => setInvalidMultiple(val)"
          @selectBet="ticket => toggleTicket(ticket)"
        >
          <template #title>
            <div class="section-title-padding">
              <font-awesome-icon style="font-size: 14px" :icon="['far', 'clock']" />
              <span class="title-head">{{ $t('i18n_proximos') }}</span>
            </div>
          </template>
          <template #options>
            <div class="options-container w-100 my-1">
              <template v-for="(sport, index) in getMetadataSports">
                <fb-fut-button
                  v-if="index < 5 && currentSettings"
                  :key="'home_sport_select_'+index"
                  :fixed-width="200"
                  :primary="sport.id === currentSport"
                  style="width: 20%"
                  block
                  class="m-0 px-2 py-1 btn-select-sport fut-color-dynamic"
                  :class="{'select-active': currentSport === sport.id}"
                  @click="()=>{changeFilter({sport: sport.id}); fetchPreMatchEvents(); currentSport=sport.id}"
                >
                  {{ sport.name }}
                </fb-fut-button>
              </template>
            </div>
          </template>
        </fb-games-list>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import { mapState, mapActions } from 'pinia'
import { useLayoutStore } from '@/stores/layout'
import { useSettingsStore } from '@/stores/settings'
import { usePreMatchStore } from '@/stores/pre-match'
import { useMetadataCasinoStore } from '@/stores/metadata-casino'
import { useMetadataSportsStore } from '@/stores/metadata-sports'
import { useTicketsPreCashInStore } from '@/stores/tickets-pre-cash-in'

import FbFutButton from '@/components/fb/atoms/FbFutButton'
import FbSelectPageLanding from '@/components/fb/molecules/FbSelectPageLanding'
import FbCarrosel from '@/components/fb/atoms/FbCarrosel'
import FbGamesList from '@/components/fb/organisms/FbGamesList'

import windowWidth from '@/mixins.js/windowWidth.js'

export default {
  name: 'FbLandingPage',
  components: {
    FbSelectPageLanding,
    FbFutButton,
    FbCarrosel,
    FbGamesList
  },
  mixins: [windowWidth],
  props: {
    layout: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentSport: 6046
    }
  },
  computed: {
    ...mapState(useLayoutStore, {
      getSlides: 'getSlides'
    }),
    ...mapState(useSettingsStore, {
      currentSettings: 'currentSettings'
    }),
    ...mapState(useMetadataCasinoStore, {
      getCasinoSliders: 'getCasinoSliders'
    }),
    ...mapState(useMetadataSportsStore, {
      getMetadataSports: 'getMetadataSports'
    }),
    ...mapState(usePreMatchStore, {
      getPreMatchEvents: 'getPreMatchEvents',
      getPreMatchLoading: 'getPreMatchLoading'
    }),
    ...mapState(useTicketsPreCashInStore, {
      getPreCashInTickets: 'getPreCashInTickets'
    }),
    isMobile () {
      return this.width <= 821
    }
  },
  beforeMount () {
    this.updateOptions({
      ticket: true
    })
  },
  async mounted () {
    await this.fetchMetadataSports().then((resp) => {
      if (resp && resp.length > 0) {
        this.changeFilter({ sport: resp[0].id })
        this.currentSport = resp[0].id
      }
    })

    this.changeFilter({ date: dayjs().format('YYYY-MM-DD') })
    this.changeFilter({ hour: null })
    this.fetchPreMatchEvents()

    this.fetchCasinoSliders()
    this.fetchCurrentSlides()
  },
  methods: {
    ...mapActions(useLayoutStore, {
      updateOptions: 'updateOptions',
      fetchCurrentSlides: 'fetchCurrentSlides'
    }),
    ...mapActions(useMetadataCasinoStore, {
      fetchCasinoSliders: 'fetchCasinoSliders',
    }),
    ...mapActions(useMetadataSportsStore, {
      fetchMetadataSports: 'fetchMetadataSports'
    }),
    ...mapActions(usePreMatchStore, {
      changeFilter: 'changeFilter',
      fetchPreMatchEvents: 'fetchPreMatchEvents'
    }),
    ...mapActions(useTicketsPreCashInStore, {
      toggleTicket: 'toggleTicket',
      setInvalidMultiple: 'setInvalidMultiple'
    })
  }
}
</script>
