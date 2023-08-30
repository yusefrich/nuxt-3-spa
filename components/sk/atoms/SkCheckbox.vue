<template>
  <label :for="name">
    <input :id="name" v-model="checked" type="checkbox" :required="required">
    <span class="check transition" :class="{ active: checked }">
      <font-awesome-icon v-if="checked" class="icon" :icon="['fas', 'check']" />
    </span>
    <span v-if="label" class="ms-2">{{ label }}</span>
    <slot v-else />
  </label>
</template>

<script>
export default {
  name: 'SkCheckbox',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    checked: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
label {
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  color: var(--fut-secondary);
  font-size: .875rem;

  input {
    position: absolute;
    left: 0;
    opacity: 0;
    z-index: -1;
  }

  .check {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 21px;
    min-width: 21px;
    height: 21px;
    border: 2px solid var(--fut-background-lightest-2);
    border-radius: 3px;

    &.active {
      background: var(--fut-background-lightest-2);
    }

    .icon {
      color: var(--fut-color-dynamic);
    }
  }

  &:hover {
    .check {
      border-color: var(--fut-secondary);
    }
  }
}
</style>
