<template>
  <div v-if="open" class="fut-modal px-4">
    <div class="modal-bg position-absolute" @click="$emit('onExit')" />
    <div
      :style="`z-index: 10; ${width?'max-width:'+width:''}`"
      class="position-relative fm-content text-white mx-auto"
      :class="{'nsx-white': bg === 'white', 'nsx-transparent': bg === 'transparent'}"
    >
      <div class="fm-content-header d-flex justify-content-between bg-ns" :style="`background: ${brandBg}`">
        <img
          v-if="brand"
          :src="brand"
          height="35"
          width="100%"
          style="object-fit: contain"
        >
        <nsx-fut-button v-if="close" style="opacity: .5" class="text-white p-0 nsx-close" @click="$emit('onClose')">
          <font-awesome-icon :icon="['fas', 'times-circle']" />
        </nsx-fut-button>
      </div>
      <div class="fm-content-body" :class="{'text-dark': bg === 'white'}">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import NsxFutButton from '@/components/nsx/atoms/NsxFutButton'
export default {
  components: {
    NsxFutButton
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    close: {
      type: Boolean,
      default: false
    },
    brand: {
      type: String,
      default: ''
    },
    bg: {
      type: String,
      default: ''
    },
    brandBg: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/layout/variables";
.modal-bg{
  width: 100vw;
  height: 100vh;
}
.fut-modal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.8);
}
.fm-content{
    background-color: #3a3a3a;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    border-radius: 10px;
    max-height: calc(100vh - 60px);
}
.fm-content-body{
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  padding-top: 0;
  &::-webkit-scrollbar-track {
    opacity: .3;
    border-radius: 0.125rem;
    background-color: #c5c5c5;
  }
  &::-webkit-scrollbar {
    opacity: .3;
    width: 13px;
  }
  &::-webkit-scrollbar-thumb {
    border: solid 4px #c5c5c5;
    opacity: .1;
    border-radius:50px;
    width: 5px;
    background-color: var(--nsx-dark-6);
  }
}
.fm-content-header{
  padding-top: 8px;
  padding-bottom: 8px;
  min-height: 50px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 8px 8px 0px 0px;
}
.bg-ns{
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}
.nsx-white{
  background: #c5c5c5;
}
.nsx-transparent{
  background: transparent;
}
.nsx-close{
  position: absolute;
  top: 0;
  right: 5px;
  font-size: 25px;
}
</style>
