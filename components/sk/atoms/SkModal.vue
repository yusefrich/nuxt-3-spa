<template>
  <div
    v-if="open"
    class="modal-wrapper"
    :style="`
      z-index: ${zIndex};
      position: ${position}
    `"
  >
    <div class="modal-bg" @click="open = false, $emit('close')" />

    <div
      :style="`
        width: ${width};
        min-height: ${minHeight};
        max-height: ${maxHeight};
        border-radius: ${borderRadius};
        overflow: ${overflow?'auto':'initial'};
      `"
      class="sk-modal-content"
      :class="{ 'sk-modal-content-mobile': !fullScreen }"
    >
      <div
        v-if="close"
        class="modal-close transition"
        :class="{ filled: filledClose }"
        @click="open = false, $emit('close')"
      >
        <font-awesome-icon :icon="['fas', 'times']" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkModal',
  props: {
    modelValue: {
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
      default: '.5rem'
    },
    overflow: {
      type: Boolean,
      default: false
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: String,
      default: '3001'
    },
    position: {
      type: String,
      default: 'fixed'
    }
  },
  emits: [
    'update:modelValue',
    'close'
  ],
  computed: {
    open: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
        if (!value) {
          this.$emit('close')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .sk-modal-content {
    position: fixed;
    background: var(--fut-background);
    color: var(--fut-color-dynamic);
    z-index: 3003;

    .modal-close {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--fut-background-white-3)80;
      position: absolute;
      right: 0;
      margin: 15px;
      cursor: pointer;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      z-index: 8;

      &:hover {
        color: var(--fut-color-dynamic);
      }
    }

    .filled {
      background: #FAFAFA;
      box-sizing: border-box;
      box-shadow: 0px 1px 4px #666;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background: var(--fut-background-lightest-2);
    }
  }

  @media (max-width: 425px) {
    .sk-modal-content-mobile {
      width: 95% !important;
    }
  }
}

.modal-bg {
  width: 100vw;
  height: 100vh;
  color: var(--fut-color-dynamic);
  background: var(--fut-background-transparent);
  z-index: 6;
}
</style>
