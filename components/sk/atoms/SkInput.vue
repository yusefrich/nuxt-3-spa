<template>
  <div :id="name" class="sk-input">
    <label v-if="label" :for="name">
      {{ label }}<span v-if="required">*</span>
    </label>
    <div class="input-wrapper">
      <input
        v-if="mask"
        :id="name"
        v-model="inputValue"
        v-mask="mask"
        :type="togglePassword && type === 'password' ? 'text' : type"
        :required="required"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        class="transition"
        autocomplete="off"
        :class="{
          rounded,
          'star-icon': startIcon,
          readonly
        }"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      >
      <input
        v-else
        :id="name"
        v-model="inputValue"
        :type="togglePassword && type === 'password' ? 'text' : type"
        :required="required"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        class="transition"
        autocomplete="off"
        :class="{
          rounded,
          'star-icon': startIcon,
          readonly
        }"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      >
      <div class="placeholder-icon">
        <slot name="placeholder-icon" />
      </div>
      <div
        v-if="type === 'password'"
        :id="name"
        class="eye-btn"
        @keyup.prevent
        @click.prevent="togglePassword = !togglePassword"
      >
        <font-awesome-icon v-if="togglePassword" :id="name" class="icon" :icon="['fas', 'eye-slash']" />
        <font-awesome-icon v-else :id="name" class="icon" :icon="['fas', 'eye']" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
    mask: {
      type: [String, Array],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    rounded: {
      type: Boolean,
      default: false
    },
    startIcon: {
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
    }
  },
  emits: [
    'update:modelValue',
    'focus',
    'blur'
  ],
  data () {
    return {
      togglePassword: false
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

<style lang="scss" scoped>
.sk-input {
  display: flex;
  flex-direction: column;

  label {
    font-size: 15px;
    font-weight: 600;
    color: var(--fut-secondary);
    margin-bottom: 2px;

    span {
      color: red;
      font-weight: 400;
      font-size: 13px;
      margin-left: 3px;
    }
  }

  .input-wrapper {
    position: relative;

    input {
      width: 100%;
      border: 2px solid var(--fut-background-lightest-2);
      background: var(--fut-background-darkest);
      color: var(--fut-color-dynamic);
      border-radius: .25rem;
      outline: 0;
      margin: 0;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12);
      padding: 6px 7px;
      font-weight: 600;
      font-size: 15px;

      &:focus, &:hover {
        border-color: var(--fut-secondary);
      }

      &.rounded {
        border-radius: 30px !important;
      }
      &.star-icon {
        padding-left: 40px
      }
      &.readonly {
        background: var(--fut-background-lightest-2);
      }

      &::placeholder {
        color: var(--fut-background-lightest-2);
      }
    }

    .placeholder-icon {
      position: absolute;
      top: 50%;
      left: 17px;
      margin-top: -12px !important;
    }

    .eye-btn {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      padding: 0 20px;
      border: none;
      background: transparent;
      display: flex;
      align-items: center;
      cursor: pointer;

      .icon {
        width: 17px;
        height: 17px;
        color: var(--fut-secondary);
      }
    }
  }
}
</style>
