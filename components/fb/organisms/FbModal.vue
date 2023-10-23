<template>
  <transition v-if="open" name="fade" appear>
    <div class="modal-overlay">
      <div
        class="modal-content py-3 fut-color-dynamic fut-bg-dynamic"
        :class="{ fb2: fb2 && isMobile }"
        :style="maxWidth ? 'max-width: ' + maxWidth + 'px' : ''"
      >
        <fb-fut-button
          :class="fb2 && isMobile ? 'fb2-button-close-modal' : 'button-close-modal border-0 bg-transparent'"
          @click="$emit('onClose')"
        >
          <font-awesome-icon class="close-icon fut-color-dynamic" :icon="['fas', 'times']" />
        </fb-fut-button>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
import FbFutButton from '@/components/fb/atoms/FbFutButton'
export default {
  components: {
    FbFutButton
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    fb2: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'onClose'
  ]
}
</script>

<style lang="scss" scoped>
@import "@/assets/layout/variables";
.modal-overlay {
  position: fixed;
  background-color: rgba( 0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 2020;
}
.modal-content {
  color: white;
  background: #232429;
  position: fixed;
  z-index: 2030;
  top: 10vh;
  left: 50%;
  right: 50%;
  max-width: 400px;
  transform: translate(-50%);
  border: 5px solid gray;
  border-radius: 2px;
}
.fb2 {
  color: white;
  background: #232429;
  position: fixed;
  z-index: 2030;
  top: 25% !important;
  left: 50%;
  right: 50%;
  max-width: 90% !important;
  padding: 10px 20px 15px 20px !important;
  transform: translate(-50%);
  border: 1px solid var(--fut-primary) !important;
  border-radius: 10px !important;
}
.button-close-modal {
  position: absolute;
  top: 0;
  right: 0;
  color: #FFF;
}
.fb2-button-close-modal {
  position: absolute;
  top: -10px;
  right: -8px;
  color: #FFF;
  background: var(--fut-background-header);
  border: 1px solid var(--fut-primary);
  border-radius: 5px !important;
  display: flex;

  .close-icon {
    width: 11px;
    height: 11px;
    padding: 6px;
  }
}
.close-icon {
  padding: 9px 12px;
  height: 16px;
}
</style>
