<template>
  <div v-if="modal">
    <div class="modal-wrapper">
      <div class="modal-bg" @click="modal = false" />
      <div
        :style="`
          width: ${width};
          min-height: ${minHeight};
          max-height: ${maxHeight};
          border-radius: ${borderRadius};
          overflow: ${overflow?'auto':'initial'};
        `"
        class="md-modal-content"
        :class="{ 'md-modal-content-mobile': !fullScreen }"
      >
        <div
          v-if="close"
          class="modal-close"
          :class="{ filled: filledClose }"
          @click="modal = false"
        >
          <font-awesome-icon :icon="['fas', 'times']" />
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MdModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    close: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '500px'
    },
    minHeight: {
      type: String,
      default: '500px'
    },
    maxHeight: {
      type: String,
      default: 'auto'
    },
    filledClose: {
      type: Boolean,
      default: false
    },
    borderRadius: {
      type: String,
      default: '4px'
    },
    overflow: {
      type: Boolean,
      default: false
    },
    fullScreen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    modal: {
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
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3001;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-bg {
  width: 100%;
  height: 100%;
  color: #fff;
  background: #33333370;
  z-index: 3002;
}
.md-modal-content {
  position: fixed;
  background: var(--md-comp-bg-color);
  color: #fff;
  z-index: 3003;
  .modal-close {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--md-menu-idx-font-color);
    position: absolute;
    right: 0;
    margin: 15px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    z-index: 4000;
    &:hover {
      background: var(--md-shadow-color);
    }
    &:active {
      background: none;
    }
  }
}
.filled {
  background: #FAFAFA;
  box-sizing: border-box;
  box-shadow: 0px 1px 4px #666;
}

@media (max-width: 425px) {
  .md-modal-content-mobile {
    width: 95% !important;
  }
}
</style>
