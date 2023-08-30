<template>
  <fut-button :to="url">
    <div :style="`background-image: url('${img}');`" :class="['banner-container', `size-${size}`]" />
  </fut-button>
</template>
<script>
import FutButton from '@/components/default/atoms/FutButton.vue'

export default {
  components: {
    FutButton
  },
  props: {
    img: {
      type: String,
      default: '/placeholders/default/Ad.png'
    },
    size: {
      type: String,
      default: 'tall'
    },
    url: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped lang="scss">
  @import "@/assets/layout/variables";
  .banner-container{
    background: $white;
  }
  .size-tall{
    height: 500px;
    background-size: cover;
    background-position: center;
  }
</style>
