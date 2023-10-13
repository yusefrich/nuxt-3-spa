<template>
  <div class="d-print-none">
    <div class="footer-menu-sponsor overflow-auto">
      <div v-if="currentSettings" class="content-container d-flex justify-content-center w-100">
        <img v-if="currentSettings.font === 'light'" src="/payments/pix branco.svg" height="30" width="auto" alt="">
        <img v-if="currentSettings.font === 'dark'" src="/payments/pix preto.svg" height="30" width="auto" alt="">
      </div>
    </div>
    <div class="d-block d-md-flex bg-dark justify-content-center pb-3">
      <p class="text-white fut-color-dynamic align-self-center text-center pt-2 pe-4">
        {{ $t('i18n_todos_os_direitos_reservados') }}
      </p>
      <div class="bg-danger rounded-circle text-center mx-auto mx-md-0 age-restriction">
        <h2 style="align-self: center;" class="text-white mb-0 fw-bold">
          +18
        </h2>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <fut-social-media-dropdown
        v-if="hasSocialMedia"
        :current-settings="currentSettings"
      />
    </div>
    <div
      v-if="currentSettings && currentSettings.sponsors && currentSettings.sponsors.length > 0"
      class="mb-2"
      :class="{ 'container-fluid px-0 mx-0': currentSettings.footer_style === 2, 'container-sm nsx-container': currentSettings.footer_style !== 2 }"
    >
      <h6 class="text-header-nsx text-center text-white text-color-dynamic">
        {{ $t('i18n_patrocinador_oficial') }}:
      </h6>
      <div v-if="currentSettings.footer_style === 2">
        <img
          v-for="(spon, index) in currentSettings.sponsors"
          :key="'sponsor_img_'+index"
          :src="spon.img"
          class="patreon style-sponsors-2 w-100"
        >
      </div>
      <div v-else class="d-flex justify-content-center">
        <img
          v-for="(spon, index) in currentSettings.sponsors"
          :key="'sponsor_img_'+index"
          :src="spon.img"
          width="70"
          height="70"
          style="object-fit:contain"
        >
      </div>
    </div>
    <div class="container-sm mb-2 text-center text-white fut-color-dynamic">
      <div class="d-flex mb-4">
        <div
          v-if="curacaoKey"
          style="width: 370px"
          class="me-4"
        >
          <div
            :id="'apg-' + curacaoKey"
            :data-apg-seal-id="curacaoKey"
            data-apg-image-size="370"
            data-apg-image-type="basic-light-large"
          />
        </div>
        <div v-if="curacaoIframeSrc" :class="[currentSettings && currentSettings.copyright ? 'me-4' : 'w-100']">
          <iframe :src="curacaoIframeSrc" width="150" height="50" style="border:none;" />
        </div>
        <div>
          <!-- eslint-disable -->
          <p
            v-if="currentSettings && currentSettings.copyright"
            v-html="htmlDecode(currentSettings.copyright)"
            style="font-size: 14px"
            class="fut-color-dynamic"
          />
          <!-- eslint-enable -->
        </div>
      </div>
    </div>
    <div
      v-if="currentSettings && currentSettings.footer_imgs"
      style="flex-wrap: wrap"
      class="d-flex justify-content-evenly pb-4"
    >
      <fut-button v-for="imgs in currentSettings.footer_imgs" :key="'data_img_'+imgs.key" class="a" :to="imgs.link">
        <img :src="imgs.img" height="90" width="90" class="img-content" alt="">
      </fut-button>
    </div>
  </div>
</template>

<script>
import FutButton from '@/components/default/atoms/FutButton.vue'
import FutSocialMediaDropdown from '@/components/default/molecules/FutSocialMediaDropdown.vue'

export default {
  name: 'FooterSponsor',
  components: {
    FutButton,
    FutSocialMediaDropdown
  },
  props: {
    curacaoKey: {
      type: String,
      default: null
    },
    curacaoIframeSrc: {
      type: String,
      default: null
    },
    curacaoFunc: {
      type: String,
      default: null
    },
    currentSettings: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    hasSocialMedia () {
      if (
        this.currentSettings &&
        (this.currentSettings.fb ||
        this.currentSettings.insta ||
        this.currentSettings.tt ||
        this.currentSettings.yt ||
        this.currentSettings.phone ||
        this.currentSettings.whats ||
        this.currentSettings.telegram)
      ) {
        return true
      }
      return false
    }
  },
  mounted () {
    if (this.curacaoKey) {
      window[this.curacaoFunc].init()
    }
  },
  methods: {
    htmlDecode (input) {
      const doc = new DOMParser().parseFromString(input, 'text/html')
      return doc.documentElement.textContent
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/variables";
.footer-menu-sponsor {
  padding-top: 20px;
  padding-bottom: 20px;
  background: var(--fut-background-darker);
  display: flex;
}
.age-restriction{
  height: 65px;
  width: 65px;
  display: flex;
  justify-content: center;
  h2{
    align-self: center;
  }
}
.content-container {
  img{
    margin-left: 10px;
    margin-right: 10px;
    display: inline;
    max-width: 28%;
    object-fit: contain;
  }
}
.a{
    padding-left: 15px;
    line-height: 3rem;
}
.img-content{
  object-fit: contain;
}
</style>
