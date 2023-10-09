<template>
  <header
    :style="`
      background: ${background};
    `"
  >
    <slot />
  </header>
</template>

<script>
export default {
  name: 'SkHeader',
  props: {
    background: {
      type: String,
      default: 'transparent'
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 60px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .2), 0 4px 6px -2px rgba(0, 0, 0, .1);
  z-index: 2;
}
</style>
