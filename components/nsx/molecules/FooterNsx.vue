<template>
  <div class="footer-menu text-center">
    <img :src="currentSettings?currentSettings.footer_img?currentSettings.footer_img:currentSettings.logo:''" width="250" class="mb-4 mt-3 img-fluid" alt="">
    <div v-if="currentSettings && currentSettings.sponsors && currentSettings.sponsors.length > 0" class="mb-2" :class="{ 'container-fluid px-0 mx-0': currentSettings.footer_style === 2, 'container-sm nsx-container': currentSettings.footer_style !== 2 }">
      <h6 class="text-header-nsx">
        {{ $t('i18n_patrocinador_oficial') }}:
      </h6>
      <div v-if="currentSettings.footer_style === 2">
        <img
          v-for="(spon, index) in currentSettings.sponsors"
          :key="'sponsor_img_'+index"
          :src="spon.img"
          width="100%"
          class="patreon style-sponsors-2"
        >
      </div>
      <div v-else class="d-flex justify-content-center">
        <img
          v-for="(spon, index) in currentSettings.sponsors"
          :key="'sponsor_img_'+index"
          :src="spon.img"
          width="70px"
          height="70px"
          style="object-fit:contain"
        >
      </div>
    </div>
    <div class="container-sm nsx-container mb-2">
      <!-- eslint-disable-next-line -->
      <p v-if="currentSettings && currentSettings.copyright" v-html="htmlDecode(currentSettings.copyright)" />
    </div>
    <div v-if="currentSettings && currentSettings.seal">
      <iframe :src="currentSettings.seal" width="150" height="50" style="border:none;"></iframe>
    </div>
    <div class="d-flex justify-content-center">
      <nsx-fut-button
        v-if="currentSettings && currentSettings.fb"
        :to="currentSettings.fb"
        gray_nsx
        rounded
        class="mx-1"
        external
      >
        <font-awesome-icon style="font-size: 26px" class="icon text-white" :icon="['fab', 'facebook']" />
      </nsx-fut-button>
      <nsx-fut-button
        v-if="currentSettings && currentSettings.insta"
        target="_blank"
        :to="currentSettings.insta"
        gray_nsx
        rounded
        class="mx-1"
        external
      >
        <font-awesome-icon style="font-size: 26px" class="icon text-white" :icon="['fab', 'instagram']" />
      </nsx-fut-button>
      <nsx-fut-button
        v-if="currentSettings && currentSettings.tiktok"
        target="_blank"
        :to="currentSettings.tiktok"
        gray_nsx
        rounded
        class="mx-1"
        external
      >
        <font-awesome-icon style="font-size: 26px" class="icon text-white" :icon="['fab', 'tiktok']" />
      </nsx-fut-button>
      <nsx-fut-button
        v-if="currentSettings && currentSettings.tt"
        :to="currentSettings.tt"
        gray_nsx
        target="_blank"
        rounded
        class="mx-1"
        external
      >
        <font-awesome-icon style="font-size: 26px" class="icon text-white" :icon="['fab', 'twitter']" />
      </nsx-fut-button>
      <nsx-fut-button
        v-if="currentSettings && currentSettings.yt"
        :to="currentSettings.yt"
        gray_nsx
        target="_blank"
        rounded
        class="mx-1"
        external
      >
        <font-awesome-icon style="font-size: 26px" class="icon text-white" :icon="['fab', 'youtube']" />
      </nsx-fut-button>
      <nsx-fut-button
        v-if="currentSettings && currentSettings.phone"
        :to="'tel:'+currentSettings.phone"
        gray_nsx
        target="_blank"
        rounded
        class="mx-1"
        external
      >
        <font-awesome-icon style="font-size: 26px" class="icon text-white" :icon="['fab', 'phone']" />
      </nsx-fut-button>
      <nsx-fut-button
        v-if="currentSettings && currentSettings.whats"
        :to="'https://wa.me/'+currentSettings.whats"
        gray_nsx
        target="_blank"
        rounded
        class="mx-1"
        external
      >
        <font-awesome-icon style="font-size: 26px" class="icon text-white" :icon="['fab', 'whatsapp']" />
      </nsx-fut-button>
    </div>
    <div v-if="currentSettings" class="d-flex justify-content-evenly pt-4 pb-5 w-100">
      <nsx-fut-button v-for="imgs in currentSettings.footer_imgs" :key="'data_img_'+imgs.key" :to="imgs.link" external style="width: 30%">
        <img :src="imgs.img" height="70" width="100%" class="img-content" alt="">
      </nsx-fut-button>
    </div>
  </div>
</template>
<script>
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'

export default {
  components: { NsxFutButton },
  props: {
    currentSettings: {
      type: Object,
      default: () => ({})
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
  .footer-menu{
    background: var(--nsx-dark-0);
  }
  .nsx-container{
    p {
      font-size: 13.3px;
      color: var(--nsx-gray-1);
    }
    a {
      color: #ff6600 !important;
      font-weight: 600;
    }
  }
  .text-header-nsx{
    font-size: 16px;
    color: var(--nsx-gray-1);
  }
  .img-content{
    object-fit: contain;
  }
</style>
