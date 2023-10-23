<template>
  <label
    class="d-flex w-100"
  >
    <!-- type="text" -->
    <input
      :ref="refInput"
      v-model="maskedValue"
      :required="required"
      :disabled="disabled"
      :placeholder="placeholder"
      class="w-100 input-style"
      @input="value=>updateValue(value)"
      @keydown="checkValue"
      @blur="inputBlur"
      @click="updateCursorPosition()"
      type="tel"
      pattern="[0-9]*"
      inputmode="decimal"
    >
  </label>
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: false
    },
    prefix: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: null
    },
    limitValue: {
      type: Number,
      default: null
    },
    minValue: {
      type: Number,
      default: null
    },
    currentLayoutStyle: {
      type: String,
      default: ''
    }
  },
  emits: [
    'change'
  ],
  data () {
    return {
      maskedValue: '',
      focused: false,
      refInput: {
        type: String,
        default: 'test'
      }
    }
  },
  watch: {
    value (val) {
      this.maskedValue = val ? this.thousandsSeparators(val) : this.thousandsSeparators(0.00)
    },
    maskedValue (value, oldValue) {
      for (const c of value) {
        const regex = /[0-9]|\.|,/
        if (!regex.test(c)) {
          this.maskedValue = oldValue
        }
      }
      if (value.split(',').length > 2) {
        this.maskedValue = oldValue
      }
      let rawValue = value.replace(/\./g, '')
      rawValue = rawValue.replace(/,/g, '.')
      if (rawValue >= this.limitValue) {
        this.maskedValue = this.thousandsSeparators(this.limitValue)
      }
      if (rawValue <= this.minValue && !rawValue) {
        this.maskedValue = this.thousandsSeparators(this.minValue)
      }
      if (!rawValue) {
        this.maskedValue = this.thousandsSeparators(0.00)
      }
    }
  },
  mounted () {
    if (this.value) {
      this.maskedValue = this.thousandsSeparators(this.value)
      this.inputBlur()
    }
  },
  methods: {
    checkValue (evt) {
      const theEvent = evt || window.event
      if (theEvent.keyCode === 37 || theEvent.keyCode === 38 || theEvent.keyCode === 39 || theEvent.keyCode === 8) {
        return
      }
      let key = null
      if (theEvent.type === 'paste') {
        key = theEvent.clipboardData.getData('text/plain')
      } else {
        key = theEvent.key
      }
      const regex = /[0-9]|,/
      if (!regex.test(key)) {
        theEvent.returnValue = false
        theEvent.preventDefault()
      }
    },
    updateValue (event) {
      const regex = /[0-9]|\./
      if (!regex.test(event.target.value)) {
        if (event.preventDefault) {
          event.preventDefault()
        }
        return
      }
      const value = event.target.value.replace(/\./g, '')
      let selectionStart = event.target.selectionStart + 0
      const selectionEnd = event.target.value.length - selectionStart
      const numParts = value.toString().split('.')
      numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      this.maskedValue = numParts.join(',')

      if (value.split(',')[1] && value.split(',')[1].length > 2) {
        this.maskedValue = this.maskedValue.substring(0, this.maskedValue.length - 1)
      }
      const el = this.$refs[this.refInput]
      if ((this.maskedValue.length - selectionStart) > selectionEnd) {
        selectionStart++
      }
      if ((this.maskedValue.length - selectionStart) < selectionEnd) {
        selectionStart--
      }
      this.$nextTick(() => {
        this.setCaretPosition(el, selectionStart)
        let rawValue = this.maskedValue.replace(/\./g, '')
        rawValue = rawValue.replace(/,/g, '.')
        this.$emit('change', +rawValue)
      })
    },
    setCaretPosition (ctrl, pos) {
      ctrl.focus()
      ctrl.setSelectionRange(pos, pos)
    },
    updateCursorPosition () {
      if (!this.focused) {
        this.focused = true
        const el = this.$refs[this.refInput]
        this.$nextTick(() => {
          this.setCaretPosition(el, 0)
        })
      }
    },
    thousandsSeparators (num) {
      const numParts = num.toString().split('.')
      numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return numParts.join(',')
    },
    inputBlur () {
      let rawValue = this.maskedValue.replace(/\./g, '')
      rawValue = rawValue.replace(/,/g, '.')
      this.$emit('change', +rawValue)
      this.focused = false
      if (this.maskedValue.length <= 0) {
        return
      }
      if (!this.maskedValue.split(',')[1]) {
        if (this.maskedValue.includes(',')) {
          this.maskedValue = this.maskedValue + '00'
        } else {
          this.maskedValue = this.maskedValue + ',00'
        }
      }
      if (this.maskedValue.split(',')[1] && this.maskedValue.split(',')[1].length === 1) {
        this.maskedValue = this.maskedValue + '0'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/layout/variables";
  @import "@/assets/layout/breakpoints";
  .prefix-style{
    padding: 10px 5px;
    // color: var(--fut-primary);
    // font-weight: bold;
  }
  label{
    background: var(--fut-background-lightest);
    color: $white;
    width: 100%;
    height: 100%;
  }
  input{
    border-radius: 0;
    border: 1px solid transparent;
    outline: none !important;
    box-shadow: none !important;
    background: transparent;
    color: black;
    // width: 70px;
    // color: var(--fut-primary);
    // font-weight: bold;
  }
  input:disabled{
    opacity: .5;
  }
  .input-nsx{
    background-color: #d2d2d2 !important;
    color: #1d1d1d;
    padding: 0;
    input{
      color: #1d1d1d;
      padding: 5px !important;
      width: 90px;
      font-size: 14px;
      padding-top: 1px !important;
      padding-bottom: 1px !important;
      font-weight: 400;
      color: #000;
    }
    input:focus{
      color: #1d1d1d;
    }
  }
  .input-style{
    background: white;
    border-radius: 3px;
    height: 35px;
    @include md {
      height: 20px;
    }
    @include _md {
      font-size: 13px;
    }
  }
</style>
