<template>
  <div :class="row ? 'row-keyboard' : 'keyboard'">
    <button
      v-for="btn in 10"
      :key="btn"
      class="num-btn"
      :class="[`btn-${btn==10?0:btn}`]"
      @click="fillValue(btn==10?0:btn)"
    >
      {{ btn == 10 ? '0' : btn }}
    </button>
    <button
      class="comma"
      @click="fillValue(',')"
    >
      ,
    </button>
    <button
      class="erase"
      @click="fillValue('erase')"
    >
      <font-awesome-icon :icon="['fas', 'backspace']" />
    </button>
    <button
      class="finish"
      @click="fillValue('finish')"
    >
      {{ $t('i18n_terminar') }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'MdMobileKeyboard',
  props: {
    row: {
      type: Boolean,
      default: false
    },
    maxValue: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    fillValue (btn) {
      if (btn === 'finish') {
        this.$emit('finish')
        return
      }

      if (btn === 'erase') {
        this.value = this.value.slice(0, -1)
        const rawValue = +this.value.replace(',', '.')
        this.$emit('keyPressed', rawValue)
        return
      }

      if ((btn === ',' && this.value.includes(',')) || (this.value.includes(',') && this.value.substring(this.value.indexOf(',')).length === 3)) {
        return
      }

      if (this.maxValue && +`${this.value}${btn}`.replace(',', '.') > this.maxValue) {
        this.value = `${this.maxValue}`
        this.$emit('keyPressed', this.value)
        return
      }

      this.value += btn
      const rawValue = +this.value.replace(',', '.')
      this.$emit('keyPressed', rawValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.keyboard {
  display: grid;
  max-width: 400px;
  grid-template-areas:
    "btn-1 btn-2 btn-3"
    "btn-4 btn-5 btn-6"
    "btn-7 btn-8 btn-9"
    "comma btn-0 erase"
    "finish finish finish"
  ;
}
.row-keyboard {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  max-width: 400px;
  padding: 0 6px;
  button {
    max-width: 9%;
    width: 100%;
  }
  .erase, .finish, .comma {
    margin-top: 5px;
    display: inline-block;
    max-width: 32%;
  }
}
button {
  border: none;
  border-radius: 6px;
  margin: 1px;
  padding: 6px;
  font-weight: 700;
  &:active {
    background: var(--md-highlight-darker);
    color: #fff;
  }
}
.btn-1 {
  grid-area: btn-1;
}
.btn-2 {
  grid-area: btn-2;
}
.btn-3 {
  grid-area: btn-3;
}
.btn-4 {
  grid-area: btn-4;
}
.btn-5 {
  grid-area: btn-5;
}
.btn-6 {
  grid-area: btn-6;
}
.btn-7 {
  grid-area: btn-7;
}
.btn-8 {
  grid-area: btn-8;
}
.btn-9 {
  grid-area: btn-9;
}
.btn-0 {
  grid-area: btn-0;
}
.comma {
  grid-area: comma;
}
.erase {
  grid-area: erase;
}
.finish {
  grid-area: finish;
}
</style>
