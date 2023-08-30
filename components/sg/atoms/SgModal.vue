<template>
  <transition name="fade" appear>
    <div v-if="showModal" class="cad-menu">
      <div class="inside-cad-menu" :class="'mod-' + width" :style="customStyle">
        <div
          v-if="close"
          class="text-white close-btn"
          @click="showModal = false"
        >
          <font-awesome-icon :icon="['fas', 'times']" />
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    customStyle: {
      type: String,
      default: ''
    },
    close: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: 'md'
    }
  },
  computed: {
    showModal: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/breakpoints";
.cad-menu {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .8);
  display: flex;
  z-index: 100;
  justify-content: center;
  align-items: center;
}
.inside-cad-menu {
  background-color: var(--fut-background-darker);
  padding-bottom: 25px;
  padding-top: 25px;
  width: 440px;
  border-radius: 20px;
  position: relative;
}
.mod-xl{
  max-width: 100%;
  width: 97%;
  height: 97%;
  overflow-y: auto;
}
.mod-md{
  max-width: 100%;
  width: 77%;
  max-height: 90%;
  height: auto;
  overflow-y: auto;
  // height: 77%;
  @include _md {
    width: 97%;
    // height: 97%;
  }
}
.mod-sm{
  max-width: 100%;
  width: 30%;
  max-height: 90%;
  height: auto;
  overflow-y: auto;
  @include _md {
    width: 77%;
  }
}

.close-btn {
  position: absolute;
  right: 30px;
  cursor: pointer;
}
</style>
