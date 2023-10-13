<template>
  <input
    :disabled="disabled"
    :placeholder="placeholder"
    :readonly="readonly"
    :type="type"
    :value="value"
    :required="required"
    class="input-controler w-100"
    @keyup.enter="$emit('enter')"
    @focus="$emit('focus')"
    @blur="$emit('blur', $event.target.value)"
    @input="$emit('input', $event.target.value)"
  >
</template>
<script>
export default {
  props: {
    validate: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String,
      default: 'default'
    },
    info: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconWhite: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    noFocus: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    gray: {
      type: Boolean,
      default: false
    },
    darker: {
      type: Boolean,
      default: false
    },
    nsxInput: {
      type: Boolean,
      default: false
    },
    fontSm: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    labelGuide: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      require: true,
      default: 'text'
    },
    required: {
      type: Boolean
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped lang="scss">
@import "@/assets/layout/breakpoints";

.input-controler {
  background-color: transparent;
  outline: none;
  border: none;
  color: white;
  height: 35px;
  font-size: 13px;
  background-color: var(--fut-background-darker);
  @include md {
    background-color: var(--fut-background-darker);
  }
  &::placeholder {
    color: white;
    @include md {
      color: white;
      font-weight: normal;
    }
  }
  &:focus {
    border: 2px solid var(--fut-primary);
  }
}
</style>
