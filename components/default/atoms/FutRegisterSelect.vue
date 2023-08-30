<template>
  <div class="select-wrapper">
    <!-- <label v-if="focused || selectValue" :for="name">
      {{ label }}
    </label> -->
    <select
      v-model="selectValue"
      :disabled="disabled"
      class="fut-color-dynamic"
      @focus="focused = true"
      @blur="focused = false"
    >
      <option
        :value="''"
        selected
        disabled
      >
        {{ label }}
      </option>
      <option
        v-for="(option, index) in options"
        :key="index+'_'+option.value+'_'+name"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'FutRegisterSelect',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => ([])
    },
    name: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      focused: false
    }
  },
  computed: {
    selectValue: {
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
.select-wrapper {
  select {
    width: 100%;
    height: 38px;
    padding: 0px 12px;
    background: var(--fut-background-lighter);
    border: none;
    border-radius: 50px;
    color: #fff;
  }
}
</style>
