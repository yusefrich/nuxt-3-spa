<template>
  <div
    class="container fut-color-dynamic text-print-color py-4"
    :class="textColor?'custom-color':'text-white'"
  >
    <!-- eslint-disable-next-line -->
    <div style="word-break: break-word;" class="text-print-color" v-html="content" />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FutHtmlRender',
  props: {
    content: {
      type: String,
      default: ''
    },
    textColor: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.text-print-color {
    @media print {
    color: #000 !important;
    &* {
      color: #000 !important;
    }
  }
}
.custom-color {
  color: var(--md-font-color) !important;
}
</style>
