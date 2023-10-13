<template>
  <div>
    <h5
      :style="`
        background: ${color};
        font-size: ${fontSize};
      `"
    >
      <slot />
    </h5>
  </div>
</template>

<script>
export default {
  name: 'MdChip',
  props: {
    color: {
      type: String,
      default: 'var(--fut-primary-darkest)'
    },
    fontSize: {
      type: String,
      default: 'auto'
    }
  }
}
</script>

<style lang="scss" scoped>
h5 {
  display: inline;
  padding: 5px 20px;
  margin: 0;
  color: #fff;
  border-radius: 20px;
  white-space: nowrap;
}
</style>
