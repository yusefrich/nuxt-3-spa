<template>
  <div
    class="card-wrapper"
    :style="`
      width: ${width};
      height: ${height};
    `"
  >
    <div
      class="card fut-scrollbar"
      :class="{overflow: overflow}"
      :style="`padding: ${padding};`"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MdCard',
  props: {
    width: {
      type: [Number, String],
      default: ''
    },
    height: {
      type: [Number, String],
      default: ''
    },
    padding: {
      type: String,
      default: '24px'
    },
    overflow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.card-wrapper {
  .card {
    width: 100%;
    height: 100%;
    border: 1px solid var(--md-comp-border-color);
    background: var(--md-comp-bg-color);
    box-shadow: 0 0 10px 0 var(--md-shadow-color);
    -webkit-box-shadow: 0 0 10px 0 var(--md-shadow-color);
  }
  .overflow {
    height: calc(100vh - 242px);
    overflow-y: auto;
  }
}
</style>
