<template>
  <div class="input-wrapper">
    <label
      v-if="focused || inputValue"
      :for="name"
      class="fut-color-dynamic"
      :style="`
        left: ${labelLeftPosition};
      `"
    >
      {{ label }}<span class="req-dot">{{ required ? '*' : '' }}</span>
    </label>
    <input
      :id="name"
      v-model="inputValue"
      :type="type"
      :placeholder="focused ? '' : `${label}${required?'*':''}`"
      :required="required"
      :readonly="readonly"
      :disabled="disabled"
      :style="`
        padding: ${padding};
      `"
      class="fut-color-dynamic"
      @focus="$emit('focus'), focused = true"
      @blur="$emit('blur'), focused = false"
    >
  </div>
</template>

<script>
export default {
  name: 'FutRegisterInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    padding: {
      type: String,
      default: '0 18px'
    },
    labelLeftPosition: {
      type: String,
      default: '15px'
    }
  },
  emits: [
    'focus',
    'blur',
    'update:modelValue'
  ],
  data () {
    return {
      focused: false
    }
  },
  computed: {
    inputValue: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.input-wrapper {
  position: relative;

  label {
    position: absolute;
    top: -13px;
    padding: 0 3px;
    font-size: 13px;
    color: #fff;
    background-image: linear-gradient(to bottom, var(--fut-background-darker) 0, var(--fut-background-darker) 55%, var(--fut-background-lighter) 30%);
    z-index: 2;

    .req-dot {
      color: var(--fut-primary);
      font-size: 16px;
    }
  }

  input {
    width: 100%;
    height: 38px;
    background-color: var(--fut-background-lighter);
    color: #fff;
    border: none;
    border-radius: 50px;
    outline: none !important;
    box-shadow: none !important;
    font-size: 15px;

    &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #fff;
      opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #fff;
    }

    &::-ms-input-placeholder { /* Microsoft Edge */
      color: #fff;
    }
    &:focus {
      border: 1px solid #fff;
    }
  }
}
</style>
