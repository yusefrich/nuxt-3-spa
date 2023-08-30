<template>
  <div class="carousel-wrapper">
    <md-desktop-carousel
      :items="items"
      :tickets="tickets"
      :full-width="fullWidth"
      :is-mobile="isMobile"
      :class="fullWidth ? 'd-block' : 'd-none d-md-block pb-3'"
      @selectBet="$emit('selectBet', $event)"
    />
    <md-mobile-carousel
      :items="items"
      :logo="logo"
      :class="fullWidth ? 'd-none' : 'd-md-none'"
    />
  </div>
</template>

<script>
import MdDesktopCarousel from '@/components/md/molecules/MdDesktopCarousel.vue'
import MdMobileCarousel from '@/components/md/molecules/MdMobileCarousel.vue'

export default {
  name: 'MdCustomCarousel',
  components: {
    MdDesktopCarousel,
    MdMobileCarousel
  },
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    logo: {
      type: String,
      default: ''
    },
    tickets: {
      type: Array,
      default: () => ([])
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
