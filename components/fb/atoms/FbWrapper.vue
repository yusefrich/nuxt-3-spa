<template>
  <div v-show="isActive">
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    },
    count: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      isActive: false
    }
  },
  mounted () {
    this.isActive = this.selected
  }
}
</script>
<style lang="scss" scoped>
</style>
