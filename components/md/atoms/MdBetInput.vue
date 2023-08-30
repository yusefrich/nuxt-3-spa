<template>
  <label>
    <span class="me-1">R$</span>
    <div
      v-if="isMobile"
      id="fake-input"
      @click="$emit('focused'), fakeFocus = true"
    >
      <span v-if="betValue" class="fake-value">{{ betValue }}</span>
      <span v-if="fakeFocus && !disabled" class="blink-bar fs-5">|</span>
      <span v-if="!betValue" class="fake-placeholder">{{ $t('i18n_valor_da_aposta') }}</span>
    </div>
    <input
      v-else
      id="bet-input"
      :ref="refInput"
      v-model="betValue"
      type="text"
      :placeholder="$t('i18n_valor_da_aposta')"
      :disabled="disabled"
      @input="value=>updateValue(value)"
      @keydown="checkValue"
      @blur="inputBlur"
      @click="updateCursorPosition()"
    >
  </label>
</template>

<script>
export default {
  name: 'MdBetInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    mobileValue: {
      type: String,
      default: ''
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    defocus: {
      type: Boolean,
      default: false
    },
    limitValue: {
      type: Number,
      default: null
    },
    minValue: {
      type: Number,
      default: null
    },
    refInput: {
      type: String,
      default: 'test'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fakeFocus: false,
      focused: false,
      betValue: ''
    }
  },
  watch: {
    defocus (value) {
      if (value) {
        this.fakeFocus = false

        if (!this.betValue.includes(',') && !this.betValue.includes(',00')) {
          this.betValue += ',00'
        } else if (this.betValue.substring(this.betValue.indexOf(',')).length === 2) {
          this.betValue += '0'
        }
      }
    },
    value (val) {
      this.betValue = val ? this.thousandsSeparators(val) : this.thousandsSeparators(0.00)
    },
    betValue (value, oldValue) {
      for (const c of value) {
        const regex = /[0-9]|\.|,/
        if (!regex.test(c)) {
          this.betValue = oldValue
        }
      }
      if (value.split(',').length > 2) {
        this.betValue = oldValue
      }
      let rawValue = value.replace(/\./g, '')
      rawValue = rawValue.replace(/,/g, '.')
      if (rawValue >= this.limitValue) {
        this.betValue = this.thousandsSeparators(this.limitValue)
      }
      if (rawValue <= this.minValue && !rawValue) {
        this.betValue = this.thousandsSeparators(this.minValue)
      }
      if (!rawValue) {
        this.betValue = this.thousandsSeparators(0.00)
      }
    }
  },
  mounted () {
    if (this.value) {
      this.betValue = this.thousandsSeparators(this.value)
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
      this.betValue = numParts.join(',')

      if (value.split(',')[1] && value.split(',')[1].length > 2) {
        this.betValue = this.betValue.substring(0, this.betValue.length - 1)
      }
      const el = this.$refs[this.refInput]
      if ((this.betValue.length - selectionStart) > selectionEnd) {
        selectionStart++
      }
      if ((this.betValue.length - selectionStart) < selectionEnd) {
        selectionStart--
      }
      this.$nextTick(() => {
        this.setCaretPosition(el, selectionStart)
        let rawValue = this.betValue.replace(/\./g, '')
        rawValue = rawValue.replace(/,/g, '.')
        this.$emit('change', +rawValue)
      })
    },
    inputBlur () {
      let rawValue = this.betValue.replace(/\./g, '')
      rawValue = rawValue.replace(/,/g, '.')
      this.$emit('change', +rawValue)
      this.focused = false
      if (this.betValue.length <= 0) {
        return
      }
      if (!this.betValue.split(',')[1]) {
        if (this.betValue.includes(',')) {
          this.betValue = this.betValue + '00'
        } else {
          this.betValue = this.betValue + ',00'
        }
      }
      if (this.betValue.split(',')[1] && this.betValue.split(',')[1].length === 1) {
        this.betValue = this.betValue + '0'
      }
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
    setCaretPosition (ctrl, pos) {
      ctrl.focus()
      ctrl.setSelectionRange(pos, pos)
    },
    thousandsSeparators (num) {
      const numParts = num.toString().split('.')
      numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return numParts.join(',')
    }
  }
}
</script>

<style lang="scss" scoped>
label {
  padding: 0 10px;
  display: flex;
  align-items: center;
}
#bet-input {
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  margin-left: 5px;
  color: var(--md-font-color);
}
#fake-input {
  width: 100%;
  .fake-placeholder {
    color: var(--md-menu-idx-font-color);
  }
  .blink-bar {
    margin-right: -6px;
    margin-bottom: 1px;
    color: var(--md-font-color);
    font-weight: 100;
    animation: blinker 1s linear infinite;
  }
  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
  .fake-value {
    color: var(--md-font-color);
    margin-right: -5px;
  }
}
</style>
