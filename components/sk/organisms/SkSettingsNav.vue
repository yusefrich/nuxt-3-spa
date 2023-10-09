<template>
  <div class="list-wrapper">
    <button
      v-for="(item, idx) in items"
      :key="idx"
      class="transition"
      :class="{ selected: item.tab === selected }"
      @click="$emit('changeTab', item.tab)"
    >
      <div v-if="item.tab === selected" class="active-tag" />
      <span>{{ item.text }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SkSettingNav',
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    selected: {
      type: String,
      default: ''
    }
  },
  emits: [
    'changeTab'
  ]
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  max-width: 100%;
  min-width: 180px;
  background: var(--fut-background-darkest);
  padding: .5rem 0;
  border-radius: .5rem;
  position: sticky;
  top: 2em;

  button {
    position: relative;
    border: none;
    background: transparent;
    padding: 11.5px 20px;
    display: flex;
    align-items: center;
    width: 100%;

    .active-tag {
      position: absolute;
      left: 0;
      top: 0;
      width: 3px;
      height: 100%;
      background: var(--fut-primary);
    }
    span {
      color: var(--fut-color-dynamic);
      font-size: .875rem;
      font-weight: 600;
    }

    &:hover {
      background: var(--fut-background-black-2);
    }
    &.selected {
      background: var(--fut-background-black-2);
    }
  }
}

@media (max-width: 821px) {
  .list-wrapper {
    position: initial;
  }
}
</style>
