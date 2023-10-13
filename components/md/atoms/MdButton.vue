<template>
  <button
    class="md-button transition"
    :style="`
      width: ${width};
      height: ${height};
      padding: ${padding};
      border-radius: ${borderRadius};
    `"
    :disabled="disabled || loading"
    :class="{
      disabled: disabled || loading,
      outline: outline
    }"
    @click.prevent="$emit('click')"
  >
    <slot /> <font-awesome-icon v-if="loading" class="icon spinner-class" :icon="['fas', 'circle-notch']" />
  </button>
</template>

<script>
export default {
  name: 'MdButton',
  props: {
    width: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: 'auto'
    },
    loading: {
      type: Boolean,
      default: false
    },
    padding: {
      type: String,
      default: '0'
    },
    borderRadius: {
      type: String,
      default: '4px'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'click'
  ]
}
</script>

<style lang="scss" scoped>
.md-button {
  border: none;
  color: #fff;
  background: var(--fut-primary);
  &:hover {
    background: var(--fut-primary-darkest);
  }
  &:active {
    background: var(--fut-primary-lightest);
  }
  &.disabled {
    background: #ccc !important;
    &:hover {
      background: #ccc !important;
    }
  }

  .spinner-class{
    animation-name: spin;
    animation-duration: 500ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  @keyframes spin {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(360deg);
    }
  }
}
.outline {
  background: rgba($color: #000000, $alpha: .0) !important;
  color: var(--md-font-color);
}
</style>
