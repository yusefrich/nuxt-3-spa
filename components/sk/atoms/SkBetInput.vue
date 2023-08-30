<template>
  <div class="sk-bet-input">
    <input
      :ref="refInput"
      v-model="betValue"
      :disabled="disabled"
      type="text"
      @input="value=>updateValue(value)"
      @keydown="checkValue"
      @blur="inputBlur"
      @click="updateCursorPosition()"
    >
  </div>
</template>

<script>
export default {
  name: 'SkBetInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
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
      focused: false,
      betValue: '0,00'
    }
  },
  watch: {
    value (val) {
      this.betValue = val
        ? this.thousandsSeparators(val)
        : this.thousandsSeparators(0.00)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-bet-input {
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

    &::placeholder {
      color: var(--fut-background-lightest-2);
    }
  }
}
</style>
