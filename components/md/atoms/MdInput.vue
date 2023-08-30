<template>
  <div class="mb-3 w-100 md-input">
    <label :for="name" class="form-label">{{ label.toUpperCase() }}</label>
    <input
      :id="name"
      :ref="name"
      v-model="inputValue"
      v-inputmask="mask"
      :type="type"
      class="form-control"
      :class="{ disable: disabled }"
      :placeholder="placeholder"
      :disabled="disabled"
    >
    <error-badge :name="name" :validate="errors ? errors : {}" />
  </div>
</template>

<script>
import ErrorBadge from '@/components/default/atoms/ErrorBadge.vue'

export default {
  name: 'MdInput',
  components: {
    ErrorBadge
  },
  props: {
    value: {
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
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    errors: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    mask: {
      type: String,
      default: ''
    }
  },
  computed: {
    inputValue: {
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
.md-input {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
label {
  font-size: 13px;
  font-weight: 600;
  color: var(--md-font-color);
}
.form-control {
  border: 1px solid var(--md-comp-border-color);
  background: var(--md-comp-bg-color);
  color: var(--md-font-color);
  box-shadow: 0 0 0 0;
}
.disable {
  color: var(--md-input-disabled-color);
}
</style>
