<template>
  <div class="d-flex">
    <ul
      class="list"
      :style="`
        background: ${background};
      `"
    >
      <li
        v-for="(comp, name, idx) in componentsList"
        :key="idx"
        class="list-item"
      >
        <button
          class="list-btn"
          :class="{ selected: name === selectedComponent }"
          @click="$emit('changeComponent', name)"
        >
          <font-awesome-icon v-if="comp.icon" class="icon transition" :icon="comp.icon" />
          <span>{{ comp.text }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SkComponentsSelect',
  props: {
    selectedComponent: {
      type: String,
      default: ''
    },
    componentsList: {
      type: Object,
      default: () => ({})
    },
    background: {
      type: String,
      default: 'var(--fut-background-darkest)'
    }
  },
  emits: [
    'changeComponent'
  ]
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  list-style: none;
  border-radius: 50px;
  margin: 0;
  padding: 5px;
  width: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: var(--fut-background-lightest-2);
  }

  .list-item {
    margin-left: 5px;

    .list-btn {
      display: flex;
      align-items: center;
      color: var(--fut-color-dynamic);
      background: transparent;
      border: none;
      padding: .75rem 1rem;
      border-radius: 50px;
      transition: all ease-in-out 300ms;

      .icon {
        width: 14px;
        height: 14px;
        color: var(--fut-secondary);
        margin-right: 8px;
      }
      span {
        font-size: .875rem;
        font-weight: 600;
        white-space: nowrap;
      }
      &.selected {
        background: var(--fut-background-lightest-2) !important;
      }

      &:hover {
        background: var(--fut-background-lightest-2);
        .icon {
          color: var(--fut-color-dynamic);
        }
      }
      &:active {
        span, .icon {
          display: flex;
          transform: scale(.95);
        }
      }
    }

    &:first-of-type {
      margin-left: 0;
    }
  }
}
</style>
