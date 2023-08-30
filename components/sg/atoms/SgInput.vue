<template>
  <input
    v-model="inputValue"
    :placeholder="placeholder"
    :type="type"
    class="input-control"
  >
</template>

<script>
export default {
  name: 'SgInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    placeholder: {
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

.input-control {
  background-color: var(--fut-background-darkest);
  border: 2px solid var(--fut-background-lightest);
  border-radius: 5px;
  width: 100%;
  outline: none;
  color: white;
}

</style>
