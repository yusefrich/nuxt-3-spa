<template>
  <div
    class="burger-wrapper transition"
    :class="{ x: sidebar }"
    @click.stop="$emit('click')"
  >
    <span class="top transition" />
    <span class="middle transition" />
    <span class="bottom transition" />
  </div>
</template>

<script>
export default {
  name: 'MdBurger',
  props: {
    sidebar: {
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
.burger-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 60px;
  border-right: 1px solid var(--md-comp-border-color);
  cursor: pointer;

  span {
    width: 20px;
    height: 2px;
    background: var(--md-menu-idx-font-color);
    margin-bottom: 4px;
  }
}

.x {
  span {
    position: absolute;
    margin: 0 0 0 0;
  }
  .middle {
    height: 0;
    margin-bottom: 0;
  }
  .top {
    transform: rotate(45deg);
  }
  .bottom {
    transform: rotate(-45deg);
  }
}
</style>
